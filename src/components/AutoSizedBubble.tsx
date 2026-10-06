import { useLayoutEffect, useRef } from 'react'
import type { AboutSticker } from '../content/aboutStickers'

type AutoSizedBubbleProps = {
  sticker: AboutSticker
}

const AutoSizedBubble = ({ sticker }: AutoSizedBubbleProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const bubble = bubbleRef.current
    const paragraph = textRef.current

    if (!wrapper || !bubble || !paragraph) return

    let disposed = false

    const measureBubble = () => {
      if (disposed) return

      const styles = getComputedStyle(bubble)
      const horizontalSpace =
        parseFloat(styles.paddingLeft) +
        parseFloat(styles.paddingRight) +
        parseFloat(styles.borderLeftWidth) +
        parseFloat(styles.borderRightWidth)

      const availableWidth = wrapper.getBoundingClientRect().width
      const layoutWidth = Math.max(0, availableWidth - horizontalSpace)

      // Keep the text's layout width stable to preserve balanced line breaks.
      paragraph.style.width = `${layoutWidth}px`

      // Measure the rendered text, including inline links.
      const range = document.createRange()
      range.selectNodeContents(paragraph)

      const textWidth = range.getBoundingClientRect().width
      const bubbleWidth = Math.min(
        availableWidth,
        Math.ceil(textWidth + horizontalSpace),
      )

      bubble.style.width = `${bubbleWidth}px`
    }

    measureBubble()

    // Update when the available width changes.
    const observer = new ResizeObserver(measureBubble)
    observer.observe(wrapper)

    // Measure again once the custom font has loaded.
    void document.fonts.ready.then(measureBubble)

    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [sticker])

  return (
    <div
      ref={wrapperRef}
      className={`absolute left-1/2 z-30 w-[min(20rem,calc(100vw-3rem))] -translate-x-1/2 text-center ${
        sticker.bubbleSide === 'top'
          ? 'bottom-full mb-4'
          : 'top-full mt-4'
      }`}
    >
      <div
        ref={bubbleRef}
        className="relative inline-block max-w-full rounded-[1rem] border-2 border-white bg-black px-4 py-3 text-left align-top"
      >
        {/* Contain unused paragraph width without clipping the arrow. */}
        <div className="overflow-hidden">
          <p
            ref={textRef}
            className="text-balance whitespace-normal break-words leading-relaxed"
          >
            {sticker.text}
            {sticker.link ? (
              <>
                {' '}
                <a
                  href={sticker.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                  style={{ cursor: 'pointer' }}
                >
                  {sticker.link.label}
                </a>
              </>
            ) : null}
            {sticker.textAfterLink}
          </p>
        </div>

        {/* Bubble arrow */}
        <div
          aria-hidden="true"
          className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-black ${
            sticker.bubbleSide === 'top'
              ? 'bottom-[-0.45rem] border-r-2 border-b-2 border-white'
              : 'top-[-0.45rem] border-l-2 border-t-2 border-white'
          }`}
        />
      </div>
    </div>
  )
}

export default AutoSizedBubble