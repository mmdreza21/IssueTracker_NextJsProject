export { default } from "next-auth/middleware" // for redirect

export const config = {
    matcher: [
        "/issues/new",
        "/issues/:id/edit"
    ]
}