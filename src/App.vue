<script setup>
import MedicationHome from './views/MedicationHome.vue';

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
</style>