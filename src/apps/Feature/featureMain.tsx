import React from 'react'
import ReactDOM from 'react-dom/client'
import FeatureApp from './featureApp.tsx'
import '../reactApp.css'

ReactDOM.createRoot(document.getElementById('Feature')!).render(
  <React.StrictMode>
    <FeatureApp />
  </React.StrictMode>
)
