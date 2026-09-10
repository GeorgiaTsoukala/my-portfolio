import { useState } from 'react'
import { motion } from 'framer-motion'
import { projectsDetails } from '../content/projectsDetails'

// Layout values for the three visible carousel positions: left and right background cards, centered active card
const cardLayouts = [
  {
    x: '-50%',
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
    x: '50%',
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

  const handleCardClick = (index: number) => {
    if (openProjectId !== null) {
      return
    }

    if (index === 0) {
      showPreviousProject()
    }

    if (index === 2) {
      showNextProject()
    }
  }

  return (
  <div 
    className="flex h-full w-full flex-col"
      onClick={() => {
        if (openProjectId !== null) {
          setOpenProjectId(null)
        }
      }}
  >
    <div className="flex h-full items-center justify-center">
      <div className="relative h-full w-full max-w-5xl">
        {orderedProjects.slice(0, 3).map((project, index) => {
          const layout = cardLayouts[index]
          const isCenterCard = index === 1
          const isOpen = openProjectId === project.id

          return (
            <motion.article
              key={project.id}
              onClick={(event) => {
                if (isOpen) {
                  event.stopPropagation()
                }

                handleCardClick(index)
              }}
              whileHover={
                !isCenterCard && openProjectId === null
                  ? { opacity: 0.8 }
                  : undefined
              }
              className="absolute left-1/2 top-1/2 h-155 w-180 border-2 border-white text-white"
              // Framer Motion animates the carousel movement
              transition={{
                type: 'spring',
                stiffness: 250, // Controls how strongly the animation is pulled toward its target, more stiff = faster/snappier
                damping: 15, // Controls how much the motion is slowed down, less damping = more bounce
              }}
              animate={{
                x: layout.x,
                y: layout.y,
                scale: isOpen ? 1.15 : layout.scale, // if this card is open, make it bigger
                rotate: layout.rotate,
                rotateY: isOpen ? 180 : 0, // make the card flip around the Y axis when it opens
                zIndex: isOpen ? 50 : layout.zIndex, // if this card is open, bring it in front of everything
                backgroundColor: project.color,
                opacity: isCenterCard ? 1 : 0.6,
              }}
              // Keep centering separate from animated x so Framer Motion does not overwrite the -50% offset
              style={{
                cursor: !isCenterCard && openProjectId === null ? 'pointer' : 'default', 
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
                    onClick={(event) => {
                      event.stopPropagation()
                      setOpenProjectId(project.id)
                    }}
                  >
                    Flip me
                  </button>
                </div>   
              </div>   

              {/* Back face of the card */}  
              {isOpen ? (
                <>
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-8"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="flex min-h-0 flex-1 flex-col">
                      <h2 className="text-2xl font-bold">
                        {project.title}
                      </h2>

                      <div className="project-scroll mt-5 min-h-0 flex-1 overflow-y-auto pr-2">
                        <section>
                          <p className="text-sm leading-relaxed">
                            {project.overview}
                          </p>
                        </section>

                        <div className="mt-5 flex h-32 items-center justify-center border-2 border-white/70">
                          <span className="text-sm text-white/70">
                            Project photos
                          </span>
                        </div>

                        <section className="mt-5">
                          <h3 className="text-xs uppercase tracking-wide text-white/70">
                            Behind the scenes
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed">
                            {project.buildDetails}
                          </p>
                        </section>

                        <section className="mt-5">
                          <h3 className="text-xs uppercase tracking-wide text-white/70">
                            Testing
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed">
                            {project.testing}
                          </p>
                        </section>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-6">
                      <div>
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            style={{ cursor: 'pointer' }}
                            className="cursor-pointer text-sm underline"
                          >
                            GitHub repo
                          </a>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        style={{ cursor: 'pointer' }}
                        className="rounded-full border-2 border-white px-4 py-2 text-sm"
                        onClick={(event) => {
                          event.stopPropagation()
                          setOpenProjectId(null)
                        }}
                      >
                        Flip Back
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </motion.article>
          )
        })}
      </div>
    </div>   
  </div>
)
}

export default Carousel