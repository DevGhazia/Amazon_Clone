import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'
import { Provider } from 'react-redux'
import {store} from "./store.ts"
import ScrollToTheTop from './components/ScrollToTheTop.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <Router>
        <ScrollToTheTop/>
        <App />
      </Router>
    </Provider>
)

