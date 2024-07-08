import cookieCutter from "cookie-cutter";

export async function deleteUserData() {
  const jwtCookie = cookieCutter.get("jwt");

  const response = await fetch(`${process.env.BASEURL}/user/currentUser`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookie}`,
    },
  })
    .then((response) => response.json())

  return response;
}
