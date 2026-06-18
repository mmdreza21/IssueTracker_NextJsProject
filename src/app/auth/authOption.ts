
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { mailtrap } from "@/lib/mail";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        EmailProvider({
            async sendVerificationRequest({
                identifier,
                url,
            }) {
                await mailtrap.send({
                    from: {
                        email: "hello@demomailtrap.co",
                        name: "Issue Tracker",
                    },
                    to: [{ email: identifier }],
                    subject: "Sign in to Issue Tracker",
                    text: `Click the link to sign in: ${url}`,
                    html: `
            <h2>Sign in</h2>
            <p>Click below to sign in:</p>
            <a href="${url}">${url}</a>
          `,
                });
            },
        }),
    ],

};