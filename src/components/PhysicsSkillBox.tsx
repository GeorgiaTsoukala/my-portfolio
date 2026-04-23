import { useEffect, useRef, useState } from 'react'
import { Bodies, Engine, Runner, World, type Body } from 'matter-js'

type PhysicsSkillBoxProps = {
  title: string
  skills: string[]
}

type RenderedSkillPill = {
  id: string
  text: string
  x: number
  y: number
  angle: number
  width: number
  height: number
}


const PhysicsSkillBox = ({ title, skills }: PhysicsSkillBoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)
  const pillBodiesRef = useRef<
    Array<{ id: string; text: string; body: Body; width: number; height: number }>
  >([])

  const [renderedPills, setRenderedPills] = useState<RenderedSkillPill[]>([])

  const getPillWidth = (text: string) => Math.max(90, text.length * 10 + 32)

  const handleDropSkills = () => {
    if (!engineRef.current || !containerRef.current) {
      return
    }

    const { width } = containerRef.current.getBoundingClientRect()
    const pillHeight = 40

    // Remove any older bodies before dropping a fresh set for this category.
    pillBodiesRef.current.forEach(({ body }) => {
      World.remove(engineRef.current!.world, body)
    })

    // Create one Matter body per skill and drop them near the top of the box.
    const newBodies = skills.map((skill, index) => {
      const pillWidth = getPillWidth(skill)

      const body = Bodies.rectangle(
        width / 2 + (Math.random() * 60 - 30),
        40 + index * 10,
        pillWidth,
        pillHeight,
        {
          restitution: 0.4,
          friction: 0.2,
          frictionAir: 0.02,
        }
      )

      return {
        id: `${title}-${skill}-${index}`,
        text: skill,
        body,
        width: pillWidth,
        height: pillHeight,
      }
    })

    pillBodiesRef.current = newBodies
    World.add(engineRef.current.world, newBodies.map((pill) => pill.body))
  }

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Get the current rendered size of the box so the physics world matches the real DOM element on screen
    const { width, height } = containerRef.current.getBoundingClientRect()

    // Create one Matter engine and runner for this specific box
    const engine = Engine.create()
    const runner = Runner.create()

    engineRef.current = engine
    runnerRef.current = runner

    // Thickness of the invisible boundary bodies that keep pills inside the box
    const wallThickness = 40

    // Create invisible static boundaries so future pills stay inside the box
    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
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

    // Add the boundaries to this box's physics world and start the simulation
    World.add(engine.world, [floor, ceiling, leftWall, rightWall])
    Runner.run(runner, engine)

    let animationFrameId = 0

    // Sync each Matter body's live position back into React state
    // so we can render the pills as normal DOM elements.
    const updatePillPosition = () => {
      setRenderedPills(
        pillBodiesRef.current.map(({ id, text, body, width: pillWidth, height: pillHeight }) => ({
          id,
          text,
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
          width: pillWidth,
          height: pillHeight,
        }))
      )

      animationFrameId = window.requestAnimationFrame(updatePillPosition)
    }

    updatePillPosition()


    // Stop the render loop and clear the Matter world when the box unmounts
    // so we do not leave animation or physics work running in the background.
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
      className="relative overflow-hidden border"
    >
      {/* Visual DOM versions of the Matter pill bodies */}
      {renderedPills.map((pill) => (
        <div
          key={pill.id}
          className="absolute rounded-full border-2 px-4 py-2 text-sm"
          style={{
            width: `${pill.width}px`,
            height: `${pill.height}px`,
            left: `${pill.x}px`,
            top: `${pill.y}px`,
            transform: `translate(-50%, -50%) rotate(${pill.angle}rad)`,
          }}
        >
          {pill.text}
        </div>
      ))}
      
      {/* Button that spawns the physics pills for this category */}
      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border-2 px-4 py-2 text-sm md:text-base"
        onClick={handleDropSkills}
      >
        {title}
      </button>
    </div>
  )
}

export default PhysicsSkillBox
