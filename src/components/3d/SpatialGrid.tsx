// "use client";

// import { useRef, useMemo, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function SpatialGrid() {
//   const groupRef = useRef<THREE.Group>(null);
//   const particlesRef = useRef<THREE.Points>(null);

//   // Global trackers for mouse position and click state
//   const mouse = useRef({ x: 0, y: 0 });
//   const isMouseDown = useRef(false);

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };

//     // Yahan humne smart click filtering add kar di hai
//     const handleMouseDown = (event: MouseEvent | TouchEvent) => {
//       const target = event.target as HTMLElement;

//       // Agar click panel, button, image, ya link ke andar hua hai -> Ignore it!
//       if (target.closest('.glass-panel, button, a, img')) {
//         return;
//       }

//       isMouseDown.current = true;
//     };

//     const handleMouseUp = () => (isMouseDown.current = false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mousedown", handleMouseDown);
//     window.addEventListener("mouseup", handleMouseUp);
//     window.addEventListener("touchstart", handleMouseDown);
//     window.addEventListener("touchend", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mousedown", handleMouseDown);
//       window.removeEventListener("mouseup", handleMouseUp);
//       window.removeEventListener("touchstart", handleMouseDown);
//       window.removeEventListener("touchend", handleMouseUp);
//     };
//   }, []);
//   const particleCount = 2000; // Adjusted for smooth 60fps physics

//   // We need two arrays now: one for current positions, one to remember where they belong
//   const { positions, originalPositions } = useMemo(() => {
//     const pos = new Float32Array(particleCount * 3);
//     const origPos = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount; i++) {
//       const x = (Math.random() - 0.5) * 40;
//       const y = (Math.random() - 0.5) * 40;
//       const z = (Math.random() - 0.5) * 40;

//       pos[i * 3] = x;
//       pos[i * 3 + 1] = y;
//       pos[i * 3 + 2] = z;

//       origPos[i * 3] = x;
//       origPos[i * 3 + 1] = y;
//       origPos[i * 3 + 2] = z;
//     }
//     return { positions: pos, originalPositions: origPos };
//   }, []);

//   useFrame((state, delta) => {
//     if (!groupRef.current || !particlesRef.current) return;

//     // 1. Map 2D mouse to 3D space limits (roughly where the cursor is on the Z=0 plane)
//     const targetX3D = mouse.current.x * 15;
//     const targetY3D = mouse.current.y * 15;

//     // 2. The Physics Engine Loop
//     const positionsAttribute =
//       particlesRef.current.geometry.attributes.position;
//     const posArray = positionsAttribute.array as Float32Array;

//     for (let i = 0; i < particleCount; i++) {
//       const i3 = i * 3;

//       let targetX = originalPositions[i3];
//       let targetY = originalPositions[i3 + 1];
//       let targetZ = originalPositions[i3 + 2];

//       if (isMouseDown.current) {
//         // ACCUMULATE: Pull particles tightly towards the mouse cursor
//         // Add a tiny bit of random noise so they form a "swarm" instead of a single dot
//         targetX = targetX3D + (Math.random() - 0.5) * 2;
//         targetY = targetY3D + (Math.random() - 0.5) * 2;
//         targetZ = 0 + (Math.random() - 0.5) * 2;
//       } else {
//         // SCATTER: Add a subtle floating wave effect to their original resting positions
//         const time = state.clock.elapsedTime;
//         targetX += Math.sin(time * 0.5 + i) * 0.5;
//         targetY += Math.cos(time * 0.3 + i) * 0.5;
//       }

//       // Smoothly interpolate current position toward the target position (Easing)
//       const speed = isMouseDown.current ? 0.08 : 0.03; // Faster snap in, slower float back
//       posArray[i3] += (targetX - posArray[i3]) * speed;
//       posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * speed;
//       posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * speed;
//     }

//     // Tell Three.js the positions have updated so it renders the new frame
//     positionsAttribute.needsUpdate = true;

//     // 3. Keep the overall subtle environment tilt from before
//     const envTargetX = mouse.current.x * Math.PI * 0.05;
//     const envTargetY = mouse.current.y * Math.PI * 0.05;
//     groupRef.current.rotation.y +=
//       (envTargetX - groupRef.current.rotation.y) * 0.05;
//     groupRef.current.rotation.x +=
//       (envTargetY - groupRef.current.rotation.x) * 0.05;
//   });

//   return (
//     <group ref={groupRef}>
//       <points ref={particlesRef}>
//         <bufferGeometry>
//           <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//         </bufferGeometry>
//         {/* Premium glowing dot styling */}
//         <pointsMaterial
//           size={0.1}
//           color="#06b6d4"
//           transparent
//           opacity={0.8}
//           sizeAttenuation
//           blending={THREE.AdditiveBlending} // Gives a light-saber style glow when they clump together
//         />
//       </points>
//       <fog attach="fog" args={["#030303", 5, 30]} />
//     </group>
//   );
// }

"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpatialGrid() {
  const particleGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const fountainRef = useRef<THREE.Points>(null); // Naya ref Fountain particles ke liye

  const mouse = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".glass-panel, button, a, img")) return;
      isMouseDown.current = true;
    };

    const handleMouseUp = () => (isMouseDown.current = false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const bgParticleCount = 2000;
  const fountainCount = 600; // Stick se nikalne wale particles

  // Background Particles Setup
  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(bgParticleCount * 3);
    const origPos = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }
    return { positions: pos, originalPositions: origPos };
  }, []);

  // Fountain Particles Setup (Stick se nikalne wale)
  const { fPositions, fVelocities } = useMemo(() => {
    const pos = new Float32Array(fountainCount * 3);
    const vel = new Float32Array(fountainCount * 3);

    for (let i = 0; i < fountainCount; i++) {
      // Start randomly along the Y axis up from the tip
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = 5 + Math.random() * 15; // 5 is the tip height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      // Upward speed and outward spread
      vel[i * 3] = (Math.random() - 0.5) * 0.04; // X spread
      vel[i * 3 + 1] = 0.04 + Math.random() * 0.06; // Y speed (Upwards)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04; // Z spread
    }
    return { fPositions: pos, fVelocities: vel };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // --- 1. FOUNTAIN PARTICLES (Emitting from Stick) ---
    if (fountainRef.current) {
      const fPosAttr = fountainRef.current.geometry.attributes.position;
      const fPosArr = fPosAttr.array as Float32Array;

      for (let i = 0; i < fountainCount; i++) {
        const i3 = i * 3;

        // Move upwards and spread
        fPosArr[i3] += fVelocities[i3];
        fPosArr[i3 + 1] += fVelocities[i3 + 1];
        fPosArr[i3 + 2] += fVelocities[i3 + 2];

        // Magical swirl effect using sine waves
        fPosArr[i3] += Math.sin(time * 2 + i) * 0.01;
        fPosArr[i3 + 2] += Math.cos(time * 2 + i) * 0.01;

        // Jab particle bahut upar (Y > 20) chala jaye, to usko wapas stick ki tip (Y = 5) par le aao
        if (fPosArr[i3 + 1] > 20) {
          fPosArr[i3] = (Math.random() - 0.5) * 0.2; // Wapas patla kardo base par
          fPosArr[i3 + 1] = 5;
          fPosArr[i3 + 2] = (Math.random() - 0.5) * 0.2;
        }
      }
      fPosAttr.needsUpdate = true;
    }

    // --- 2. BACKGROUND PARTICLES PHYSICS & TILT ---
    if (!particleGroupRef.current || !particlesRef.current) return;

    const targetX = mouse.current.x * Math.PI * 0.15;
    const targetY = mouse.current.y * Math.PI * 0.15;

    particleGroupRef.current.rotation.y += (targetX - particleGroupRef.current.rotation.y) * 0.05;
    particleGroupRef.current.rotation.x += (-targetY - particleGroupRef.current.rotation.x) * 0.05;

    const positionsAttribute = particlesRef.current.geometry.attributes.position;
    const posArray = positionsAttribute.array as Float32Array;

    const targetX3D = mouse.current.x * 15;
    const targetY3D = mouse.current.y * 15;

    for (let i = 0; i < bgParticleCount; i++) {
      const i3 = i * 3;

      let pTargetX = originalPositions[i3];
      let pTargetY = originalPositions[i3 + 1];
      let pTargetZ = originalPositions[i3 + 2];

      if (isMouseDown.current) {
        // Accumulate on click
        pTargetX = targetX3D + (Math.random() - 0.5) * 2;
        pTargetY = targetY3D + (Math.random() - 0.5) * 2;
        pTargetZ = 0 + (Math.random() - 0.5) * 2;
      } else {
        // Float normally
        pTargetX += Math.sin(time * 0.5 + i) * 0.5;
        pTargetY += Math.cos(time * 0.3 + i) * 0.5;
      }

      const speed = isMouseDown.current ? 0.08 : 0.03;
      posArray[i3] += (pTargetX - posArray[i3]) * speed;
      posArray[i3 + 1] += (pTargetY - posArray[i3 + 1]) * speed;
      posArray[i3 + 2] += (pTargetZ - posArray[i3 + 2]) * speed;
    }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <group>
      {/* 1. THE STATIC WAND (No solid beams, only the stick) */}
      <group position={[0, -4, -2]}>
        {/* Wand Handle */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 3, 32]} />
          <meshStandardMaterial
            color="#0f172a" // Darker metallic look
            roughness={0.7}
            metalness={0.4}
          />
        </mesh>

        {/* Wand Shaft */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.05, 0.25, 5, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.6}
            metalness={0.5}
          />
        </mesh>

        {/* Glowing Tip (Cyan) */}
        <mesh position={[0, 5, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>

        {/* --- PARTICLE FOUNTAIN EMITTING FROM STICK --- */}
        <points ref={fountainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[fPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            color="#00ffff"
            transparent
            opacity={0.9}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
        {/* ------------------------------------------ */}

        {/* Point light to illuminate the stick itself */}
        <pointLight
          position={[0, 5.5, 0]}
          color="#00ffff"
          intensity={10}
          distance={15}
        />
      </group>

      {/* 2. BACKGROUND PARTICLES (Reacting to Mouse) */}
      <group ref={particleGroupRef}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.08}
            color="#06b6d4"
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Environment & Fog */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <fog attach="fog" args={["#030303", 5, 30]} />
    </group>
  );
}