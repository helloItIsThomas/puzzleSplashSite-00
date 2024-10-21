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
