import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // ✅ 로그인 페이지는 통과 (너가 옮긴 경로로 바꾸기)
  if (pathname === "/login") return res;

  // /admin만 보호
  if (!pathname.startsWith("/admin")) return res;

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  const user = userData?.user;

  if (userErr) console.error("getUser error:", userErr);

  if (!user) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ✅ 관리자 체크 (error도 반드시 확인)
  const { data: adminRow, error: adminErr } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (adminErr) {
    console.error("admin check error:", adminErr);
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!adminRow) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
