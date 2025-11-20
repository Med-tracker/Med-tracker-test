<script setup>
import { useThemeStore } from './stores/theme.js';
import MedicationHome from './views/MedicationHome.vue';

const themeStore = useThemeStore();

</script>

<template>
  <div>
    <div class="header">
    <img src="../public/logo.svg" />
      <h1>Bienvenu sur MedTracker</h1>
    </div>
    <h3>Votre application de suivi des prises de médicaments</h3>
  </div>

   <MedicationHome/>

    <button @click="themeStore.toggleTheme()" class="theme-btn">
      {{ themeStore.theme === 'light' ? "🌙" : "☀️" }}
    </button>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

h3{
  text-align: center;
  justify-content: center;
  color: #555;
}

.theme-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;

  padding: 10px 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: var(--theme-btn-bg); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  font-size: 20px;
  transition: 0.2s ease;
}

.theme-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
}

</style>