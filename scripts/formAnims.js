import gsap from "gsap";

let formTl, formCloseTl;

export const formState = {
  isClosed: true,
};

formTl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.inOut", duration: 0.1 },
});
formCloseTl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.inOut", duration: 0.1 },
});

export function prepareTimeline() {
  console.log("running prepare timeline");
  const isMobile = window.innerWidth <= 600;

  formTl
    .to("#closeButton", {
      width: 50,
      height: 50,
      left: 0,
      onComplete: handleComplete,
    })
    .to("#socialsGroup", {
      display: "flex",
      opacity: 1,
    })
    .to("#mailForm", {
      width: isMobile ? "calc(100% - 40px)" : "600px",
      height: "90%",
      margin: "20px",
      borderRadius: "0px",
      backgroundColor: "#ffebe4",
      duration: 0.5,
      onComplete: () => {
        console.log("formTl played");
      },
    });

  formCloseTl
    .to("#closeButton", {
      width: "200px",
      height: "50px",
      left: "40px",
      onComplete: handleComplete,
    })
    .to("#socialsGroup", {
      display: "none",
      opacity: 0,
    })
    .to("#mailForm", {
      // width: isMobile ? "100%" : "600px",
      width: "100%",
      height: "10%",
      margin: 0,
      borderRadius: "50px",
      backgroundColor: "transparent",
      duration: 0.5,
      onComplete: () => {
        console.log("formCloseTl played");
      },
    });

  function handleComplete() {
    const closeButton = document.getElementById("closeButton");
    if (formState.isClosed) {
      closeButton.innerHTML = "Contact";
      gsap.set("#mailForm", { pointerEvents: "none" });
      gsap.set("#closeButton", { pointerEvents: "all" });
      gsap.to("#mailForm", { scrollTop: 0, duration: 0.5 });
      gsap.set("#mailForm", { overflow: "hidden" });
    } else {
      closeButton.innerHTML =
        '<img src="x.svg" alt="close icon" height="50%" width="auto" style="color:green;" />';
      gsap.set("#mailForm", { pointerEvents: "all" });
      gsap.set("#mailForm", { overflow: "scroll" });
    }
  }
}

window.addEventListener("load", () => {
  randomizeText("copyright", "© STUDIO PUZZLE 2024", 1, 100);
  randomizeText("closeButton", "Contact", 1, 100);
});

export function formToggle() {
  if (formState.isClosed) {
    formTl.restart();
  } else {
    formCloseTl.restart();
  }

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
