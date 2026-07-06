-- Wklej to do SQL Editor w dashboardzie Supabase (sql.new)
-- Po utworzeniu, skopiuj Project URL i anon key do GitHub Secrets

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anonim',
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Każdy może czytać opinie"
  on testimonials for select
  using (true);

create policy "Każdy może dodać opinię"
  on testimonials for insert
  with check (true);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "Każdy może dodać lead"
  on leads for insert
  with check (true);
