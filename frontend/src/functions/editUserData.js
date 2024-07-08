import cookieCutter from "cookie-cutter";

export async function editUserData(dataEdited) {
  const jwtCookie = cookieCutter.get("jwt");

  const response = await fetch(`${process.env.BASEURL}/user/currentUser`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtCookie}`,
    },
    body: JSON.stringify(dataEdited),
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("userData", JSON.stringify(json.data));
    })

  return response;
}
