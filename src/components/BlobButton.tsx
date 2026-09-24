import { useId } from 'react'
import type { ComponentPropsWithRef } from 'react'

type BlobButtonProps = ComponentPropsWithRef<'button'>

const BlobButton = ({
  children,
  className = '',
  type = 'button',
  ...props
}: BlobButtonProps) => {
  const filterId = `blob-goo-${useId().replace(/:/g, '')}`

  return (
    <button
      {...props}
      type={type}
      className={`blob-button ${className}`}
    >
      <span className="blob-button__label">{children}</span>

      <span className="blob-button__inner" aria-hidden="true">
        <span
          className="blob-button__blobs"
          style={{ filter: `url("#${filterId}")` }}
        >
          <span className="blob-button__blob" />
          <span className="blob-button__blob" />
          <span className="blob-button__blob" />
          <span className="blob-button__blob" />
        </span>
      </span>

      <svg
        className="blob-button__filter"
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 21 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </button>
  )
}

export default BlobButton