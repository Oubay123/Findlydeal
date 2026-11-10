-- Findlydeal: catalogue storage.
--
-- Run once in the Supabase SQL editor (or `supabase db push`). Safe to run
-- again: every statement is idempotent.
--
-- Only the site's server (a Cloudflare Worker holding the service role key)
-- reads and writes these tables. Row Level Security is enabled with no
-- policy, so the public `anon` key can read nothing.

create table if not exists public.categories (
  slug        text primary key,
  name        text not null,
  position    integer not null default 0
);

insert into public.categories (slug, name, position) values
  ('tech',            'Tech & Électronique', 1),
  ('home-appliances', 'Électroménager',      2),
  ('furniture',       'Meubles & Déco',      3),
  ('watches-jewelry', 'Montres & Bijoux',    4),
  ('fashion',         'Mode',                5),
  ('leisure',         'Loisirs',             6)
on conflict (slug) do nothing;

-- One row per compared product (src/config/catalogue-ebay.ts).
create table if not exists public.products (
  slug             text primary key,
  title            text not null,
  brand            text,
  category_slug    text references public.categories (slug) on update cascade,
  -- Refresh group: the catalogue is refreshed one bucket at a time.
  bucket           smallint not null,
  image_url        text,
  -- Listings compared at the last refresh (can exceed the offers kept).
  offer_count      integer not null default 0,
  best_price_cents integer,
  currency         text not null default 'EUR',
  -- What listing pages render: the product with one offer per condition.
  card             jsonb not null,
  -- What the product page renders: the product with every offer kept.
  data             jsonb not null,
  refreshed_at     timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

create index if not exists products_bucket_idx   on public.products (bucket);
create index if not exists products_category_idx on public.products (category_slug);
create index if not exists products_price_idx    on public.products (best_price_cents);

-- The offers kept for each product, replaced at every refresh.
create table if not exists public.offers (
  id             text primary key,
  product_slug   text not null references public.products (slug) on delete cascade,
  source         text not null,
  external_id    text not null,
  title          text not null,
  url            text not null,
  condition      text not null check (condition in ('new', 'refurbished', 'used', 'unknown')),
  price_cents    integer,
  shipping_cents integer,
  total_cents    integer not null,
  currency       text not null default 'EUR',
  seller_name    text,
  seller_type    text check (seller_type in ('business', 'individual')),
  image_url      text,
  -- Price far below the comparable offers: shown as "à vérifier".
  suspicious     boolean not null default false,
  fetched_at     timestamptz not null
);

create index if not exists offers_product_idx on public.offers (product_slug, total_cents);
create index if not exists offers_condition_idx on public.offers (condition);

-- Price history: one point per product and condition at each refresh.
-- Feeds the future "historique des prix" and a 30-day reference price.
create table if not exists public.price_points (
  id            bigint generated always as identity primary key,
  product_slug  text not null references public.products (slug) on delete cascade,
  condition     text not null,
  min_cents     integer not null,
  median_cents  integer not null,
  offer_count   integer not null,
  captured_at   timestamptz not null default now()
);

create index if not exists price_points_product_idx
  on public.price_points (product_slug, condition, captured_at desc);

-- Journal of the refreshes, to see at a glance that ingestion is healthy.
create table if not exists public.ingest_runs (
  id          bigint generated always as identity primary key,
  bucket      smallint not null,
  products    integer not null,
  priced      integer not null,
  failures    integer not null,
  duration_ms integer not null,
  ran_at      timestamptz not null default now()
);

-- Keeps two refreshes from running at the same time.
create table if not exists public.ingest_locks (
  name       text primary key,
  expires_at timestamptz not null
);

alter table public.categories   enable row level security;
alter table public.products     enable row level security;
alter table public.offers       enable row level security;
alter table public.price_points enable row level security;
alter table public.ingest_runs  enable row level security;
alter table public.ingest_locks enable row level security;

-- Thirty-day median per product and condition, for the day the reference
-- price moves from "the offers right now" to "the last 30 days".
create or replace view public.price_reference_30d
with (security_invoker = true) as
select
  product_slug,
  condition,
  percentile_cont(0.5) within group (order by median_cents)::integer as median_cents,
  min(min_cents) as lowest_cents,
  count(*) as points
from public.price_points
where captured_at > now() - interval '30 days'
group by product_slug, condition;

-- Health check: last refresh of each bucket.
create or replace view public.ingest_status
with (security_invoker = true) as
select
  bucket,
  count(*) as products,
  count(*) filter (where offer_count > 0) as priced,
  min(refreshed_at) as oldest_refresh,
  max(refreshed_at) as newest_refresh
from public.products
group by bucket
order by bucket;
