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
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" widht="40px" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>


  </div>

    <div v-else class="text-wrapper">
      <div class="chat-header">
         <div></div>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" widht="40px" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
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
