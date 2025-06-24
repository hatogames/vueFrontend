import { createApp, ref } from 'vue'
import App from './App.vue'
import './style.css'

const fChatData = ref([])
const iconSrc = ref("");
const themeColors = ref({
  '--chat-logo-color': 'rgb(149, 190, 202)',
  '--chat-background': 'rgb(255, 255, 255)',
  '--chat-header': 'rgb(212, 235, 255)',
  '--chat-bot': 'rgb(184, 184, 184)',
  '--close-button-bg': 'rgb(255, 255, 255)',
  '--close-button-color': 'rgb(145, 145, 145)',
  '--chatO-border-radius': '13px',
  '--chatE-border-radius': '7px',
  '--chatO-color': 'rgb(186, 233, 227)',
  '--chatEu-color': 'rgb(191, 222, 255)',
  '--chatEs-color': 'rgb(216, 216, 216)',
  '--chat-box-shadow': '0 6px 20px rgba(0, 0, 0, 0.1)',
})

const app = createApp(App)
app.provide('fChatData', fChatData)
app.provide('themeColors', themeColors)
app.provide('iconSrc', iconSrc);

const listener = (event) => {
  fChatData.value = event.data.fData
    if (event.data.iconSrc) {
    iconSrc.value = event.data.iconSrc;
  }

  // CSS-Variablen aus cssData anwenden, falls vorhanden
  if (event.data.cssData) {
    Object.entries(event.data.cssData).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }

  // App nur mounten, wenn sie noch nicht gemountet ist!
  if (!app._container) {
    app.mount('#app')
  }
  window.removeEventListener('message', listener)
}

window.addEventListener('message', listener)