<script setup>
import { ref, onMounted, watch, inject } from 'vue';
import ChatContent from './components/chat-content.vue';

const fChatData = inject('fChatData')
const iconSrc = inject('iconSrc'); // NEU

const isRectangle = ref(false);
const parentWidth = ref(window.innerWidth);

// Empfange Breite vom Elternfenster
window.addEventListener('message', (event) => {
  if (event.data.type === 'parentWidth') {
    parentWidth.value = event.data.width;
    if (isRectangle.value) {
      const maxWidth = Math.min(350, parentWidth.value - 40);
      sendSize(maxWidth, 550);
    }
  }
});

function toggleShape() {
  isRectangle.value = !isRectangle.value;
  if (isRectangle.value) {
    // Erst nach Breite fragen
    window.parent.postMessage({ type: 'getWidth' }, '*');
  } else {
    setTimeout(() => {
      sendSize(65, 65);
    }, 500);
  }
}

function nothing() {
  // Do nothing
}

onMounted(() => {
  sendSize(65, 65);

});


function sendSize(width, height) {
  window.parent.postMessage(
    {
      type: 'resize',
      width,
      height
    },
    '*'
  );
}
</script>

<template>
  <div id="chaticon"
    :style="{
      borderRadius: isRectangle ? '20px' : '35px',
      width: isRectangle ? '350px' : '65px',
      height: isRectangle ? '550px' : '65px',
      maxWidth: isRectangle ? 'calc(100%)' : '65px',
      maxHeight: isRectangle ? 'calc(100%)' : '65px',
      backgroundColor: isRectangle ? 'var(--chat-background)' : 'var(--chat-background)',
      transition: 'border-radius 0.7s ease, width 0.5s ease, height 0.5s ease, background-color 0.5s ease, max-width 0.5s ease, max-height 0.5s ease, right 0.9s ease',
      cursor: isRectangle ? '' : 'pointer',
    }"

    @click="isRectangle ? nothing() : toggleShape()"
  >
  <div v-if="!isRectangle" class="icon-wrapper">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
  <!-- Sprechblase -->
  <path d="M21 6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11l3-3h13a2 2 0 0 0 2-2V6z" fill="currentColor" />

  <!-- Drei weiße Punkte etwas höher -->
  <circle cx="9" cy="9.5" r="1.2" fill="white"/>
  <circle cx="12" cy="9.5" r="1.2" fill="white"/>
  <circle cx="15" cy="9.5" r="1.2" fill="white"/>

</svg>

  </div>

    <div v-else class="text-wrapper">
      <div class="chat-header">
         <div></div>
            <svg id="svgLOGO" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11l3-3h13a2 2 0 0 0 2-2V6z"/>
              <circle cx="9" cy="9.5" r="1.2" fill="white"/>
              <circle cx="12" cy="9.5" r="1.2" fill="white"/>
              <circle cx="15" cy="9.5" r="1.2" fill="white"/>
          </svg>
        <button id="closeButton" @click.stop="toggleShape()">x</button>
      </div>
      <div class="chat-content">
        <ChatContent :fProp="fChatData" />
      </div>
    </div>
  </div>
</template>
<style scoped>

#chaticon {
  position: fixed;
  bottom: 0px;
  right: 0px;
  background-color: var(--chat-logo-color);
  overflow: hidden;
}

.icon-wrapper {
  display: flex; justify-content: center; align-items: center;
  position: relative;
  bottom: -12px;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#svgLOGO{
  position: absolute;
  top: calc(50% + 6px);
  left: 50%;
  transform: translate(-50%, -50%);
}

.chat-header {
  background-color: var(--chat-header);
  padding: 0.8rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--chat-box-shadow);
  z-index: 1;
  position: relative;
}



.chat-content {
  flex-grow: 1;  
  background-color: var(--chat-background);
  padding: 0rem 0.8rem 0rem 0.8rem;
  font-size: 1rem;
  overflow-y: auto;
}

/*
.chat-footerl {
  position: absolute;
  bottom: 0.8rem;
  width: calc(50% - 3rem);
  left: 1rem;
  background-color: var(--chat-adbuttons);
  padding: 0.8rem 0rem 0.8rem 0rem;
  font-size: 16px;
  text-align: center;
  border-radius: 0.5rem;
}

.chat-footerr {
  position: absolute;
  bottom: 0.8rem;
  width: calc(50% - 3rem);
  right: 1rem;
  background-color: var(--chat-adbuttons);
  padding: 0.8rem 0rem 0.8rem 0rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 0.5rem;
}
*/

#closeButton {
  width: 2rem;           /* z. B. 32x32 für Quadrat */
  height: 2rem;
  background: var(--close-button-bg);
  border: none;
  border-radius: 0.25rem;    /* leicht abgerundet, optional */
  color: var(--close-button-color);
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--chat-box-shadow);
  padding: 0;
}
</style>
