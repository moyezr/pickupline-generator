import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  //  console.log("I ran");
  //console.log("Trying to get to ", request.url);

  if (request.nextUrl.pathname.startsWith("/login") && data.user) {
    return NextResponse.redirect(new URL("/generate", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/generate") ||
    request.nextUrl.pathname.startsWith("/pickup-lines")
  ) {
    if (!data.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login"],
};
