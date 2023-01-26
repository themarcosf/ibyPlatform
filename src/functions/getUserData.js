import cookieCutter from "cookie-cutter";

export async function getUserData() {
  const jwtCookie = cookieCutter.get("jwt");

  const response = await fetch(`https://enigmatic-cove-57254.herokuapp.com/api/v1/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookie}`,
    },
  }).then((response) => response.json());

  const userData = response.data._document;

  return userData;
}
