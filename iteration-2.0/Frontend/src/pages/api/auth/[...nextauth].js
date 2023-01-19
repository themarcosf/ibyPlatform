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
        })
      ],
      callbacks: {
        async jwt({ token, user, account }) {
          // let myHeader
    
          if (account) {
            console.log('token')
            console.log(account.access_token)
            const response = await fetch(
              "http://127.0.0.1:8000/api/v1/user/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${account.access_token}`,
                },
              }
              )
              const cookies = response.headers.get('set-cookie')
              
            console.log('cookie')
            console.log(cookies)

            res.setHeader('Set-Cookie', cookies, {
              httpOnly: false
            })

          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account }) {
        console.log(account);
        if (account) {
          const response = await fetch(
            "http://127.0.0.1:8000/api/v1/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );
          const cookies = response.headers.get("set-cookie");

          res.setHeader("Set-Cookie", cookies, {
            httpOnly: false,
          });
        }
      },
  }
}

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
