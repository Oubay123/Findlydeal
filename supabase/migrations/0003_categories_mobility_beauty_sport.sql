-- Categories added on 2026-11-12 (src/config/categories.ts). As for 0002, a
-- product whose category is missing here makes its whole bucket write fail
-- (foreign key), so the rows must exist before the products are refreshed.
insert into public.categories (slug, name, position) values
  ('mobility', 'Mobilité électrique', 10),
  ('beauty',   'Beauté & Soin',       11),
  ('sport',    'Sport & Fitness',     12)
on conflict (slug) do nothing;
