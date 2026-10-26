-- Run once in the Supabase SQL Editor to clear all RSVP and gift test records.
truncate table public.gift_claims, public.rsvps restart identity;
