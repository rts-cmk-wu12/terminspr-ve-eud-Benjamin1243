import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function  middleware(request) {

    const cookieStore = await cookies()
    //guard clause igen
    if(cookieStore.has("token")){
        return
    }
  return NextResponse.redirect(new URL('/login', request.url))
}
 
export const config = {
  matcher: '/kalender/:path*',}