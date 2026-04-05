import { useRef, useState } from 'react'
import { aboutStickers } from '../content/aboutStickers'
import bubblePop from '../assets/bubble-pop.mp3'

const About = () => {
  const [openStickerId, setOpenStickerId] = useState<string | null>(null)
  const bubblePopAudioRef = useRef(new Audio(bubblePop))

  const handleStickerClick = (stickerId: string) => {
    // Play a pop sound effect only when a new sticker is clicked and info bubble is opening
    if (openStickerId !== stickerId) {
      bubblePopAudioRef.current.currentTime = 0
      void bubblePopAudioRef.current.play()
    }

    setOpenStickerId(stickerId)
  }


  return (
    <section
      id="about"
      className="h-screen snap-start p-6 md:p-10"
    >
      <div className="relative h-full w-full">

        {/* Create one sticker block per object in aboutStickers array*/}
        {aboutStickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`absolute ${sticker.position} ${openStickerId === sticker.id ? 'z-20' : 'z-10'}`}
          >
            {/* Clickable sticker */}
            <button
              type="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleStickerClick(sticker.id)}
              className="block"
            >
              <img
                src={sticker.image}
                alt={sticker.alt}
                className={`h-auto ${sticker.size} ${sticker.rotation}`}
              />
            </button>

            {/* Show info bubble of the pressed sticker */}
            {openStickerId === sticker.id && (
              <div
                className={`absolute left-1/2 z-30 -translate-x-1/2 ${
                  sticker.bubbleSide === 'top'
                    ? 'bottom-full mb-4'
                    : 'top-full mt-4'
                }`}
              >
                <div className="relative inline-block max-w-[clamp(12rem,28vw,22rem)] rounded-[1rem] border-2 border-white bg-black px-4 py-3 text-center">
                  <p className="text-[clamp(0.9rem,1.3vw,1.35rem)] leading-relaxed">
                    {sticker.text}{' '}
                    {sticker.link ? (
                      <a
                        href={sticker.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                        style={{ cursor: 'pointer' }}
                      >
                        {sticker.link.label}
                      </a>
                    ) : null}
                  </p>
                  <div
                    className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-black ${
                      sticker.bubbleSide === 'top'
                        ? 'bottom-[-0.45rem] border-r-2 border-b-2 border-white'
                        : 'top-[-0.45rem] border-l-2 border-t-2 border-white'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              The more you click around,
              <br />
              the more you find out!
            </h2>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
