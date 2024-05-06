// const form = document.querySelector("#main_form");

// async function sendData() {
//   // Associate the FormData object with the form element
//   const formData = new FormData(form);

//   try {
//     const response = await fetch("../index.html", {
//       method: "POST",
//       // Set the FormData instance as the request body
//       body: formData,
//     });
//     console.log(await response.json());
//   } catch (e) {
//     console.error(e);
//   }
//   updateAgeCalculated();
// }

// // Take over form submission
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   sendData();
// });

const event = new Event("submit");

let form = document.getElementById("main_form");

form.addEventListener("submit", (e) => { e.preventDefault(); });


function currentDateFormating() {
    const currentDate = new Date().toDateString();//recup current date
    console.log(currentDate);
    let currentDateArray = [];
    currentDateArray = currentDate.split(' ');
    currentDateArray.shift();
    console.log(`Date array : ${currentDateArray}`);

    return currentDateArray;
};


function updateAgeCalculated() {
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let currentDateFormated = currentDateFormating();

    let ageYears = currentDateFormated[0] - year;
    let agemonths = currentDateFormated[1] - month;
    let ageDays = currentDateFormated[2] - day;
    console.log(ageYears + "annee Debug");

    if (day.value == "" || month.value == "" || year.value == "") {
        console.log("No input !");

    } else {

    }
    try {
        form.dispatchEvent(event);
    } catch (e) {
        console.error(e);
    }
};