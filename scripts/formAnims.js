import gsap from "gsap";
import { setMailFormW } from "./scene.js";
import { randomizeText, animateText } from "./textAnims.js";

let mm = gsap.matchMedia();
let formTl, formCloseTl;

export const formState = {
  isClosed: true,
};

export function prepareTimeline() {
  console.log("PREP TIMELINE RUN");
  formTl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.inOut", duration: 0.1 },
  });
  formCloseTl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.inOut", duration: 0.1 },
  });

  mm.add(
    {
      paused: true,
      isMobile: "(max-width: 600px)",
      isDesktop: "(min-width: 601px)",
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;
      console.log("isMobile: " + isMobile);
      formTl
        .to("#closeButton", {
          width: 50,
          onComplete: handleComplete,
          onReverseComplete: handleComplete,
        })
        .to("#socialsGroup", {
          display: "flex",
          opacity: 1,
        })
        .to("#mailForm", {
          height: isMobile ? "100%" : "calc(100% - 60px)",
          backgroundColor: "#ffebe4",
          duration: 0.5,
          onComplete: () => {
            console.log("formTl played");
          },
        });

      formCloseTl
        .to("#closeButton", {
          width: "200px",
          onComplete: handleComplete,
          onReverseComplete: handleComplete,
        })
        .to("#socialsGroup", {
          display: "none",
          opacity: 0,
        })
        .to("#mailForm", {
          height: "10%",
          backgroundColor: "transparent",
          duration: 0.5,
          onComplete: () => {
            console.log("formCloseTl played");
          },
        });
    }
  );

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
    formState.isClosed = !formState.isClosed;
    setMailFormW();
    formTl.play();
  } else {
    formState.isClosed = !formState.isClosed;
    formTl.reverse();
    // formCloseTl.restart();
  }
}
