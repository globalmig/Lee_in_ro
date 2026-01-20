import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

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

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // ✅ 로그인된 상태로 /login 들어오면 /admin으로
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ✅ /login은 기본 통과 (비로그인일 때만 로그인폼 보여줌)
  if (pathname === "/login") {
    return res;
  }

  // /admin만 보호
  if (!pathname.startsWith("/admin")) return res;

  if (!user) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 관리자 체크
  const { data: isAdmin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
