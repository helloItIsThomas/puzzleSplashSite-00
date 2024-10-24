import { GV } from "/scripts/globalVars";
import { handleRotation } from "/scripts/interact";

export const toRadians = (degrees) => degrees * (Math.PI / 180);

GV.renderer.domElement.addEventListener("mousedown", function (e) {
  GV.isDragging = true;
  GV.previousMousePosition = { x: e.offsetX, y: e.offsetY };
});

GV.renderer.domElement.addEventListener("mousemove", function (e) {
  handleRotation(e);
});

GV.renderer.domElement.addEventListener("mouseup", function () {
  GV.isDragging = false;
});

GV.renderer.domElement.addEventListener("mouseleave", function () {
  GV.isDragging = false;
});

// Add touch event listeners
GV.renderer.domElement.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Prevent default scrolling
  GV.isDragging = true;
  const touch = e.touches[0];
  GV.previousMousePosition = { x: touch.pageX, y: touch.pageY };
});

GV.renderer.domElement.addEventListener("touchmove", function (e) {
  e.preventDefault(); // Prevent default scrolling
  const touch = e.touches[0];
  const touchEvent = {
    offsetX: touch.pageX,
    offsetY: touch.pageY,
  };
  handleRotation(touchEvent);
});

GV.renderer.domElement.addEventListener("touchend", function () {
  GV.isDragging = false;
});
