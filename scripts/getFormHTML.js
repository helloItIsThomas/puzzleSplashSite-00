import { listenToForm } from "./emailForm.js";
import { prepareTimeline } from "/scripts/formAnims";

fetch("/html/form.html")
  .then((response) => response.text())
  .then((data) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;
    let divToMove = tempDiv.querySelector("#mailForm");
    document.getElementById("myForm").appendChild(divToMove);
  })
  .then((data) => {
    listenToForm();
    prepareTimeline();
    const form = document.querySelector("#mailForm");
    form.scrollTo(0, 0);
  });
