<template>
  <Analytics />
  <div>
    <h1>Hello Home!</h1>
    <p>Das ist eine simple Komponente.</p>
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/vue';
import { ref, onMounted, watch, inject } from 'vue';

</script>

<style>
/* Optional: Styles für diese Komponente */
h1 {
  color: #42b983;
}
</style>