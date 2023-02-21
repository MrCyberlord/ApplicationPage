let form = document.getElementById("my-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let users = document.getElementById("users");
const endpointId = "28554357ecae45359ea888f37169595e";
const serverLink = `https://crudcrud.com/api/${endpointId}/user`;

axios(serverLink)
  .then((res) => {
    const userJSON = res.data;
    for (let i = 0; i < userJSON.length; i++) {
      userDisplay(userJSON[i]);
    }
  })
  .catch((err) => console.log(err));

let delBtn = document.getElementsByClassName("del");
let editBtn = document.getElementsByClassName("edit");

for (let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener("click", deleteLi);
  editBtn[i].addEventListener("click", editLi);
}
form.addEventListener("submit", submitFn);

function deleteLi(e) {
  const user = e.path[1];
  axios
    .delete(`${serverLink}/${user.id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  e.path[1].remove();
}

function editLi(e) {
  email.value = e.path[1].textContent.slice(0, -5).split(" : ")[1];
  name.value = e.path[1].textContent.slice(0, -5).split(" : ")[0];
  deleteLi(e);
}

function submitFn(e) {
  e.preventDefault();
  let user = {
    name: name.value,
    email: email.value,
  };
  userDisplay(user);

  axios
    .post(serverLink, user)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  name.value = "";
  email.value = "";
}

function userDisplay(user) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`${user.name} : ${user.email}`));
  li.appendChild(document.createTextNode(`${user.name} : ${user.email}`));
  li.setAttribute("id", user._id);
  let delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("del");
  li.appendChild(delBtn);
  delBtn.addEventListener("click", deleteLi);
  let editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit");
  li.appendChild(editBtn);
  editBtn.addEventListener("click", editLi);
  users.appendChild(li);
}
