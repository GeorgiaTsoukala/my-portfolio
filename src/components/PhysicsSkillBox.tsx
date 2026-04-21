import { useEffect, useRef, useState } from 'react'
import { Bodies, Engine, Runner, World } from 'matter-js'

type PhysicsSkillBoxProps = {
  title: string
  skills: string[]
}

const PhysicsSkillBox = ({ title, skills }: PhysicsSkillBoxProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)

  const [isActive, setIsActive] = useState(false)

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

    // Clean up the engine and runner when the component unmounts so we do not leave background physics processes running
    return () => {
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

      {/* Category Button */}
      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border-2 px-4 py-2 text-sm md:text-base"
        onClick={() => setIsActive((current) => !current)}
      >
        {title}
      </button>

      {/* Skills that drop in each category */}
      {isActive && (
        <div className="absolute inset-0">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="absolute rounded-full border-2 px-4 py-2 text-sm"
              style={{
                left: `${20 + index * 18}px`,
                top: `${20 + index * 42}px`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

    </div>
  )
}

export default PhysicsSkillBox