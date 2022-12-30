export async function getUserData(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/v1/user/${id}`).then(
    (response) => response.json()
  );

  const userData = response.data.user;

  return userData;
}
