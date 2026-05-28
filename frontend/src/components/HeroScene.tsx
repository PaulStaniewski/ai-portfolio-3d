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
  const bodyColor = dark ? '#111827' : '#f9fbff'
  const textColor = dark ? '#f8fbff' : '#101828'
  const mutedColor = dark ? '#aeb8d2' : '#5d6b85'

  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[2.7, 1.82, 0.08]} radius={0.08} smoothness={10}>
          <meshPhysicalMaterial
            color={bodyColor}
            roughness={0.16}
            metalness={0.02}
            transparent
            opacity={dark ? 0.92 : 0.78}
            clearcoat={0.55}
          />
        </RoundedBox>
        <RoundedBox args={[2.92, 2.02, 0.035]} radius={0.1} smoothness={10} position={[0, 0, -0.055]}>
          <primitive object={glassMaterial.clone()} attach="material" />
        </RoundedBox>

        <mesh position={[-1.08, 0.72, 0.075]}>
          <circleGeometry args={[0.045, 24]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        <Text position={[-0.94, 0.7, 0.08]} fontSize={0.08} color={mutedColor} anchorX="left" anchorY="middle">
          0xDEV
        </Text>
        <Text position={[-1.08, 0.36, 0.08]} fontSize={0.19} color={textColor} anchorX="left" anchorY="middle">
          {title}
        </Text>
        <Text position={[-1.08, 0.12, 0.08]} fontSize={0.09} color={mutedColor} anchorX="left" anchorY="middle">
          {subtitle}
        </Text>

        <RoundedBox args={[0.76, 0.18, 0.035]} radius={0.05} smoothness={8} position={[-0.69, -0.23, 0.09]}>
          <meshBasicMaterial color={accent} transparent opacity={0.16} />
        </RoundedBox>
        <Text position={[-0.98, -0.23, 0.11]} fontSize={0.062} color={accent} anchorX="left" anchorY="middle">
          Featured Project
        </Text>
        <UiRows dark={dark} accent={accent} />
      </group>
    </Float>
  )
}

function UiRows({ dark, accent }: { dark: boolean; accent: string }) {
  const rows = useMemo(() => [-0.58, -0.78, -0.98], [])
  return (
    <group>
      {rows.map((y, index) => (
        <group key={y} position={[-0.04, y, 0.09]}>
          <RoundedBox args={[1.7, 0.13, 0.028]} radius={0.035} smoothness={8}>
            <meshBasicMaterial color={dark ? '#27324b' : '#e9eefb'} transparent opacity={dark ? 0.66 : 0.92} />
          </RoundedBox>
          <RoundedBox args={[0.38 + index * 0.18, 0.04, 0.031]} radius={0.02} smoothness={8} position={[-0.48, 0, 0.02]}>
            <meshBasicMaterial color={index === 0 ? accent : dark ? '#9aa7c6' : '#8b98b3'} transparent opacity={0.72} />
          </RoundedBox>
        </group>
      ))}
    </group>
  )
}

function TechTile({ label, color, y }: { label: string; color: string; y: number }) {
  return (
    <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.25}>
      <group position={[2.62, y, -0.45]} rotation={[0.04, -0.38, 0.02]}>
        <RoundedBox args={[0.52, 0.52, 0.08]} radius={0.075} smoothness={10}>
          <primitive object={glassMaterial.clone()} attach="material" />
        </RoundedBox>
        <Text position={[0, 0, 0.06]} fontSize={0.16} color={color} anchorX="center" anchorY="middle">
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
      <group position={[-1.15, -1.18, 0.55]} rotation={[0.04, 0.3, -0.08]} scale={0.72}>
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
    <group position={[0.95, -2.18, -0.55]} rotation={[0, -0.24, 0]}>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.75, 1.95, 0.18, 96]} />
        <meshStandardMaterial color="#f7f8fb" roughness={0.18} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[1.32, 1.42, 0.14, 96]} />
        <meshStandardMaterial color="#eef3ff" roughness={0.1} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.36, 96]} />
        <meshBasicMaterial color="#8792ff" transparent opacity={0.36} />
      </mesh>
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
      : [1.42, -0.18, 0]

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
        position={[0.1, 0.24, -0.25]}
        rotation={[0.05, -0.16, 0.025]}
        scale={1.02}
      />
      <ProjectPanel
        title="Codex Platform"
        subtitle="AI Learning System"
        accent="#65d6ad"
        position={[1.36, -0.48, 0.46]}
        rotation={[0.07, -0.42, 0.035]}
        scale={0.8}
        dark
      />
      <ProjectPanel
        title="RAG System"
        subtitle="Document Intelligence"
        accent="#f7c95b"
        position={[1.72, 0.95, -0.78]}
        rotation={[0.02, -0.44, 0.03]}
        scale={0.56}
        dark
      />
      <CodePanel />
      <TechTile label="AI" color="#7c8cff" y={0.36} />
      <TechTile label="TS" color="#3578f6" y={-0.38} />
      <TechTile label="JS" color="#72b84b" y={-1.12} />
      <FloatingShard position={[-0.36, 1.62, -0.3]} scale={0.42} color="#9aa7ff" />
      <FloatingShard position={[1.98, 1.76, 0.08]} scale={0.3} color="#b7c4ff" />
      <FloatingShard position={[2.7, 0.9, -0.25]} scale={0.24} color="#c2c9ff" />
      <FloatingShard position={[0.02, -0.72, 1.1]} scale={0.22} color="#f2d77c" />
      <Sparkles count={42} speed={0.22} opacity={0.3} color="#8190ff" size={2.4} scale={[4.7, 3.1, 2.1]} position={[0.9, 0.12, -0.4]} />
      <ContactShadows position={[0.92, -2.32, 0]} opacity={0.25} scale={5.8} blur={2.8} far={4.5} color="#51607f" />
    </group>
  )
}
