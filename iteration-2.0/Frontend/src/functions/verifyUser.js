export async function verifyUser(email, name) {
    const response = await fetch("http://127.0.0.1:8000/api/v1/user", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    console.log(response)
  
    const userData = response.data.user;
  
    return userData
  }