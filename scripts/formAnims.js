import gsap from "gsap";

let tl;

export const formState = {
  isClosed: true,
};

tl = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.out" },
});

window.addEventListener("load", () => {
  randomizeText("copyright", "© STUDIO PUZZLE 2024", 1, 50);
});

export function openAnim() {
  randomizeText("closeButton", "X", 1, 50);
  randomizeText("insta", "INSTAGRAM", 1, 50);
  randomizeText("linkedin", "LINKEDIN", 1, 50);
  randomizeText("sendButton", "Send", 1, 50);

  tl.to(["a"], { display: "block", opacity: 1, duration: 0.2 }, 0.5)
    .to("#mailForm", { padding: 10, height: "80%", duration: 0.8 }, 0.35)
    .to("#mailForm", { minHeight: 250, paddingTop: 15, duration: 0.8 }, 0.55)
    .to("#mailForm", { maxHeight: 800, duration: 0.5 }, 0.35)
    .to(
      "#closeButton",
      {
        // width: "clamp(20px, 2.5vw, 3.5vw)",
        width: "20px",
        borderRadius: "100%",
        duration: 0.2,
      },
      0.1
    );

  if (tl) {
    tl.play();
    formState.isClosed = false;
  }
}

export function closeAnim() {
  if (tl) {
    tl.reverse().then(() => {
      randomizeText("closeButton", "Contact", 1, 50);
      formState.isClosed = true;
    });

    formState.isClosed = true;
  }
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
