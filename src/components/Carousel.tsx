import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectsDetails } from '../content/projectsDetails'
import BlobButton from './BlobButton'

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
  const [selectedImage, setSelectedImage] = useState<{
    images: {
      src: string
      alt: string
    }[]
    currentIndex: number
  } | null>(null)
  const backImagesScrollRef = useRef<HTMLDivElement>(null)

  // Handle keyboard controls only while the lightbox is open
  useEffect(() => {
    if (selectedImage === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()

        setSelectedImage((currentSelection) => {
          if (currentSelection === null) {
            return null
          }

          const previousIndex =
            (currentSelection.currentIndex - 1 + currentSelection.images.length)
            % currentSelection.images.length

          return {
            ...currentSelection,
            currentIndex: previousIndex,
          }
        })
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()

        setSelectedImage((currentSelection) => {
          if (currentSelection === null) {
            return null
          }

          const nextIndex =
            (currentSelection.currentIndex + 1)
            % currentSelection.images.length

          return {
            ...currentSelection,
            currentIndex: nextIndex,
          }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  // Smoothly move the back-image row left or right by most of its visible width
  const scrollBackImages = (direction: -1 | 1) => {
    const imageRow = backImagesScrollRef.current

    if (imageRow === null) {
      return
    }

    imageRow.scrollBy({
      left: direction * imageRow.clientWidth * 0.8,
      behavior: 'smooth',
    })
  }

  const showPreviousImage = () => {
    setSelectedImage((currentSelection) => {
      if (currentSelection === null) {
        return null
      }

      const previousIndex =
        (currentSelection.currentIndex - 1 + currentSelection.images.length)
        % currentSelection.images.length

      return {
        ...currentSelection,
        currentIndex: previousIndex,
      }
    })
  }

  const showNextImage = () => {
    setSelectedImage((currentSelection) => {
      if (currentSelection === null) {
        return null
      }

      const nextIndex =
        (currentSelection.currentIndex + 1)
        % currentSelection.images.length

      return {
        ...currentSelection,
        currentIndex: nextIndex,
      }
    })
  }

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
    className="relative flex h-full w-full flex-col"
      onClick={() => {
        if (openProjectId !== null) {
          setOpenProjectId(null)
        }
      }}
  >

    {/* Blur the carousel behind an open card while keeping the card above the overlay */}
    <motion.div
      initial={false}
      animate={{
        opacity: openProjectId !== null ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[3px]"
      style={{
        pointerEvents: openProjectId !== null ? 'auto' : 'none',
      }}
    />
    
    <div className="flex h-full items-center justify-center">
      <div className="relative h-full w-full max-w-5xl">
        {orderedProjects.slice(0, 3).map((project, index) => {
          const layout = cardLayouts[index]
          const isCenterCard = index === 1
          const isOpen = openProjectId === project.id
          // Combine the front and back images into one ordered lightbox gallery
          const projectImages = [ 
            ...(project.frontImage
              ? [{
                  src: project.frontImage,
                  alt: project.frontImageAlt ?? `${project.title} project image`,
                }]
              : []),
            ...(project.backImages ?? []),
          ]

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
              className="absolute left-1/2 top-1/2 h-155 w-180 rounded-[1rem] border-2 border-white text-white"
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

                  <div className="mt-6 flex h-80 w-full items-center justify-center">
                    <button
                      type="button"
                      aria-label={`Enlarge ${project.title} image`}
                      tabIndex={isCenterCard ? 0 : -1}
                      className="inline-flex h-fit w-fit max-h-full max-w-full items-center justify-center"
                      style={{
                        cursor: isCenterCard ? 'pointer' : 'inherit',
                      }}
                      onClick={(event) => {
                        if (!isCenterCard || !project.frontImage) {
                          return
                        }

                        event.stopPropagation()

                        setSelectedImage({
                          images: projectImages,
                          currentIndex: 0,
                        })
                      }}
                    >
                      <img
                        src={project.frontImage}
                        alt={project.frontImageAlt}
                        className="block h-auto max-h-80 w-auto max-w-full object-contain"
                      />
                    </button>
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
                  
                  <BlobButton
                    type="button"
                    style={{ cursor: 'pointer' }}
                    disabled={!isCenterCard}
                    className="shrink-0 px-4 py-2 text-sm disabled:pointer-events-none disabled:opacity-0"
                    onClick={(event) => {
                      event.stopPropagation()
                      setOpenProjectId(project.id)
                    }}
                  >
                    Flip me
                  </BlobButton>
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

                        {project.backImages && project.backImages.length > 0 ? (
                          <div className="relative mx-5 mt-5">
                            {project.backImages.length > 1 ? (
                              <button
                                type="button"
                                aria-label="Scroll project images left"
                                className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl text-white transition-colors hover:bg-black/50"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  scrollBackImages(-1)
                                }}
                              >
                                &lt;
                              </button>
                            ) : null}

                            <div
                              ref={backImagesScrollRef}
                              className="project-image-scroll flex overflow-x-auto"
                            >
                              <div className="flex gap-3">
                                {project.backImages.map((image, imageIndex) => (
                                  <button
                                    key={image.src}
                                    type="button"
                                    aria-label={`Enlarge ${image.alt}`}
                                    className="shrink-0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={(event) => {
                                      event.stopPropagation()

                                      // Back images start at index 1 when the front image occupies index 0
                                      setSelectedImage({
                                        images: projectImages,
                                        currentIndex: project.frontImage
                                          ? imageIndex + 1
                                          : imageIndex,
                                      })
                                    }}
                                  >
                                    <img
                                      src={image.src}
                                      alt={image.alt}
                                      className="block max-h-60 w-auto max-w-none object-contain"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {project.backImages.length > 1 ? (
                              <button
                                type="button"
                                aria-label="Scroll project images right"
                                className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl text-white transition-colors hover:bg-black/50"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  scrollBackImages(1)
                                }}
                              >
                                &gt;
                              </button>
                            ) : null}
                          </div>
                        ) : null}

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
                      
                      <BlobButton
                        type="button"
                        style={{ cursor: 'pointer' }}
                        className="px-4 py-2 text-sm"
                        onClick={(event) => {
                          event.stopPropagation()
                          setOpenProjectId(null)
                        }}
                      >
                        Flip Back
                      </BlobButton>
                    </div>
                  </div>
                </>
              ) : null}
            </motion.article>
          )
        })}
      </div>
    </div>   

    {/* Lightbox for the projects' images */}
    <AnimatePresence> {/* Keep the lightbox mounted long enough to play its opening and closing animations */}
      {selectedImage ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged project image"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
              delay: 0.15,
            },
          }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            event.stopPropagation()
            setSelectedImage(null)
          }}
        >
          <div className="absolute left-8 right-8 top-8 z-10 flex items-center justify-between">
            <p
              aria-live="polite"
              className="pointer-events-none text-sm tabular-nums text-white/80"
            >
              {selectedImage.currentIndex + 1} / {selectedImage.images.length}
            </p>

            <button
              type="button"
              aria-label="Close enlarged image"
              className="text-3xl leading-none text-white"
              style={{ cursor: 'pointer' }}
              onClick={(event) => {
                event.stopPropagation()
                setSelectedImage(null)
              }}
            >
              x
            </button>
          </div>

          {selectedImage.images.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Show previous image"
                className="absolute left-6 top-1/2 -translate-y-1/2 text-6xl leading-none text-white"
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                  event.stopPropagation()
                  showPreviousImage()
                }}
              >
                &lt;
              </button>

              <button
                type="button"
                aria-label="Show next image"
                className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl leading-none text-white"
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                  event.stopPropagation()
                  showNextImage()
                }}
              >
                &gt;
              </button>
            </>
          ) : null}
          
          <motion.img
            src={selectedImage.images[selectedImage.currentIndex].src}
            alt={selectedImage.images[selectedImage.currentIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{
              scale: {
                type: 'spring',
                stiffness: 220,
                damping: 22,
              },
              opacity: {
                duration: 0.15,
              },
            }}
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  </div>
)
}

export default Carousel