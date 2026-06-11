import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Sparkles } from '@react-three/drei';

// A highly detailed 3D procedural "Monster Robotic Cyber-Truck" built with Three.js primitives
const RobotTruck = ({ headlightsOn }) => {
  // References to groups/sub-meshes for dynamic rotation and translation animations
  const groupRef = useRef();
  const wheelFLRef = useRef(); // Front-Left Wheel Reference
  const wheelFRRef = useRef(); // Front-Right Wheel Reference
  const wheelRLRef = useRef(); // Rear-Left Wheel Reference
  const wheelRRRef = useRef(); // Rear-Right Wheel Reference
  const spotLightRef = useRef(); // Headlight beam Spotlight Reference

  // useFrame handles per-frame updates for animations (idling rumble + rolling wheels)
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Truck body rumble animation (simulating a powerful high-horsepower idling engine)
    // Applies small, high-frequency trigonometric offsets to position.y and rotations
    if (groupRef.current) {
      groupRef.current.position.y = -0.4 + Math.sin(time * 12) * 0.035;
      groupRef.current.rotation.x = Math.sin(time * 16) * 0.009;
      groupRef.current.rotation.z = Math.cos(time * 14) * 0.009;
    }

    // Spin wheels to look like they are rolling/revving on the spot
    // Revs faster when headlights are active (simulating telemetry sweep transmission)
    const spinSpeed = headlightsOn ? 4.5 : 1.2;
    if (wheelFLRef.current) wheelFLRef.current.rotation.x += delta * spinSpeed;
    if (wheelFRRef.current) wheelFRRef.current.rotation.x += delta * spinSpeed;
    if (wheelRLRef.current) wheelRLRef.current.rotation.x += delta * spinSpeed;
    if (wheelRRRef.current) wheelRRRef.current.rotation.x += delta * spinSpeed;
  });

  // Reusable suspension strut component (Jack's high clearance off-road stance)
  // Consists of a structural frame bracket, shock absorber cylinder, piston shaft, and a glowing neon orange coil spring.
  const SuspensionStrut = ({ side, zOffset }) => {
    // side is -1 for left, 1 for right
    // Position is configured to span diagonally from the chassis rail to the wheel hub
    return (
      <group position={[side * 1.02, -0.175, zOffset]} rotation={[0, 0, side * 0.45]}>
        {/* Shock Absorber: Outer cylinder sleeve (dark metallic grey) */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.7, 12]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.15} />
        </mesh>
        
        {/* Shock Absorber: Upper mounting bracket attaching to the chassis tube frame */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[0.16, 0.1, 0.16]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Shock Absorber: Inner chrome hydraulic piston shaft sliding out of the outer sleeve */}
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.9, 12]} />
          <meshStandardMaterial color="#f3f4f6" metalness={0.98} roughness={0.02} />
        </mesh>
        
        {/* Shock Absorber: Lower mounting knuckle joint attaching to the axle hub */}
        <mesh position={[0, -0.6, 0]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Coiled Suspension Spring: Stacked torus rings wrapped around the piston shaft */}
        {/* Uses emissive neon orange color to outline the high clearance layout */}
        {[...Array(12)].map((_, i) => (
          <mesh key={i} position={[0, -0.42 + i * 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[0.1, 0.026, 12, 32]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={0.25} metalness={0.85} roughness={0.1} />
          </mesh>
        ))}
      </group>
    );
  };

  // Reusable monster wheel assembly with high-detail rubber tires, staggered tread blocks, and dual-tone 8-spoke rims
  const MonsterWheel = ({ side, zOffset, wheelRef }) => {
    // side is -1 for left, 1 for right
    return (
      <group position={[side * 1.4, -0.8, zOffset]} ref={wheelRef}>
        {/* Tire: Main heavy-duty rubber cylinder structure */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.85, 32]} />
          <meshStandardMaterial color="#0b0b0c" roughness={0.95} metalness={0.05} />
        </mesh>
        
        {/* Tire Tread: 24 procedurally placed 3D blocks to simulate deep rugged off-road treads */}
        {/* Staggered on the Z axis and rotated slightly to create a premium V-shaped tread pattern */}
        {[...Array(24)].map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 24;
          const zPos = (idx % 2 === 0 ? 0.22 : -0.22);
          const treadRot = 0.18 * (idx % 2 === 0 ? 1 : -1);
          return (
            <group key={idx} rotation={[angle, 0, 0]}>
              <mesh position={[0, 1.1, zPos]} rotation={[treadRot, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.9, 0.08, 0.22]} />
                <meshStandardMaterial color="#070708" roughness={0.98} metalness={0.02} />
              </mesh>
            </group>
          );
        })}

        {/* Rim: Deep recessed wheel well cylinder */}
        <mesh position={[side * 0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.68, 0.68, 0.38, 32, 1, true]} />
          <meshStandardMaterial color="#161616" roughness={0.85} metalness={0.15} />
        </mesh>

        {/* Rim: Inner hub ring backing panel */}
        <mesh position={[side * 0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.66, 0.66, 0.05, 32]} />
          <meshStandardMaterial color="#0f0f10" roughness={0.9} />
        </mesh>

        {/* Rim: Polished outer lip bezel (cylinder for specular reflections) */}
        <mesh position={[side * 0.43, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.69, 0.69, 0.05, 32]} />
          <meshStandardMaterial color="#d1d5db" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* Rim: Central chrome axle hub cap */}
        <mesh position={[side * 0.44, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[side * 0.485, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 12]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Rim Spokes: 8-Spoke dual-tone structural assembly radiating on YZ plane */}
        <group position={[side * 0.32, 0, 0]}>
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            return (
              <group key={i} rotation={[angle, 0, 0]}>
                {/* Snapped to vertical: Structural backing panel & highlight panel */}
                <group rotation={[Math.PI / 2, 0, 0]}>
                  {/* Spoke: Wide structural backing panel (matte black steel) */}
                  <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.12, 0.52, 0.12]} />
                    <meshStandardMaterial color="#18181b" roughness={0.8} metalness={0.2} />
                  </mesh>
                  {/* Spoke: Raised face highlight panel (polished chrome/silver shifted outward on local X axis) */}
                  <mesh position={[side * 0.065, 0.38, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.06, 0.48, 0.02]} />
                    <meshStandardMaterial color="#f3f4f6" metalness={0.95} roughness={0.08} />
                  </mesh>
                </group>
                {/* Spoke: Decorative lug bolt on the rim lip at the tip of the spoke pointing outward on local X axis */}
                <mesh position={[side * 0.1, 0.63, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                  <cylinderGeometry args={[0.015, 0.015, 0.03, 6]} />
                  <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>
    );
  };

  // Reusable fender flare / wheel arch component to cover massive tires
  // Built with segmented angular panels and a glowing orange trim contour
  const FenderFlare = ({ side, zOffset }) => {
    // side is -1 for left, 1 for right
    return (
      <group position={[side * 1.32, 0.35, zOffset]} rotation={[0, 0, side * -0.1]}>
        {/* Fender: Main top horizontal mudguard plate */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.06, 1.65]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
        </mesh>
        {/* Fender Trim: Outer glowing neon orange line */}
        <mesh position={[side * 0.28, 0.01, 0]} castShadow>
          <boxGeometry args={[0.025, 0.05, 1.63]} />
          <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.5} />
        </mesh>
        {/* Fender: Front angled mudguard plate */}
        <mesh position={[0, -0.22, 0.95]} rotation={[Math.PI / 4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.06, 0.7]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
        </mesh>
        {/* Fender: Front glowing neon orange trim */}
        <mesh position={[side * 0.28, -0.22, 0.95]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <boxGeometry args={[0.025, 0.05, 0.68]} />
          <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.5} />
        </mesh>
        {/* Fender: Rear angled mudguard plate */}
        <mesh position={[0, -0.22, -0.95]} rotation={[-Math.PI / 4, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.06, 0.7]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
        </mesh>
        {/* Fender: Rear glowing neon orange trim */}
        <mesh position={[side * 0.28, -0.22, -0.95]} rotation={[-Math.PI / 4, 0, 0]} castShadow>
          <boxGeometry args={[0.025, 0.05, 0.68]} />
          <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.5} />
        </mesh>
      </group>
    );
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      {/* Root Monster Truck Group rotated towards left-front profile view */}
      <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0, -Math.PI / 2.2, 0]} scale={0.8}>
        
        {/* ================= 1. CHASSIS GROUP ================= */}
        {/* Contains frame rails, body panels, cabin, windshield, engine scoop, exhaust stacks, brush guard, and sensor block */}
        <group name="Chassis Group">
          {/* Main Frame: Left side rail tube */}
          <mesh position={[0.65, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.09, 0.09, 3.6, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Main Frame: Right side rail tube */}
          <mesh position={[-0.65, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.09, 0.09, 3.6, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Main Frame: Front crossbar tube */}
          <mesh position={[0, 0.2, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.09, 0.09, 1.3, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Main Frame: Center crossbar tube */}
          <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.09, 0.09, 1.3, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Main Frame: Rear crossbar tube */}
          <mesh position={[0, 0.2, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.09, 0.09, 1.3, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Body: Lower floor pan / under-chassis belly plate */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.25, 3.8]} />
            <meshStandardMaterial color="#161616" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Body Trim: Left side glowing neon orange trim strip */}
          <mesh position={[0.81, 0.45, 0]} castShadow>
            <boxGeometry args={[0.025, 0.08, 3.75]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Body Trim: Right side glowing neon orange trim strip */}
          <mesh position={[-0.81, 0.45, 0]} castShadow>
            <boxGeometry args={[0.025, 0.08, 3.75]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>

          {/* Cabin: Main passenger compartment body block (matte black) */}
          <mesh position={[0, 0.85, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.55, 1.8]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Cabin: Angular front windshield frame A-pillars */}
          <mesh position={[0, 1.05, 0.85]} rotation={[-Math.PI / 4, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.38, 0.06, 0.85]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Cabin: Flat rooftop plate */}
          <mesh position={[0, 1.15, -0.25]} castShadow receiveShadow>
            <boxGeometry args={[1.35, 0.06, 1.5]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Cabin Glass: Tinted geometric front windshield panel */}
          <mesh position={[0, 1.07, 0.87]} rotation={[-Math.PI / 4, 0, 0]}>
            <boxGeometry args={[1.25, 0.03, 0.75]} />
            <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.95} transparent opacity={0.92} />
          </mesh>
          {/* Cabin Glass: Left side window panel */}
          <mesh position={[-0.71, 0.88, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.02, 0.28, 1.3]} />
            <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.95} transparent opacity={0.92} />
          </mesh>
          {/* Cabin Glass: Right side window panel */}
          <mesh position={[0.71, 0.88, -0.2]} castShadow receiveShadow>
            <boxGeometry args={[0.02, 0.28, 1.3]} />
            <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.95} transparent opacity={0.92} />
          </mesh>

          {/* Cabin Trim: Left roof contour glowing orange strip */}
          <mesh position={[-0.68, 1.18, -0.25]} castShadow>
            <boxGeometry args={[0.02, 0.04, 1.5]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Cabin Trim: Right roof contour glowing orange strip */}
          <mesh position={[0.68, 1.18, -0.25]} castShadow>
            <boxGeometry args={[0.02, 0.04, 1.5]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Cabin Trim: Front roof contour glowing orange strip */}
          <mesh position={[0, 1.18, 0.5]} castShadow>
            <boxGeometry args={[1.34, 0.04, 0.02]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Cabin Trim: Rear roof contour glowing orange strip */}
          <mesh position={[0, 1.18, -1.0]} castShadow>
            <boxGeometry args={[1.34, 0.04, 0.02]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>

          {/* Body: Front engine hood panel */}
          <mesh position={[0, 0.65, 1.3]} castShadow receiveShadow>
            <boxGeometry args={[1.45, 0.2, 1.1]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Hood Trim: Left outer edge glowing orange contour line */}
          <mesh position={[-0.73, 0.76, 1.3]} castShadow>
            <boxGeometry args={[0.02, 0.03, 1.1]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Hood Trim: Right outer edge glowing orange contour line */}
          <mesh position={[0.73, 0.76, 1.3]} castShadow>
            <boxGeometry args={[0.02, 0.03, 1.1]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          {/* Hood Trim: Front nose edge glowing orange line */}
          <mesh position={[0, 0.76, 1.84]} castShadow>
            <boxGeometry args={[1.44, 0.03, 0.02]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.8} />
          </mesh>
          
          {/* Engine: Angular supercharger intake hood scoop */}
          <mesh position={[0, 0.8, 1.15]} castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.1, 0.75]} />
            <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Engine: Orange inner core/intake channel glow */}
          <mesh position={[0, 0.82, 1.15]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.65]} />
            <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.2} />
          </mesh>
          {/* Engine: 3 dark metallic intake grill fins */}
          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[0, 0.86, 0.95 + i * 0.12]} rotation={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.42, 0.02, 0.04]} />
              <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}

          {/* Flatbed: Floor panel at the back of the cabin */}
          <mesh position={[0, 0.55, -1.5]} castShadow receiveShadow>
            <boxGeometry args={[1.4, 0.05, 1.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Flatbed: Left side panel wall */}
          <mesh position={[-0.7, 0.65, -1.5]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 1.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Flatbed: Right side panel wall */}
          <mesh position={[0.7, 0.65, -1.5]} castShadow receiveShadow>
            <boxGeometry args={[0.05, 0.25, 1.0]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          {/* Flatbed: Rear tailgate panel */}
          <mesh position={[0, 0.65, -1.98]} castShadow receiveShadow>
            <boxGeometry args={[1.35, 0.25, 0.05]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>

          {/* Sensor Block: Integrated telemetry module in the flatbed */}
          <group position={[0, 0.7, -1.5]}>
            {/* Sensor: Glowing neon orange structural body block */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.35, 0.7]} />
              <meshStandardMaterial color="#FF7A00" emissive="#FF7A00" emissiveIntensity={1.2} roughness={0.1} metalness={0.8} />
            </mesh>
            {/* Sensor: Protective dark steel top cover plate */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.82, 0.03, 0.72]} />
              <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Sensor: Left camera lens cylinder (cyan laser) */}
            <mesh position={[0.2, 0.05, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2.0} roughness={0.05} />
            </mesh>
            {/* Sensor: Right camera lens cylinder (cyan laser) */}
            <mesh position={[-0.2, 0.05, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2.0} roughness={0.05} />
            </mesh>
            {/* Sensor: Central scanning laser alignment track */}
            <mesh position={[0, 0, 0.36]} castShadow>
              <boxGeometry args={[0.2, 0.03, 0.02]} />
              <meshStandardMaterial color="#222222" metalness={0.9} />
            </mesh>
            {/* Sensor: Telemetry whip antenna rod */}
            <mesh position={[0.3, 0.3, -0.2]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
              <meshStandardMaterial color="#e5e7eb" metalness={0.9} />
            </mesh>
            {/* Sensor: Antenna tip indicator led */}
            <mesh position={[0.3, 0.5, -0.2]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#FF7A00" />
            </mesh>
          </group>

          {/* Front Bumper: Main horizontal matte black crash bar */}
          <mesh position={[0, 0.35, 2.0]} castShadow receiveShadow>
            <boxGeometry args={[1.7, 0.22, 0.25]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.8} />
          </mesh>
          
          {/* Bumper: Recovery winch assembly */}
          <group position={[0, 0.35, 2.08]}>
            {/* Winch drum shaft */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.35, 12]} />
              <meshStandardMaterial color="#7f8c8d" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Winch orange tension cable wrap */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.09, 0.09, 0.25, 12]} />
              <meshStandardMaterial color="#e67e22" roughness={0.6} />
            </mesh>
            {/* Winch metal recovery hook */}
            <mesh position={[0, -0.15, 0.1]} castShadow>
              <torusGeometry args={[0.05, 0.018, 8, 16, Math.PI * 1.5]} />
              <meshStandardMaterial color="#bdc3c7" metalness={0.95} />
            </mesh>
          </group>

          {/* Brush Guard: Top horizontal wrap protection tube */}
          <mesh position={[0, 0.55, 2.12]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.045, 1.3, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Brush Guard: Left vertical center guard post */}
          <mesh position={[0.4, 0.44, 2.1]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Brush Guard: Right vertical center guard post */}
          <mesh position={[-0.4, 0.44, 2.1]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.42, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Brush Guard: Left outer fender protector tube */}
          <mesh position={[0.7, 0.44, 2.05]} rotation={[0, 0.3, 0.1]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.4, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Brush Guard: Right outer fender protector tube */}
          <mesh position={[-0.7, 0.44, 2.05]} rotation={[0, -0.3, -0.1]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.4, 12]} />
            <meshStandardMaterial color="#222222" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Fender Flares: 4 arches over each wheel */}
          <FenderFlare side={-1} zOffset={1.3} />
          <FenderFlare side={1} zOffset={1.3} />
          <FenderFlare side={-1} zOffset={-1.3} />
          <FenderFlare side={1} zOffset={-1.3} />

          {/* Exhaust: Dual semi-truck style vertical exhaust stacks behind cabin */}
          <group>
            {/* Exhaust Left: Main riser tube */}
            <mesh position={[0.45, 1.4, -1.2]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.9, 12]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Exhaust Left: Wireframe heat guard cage */}
            <mesh position={[0.45, 1.15, -1.2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.5, 12, 1, true]} />
              <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} wireframe />
            </mesh>
            {/* Exhaust Left: Slanted top discharge elbow */}
            <mesh position={[0.48, 1.9, -1.25]} rotation={[0.3, 0, -0.25]} castShadow>
              <cylinderGeometry args={[0.055, 0.06, 0.22, 12]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Exhaust Right: Main riser tube */}
            <mesh position={[-0.45, 1.4, -1.2]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.9, 12]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Exhaust Right: Wireframe heat guard cage */}
            <mesh position={[-0.45, 1.15, -1.2]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.5, 12, 1, true]} />
              <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} wireframe />
            </mesh>
            {/* Exhaust Right: Slanted top discharge elbow */}
            <mesh position={[-0.48, 1.9, -1.25]} rotation={[0.3, 0, 0.25]} castShadow>
              <cylinderGeometry args={[0.055, 0.06, 0.22, 12]} />
              <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>

          {/* Exhaust: Active orange emission glow pointlights at stack outlets */}
          {headlightsOn && (
            <>
              <pointLight position={[0.48, 2.05, -1.28]} color="#FF5500" intensity={2.5} distance={3} />
              <pointLight position={[-0.48, 2.05, -1.28]} color="#FF5500" intensity={2.5} distance={3} />
            </>
          )}

          {/* Headlights Left: Matrix housing in the brush guard */}
          <group position={[-0.55, 0.38, 2.12]}>
            {/* Headlights Left: Cyan tinted protective glass enclosure */}
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.12, 0.05]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={headlightsOn ? 0.4 : 0.0} transparent opacity={0.6} roughness={0.02} />
            </mesh>
            {/* Headlights Left: 2x2 grid of high-intensity white LED emitter spheres */}
            <mesh position={[-0.05, 0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[0.05, 0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[-0.05, -0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[0.05, -0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
          </group>

          {/* Headlights Right: Matrix housing in the brush guard */}
          <group position={[0.55, 0.38, 2.12]}>
            {/* Headlights Right: Cyan tinted protective glass enclosure */}
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.12, 0.05]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={headlightsOn ? 0.4 : 0.0} transparent opacity={0.6} roughness={0.02} />
            </mesh>
            {/* Headlights Right: 2x2 grid of high-intensity white LED emitter spheres */}
            <mesh position={[-0.05, 0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[0.05, 0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[-0.05, -0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
            <mesh position={[0.05, -0.03, 0.02]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color={headlightsOn ? "#FFFFFF" : "#333333"} />
            </mesh>
          </group>

          {/* Headlights: Light Projection Beams and visual volumetric dust cones */}
          {headlightsOn && (
            <>
              {/* Actual Three.js spotlight casting shadows forward (pointing leftwards relative to camera) */}
              <spotLight 
                ref={spotLightRef}
                position={[0, 0.38, 2.15]} 
                angle={Math.PI / 3.2} 
                penumbra={0.8}
                intensity={18} 
                distance={22} 
                color="#FFD700"
                castShadow
                shadow-bias={-0.0005}
                target-position={[0, 0.38, 20]}
              />

              {/* Volumetric: Left visual headlight beam cone */}
              <mesh position={[-0.55, 0.38, 3.6]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.7, 3.0, 16, 1, true]} />
                <meshBasicMaterial color="#FFD700" transparent={true} opacity={0.12} depthWrite={false} />
              </mesh>
              {/* Volumetric: Right visual headlight beam cone */}
              <mesh position={[0.55, 0.38, 3.6]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.7, 3.0, 16, 1, true]} />
                <meshBasicMaterial color="#FFD700" transparent={true} opacity={0.12} depthWrite={false} />
              </mesh>
            </>
          )}
        </group>

        {/* ================= 2. SUSPENSION GROUP ================= */}
        {/* Contains solid axles, control arms (wishbones), and diagonal strut assemblies */}
        <group name="Suspension Group">
          {/* Axles: Front solid differential steel cylinder */}
          <mesh position={[0, -0.8, 1.3]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.12, 1.9, 12]} />
            <meshStandardMaterial color="#1a1a1b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Axles: Rear solid differential steel cylinder */}
          <mesh position={[0, -0.8, -1.3]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.12, 0.12, 1.9, 12]} />
            <meshStandardMaterial color="#1a1a1b" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Struts: 4 Diagonal high-stance spring-shocks */}
          <SuspensionStrut side={-1} zOffset={1.3} />
          <SuspensionStrut side={1} zOffset={1.3} />
          <SuspensionStrut side={-1} zOffset={-1.3} />
          <SuspensionStrut side={1} zOffset={-1.3} />

          {/* Control Arms: Double-wishbone geometry adding high mechanical complexity */}
          
          {/* Front Left: Lower control arm */}
          <mesh position={[-0.9, -0.75, 1.3]} rotation={[0, 0, -0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.05, 0.12]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Front Left: Upper control arm */}
          <mesh position={[-0.85, -0.4, 1.3]} rotation={[0, 0, -0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.04, 0.08]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
          
          {/* Front Right: Lower control arm */}
          <mesh position={[0.9, -0.75, 1.3]} rotation={[0, 0, 0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.05, 0.12]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Front Right: Upper control arm */}
          <mesh position={[0.85, -0.4, 1.3]} rotation={[0, 0, 0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.04, 0.08]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Rear Left: Lower control arm */}
          <mesh position={[-0.9, -0.75, -1.3]} rotation={[0, 0, -0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.05, 0.12]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Rear Left: Upper control arm */}
          <mesh position={[-0.85, -0.4, -1.3]} rotation={[0, 0, -0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.04, 0.08]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Rear Right: Lower control arm */}
          <mesh position={[0.9, -0.75, -1.3]} rotation={[0, 0, 0.08]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.05, 0.12]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Rear Right: Upper control arm */}
          <mesh position={[0.85, -0.4, -1.3]} rotation={[0, 0, 0.12]} castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.04, 0.08]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* ================= 3. WHEELS GROUP ================= */}
        {/* Contains the 4 massive rugged tires with rotating references */}
        <group name="Wheels Group">
          <MonsterWheel side={-1} zOffset={1.3} wheelRef={wheelFLRef} />
          <MonsterWheel side={1} zOffset={1.3} wheelRef={wheelFRRef} />
          <MonsterWheel side={-1} zOffset={-1.3} wheelRef={wheelRLRef} />
          <MonsterWheel side={1} zOffset={-1.3} wheelRef={wheelRRRef} />
        </group>

      </group>
    </Float>
  );
};

const Hero = () => {
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [systemState, setSystemState] = useState('BOOTING');

  // Rapidly flicker headlights on mount for 1.5 seconds before staying permanently ON
  useEffect(() => {
    let elapsed = 0;
    const intervalTime = 75;
    const totalTime = 1500;
    
    const flickerInterval = setInterval(() => {
      setHeadlightsOn((prev) => !prev);
      elapsed += intervalTime;
      
      if (elapsed >= totalTime) {
        clearInterval(flickerInterval);
        setHeadlightsOn(true);
        setSystemState('ACTIVE');
      }
    }, intervalTime);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-block bg-card-bg/80 border border-border-color backdrop-blur-md rounded-full px-4 py-1.5 mb-6">
              <span className="text-primary-accent text-sm font-bold tracking-widest uppercase">
                Welcome to the Future
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6 leading-tight">
              THINK.<br />
              BUILD.<br />
              INNOVATE.<br />
              <span className="text-primary-accent text-glow">AUTOMATE.</span>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-text mb-4 font-light">
              Robotics • AI • IoT • DIY Electronics
            </p>

            <p className="text-lg text-secondary-text mb-6 max-w-xl mx-auto lg:mx-0">
              NeuroRob is a dedicated platform focused on building, learning and innovating the future through robotics and technology.
            </p>

            <div className="mb-8 max-w-xl mx-auto lg:mx-0 h-[155px]">
              <motion.div
                animate={{
                  borderColor: headlightsOn ? 'rgba(255, 122, 0, 0.5)' : 'rgba(42, 42, 42, 0.8)',
                  backgroundColor: headlightsOn ? 'rgba(255, 122, 0, 0.06)' : 'rgba(26, 26, 26, 0.5)',
                  boxShadow: headlightsOn ? '0 0 25px rgba(255, 122, 0, 0.15)' : 'none'
                }}
                transition={{ duration: 0.15 }}
                className="p-4 rounded-xl border backdrop-blur-md font-mono text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-accent/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center justify-between mb-3 border-b border-border-color pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${headlightsOn ? 'bg-primary-accent animate-ping' : 'bg-neutral-600'} transition-colors duration-200`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${headlightsOn ? 'text-primary-accent' : 'text-neutral-400'}`}>
                      {systemState === 'BOOTING' ? 'Telemetry Link: BOOTING' : 'Telemetry Link: ACTIVE'}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-bold">SYS_ID: #MR-TRK-9000</span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm h-[65px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {systemState === 'BOOTING' ? (
                      <motion.div
                        key="booting"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-primary-accent font-semibold flex items-center gap-1.5">
                          <span className="animate-spin text-xs">⚡</span>
                          <span className="text-glow animate-pulse">ESTABLISHING NEURAL LINK...</span>
                        </div>
                        <div className="text-primary-text mt-1 font-sans text-xs">
                          Calibrating 3D sensors, monster tires, and hydraulic suspension.
                        </div>
                        <div className="w-full bg-neutral-800/80 h-1.5 rounded-full overflow-hidden mt-2">
                          <motion.div 
                            className="bg-primary-accent h-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "linear" }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="active"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-primary-accent font-semibold flex items-center gap-1.5">
                          <span>&gt;</span>
                          <span className="text-glow animate-pulse">NEURAL LINK ACTIVE: STEADY TELEMETRY</span>
                        </div>
                        <div className="text-primary-text mt-1 font-sans text-xs">
                          "Autonomous cyber-truck operational. Ground clearance optimal. Engine rumbling."
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-border-color/50 text-[9px] uppercase tracking-wider font-bold">
                          <div>SPEED: <span className="text-primary-accent font-bold">14.8 KM/H</span></div>
                          <div>RADAR: <span className="text-green-500 font-bold">SCANNING</span></div>
                          <div>SYSTEM: <span className="text-primary-accent font-bold">ONLINE</span></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-primary-accent hover:bg-hover-accent text-primary-bg font-bold py-4 px-8 rounded-xl transition-all duration-300 glow-orange-hover uppercase tracking-wide"
                >
                  Explore Products
                </motion.button>
              </Link>
              <Link to="/workshops">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto glass-panel text-primary-text hover:text-primary-accent font-bold py-4 px-8 rounded-xl transition-all duration-300 uppercase tracking-wide border border-border-color hover:border-primary-accent"
                >
                  Explore Workshops
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[750px] w-full overflow-visible bg-transparent border-0 shadow-none lg:ml-16 lg:-mr-24"
          >
            <div className="absolute inset-0 z-10 cursor-move overflow-visible">
              <Canvas shadows camera={{ position: [0, 1.8, 6.5], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <directionalLight 
                  castShadow 
                  position={[10, 10, 5]} 
                  intensity={1.2} 
                  shadow-mapSize={[1024, 1024]}
                  shadow-camera-left={-6}
                  shadow-camera-right={6}
                  shadow-camera-top={6}
                  shadow-camera-bottom={-6}
                  shadow-bias={-0.0005}
                />
                <directionalLight 
                  castShadow 
                  position={[-10, 8, -5]} 
                  color="#FF7A00" 
                  intensity={1.5} 
                  shadow-mapSize={[1024, 1024]}
                  shadow-camera-left={-6}
                  shadow-camera-right={6}
                  shadow-camera-top={6}
                  shadow-camera-bottom={-6}
                  shadow-bias={-0.0005}
                />
                <pointLight position={[0, 4, 0]} intensity={0.8} />
                
                <RobotTruck headlightsOn={headlightsOn} />
                
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]} receiveShadow>
                  <planeGeometry args={[30, 30]} />
                  <shadowMaterial opacity={0.65} />
                </mesh>
                
                <Sparkles count={120} scale={8} size={2.2} speed={0.3} opacity={0.35} color="#FF7A00" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
                <Environment preset="city" />
              </Canvas>
            </div>
            
            <div className="absolute top-4 right-4 z-20 glass-panel p-3 rounded-lg text-xs font-mono text-primary-accent animate-pulse">
              SYS_STATUS: {systemState}
            </div>
            <div className="absolute bottom-10 left-4 z-20 glass-panel p-3 rounded-lg text-xs font-mono text-secondary-text">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-primary-accent animate-ping"></div>
                CYBER TRUCK LINKED
              </div>
              <div className="h-1 w-24 bg-border-color rounded-full overflow-hidden mt-2">
                <div className="h-full bg-primary-accent w-[92%]"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;