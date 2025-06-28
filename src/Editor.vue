<template>
  <div>
    <Analytics />
    <h1>Hello Editor!</h1>
    <p>Das ist eine simple Komponente.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue';

import { Analytics } from '@vercel/analytics/vue';

</script>

<style>
/* Optional: Styles für diese Komponente */
h1 {
  color: #42b983;
}
</style>