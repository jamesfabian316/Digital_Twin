import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

// If using public folder:
const MODEL_URL = "./models/model.glb";

// If you put model in src/assets, use:
// import cityUrl from './assets/city.glb?url'
// const MODEL_URL = cityUrl

// optional: preload the model to improve UX
useGLTF.preload(MODEL_URL);

export default function CityModel(props, ref) {
  const group = useRef();
  const gltf = useGLTF(MODEL_URL);
  const { camera } = useThree();

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Create raycaster and pointer vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Get canvas size and position
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();

    // Calculate normalized mouse coordinates
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check intersections with the model
    const intersects = raycaster.intersectObject(group.current, true);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const point = hit.point;

      // Call the onBuildingRightClick callback with the intersection point
      if (props.onBuildingRightClick) {
        props.onBuildingRightClick({
          position: [point.x, point.y, point.z],
          object: hit.object,
          screenPosition: { x: event.clientX, y: event.clientY },
        });
      }
    }
  };

  // Attach context menu listener to the canvas
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("contextmenu", handleContextMenu);
      return () => {
        canvas.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [camera]);

  // tweak scale/position if model looks tiny or huge
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={gltf.scene} scale={0.001} position={[0, 0, 0]} />
    </group>
  );
}
