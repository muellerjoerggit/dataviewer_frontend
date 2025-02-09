import React from 'react'
import ReactDOM from 'react-dom/client'
import FeatureApp from './FeatureApp.tsx'
import '../../reactApp.css'

ReactDOM.createRoot(document.getElementById('feature')!).render(
  <React.StrictMode>
    <FeatureApp />
  </React.StrictMode>
)
