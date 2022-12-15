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

function saveData(event) {
  event.preventDefault();

  const appointment = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    time: event.target.time.value,
    date: event.target.date.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/a65c3d8a11d341d5a89a225e951192bf/appointments",
      appointment
    )
    .then((res) => {
      console.log(res);
      alert("User Added successfully.");
    })
    .catch((err) => alert(err));
}

function getData() {
  const users = document.getElementById("users");

  axios
    .get(
      "https://crudcrud.com/api/a65c3d8a11d341d5a89a225e951192bf/appointments"
    )
    .then((res) => {
      let data = "";
      for (let obj of res.data) {
        data += `<div class="card" style="margin: 0% 30%">
          <div class="card-body">
            ${obj.name}
          </div>
        </div>`;
      }
      users.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
      users.innerHTML = `<div class="card" style="margin: 0% 30%">
  <div class="card-body">
    ${err.response}
  </div>
</div>`;
    });
}
//calling existing data if any
getData();

// const btn1 = document.querySelector(".btn");
// btn1.addEventListener("mouseout", (event) => {
//   event.preventDefault();
//   btn1.style.color = "pink";
// });
