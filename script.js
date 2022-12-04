// function printForm(event) {
//   event.preventDefault();
//   for (ele of event.target) {
//     if (ele.type != "submit") {
//       console.log(ele.id + " is " + ele.value);
//     }
//   }
// }

let btn = document.querySelector(".btn");
btn.addEventListener("mouseover", () => btn.style.backgroundColor = "red");


document.querySelector(".btn").addEventListener("mouseout", function () {
  this.style.backgroundColor = "green";
});
// const btn1 = document.querySelector(".btn");
// btn1.addEventListener("mouseout", (event) => {
//   event.preventDefault();
//   btn1.style.color = "pink";
// });
