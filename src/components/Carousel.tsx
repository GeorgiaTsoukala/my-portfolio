import { useState } from 'react'
import { motion } from 'framer-motion'
import { projectsDetails } from '../content/projectsDetails'

// Layout values for the three visible carousel positions: left and right background cards, centered active card
const cardLayouts = [
  {
    x: '-55%',
    y: '0%',
    scale: 0.85,
    rotate: -6,
    zIndex: 0,
  },
  {
    x: '0%',
    y: '0%',
    scale: 1,
    rotate: 0,
    zIndex: 10,
  },
  {
    x: '55%',
    y: '0%',
    scale: 0.85,
    rotate: 6,
    zIndex: 0,
  },
]

const Carousel = () => {
  const [orderedProjects, setOrderedProjects] = useState(projectsDetails)
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)

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
    <div className="flex h-[90%] items-center justify-center">
      <div className="relative h-full w-full max-w-5xl">
        {orderedProjects.slice(0, 3).map((project, index) => {
          const layout = cardLayouts[index]
          const isCenterCard = index === 1
          const isOpen = openProjectId === project.id

          return (
            <motion.article
              key={project.id}
              className="absolute left-1/2 top-1/2 h-150 w-180 border-2 border-white text-white"
              // Framer Motion animates the carousel movement
              transition={{
                type: 'spring',
                stiffness: 250, // Controls how strongly the animation is pulled toward its target, more stiff = faster/snappier
                damping: 15, // Controls how much the motion is slowed down, less damping = more bounce
              }}
              animate={{
                x: layout.x,
                y: isOpen ? '7.5vh' : layout.y,
                scale: isOpen ? 1.15 : layout.scale, // if this card is open, make it bigger
                rotate: layout.rotate,
                rotateY: isOpen ? 180 : 0, // make the card flip around the Y axis when it opens
                zIndex: isOpen ? 50 : layout.zIndex, // if this card is open, bring it in front of everything
                backgroundColor: project.color,
                opacity: isCenterCard ? 1 : 0.6,
              }}
              // Keep centering separate from animated x so Framer Motion does not overwrite the -50% offset
              style={{
                translateX: '-50%',
                translateY: '-50%',
                transformStyle: 'preserve-3d', // keep the front and back faces in 3D space
              }}
            >
              {/* Front face of the card */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >                
                <div>
                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <div className="mt-6 flex h-48 items-center justify-center border-2 border-white/70">
                    <span className="text-sm text-white/70">
                      Project image
                    </span>
                  </div>

                  <p className="mt-6 text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-x-3 gap-y-2 text-left text-sm">
                    {project.tags.map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    style={{ cursor: 'pointer' }}
                    disabled={!isCenterCard}
                    className="shrink-0 rounded-full border-2 border-white px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-0"
                    onClick={() => setOpenProjectId(project.id)}
                  >
                    Flip me
                  </button>
                </div>   
              </div>   

              {/* Back face of the card */}  
              <div
                className="absolute inset-0 flex flex-col justify-between p-8"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <p className="mt-6 text-base leading-relaxed">
                    More project details will go here.
                  </p>
                </div>

                <button
                  type="button"
                  style={{ cursor: 'pointer' }}
                  className="self-end rounded-full border-2 border-white px-4 py-2 text-sm"
                  onClick={() => setOpenProjectId(null)}
                >
                  Flip Back
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>

    {/* Bottom part of the screen for the carousel controls area*/}
    <div className="flex h-[10%] items-end justify-center gap-8 pb-3">
      <button
        type="button"
        disabled={openProjectId !== null}
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-30 md:text-base lg:text-lg"
        onClick={showPreviousProject}
      >
        &larr;
      </button>

      <button
        type="button"
        disabled={openProjectId !== null}
        style={{ cursor: 'pointer' }}
        className="rounded-full border-2 px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-30 md:text-base lg:text-lg"
        onClick={showNextProject}
      >
        &rarr;
      </button>
    </div>

  </div>
)
}

export default Carousel