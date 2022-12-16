// function printForm(event) {
//   event.preventDefault();
//   for (ele of event.target) {
//     if (ele.type != "submit") {
//       console.log(ele.id + " is " + ele.value);
//     }
//   }
// }

// let btn = document.querySelector(".btn");
// btn.addEventListener("mouseover", () => (btn.style.backgroundColor = "red"));

// document.querySelector(".btn").addEventListener("mouseout", function () {
//   this.style.backgroundColor = "green";
// });
var itemList = document.getElementById("users");
itemList.addEventListener("click", removeItem);

var users_data = [];

function saveData(event) {
  event.preventDefault();

  const appointment = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    time: event.target.time.value,
    date: event.target.date.value,
  };

  let method = document
    .getElementById("submitBtn")
    .classList.value.includes("edit")
    ? "patch"
    : "post";

  axios({
    method: method,
    url: "https://crudcrud.com/api/a65c3d8a11d341d5a89a225e951192bf/appointments",
    data: appointment,
  })
    .then((res) => {
      alert("User Added/Updated successfully.");

      if (method == "patch"){
        document.getElementById("submitBtn").classList.remove("edit");
      }
    })
    .catch((err) => alert(err));
  //   axios
  //     .post(
  //       "https://crudcrud.com/api/a65c3d8a11d341d5a89a225e951192bf/appointments",
  //       appointment
  //     )
  //     .then((res) => {
  //       alert("User Added successfully.");
  //     })
  //     .catch((err) => alert(err));
}

function getData() {
  const users = document.getElementById("users");

  axios
    .get("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then((res) => {
      users_data = res.data;
      console.log(users_data);
      let data = "";
      for (let obj of res.data) {
        data += `<div class="card" style="margin: 0% 30%">
          <div class="card-body">
            ${obj.name} <button id="${obj.id}" class="btn edit badge rounded-pill text-bg-success">Edit</button>
<button id="${obj.id}" class="btn delete badge rounded-pill text-bg-danger">Delete</button>
          </div>
        </div>`;
      }
      users.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
      users.innerHTML = `<div class="card" style="margin: 0% 30%">
  <div class="card-body">
    ${err.message} | ${err.code}
  </div>
</div>`;
    });
}
//calling existing data if any
getData();

function removeItem(event) {
  //delete expense
  if (event.target.classList.contains("delete")) {
    let delete_id = event.target.id;
    users_data.splice(parseInt(delete_id) - 1, parseInt(delete_id) - 1);
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + delete_id)
      .then((res) => {
        let parentDiv = event.target.parentElement.parentElement;
        itemList.removeChild(parentDiv);
        alert("User Deleted Successfully");
      })
      .catch((err) => alert(`Error: ${err.message} occurred.`));
  }
  //edit expense
  if (event.target.classList.contains("edit")) {
    let delete_node = event.target.parentElement.parentElement;

    let edit_id = event.target.id;

    let values = users_data[parseInt(edit_id) - 1];
    users_data.splice(parseInt(edit_id) - 1, parseInt(edit_id) - 1);
    const save_btn = document.getElementById("submitBtn");
    save_btn.classList.add("edit");

    itemList.removeChild(delete_node);
    document.getElementById("name").value = values.name;
    document.getElementById("email").value = values.email;
    document.getElementById("phone").value = values.phone;
  }
}
