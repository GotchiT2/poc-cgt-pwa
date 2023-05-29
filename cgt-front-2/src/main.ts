import './app.css'
import App from './App.svelte'

navigator.serviceWorker.register('/sw.js').then(
  (registration) => {
    console.log('Service worker registration succeeded:', registration)
  },
    /*catch*/ (error) => {
       console.log('Service worker registration failed:', error)
  }
)

const app = new App({
  target: document.getElementById('app'),
})

export default app
