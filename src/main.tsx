import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CursorifyProvider } from '@cursorify/react'
import { EmojiCursor } from '@cursorify/cursors'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CursorifyProvider
      enabled={true}
      cursor={<EmojiCursor />}
      delay={2}
      opacity={1}
      defaultCursorVisible={false}
      breakpoint={997}
    >
      <App />
    </CursorifyProvider>
  </StrictMode>,
)
