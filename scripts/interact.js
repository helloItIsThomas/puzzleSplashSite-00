import { GV } from "/scripts/globalVars";
import { Quaternion, Euler } from "three";
import { toRadians } from "./utils";

// Declare rotation velocity in a higher scope
GV.rotationVelocity = { x: 0, y: 0 };

export function handleRotation(e) {
  var dampingFactor = 0.5;

  if (GV.isDragging) {
    var deltaMove = {
      x: (e.offsetX - GV.previousMousePosition.x) * dampingFactor,
      y: (e.offsetY - GV.previousMousePosition.y) * dampingFactor,
    };

    // Apply rotation immediately
    var deltaRotationQuaternion = new Quaternion().setFromEuler(
      new Euler(toRadians(deltaMove.y), toRadians(deltaMove.x), 0, "XYZ")
    );

    GV.loadedObject.quaternion.multiplyQuaternions(
      deltaRotationQuaternion,
      GV.loadedObject.quaternion
    );

    // Update rotation velocity for deceleration
    GV.rotationVelocity.x = deltaMove.x;
    GV.rotationVelocity.y = deltaMove.y;

    GV.previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };
  }
}
