-- =====================================================
--  قاعدة بيانات موقع "أرشديني"
--  شغّلي هذا الملف كامل مرة وحدة من:
--  Supabase → SQL Editor → New query → Run
-- =====================================================

-- 1) جدول الأسئلة
create table if not exists public.questions (
  id          bigint generated always as identity primary key,
  -- يتعبأ تلقائيًا من حساب الطالبة، والطالبة ما ترسله بنفسها
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body        text not null check (char_length(body) between 5 and 2000),
  reply       text check (reply is null or char_length(reply) <= 4000),
  status      text not null default 'new' check (status in ('new', 'answered')),
  created_at  timestamptz not null default now(),
  replied_at  timestamptz
);
create index if not exists questions_user_id_idx on public.questions (user_id);
create index if not exists questions_created_at_idx on public.questions (created_at desc);

-- 2) جدول المرشدات (الحسابات اللي لها صلاحية الرد)
create table if not exists public.counselors (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- 3) دالة: هل المستخدمة الحالية مرشدة؟
create or replace function public.is_counselor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.counselors where user_id = auth.uid());
$$;
revoke execute on function public.is_counselor() from public, anon;
grant  execute on function public.is_counselor() to authenticated;

-- 4) تفعيل RLS
alter table public.questions  enable row level security;
alter table public.counselors enable row level security;
-- جدول counselors بدون أي policy = لا أحد يقرأه أو يعدله من الموقع.

-- 5) صلاحيات الأعمدة
--    • عمود user_id غير مسموح قراءته لأحد، حتى المرشدة.
--    • الطالبة ترسل نص السؤال فقط.
--    • الرد والحالة فقط قابلة للتعديل (وRLS يحصرها في المرشدة).
revoke all on public.questions  from anon, authenticated;
revoke all on public.counselors from anon, authenticated;

grant select (id, body, reply, status, created_at, replied_at) on public.questions to authenticated;
grant insert (body)                                          on public.questions to authenticated;
grant update (reply, status, replied_at)                     on public.questions to authenticated;

-- 6) قواعد RLS
drop policy if exists "students read own"   on public.questions;
drop policy if exists "students insert own" on public.questions;
drop policy if exists "counselor read all"  on public.questions;
drop policy if exists "counselor reply"     on public.questions;

-- الطالبة تشوف أسئلتها هي فقط
create policy "students read own" on public.questions
  for select to authenticated
  using (user_id = auth.uid());

-- الطالبة تضيف سؤالًا باسم حسابها فقط
create policy "students insert own" on public.questions
  for insert to authenticated
  with check (user_id = auth.uid());

-- المرشدة تشوف كل الأسئلة
create policy "counselor read all" on public.questions
  for select to authenticated
  using (public.is_counselor());

-- المرشدة وحدها تقدر ترد
create policy "counselor reply" on public.questions
  for update to authenticated
  using (public.is_counselor())
  with check (public.is_counselor());

-- =====================================================
--  7) إضافة حساب المرشدة
--  أولًا: أنشئي حسابها من Authentication → Users → Add user
--  (بإيميلها الحقيقي)، ثم غيّري الإيميل هنا وشغّلي السطرين:
-- =====================================================
-- insert into public.counselors (user_id)
-- select id from auth.users where email = 'counselor@school.edu.sa';
