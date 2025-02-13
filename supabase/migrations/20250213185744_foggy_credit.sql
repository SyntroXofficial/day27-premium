/*
  # Fix User Schema

  1. Changes
    - Remove role and status columns from users table
    - Add proper indexes and constraints
    - Update RLS policies
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing table if it exists
drop table if exists public.users cascade;

-- Create users table with correct schema
create table public.users (
    id uuid primary key references auth.users on delete cascade,
    email text unique not null,
    username text unique,
    display_name text,
    profile_pic_url text,
    last_login timestamptz,
    last_active timestamptz,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view all users"
    on public.users for select
    to authenticated
    using (true);

create policy "Users can update their own data"
    on public.users for update
    to authenticated
    using (auth.uid() = id);

create policy "Users can insert their own data"
    on public.users for insert
    to authenticated
    with check (auth.uid() = id);

-- Create indexes
create index if not exists users_username_idx on public.users (username);
create index if not exists users_email_idx on public.users (email);
create index if not exists users_last_active_idx on public.users (last_active);