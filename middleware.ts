"use server"
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function clearAllCookies() {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();

    const response = NextResponse.next();

    allCookies.forEach((cookie) => {
        response.cookies.set(cookie.name, "", {
            path: "/",
            maxAge: 0,
        });
    });
}

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path === '/api/auth/error') {
        await clearAllCookies();
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    return NextResponse.next();
}
