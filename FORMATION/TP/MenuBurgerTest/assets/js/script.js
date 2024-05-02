function menuPop() {
  console.log("menuPop has been called");
  let x = document.getElementById("navMenu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function menuClose() {
  console.log("menuClose has been called");
  let x = document.getElementsByClassName("topNav");
  console.log(x);
  if (x[0].style.display === "block") {
    x[0].style.display = "none";
  }
}
console.log("Debug Console work as intended");