import gsap from "gsap";

let tl;

export function submitAnim() {
  tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power3.out" },
  });

  tl.to(["a"], { display: "none", opacity: 0, duration: 0.2 }, 0.05) // Combine "a" animations
    .to("#mailForm", { height: 1, duration: 0.8 }, 0.35)
    .to("#mailForm", { minHeight: 20, paddingTop: 0, duration: 0.8 }, 0.55) // Combine minHeight and paddingTop
    .to("#mailForm", { padding: 0, width: "5%", duration: 0.2 }, 1.1)
    .to(
      "#closeButton",
      {
        width: "100%",
        borderRadius: "1000000px",
        duration: 0.2,
        onComplete: () => {
          document.getElementById("closeButton").innerHTML = "Contact";
        },
      },
      1.1
    );

  console.log("anim start");
  tl.play();
}

export function closeAnim() {
  if (tl) {
    document.getElementById("closeButton").innerHTML = "X";
    console.log("anim reverse");
    tl.reverse();
  }
}
