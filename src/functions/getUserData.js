import cookieCutter from "cookie-cutter";

export async function getUserData() {
  const jwtCookie = cookieCutter.get("jwt");

  const response = await fetch(`${process.env.BASEURL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookie}`,
    },
  }).then((response) => response.json());

  const userData = response.data._document;

  return userData;
}
