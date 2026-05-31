import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox, Sparkles, Text } from '@react-three/drei'
import * as THREE from 'three'

type PanelProps = {
  title: string
  subtitle: string
  accent: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  dark?: boolean
}

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ffffff',
  metalness: 0,
  roughness: 0.08,
  transmission: 0.58,
  transparent: true,
  opacity: 0.48,
  thickness: 0.65,
  ior: 1.35,
  clearcoat: 0.9,
  clearcoatRoughness: 0.14,
})

function ProjectPanel({ title, subtitle, accent, position, rotation, scale = 1, dark = false }: PanelProps) {
  const bodyColor = dark ? '#101827' : '#f9fbff'
  const textColor = dark ? '#f8fbff' : '#101828'
  const mutedColor = dark ? '#aeb8d2' : '#5d6b85'
  const panelLine = dark ? '#2f3a55' : '#dfe6f5'
  const softFill = dark ? '#1b2438' : '#eef3ff'

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* outer soft glow */}
        <RoundedBox args={[3.02, 2.12, 0.035]} radius={0.12} smoothness={12} position={[0, 0, -0.08]}>
          <meshBasicMaterial color={accent} transparent opacity={dark ? 0.16 : 0.12} depthWrite={false} />
        </RoundedBox>

        {/* glass backplate */}
        <RoundedBox args={[2.96, 2.06, 0.04]} radius={0.11} smoothness={12} position={[0, 0, -0.055]}>
          <primitive object={glassMaterial.clone()} attach="material" />
        </RoundedBox>

        {/* main body */}
        <RoundedBox args={[2.72, 1.84, 0.09]} radius={0.09} smoothness={12}>
          <meshPhysicalMaterial
            color={bodyColor}
            roughness={0.14}
            metalness={0.03}
            transparent
            opacity={dark ? 0.95 : 0.84}
            clearcoat={0.65}
            clearcoatRoughness={0.12}
          />
        </RoundedBox>

        {/* top app bar */}
        <RoundedBox args={[2.42, 0.24, 0.035]} radius={0.045} smoothness={8} position={[0, 0.68, 0.08]}>
          <meshBasicMaterial color={softFill} transparent opacity={dark ? 0.82 : 0.72} />
        </RoundedBox>

        {/* status dots */}
        {[
          ['#ff6b6b', -1.08],
          ['#ffd166', -0.96],
          ['#65d6ad', -0.84],
        ].map(([color, x]) => (
          <mesh key={String(x)} position={[Number(x), 0.68, 0.105]}>
            <circleGeometry args={[0.028, 24]} />
            <meshBasicMaterial color={String(color)} />
          </mesh>
        ))}

        <Text position={[-0.66, 0.68, 0.11]} fontSize={0.06} color={mutedColor} anchorX="left" anchorY="middle">
          portfolio.project
        </Text>

        {/* accent chip */}
        <RoundedBox args={[0.58, 0.16, 0.035]} radius={0.045} smoothness={8} position={[-0.86, 0.34, 0.095]}>
          <meshBasicMaterial color={accent} transparent opacity={0.18} />
        </RoundedBox>

        <mesh position={[-1.08, 0.34, 0.12]}>
          <circleGeometry args={[0.035, 24]} />
          <meshBasicMaterial color={accent} />
        </mesh>

        <Text position={[-0.98, 0.34, 0.125]} fontSize={0.058} color={accent} anchorX="left" anchorY="middle">
          LIVE SYSTEM
        </Text>

        {/* title */}
        <Text position={[-1.08, 0.08, 0.11]} fontSize={0.2} color={textColor} anchorX="left" anchorY="middle">
          {title}
        </Text>

        <Text position={[-1.08, -0.16, 0.11]} fontSize={0.085} color={mutedColor} anchorX="left" anchorY="middle">
          {subtitle}
        </Text>

        {/* right mini card */}
        <RoundedBox args={[0.64, 0.48, 0.035]} radius={0.055} smoothness={8} position={[0.78, 0.08, 0.095]}>
          <meshBasicMaterial color={softFill} transparent opacity={dark ? 0.8 : 0.7} />
        </RoundedBox>

        <mesh position={[0.78, 0.14, 0.125]}>
          <torusGeometry args={[0.105, 0.012, 12, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={0.95} />
        </mesh>

        <Text position={[0.78, -0.06, 0.125]} fontSize={0.052} color={mutedColor} anchorX="center" anchorY="middle">
          RAG / API
        </Text>

        {/* divider */}
        <mesh position={[0, -0.34, 0.105]}>

          <meshBasicMaterial color={panelLine} transparent opacity={0.85} />
        </mesh>

        <UiRows dark={dark} accent={accent} />
      </group>
    </Float>
  )
}

function UiRows({ dark, accent }: { dark: boolean; accent: string }) {
  const rows = useMemo(
    () => [
      { y: -0.48, w: 1.18, bar: 0.38 },
      { y: -0.64, w: 1.02, bar: 0.48 },
      { y: -0.8, w: 1.1, bar: 0.3 },
    ],
    []
  )

  return (
    <group position={[-0.38, 0.04, 0]}>
      {rows.map((row, index) => (
        <group key={row.y} position={[0, row.y, 0.105]}>
          <RoundedBox args={[row.w, 0.085, 0.022]} radius={0.028} smoothness={8}>
            <meshBasicMaterial
              color={dark ? '#27324b' : '#e9eefb'}
              transparent
              opacity={dark ? 0.72 : 0.9}
            />
          </RoundedBox>

          <RoundedBox
            args={[row.bar, 0.028, 0.026]}
            radius={0.018}
            smoothness={8}
            position={[-row.w / 2 + row.bar / 2 + 0.07, 0, 0.018]}
          >
            <meshBasicMaterial
              color={index === 0 ? accent : dark ? '#9aa7c6' : '#8b98b3'}
              transparent
              opacity={0.78}
            />
          </RoundedBox>

          <mesh position={[row.w / 2 - 0.07, 0, 0.024]}>
            <circleGeometry args={[0.018, 20]} />
            <meshBasicMaterial
              color={index === 0 ? accent : dark ? '#55627f' : '#b7c0d8'}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function TechTile({
  label,
  color,
  position,
}: {
  label: string
  color: string
  position: [number, number, number]
}) {
  return (
    <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.25}>
      <group position={position} rotation={[0.04, -0.28, 0.02]}>
        <RoundedBox args={[0.46, 0.46, 0.08]} radius={0.075} smoothness={10}>
          <primitive object={glassMaterial.clone()} attach="material" />
        </RoundedBox>

        <Text position={[0, 0, 0.08]} fontSize={0.14} color={color} anchorX="center" anchorY="middle">
          {label}
        </Text>
      </group>
    </Float>
  )
}

function CodePanel() {
  const lines = ['const ai = await build()', 'stream.ui(projects)', 'deploy(edge.ready)']

  return (
    <Float speed={1.9} rotationIntensity={0.1} floatIntensity={0.28}>
      <group position={[-1.2, -1.28, 0.6]} rotation={[0.04, 0.26, -0.08]} scale={0.72}>
        <RoundedBox args={[1.12, 1.44, 0.08]} radius={0.08} smoothness={10}>
          <meshPhysicalMaterial color="#101622" roughness={0.22} metalness={0.04} transparent opacity={0.92} clearcoat={0.5} />
        </RoundedBox>
        {lines.map((line, index) => (
          <Text
            key={line}
            position={[-0.45, 0.38 - index * 0.24, 0.07]}
            fontSize={0.065}
            color={index === 0 ? '#7ee787' : index === 1 ? '#8db4ff' : '#ffd166'}
            anchorX="left"
            anchorY="middle"
          >
            {line}
          </Text>
        ))}
        <RoundedBox args={[0.7, 0.18, 0.04]} radius={0.045} smoothness={8} position={[0, -0.54, 0.07]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </RoundedBox>
        <Text position={[-0.26, -0.54, 0.1]} fontSize={0.056} color="#d8e4ff" anchorX="left" anchorY="middle">
          API + RAG + 3D
        </Text>
      </group>
    </Float>
  )
}

function FloatingShard({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  return (
    <Float speed={1.6 + scale} rotationIntensity={0.55} floatIntensity={0.28}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={color} roughness={0.24} metalness={0.15} transparent opacity={0.72} />
      </mesh>
    </Float>
  )
}

function Stage() {
  return (
    <group position={[0.86, -1.92, -0.48]} rotation={[0, -0.2, 0]} scale={1.08}>
      {/* soft glow under the whole platform */}
      <mesh position={[0, -0.34, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.45, 128]} />
        <meshBasicMaterial color="#7c8cff" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      {/* bottom neon rim */}
      <mesh position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.08, 0.025, 16, 160]} />
        <meshBasicMaterial color="#7c8cff" transparent opacity={0.75} />
      </mesh>

      {/* bottom base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.95, 2.2, 0.18, 128]} />
        <meshStandardMaterial
          color="#e8edff"
          roughness={0.2}
          metalness={0.08}
          emissive="#7c8cff"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* middle neon rim */}
      <mesh position={[0, -0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.64, 0.022, 16, 160]} />
        <meshBasicMaterial color="#a6b0ff" transparent opacity={0.78} />
      </mesh>

      {/* middle base */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[1.5, 1.68, 0.18, 128]} />
        <meshStandardMaterial
          color="#f7f9ff"
          roughness={0.12}
          metalness={0.06}
          emissive="#b7c0ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* top neon rim */}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 160]} />
        <meshBasicMaterial color="#8792ff" transparent opacity={0.9} />
      </mesh>

      {/* top platform */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[1.12, 1.28, 0.12, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.04}
          emissive="#dce2ff"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* inner glowing disk */}
      <mesh position={[0, 0.165, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.94, 128]} />
        <meshBasicMaterial color="#eef1ff" transparent opacity={0.34} depthWrite={false} />
      </mesh>

      {/* small decorative light dots */}
      {[
        [1.32, 0.01, 0.42],
        [-1.12, 0.01, 0.74],
        [0.52, 0.01, -1.18],
        [-0.72, 0.01, -1.04],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.035, 24, 24]} />
          <meshBasicMaterial color={index % 2 === 0 ? '#7c8cff' : '#65d6ad'} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer, viewport } = useThree()
  const isMobile = viewport.width < 5.8
  const isTablet = viewport.width >= 5.8 && viewport.width < 8
  const sceneScale = isMobile ? 0.48 : isTablet ? 0.68 : 0.88
  const scenePosition: [number, number, number] = isMobile
    ? [0.78, -1.46, 0]
    : isTablet
      ? [1.26, -0.92, 0]
      : [1.18, -0.08, 0]

  useFrame((state) => {
    if (!groupRef.current) return

    const elapsed = state.clock.getElapsedTime()
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.12 - 0.12, 0.055)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.04, 0.055)
    groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.08
  })

  return (
    <group ref={groupRef} position={scenePosition} scale={sceneScale}>
      <Stage />
      <ProjectPanel
        title="GeeBOT"
        subtitle="AI Agent Chatbot"
        accent="#7c8cff"
        position={[-0.18, 0.46, -0.42]}
        rotation={[0.04, -0.1, 0.015]}
        scale={1.0}
      />

      <ProjectPanel
        title="Codex Platform"
        subtitle="AI Learning System"
        accent="#65d6ad"
        position={[1.16, -0.32, 0.58]}
        rotation={[0.06, -0.3, 0.025]}
        scale={0.92}
        dark
      />
      <CodePanel />
      <TechTile label="AI" color="#7c8cff" position={[2.95, 0.58, 0.78]} />
      <TechTile label="TS" color="#3578f6" position={[3.08, -0.08, 0.92]} />
      <TechTile label="JS" color="#72b84b" position={[2.85, -0.74, 0.82]} />
      <FloatingShard position={[-0.36, 1.62, -0.3]} scale={0.42} color="#9aa7ff" />
      <FloatingShard position={[1.98, 1.76, 0.08]} scale={0.3} color="#b7c4ff" />
      <FloatingShard position={[2.7, 0.9, -0.25]} scale={0.24} color="#c2c9ff" />
      <FloatingShard position={[0.02, -0.72, 1.1]} scale={0.22} color="#f2d77c" />
      <Sparkles count={42} speed={0.22} opacity={0.3} color="#8190ff" size={2.4} scale={[4.7, 3.1, 2.1]} position={[0.9, 0.12, -0.4]} />
      <ContactShadows
        position={[0.82, -2.42, 0]}
        opacity={0.5}
        scale={6.2}
        blur={3.8}
        far={4.8}
        color="#51607f"
      />
    </group>
  )
}
