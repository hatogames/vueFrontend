<template>
  <span class="option" :style="{
    opacity: isMounted ? '1' : '0',
    transform: isMounted ? '' : 'translateX(100px)',
    backgroundColor: isMounted ? 'var(--chatO-color)' : 'transparent',
    transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease'
  }" @click="handleClick(id)">
    <span v-html="text"></span>
  </span>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isMounted = ref(false);

const emit = defineEmits(['select']);

defineProps({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

function handleClick(id) {
  emit('select', id);
}

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 300);
});
</script>

<style scoped>
.option {
  box-shadow: var(--chat-box-shadow);
  display: block;
  padding: 10px;
  border-radius: var(--chatO-border-radius);
  margin: 10px 0;
  cursor: pointer;
  font-size: 1rem;
  transform: translateX(0);
  transition: all 0.3s ease;
  z-index: 9999;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
}

</style>