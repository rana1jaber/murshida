-- =====================================================
--  دالة صغيرة للمنبّه (keep-supabase-awake)
--  شغّليها مرة وحدة من: Supabase → SQL Editor → New query → Run
--  ما تقرأ ولا تكتب أي بيانات، بس ترد بكلمة "ok"
--  عشان المشروع المجاني يظل نشط وما يتوقف.
-- =====================================================
create or replace function public.keep_alive()
returns text
language sql
stable
as $$ select 'ok'::text $$;

grant execute on function public.keep_alive() to anon;
