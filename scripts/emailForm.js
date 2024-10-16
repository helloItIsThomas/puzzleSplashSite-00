import emailJs from "@emailjs/browser";

document.getElementById("tutorialForm").addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit(e);
});

function handleSubmit(e) {
  const form = {
    FirstName: e.target.fName.value,
    LastName: e.target.lName.value,
    Email: e.target.email.value,
    Message: e.target.message.value,
  };
  console.log(form);

  const serviceID = "string";
  const templateID = "string";
  const publicKey = "String";

  emailJs
    .send(serviceID, templateID, form, publicKey)
    .then((res) => {
      return res;
    })
    .then((data) => {
      console.log(data);
      if (data.status < 299) {
        console.log("SUCCESS");

        e.target.fName.value = "";
        e.target.lName.value = "";
        e.target.email.value = "";
        e.target.message.value = "";
      }
    })
    .catch((error) => {
      console.log("ERROR: " + JSON.stringify(error));
    });
}
