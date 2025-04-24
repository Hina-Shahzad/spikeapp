import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InteractiveSVG from './InteractiveSVG.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InteractiveSVG />
  </StrictMode>,
)
