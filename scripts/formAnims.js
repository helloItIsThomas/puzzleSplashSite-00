import gsap from "gsap";

let formTl;

export const formState = {
  isClosed: true,
};

formTl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.out" },
});

function handleComplete() {
  console.log("FormState: " + formState.isClosed);
  if (formState.isClosed) {
    console.log("X");
    randomizeText("closeButton", "Contact", 1, 50);
  } else {
    console.log("CONTACT");
    randomizeText("closeButton", "X", 1, 50);
  }
}

window.addEventListener("load", () => {
  randomizeText("copyright", "© STUDIO PUZZLE 2024", 1, 50);

  formTl
    .to("#mailForm", {
      borderRadius: "0px",
      duration: 0.5,
      height: "90%",
      backgroundColor: "#ffebe4",
    })
    .to("#closeButton", {
      width: 50,
      height: 50,
      onComplete: handleComplete,
      onReverseComplete: handleComplete,
    })
    .to("#socialsGroup", {
      display: "flex",
      opacity: 1,
    });
});

export function formToggle() {
  if (formState.isClosed) formTl.play();
  else formTl.reverse();

  formState.isClosed = !formState.isClosed;
  console.log(formState.isClosed);
}

export function randomizeText(
  elementId,
  finalText,
  duration = 1,
  interval = 50
) {
  const element = document.getElementById(elementId);
  const characters = "°•_-*";
  let iterations = Math.floor((duration * 1000) / interval);
  let currentIteration = 0;

  const randomize = setInterval(() => {
    // Generate sequential string of the same length as the final text
    element.innerHTML = finalText
      .split("")
      .map((_, i) => {
        let index = (currentIteration + i) % characters.length; // Sequentially pick characters
        return characters[index];
      })
      .join("");

    currentIteration++;

    // When the number of iterations is complete, set the final text
    if (currentIteration >= iterations) {
      clearInterval(randomize);
      element.innerHTML = finalText; // Set the final resolved text
    }
  }, interval);
}

export function animateText(
  elementId,
  targetWord,
  duration = 1,
  interval = 100
) {
  const element = document.getElementById(elementId);
  const characters = targetWord.split("");
  let iterations = Math.floor((duration * 1000) / interval);
  let currentIteration = 0;

  const animate = setInterval(() => {
    // Swap letters with their neighbor, including the first letter
    const firstChar = characters.shift(); // Remove the first character
    characters.push(firstChar); // Add it to the end of the array

    element.innerHTML = characters.join("");

    currentIteration++;

    // When the number of iterations is complete, clear the interval
    if (currentIteration >= iterations) {
      clearInterval(animate);
      element.innerHTML = targetWord; // Set the final resolved text
    }
  }, interval);
}
