<script setup>
import { ref, onMounted, watch } from 'vue';
import ChatElement from './chat-element.vue';
import ChatOption from './chat-option.vue';

const props = defineProps({
  fProp: {
    type: Array,
    required: false,
    default: () => []
  }
});

const fData = ref([]);
const history = ref([]);
const EData = ref([]);
const isLoading = ref(true);
const visibleOptions = ref([]);
const chatContainer = ref(null);


watch(history, (newValue) => {

  const startElement = fData.value.find(item => 's' in item);
  
  if (!startElement) {
    console.error('No start element found in fData');
    return;
  }

  try {
    var newElements = [];
    newElements.push({ type: "bot", message: startElement.s });

    history.value.forEach(element => {
      var next = fData.value.find(obj => obj.id == element);
      if (next) {
        newElements.push({ type: "user", message: next.q });
        newElements.push({ type: "bot", message: next.a });
      }
    });
    
    EData.value = newElements;
    nextOptionsFUNC();
  } catch (error) {
    console.error('Error processing chat data:', error);
  }
}, { deep: true });

onMounted(async () => {
  try {
    // Get initial data from store
    fData.value = props.fProp || [];
    history.value = [];
  } catch (error) {
    console.error('Error during component mount:', error);
  } finally {
    isLoading.value = false;
  }
});

function scrollToBottom() {
  if (chatContainer.value) {
    setTimeout(() => {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight + 1000,
        behavior: 'smooth'
      });
    }, 10);
  }
}

watch([EData, visibleOptions], () => {
  scrollToBottom();
});

// Update nextOptionsFUNC with error handling
function nextOptionsFUNC() {

  try {
    let options = [];

    if (history.value.length === 0) {
      const start = fData.value.find(item => 's' in item);
      if (!start || !start.c) {
        visibleOptions.value = [];
        return;
      }

      options = start.c
        .map(id => {
          const match = fData.value.find(item => item.id == id.toString());
          return match ? {
            id: id.toString(),
            q: match.q
          } : null;
        })
        .filter(Boolean);
    } else {
      const lastId = history.value[history.value.length - 1];
      const lastElement = fData.value.find(item => item.id == lastId);
      if (!lastElement || !lastElement.c) {
        visibleOptions.value = [];
        return;
      }

      options = lastElement.c
        .map(id => {
          const match = fData.value.find(item => item.id == id.toString());
          return match ? {
            id: id.toString(),
            q: match.q
          } : null;
        })
        .filter(Boolean);
    }

    visibleOptions.value = options;
  } catch (error) {
    console.error('Error in nextOptionsFUNC:', error);
    visibleOptions.value = [];
  }
}

function addToHistory(id) {
  history.value.push(id);
}

</script>

<template>
  <div class="chat-inner" ref="chatContainer">
    <div class="spacer"></div>
    <ChatElement
      v-for="(item, index) in EData"
      :key="index"
      :type="item.type"
    >
      <span v-html="item.message"></span>
    </ChatElement>
    <ChatOption
      v-for="opt in visibleOptions"
      :key="opt.id"
      :id="opt.id"
      :text="opt.q"
      @select="addToHistory"
    />
    <div class="scrollSpace"></div>
  </div>
</template>

<style scoped>
.spacer {
  height: 0.8rem;
}
.chat-inner {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollSpace{
  height: calc(0.8rem + 0.8rem + 0.8rem + 0.8rem + 0.8rem)
}

.chat-inner::-webkit-scrollbar {
  display: none;
}
</style>
