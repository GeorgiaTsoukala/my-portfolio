import { useEffect, useRef, useState } from 'react'
import { Bodies, Engine, Runner, World, type Body } from 'matter-js'
import type { IntroSkillItem } from '../content/introSkills'

type PhysicsSkillBoxProps = {
  title: string
  skills: IntroSkillItem[]
}

type PhysicsPill = {
  id: string
  label: string
  color: string
  body: Body
  width: number
  height: number
}

type RenderedPill = {
  id: string
  label: string
  color: string
  x: number
  y: number
  angle: number
  width: number
  height: number
}

const PhysicsSkillBox = ({ title, skills }: PhysicsSkillBoxProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)
  const physicsPillsRef = useRef<PhysicsPill[]>([])

  const [renderedPills, setRenderedPills] = useState<RenderedPill[]>([])

  // Measure the label width more accurately for the desktop pill font.
  const getPillWidth = (text: string) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      return 120
    }

    // Match the large-screen pill font as closely as possible.
    context.font = '18px "Syne Mono", monospace'

    const textWidth = context.measureText(text).width
    const horizontalPadding = 32

    return Math.max(90, Math.ceil(textWidth + horizontalPadding))
  }

  const handleDropSkills = () => {
    // Check that the physics engine and the box exist
    if (!engineRef.current || !containerRef.current) {
      return
    }

    // Use the current box width to place the pills inside this specific box
    const { width } = containerRef.current.getBoundingClientRect()
    
    // Remove any older bodies before dropping a fresh set
    physicsPillsRef.current.forEach(({ body }) => {
      World.remove(engineRef.current!.world, body)
    })

    // Define a pill height
    const pillHeight = 40

    // Create one Matter body per skill and drop them near the top of the box
    const newBodies = skills.map((skill, index) => {
      const pillWidth = getPillWidth(skill.label)
      const horizontalPadding = pillWidth / 2 + 8
      const randomX = horizontalPadding + Math.random() * (width - horizontalPadding * 2)

      const body = Bodies.rectangle(
        randomX,
        0,
        pillWidth,
        pillHeight,
        {
          restitution: 0.95,
          friction: 0.05,
          frictionAir: 0.001,
        }
      )

      return {
        id: `${title}-${skill.label}-${index}`,
        label: skill.label,
        color: skill.color,
        body,
        width: pillWidth,
        height: pillHeight,
      }
    })

    // Save the new pill bodies so the animation loop can read them
    physicsPillsRef.current = newBodies

    // Add the new pill bodies into the physics world
    World.add(engineRef.current.world, newBodies.map((pill) => pill.body))
  }

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) {
      return
    }

    // Measure the box and button so the physics world lines up with the DOM
    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonRect = buttonRef.current.getBoundingClientRect()

    const { width, height } = containerRect

    const buttonX =
      buttonRect.left - containerRect.left + buttonRect.width / 2

    const buttonY =
      buttonRect.top - containerRect.top + buttonRect.height / 2

    // Create one Matter engine and runner for this specific box
    const engine = Engine.create()
    const runner = Runner.create()

    engineRef.current = engine
    runnerRef.current = runner

    // Thickness of the invisible boundary bodies that keep pills inside the box
    const wallThickness = 40

    // Create invisible static boundaries so pills stay inside the box
    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      {
        isStatic: true,
        restitution: 1,
      }
    )

    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
    )

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    )

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    )

    const buttonBody = Bodies.rectangle(
      buttonX,
      buttonY,
      buttonRect.width,
      buttonRect.height,
      { isStatic: true }
    )

    // Add the boundaries to this box's physics world and start the simulation
    World.add(engine.world, [floor, ceiling, leftWall, rightWall, buttonBody])
    Runner.run(runner, engine)

    let animationFrameId = 0

    // Keep the visible React pills always in sync with the hidden Matter bodies
    const updatePillPosition = () => {
      // Turn each physics body into renderable pill data
      setRenderedPills(
        physicsPillsRef.current.map(({ id, label, color, body, width: pillWidth, height: pillHeight }) => ({
          id,
          label,
          color,
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
          width: pillWidth,
          height: pillHeight,
        }))
      )

      // Ask the browser to run this again on the next animation frame
      animationFrameId = window.requestAnimationFrame(updatePillPosition)
    }

    // Start the render-sync loop once after the physics world is set up
    updatePillPosition()

    // Stop the render loop and clear the Matter world when the box unmounts
    // so no animation or physics work is running in the background
    return () => {
      window.cancelAnimationFrame(animationFrameId)

      Runner.stop(runner)
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Visual DOM versions of the Matter pill bodies */}
      {renderedPills.map((pill) => (
        <div
          key={pill.id}
          className="absolute flex items-center justify-center whitespace-nowrap rounded-full border-2 text-sm md:text-base lg:text-lg"
          style={{
            width: `${pill.width}px`,
            height: `${pill.height}px`,
            left: `${pill.x}px`,
            top: `${pill.y}px`,
            transform: `translate(-50%, -50%) rotate(${pill.angle}rad)`,
            backgroundColor: pill.color,
            color: '#000000',
          }}
        >
          {pill.label}
        </div>
      ))}
      
      {/* Button that spawns the physics pills for this category */}
      <button
        ref={buttonRef}
        type="button"
        style={{ cursor: 'pointer' }}
        className="absolute bottom-3 left-1/2 z-10 whitespace-nowrap -translate-x-1/2 rounded-full border-2 px-4 py-2 text-sm md:text-base lg:text-lg"
        onClick={handleDropSkills}
      >
        {title}
      </button>
    </div>
  )
}

export default PhysicsSkillBox
