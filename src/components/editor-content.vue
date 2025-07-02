<script setup>
import { ref } from 'vue';

const elements = ref([
  {
    id: 1,
    q: "Ich habe eine Frage zum Unternehmerbereich.",
    a: "Was für ein Problem hast du?",
    c: [2, 3]
  },
  {
    id: 2,
    q: "Ich habe eine Frage zum Bewerben.",
    a: "Was genau ist deine Frage?",
    c: [1, 4]
  }
]);
</script>

<template>
  <div id="divMain">
    <div class="style-list">

    </div>
    <div class="element-list">
      <div v-for="(element, index) in elements" :key="element.id" class="element-card">

        <div class="header">
          
          <div class="id">{{ element.id }} 
          </div>

          <button class="edit-btn" title="Löschen">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="36" height="36"viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </button>

        </div>

        
        <div class="q">Q {{ element.q }}</div>
        <div class="a">Antwort (a): {{ element.a }}</div> 
        <div class="c">Nächste Optionen (c): 
          <ul>
            <li v-for="(opt, i) in element.c" :key="i">{{ opt }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
#divMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.5em; /* 150% */
}
.element-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px; /* 16px * 1.5 */
  margin: 18px 0; /* 12px * 1.5 */
  background: #f9f9f9;
  max-width: 60vw; /* 40vw * 1.5 */
  width: 600px;    /* 400px * 1.5 */
  box-shadow: 0 3px 12px rgba(0,0,0,0.06); /* etwas größer */
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px; /* 8px * 1.5 */
  background-color: rgb(255, 219, 120);
  border-radius: 18px; /* 12px * 1.5 */
}

.id{
  font-size: 30px; /* 20px * 1.5 */
  width: 60px;      /* 40px * 1.5 */
  height: 60px;     /* 40px * 1.5 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn {
  background: transparent;
  border: none;
  font-size: 33px; /* 22px * 1.5 */
  cursor: pointer;
  width: 60px;     /* 40px * 1.5 */
  height: 60px;    /* 40px * 1.5 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.q, .a, .c {
  font-size: 1.5em;
}
</style>