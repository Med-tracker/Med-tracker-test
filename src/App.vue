<script setup>
import MedsList from './components/MedsList.vue';
</script>

<template>
  <div>

    <div class="header">
    <img src="../public/logo.svg" />
      <h1>Bienvenu sur MedTracker</h1>
    </div>
    <h3>Votre application de suivi des prises de médicaments</h3>
  </div>

   <MedsList/>
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