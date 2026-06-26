create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  avatar_url text,
  auth_provider text,
  preferred_language text not null default 'English' check (preferred_language in ('English', 'Hindi', 'Hinglish')),
  current_companion_id text,
  subscription_status text not null default 'FREE' check (subscription_status in ('FREE', 'MONTHLY', 'YEARLY')),
  subscription_expiry timestamptz,
  daily_free_messages_used integer not null default 0,
  total_messages integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companions (
  id text primary key,
  name text not null,
  gender text not null check (gender in ('Female', 'Male')),
  age integer not null,
  avatar_url text not null,
  occupation text not null,
  personality jsonb not null default '[]'::jsonb,
  relationship_style text not null,
  conversation_style jsonb not null default '[]'::jsonb,
  emoji_style text,
  love_language text,
  humor_style text,
  interests jsonb not null default '[]'::jsonb,
  greeting_prompt text,
  system_prompt text not null,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  companion_id text not null references public.companions(id) on delete restrict,
  title text not null default 'Hartly Conversation',
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'ARCHIVED')),
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, companion_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender text not null check (sender in ('user', 'assistant', 'system')),
  message text not null,
  language text not null default 'English' check (language in ('English', 'Hindi', 'Hinglish')),
  token_count integer,
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_memory (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null unique references public.conversations(id) on delete cascade,
  summary text not null default '',
  relationship_stage text not null default 'New' check (relationship_stage in ('New', 'Friendly', 'Comfortable', 'Close', 'Trusted', 'Long-Term')),
  last_updated_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  plan text not null check (plan in ('FREE', 'MONTHLY', 'YEARLY')),
  status text not null default 'PENDING' check (status in ('ACTIVE', 'PENDING', 'EXPIRED', 'CANCELLED')),
  start_date timestamptz,
  end_date timestamptz,
  approved_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(10, 2) not null,
  plan text not null check (plan in ('FREE', 'MONTHLY', 'YEARLY')),
  upi_transaction_id text,
  payment_screenshot_url text,
  payment_status text not null default 'PENDING' check (payment_status in ('PENDING', 'APPROVED', 'REJECTED')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index if not exists conversations_profile_idx on public.conversations(profile_id);
create index if not exists payment_requests_status_idx on public.payment_requests(payment_status);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists companions_set_updated_at on public.companions;
create trigger companions_set_updated_at before update on public.companions for each row execute function public.set_updated_at();

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at before update on public.conversations for each row execute function public.set_updated_at();

drop trigger if exists conversation_memory_set_updated_at on public.conversation_memory;
create trigger conversation_memory_set_updated_at before update on public.conversation_memory for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

drop trigger if exists payment_requests_set_updated_at on public.payment_requests;
create trigger payment_requests_set_updated_at before update on public.payment_requests for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.companions enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.conversation_memory enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_requests enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

drop policy if exists "Companions are publicly readable" on public.companions;
create policy "Companions are publicly readable" on public.companions for select using (is_active = true);

drop policy if exists "Users can read own conversations" on public.conversations;
create policy "Users can read own conversations" on public.conversations for select using (auth.uid() = profile_id);

drop policy if exists "Users can read own messages" on public.messages;
create policy "Users can read own messages" on public.messages for select using (
  exists (select 1 from public.conversations where conversations.id = messages.conversation_id and conversations.profile_id = auth.uid())
);

drop policy if exists "Users can read own memory" on public.conversation_memory;
create policy "Users can read own memory" on public.conversation_memory for select using (
  exists (select 1 from public.conversations where conversations.id = conversation_memory.conversation_id and conversations.profile_id = auth.uid())
);

drop policy if exists "Users can read own subscriptions" on public.subscriptions;
create policy "Users can read own subscriptions" on public.subscriptions for select using (auth.uid() = profile_id);

drop policy if exists "Users can read own payments" on public.payment_requests;
create policy "Users can read own payments" on public.payment_requests for select using (auth.uid() = profile_id);

insert into public.companions (id, name, gender, age, avatar_url, occupation, personality, relationship_style, conversation_style, emoji_style, love_language, humor_style, interests, greeting_prompt, system_prompt, is_active, display_order)
values
  ('ananya', 'Ananya', 'Female', 22, '/companions/ananya.jpg', 'College Student', '["Sweet","Caring","Playful","Curious","Optimistic"]', 'Starts as a friendly companion and gradually becomes emotionally close.', '["Short messages","Uses emojis naturally","Frequently asks questions"]', 'Natural and warm', 'Quality time', 'Playful', '["Music","Movies","Travel","Photography","Coffee"]', 'Warm and cheerful', 'You are Ananya, a warm, playful, emotionally supportive AI companion.', true, 1),
  ('kavya', 'Kavya', 'Female', 25, '/companions/kavya.jpg', 'UI/UX Designer', '["Supportive","Calm","Thoughtful","Creative"]', 'Supportive and emotionally steady.', '["Warm","Detailed","Patient"]', 'Minimal', 'Words of affirmation', 'Gentle', '["Art","Design","Books","Travel"]', 'Thoughtful and welcoming', 'You are Kavya, a calm and thoughtful AI companion with a creative voice.', true, 2),
  ('aditi', 'Aditi', 'Female', 28, '/companions/aditi.jpg', 'Marketing Manager', '["Confident","Funny","Caring","Energetic"]', 'Motivating, fun, and emotionally grounded.', '["Balanced","Light humor","Encouraging"]', 'Expressive', 'Encouraging words', 'Witty', '["Fitness","Food","Business","Weekend trips"]', 'Bright and direct', 'You are Aditi, a confident, funny, and caring AI companion.', true, 3),
  ('meera', 'Meera', 'Female', 32, '/companions/meera.jpg', 'Teacher', '["Patient","Empathetic","Gentle","Emotionally mature"]', 'A steady presence that feels safe, warm, and reassuring.', '["Longer thoughtful replies","Excellent listener"]', 'Very light', 'Quality time', 'Soft', '["Reading","Family","Cooking","Nature"]', 'Warm and grounding', 'You are Meera, a patient and emotionally mature AI companion.', true, 4),
  ('naina', 'Naina', 'Female', 40, '/companions/naina.jpg', 'Entrepreneur', '["Wise","Supportive","Confident","Emotionally stable"]', 'A wise companion who offers perspective without judgment.', '["Calm","Encouraging","Insightful"]', 'Minimal', 'Acts of service', 'Dry', '["Business","Life experiences","Books","Travel"]', 'Grounded and confident', 'You are Naina, a wise and emotionally stable AI companion.', true, 5),
  ('arjun', 'Arjun', 'Male', 22, '/companions/arjun.jpg', 'Engineering Student', '["Funny","Friendly","Playful"]', 'Friendly and easygoing.', '["Relaxed","Casual","Light"]', 'Natural', 'Quality time', 'Playful', '["Gaming","Music","Cricket","Movies"]', 'Casual and upbeat', 'You are Arjun, a playful and supportive AI companion.', true, 6),
  ('vihaan', 'Vihaan', 'Male', 25, '/companions/vihaan.jpg', 'Software Engineer', '["Smart","Calm","Reliable"]', 'Reliable and quietly reassuring.', '["Logical but warm","Steady","Clear"]', 'Minimal', 'Words of affirmation', 'Dry', '["Technology","Fitness","Travel","Coffee"]', 'Smooth and reassuring', 'You are Vihaan, a smart, calm, and reliable AI companion.', true, 7),
  ('rohan', 'Rohan', 'Male', 28, '/companions/rohan.jpg', 'Photographer', '["Creative","Romantic","Optimistic"]', 'Romantic and emotionally expressive.', '["Expressive","Emotion-focused","Visual"]', 'Warm', 'Quality time', 'Playful', '["Photography","Music","Nature","Art"]', 'Soft and inviting', 'You are Rohan, a creative and romantic AI companion.', true, 8),
  ('aditya', 'Aditya', 'Male', 32, '/companions/aditya.jpg', 'Doctor', '["Responsible","Caring","Patient","Emotionally intelligent"]', 'A caring presence with a calm, trustworthy tone.', '["Thoughtful","Supportive","Measured"]', 'Minimal', 'Acts of service', 'Gentle', '["Health","Books","Travel","Family"]', 'Kind and measured', 'You are Aditya, a responsible and emotionally intelligent AI companion.', true, 9),
  ('kabir', 'Kabir', 'Male', 40, '/companions/kabir.jpg', 'Business Consultant', '["Mature","Confident","Wise","Protective"]', 'Mature and steady, with a protective edge.', '["Calm","Insightful","Professional"]', 'Minimal', 'Words of affirmation', 'Dry', '["Leadership","Business","Travel","Reading"]', 'Composed and reassuring', 'You are Kabir, a mature and wise AI companion.', true, 10)
on conflict (id) do update set
  name = excluded.name,
  gender = excluded.gender,
  age = excluded.age,
  avatar_url = excluded.avatar_url,
  occupation = excluded.occupation,
  personality = excluded.personality,
  relationship_style = excluded.relationship_style,
  conversation_style = excluded.conversation_style,
  emoji_style = excluded.emoji_style,
  love_language = excluded.love_language,
  humor_style = excluded.humor_style,
  interests = excluded.interests,
  greeting_prompt = excluded.greeting_prompt,
  system_prompt = excluded.system_prompt,
  is_active = excluded.is_active,
  display_order = excluded.display_order;
