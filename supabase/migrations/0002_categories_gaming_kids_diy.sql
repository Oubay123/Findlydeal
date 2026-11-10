-- Categories added on 2026-11-10 (src/config/categories.ts). A product whose
-- category is missing here makes the whole bucket write fail (foreign key),
-- so a new category needs its row before its products are refreshed.
insert into public.categories (slug, name, position) values
  ('gaming', 'Jeux vidéo',         7),
  ('kids',   'Enfant',             8),
  ('diy',    'Bricolage & Jardin', 9)
on conflict (slug) do nothing;
