export { default } from "next-auth/middleware" 


export const config = { matcher: ["/project", '/stickynote', '/profile','/project/:path*'] }