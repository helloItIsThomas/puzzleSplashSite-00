export function checkSubmit() {
  document
    .getElementById("formFields")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("SUBMITTED");
      submitAnim();
    });
}

function submitAnim() {
  console.log("anim start");
}
