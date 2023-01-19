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
      async jwt({ token, user, account }) {
        // if (token) console.log("1");
        // if (user) console.log("2");
        // if (account) console.log("3");

        if (account) {
          const cookies = await fetch(
            "http://127.0.0.1:8000/api/v1/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          ).then((res) => res.headers.get("set-cookie"));

          console.log(account.access_token);

          // const cookies = response.headers.get('set-cookie')

          res.setHeader("Set-Cookie", cookies, {
            httpOnly: false,
          });
        }
      },
    },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
