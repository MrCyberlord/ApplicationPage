let form = document.getElementById("my-form");
let name = document.getElementById("name");
let email = document.getElementById("email");

localStorage.setItem("name", "");
localStorage.setItem("email", "");

form.addEventListener("submit", submitFn);

function submitFn(e) {
  e.preventDefault();
  if (localStorage.getItem("name") == "") {
    localStorage.setItem("name", name.value);
  } else {
    localStorage.setItem(
      "name",
      localStorage.getItem("name") + ", " + name.value
    );
  }
  if (localStorage.getItem("email") == "") {
    localStorage.setItem("email", email.value);
  } else {
    localStorage.setItem(
      "email",
      localStorage.getItem("email") + ", " + email.value
    );
  }
  name.value = "";
  email.value = "";
}
