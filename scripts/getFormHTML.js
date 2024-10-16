import { checkSubmit } from "./submitAnim";

fetch("/html/form.html")
  .then((response) => response.text())
  .then((data) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;
    let divToMove = tempDiv.querySelector("#mailForm");
    document.getElementById("myForm").appendChild(divToMove);
  })
  .then((data) => {
    checkSubmit();
  });
