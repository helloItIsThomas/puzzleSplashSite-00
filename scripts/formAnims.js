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
  if (formState.isClosed) {
    document.getElementById("closeButton").innerHTML = "Contact";

    gsap.to("#mailForm", { pointerEvents: "none" });
    gsap.to("#closeButton", { pointerEvents: "all" });

    gsap.to("#mailForm", { scrollTop: 0, duration: 0.5 });
    gsap.set("#mailForm", { overflow: "hidden" });
  } else {
    document.getElementById("closeButton").innerHTML = "";
    document.getElementById("closeButton").innerHTML =
      '<img src="x.svg" alt="close icon" height="50%" width="auto" style="color:green;" />';

    gsap.to("#mailForm", { pointerEvents: "all" });
    gsap.set("#mailForm", { overflow: "scroll" });
  }
}

export function prepareTimeline() {
  const isMobile = window.innerWidth <= 600;
  console.log(isMobile);

  formTl
    .to("#closeButton", {
      width: 50,
      height: 50,
      left: 0,
      onComplete: handleComplete,
      onReverseComplete: handleComplete,
    })
    .to("#socialsGroup", {
      display: "flex",
      opacity: 1,
    })
    .to("#mailForm", {
      width: isMobile ? "calc(100% - 40px)" : "600px",
      margin: "20px",
      borderRadius: "0px",
      duration: 0.5,
      height: "90%",
      backgroundColor: "#ffebe4",
    });
}

window.addEventListener("load", () => {
  randomizeText("copyright", "© STUDIO PUZZLE 2024", 1, 100);
});

export function formToggle() {
  if (formState.isClosed) formTl.play();
  else formTl.reverse();

  formState.isClosed = !formState.isClosed;
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
