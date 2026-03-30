import { useRef, useState } from 'react'
import basketballSticker from '../assets/stickers/basketballSticker.png'
import bubblePop from '../assets/bubble-pop.mp3'

const About = () => {
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)
  const bubblePopAudioRef = useRef(new Audio(bubblePop))

  const handleStickerClick = () => {
    // Play a pop sound effect only when the info bubble is opening
    if (!isBubbleOpen) {
      bubblePopAudioRef.current.currentTime = 0
      void bubblePopAudioRef.current.play()
    }

    setIsBubbleOpen(!isBubbleOpen)
  }


  return (
    <section 
      id="about"
      className="h-screen snap-start p-6 md:p-10"
    >
      <div className="relative h-full w-full bg-white/5">
        <div className="absolute top-20 left-10">
          {isBubbleOpen && (
            <div className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2">
              <div className="relative inline-block max-w-xs rounded-[1rem] border-2 border-white bg-black px-4 py-3 text-center">
                <p className="text-base leading-relaxed">
                  Love basketball. Olympiakooooooos!!!! 
                </p>
                <div className="absolute left-1/2 bottom-[-0.45rem] h-4 w-4 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-white bg-black" />
              </div>
            </div>
          )}

          <button
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={handleStickerClick}
            className="block"
          >
            <img
              src={basketballSticker}
              alt="Basketball sticker"
              className="w-28 h-auto"
            />
          </button>

        </div>             

        <div className="flex h-full items-center justify-center">
          <div className="text-center"> {/* bg-blue-500/20 */}
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
