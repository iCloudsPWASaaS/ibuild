import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css";

import App from "./app/App.tsx";

document.documentElement.classList.add("dark");
localStorage.setItem("theme", "dark");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
