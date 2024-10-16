const $form = document.getElementsByTagName("form")[0];
const baseUrl = "http://127.0.0.1:8000";

$form.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
// axios.post(baseUrl + "/signup",{ username:username, email:email, password:password })
// .then(res=>console.log(res))
// .catch(e=>console.log(e))
  fetch(baseUrl + "/signup", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ username:username, email:email, password:password }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch(e=>console.log(e.message))
});
