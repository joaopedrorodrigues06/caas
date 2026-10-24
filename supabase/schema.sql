-- Run this once in the Supabase SQL Editor for the wedding site.
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(trim(guest_name)) between 2 and 120),
  attending boolean not null,
  created_at timestamptz not null default now()
);

create table if not exists public.gift_claims (
  gift_id text primary key,
  guest_name text not null check (char_length(trim(guest_name)) between 2 and 120),
  chosen_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.gift_claims enable row level security;

grant insert on public.rsvps to anon;
grant select on public.rsvps to authenticated;
grant select, insert on public.gift_claims to anon;
grant select on public.gift_claims to authenticated;

drop policy if exists "Guests can submit RSVP" on public.rsvps;
create policy "Guests can submit RSVP"
  on public.rsvps for insert to anon
  with check (char_length(trim(guest_name)) between 2 and 120);

drop policy if exists "Couple can view RSVPs" on public.rsvps;
create policy "Couple can view RSVPs"
  on public.rsvps for select to authenticated
  using (true);

drop policy if exists "Guests can view claimed gifts" on public.gift_claims;
create policy "Guests can view claimed gifts"
  on public.gift_claims for select to anon, authenticated
  using (true);

drop policy if exists "Guests can claim gifts" on public.gift_claims;
create policy "Guests can claim gifts"
  on public.gift_claims for insert to anon
  with check (char_length(trim(guest_name)) between 2 and 120);
