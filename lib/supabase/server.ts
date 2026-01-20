import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const supabaseServer = () => {
  const cookieStore = cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component에서 setAll 호출되면 무시될 수 있음(Next 제한)
        }
      },
    },
  });
};
