import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const ENABLE_STRICT_MODE = import.meta.env.VITE_STRICT_MODE === 'true';

ReactDOM.createRoot(document.getElementById('root')).render(
    // NOTE: @react-three/cannon can break under React StrictMode in dev because of double-mounting.
    // Keep StrictMode opt-in via VITE_STRICT_MODE='true'.
    ENABLE_STRICT_MODE ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    ),
)
