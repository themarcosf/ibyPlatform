import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account) {
          const cookies = await fetch(
            `${process.env.BASEURL}/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          ).then((res) => res.headers.get("set-cookie"));

          res.setHeader("Set-Cookie", cookies, {
            httpOnly: false,
          });
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
