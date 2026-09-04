import { useState } from 'react'
import { motion } from 'framer-motion'
import { projectsDetails } from '../content/projectsDetails'

// Layout values for the three visible carousel positions: left and right background cards, centered active card
const cardLayouts = [
  {
    x: '-65%',
    scale: 0.85,
    rotate: -6,
    zIndex: 0,
    backgroundColor: '#111111',
  },
  {
    x: '0%',
    scale: 1,
    rotate: 0,
    zIndex: 10,
    backgroundColor: '#4F46E5',
  },
  {
    x: '65%',
    scale: 0.85,
    rotate: 6,
    zIndex: 0,
    backgroundColor: '#111111',
  },
]

const Carousel = () => {
  const [orderedProjects, setOrderedProjects] = useState(projectsDetails)

  const showPreviousProject = () => {
    setOrderedProjects((currentProjects) => {
      const lastProject = currentProjects[currentProjects.length - 1]
      const remainingProjects = currentProjects.slice(0, -1)

      return [lastProject, ...remainingProjects]
    })
  }

  const showNextProject = () => {
    setOrderedProjects((currentProjects) => {
      const firstProject = currentProjects[0]
      const remainingProjects = currentProjects.slice(1)

      return [...remainingProjects, firstProject]
    })
  }

  return (
  <div className="flex h-full w-full flex-col pb-6 md:pb-10">

    {/* Top part of the screen for the carousel cards*/}
    <div className="flex h-[85%] items-center justify-center">
      <div className="relative h-full w-full max-w-5xl">
        {orderedProjects.slice(0, 3).map((project, index) => {
          const layout = cardLayouts[index]

          return (
            <motion.article
              key={project.id}
              className="absolute left-1/2 top-1/2 flex h-130 w-140 flex-col justify-between border-2 border-white p-8 text-white"
              // Framer Motion animates the carousel movement
              transition={{
                type: 'spring',
                stiffness: 250, // Controls how strongly the animation is pulled toward its target, more stiff = faster/snappier
                damping: 15, // Controls how much the motion is slowed down, less damping = more bounce
              }}
              animate={{
                x: layout.x,
                scale: layout.scale,
                rotate: layout.rotate,
                zIndex: layout.zIndex,
                backgroundColor: layout.backgroundColor,
              }}
              // Keep centering separate from animated x so Framer Motion does not overwrite the -50% offset
              style={{
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <div>
                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mt-6 text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-left text-sm">
                  {project.tags.map((tag) => (
                    <span key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>

    {/* Bottom part of the screen for the carousel controls area*/}
    <div className="flex h-[15%] items-end justify-center gap-8 pb-3">
      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm md:text-base lg:text-lg"
        onClick={showPreviousProject}
      >
        &larr;
      </button>

      <button
        type="button"
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm md:text-base lg:text-lg"
        onClick={showNextProject}
      >
        &rarr;
      </button>
    </div>

  </div>
)
}

export default Carousel