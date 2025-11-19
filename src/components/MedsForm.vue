<template>
  <div class="modal-overlay" @click.self="$emit('close')">

    <div class="modal">
      <h3>Ajouter un médicament</h3>

      <form @submit.prevent="submit">

        <label>Nom du médicament</label>
        <input v-model="localForm.name" type="text" required />

        <label>Dose</label>
        <input v-model="localForm.dose" type="text" required />

        <label>Fréquence</label>
        <select v-model="localForm.frequency">
          <option value="1">1x / jour</option>
          <option value="2">2x / jour</option>
          <option value="3">3x / jour</option>
        </select>

        <label>Heures de prise</label>

        <div
          v-for="(hour, index) in localForm.hours"
          :key="index"
          class="hour-row"
        >
          <input type="time" v-model="localForm.hours[index].time" required />

          <button type="button" @click="removeHour(index)" class="remove-hour">
            <i class="ri-close-line" style="vertical-align: middle;"></i>
          </button>
        </div>

        <button
          type="button"
          class="add-hour"
          @click="addHour"
          :disabled="localForm.hours.length >= Number(localForm.frequency)"
        >
          <i class="ri-add-line" style="margin-left: 5px; vertical-align: middle;"></i>

          Ajouter une heure
        </button>

        <div class="modal-actions">
          <button type="button" class="cancel" @click="$emit('close')">
            <i class="ri-close-line" style="margin-left: 5px; vertical-align: middle;"></i>
            Annuler
          </button>
          <button type="submit" class="save">
            <i class="ri-save-line" style="margin-left: 5px; vertical-align: middle;"></i>
            Enregistrer
        </button>
        </div>

      </form>
    </div>

  </div>
</template>


<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Object, // form data passed from parent
});

const emit = defineEmits(["save", "close"]);

const localForm = ref(JSON.parse(JSON.stringify(props.modelValue)));

function addHour() {
  const max = Number(localForm.value.frequency);
  if (localForm.value.hours.length < max) {
    localForm.value.hours.push({ time: "", taken: false });
  }
}

function removeHour(index) {
  if (localForm.value.hours.length > 1) {
    localForm.value.hours.splice(index, 1);
  }
}

// Adjust hours when frequency changes
watch(
  () => localForm.value.frequency,
  (newFreq) => {
    const max = Number(newFreq);
    if (localForm.value.hours.length > max) {
      localForm.value.hours = localForm.value.hours.slice(0, max);
    }
  }
);

function submit() {
  emit("save", localForm.value);
}
</script>


<style scoped>
/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 350px;
  animation: fadeIn 0.3s ease;
}

.modal h3 {
  margin: 0 0 15px;
}

.modal input,
.modal select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #cdd7e1;
}

.hour-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-hour {
  background: #ffb3b3;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.add-hour {
  background: #cbe7ff;
  padding: 8px;
  border-radius: 8px;
  border: none;
  width: 100%;
  margin-bottom: 15px;
  cursor: pointer;
}

.add-hour:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
  opacity: 0.6;
}


.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel {
  background: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.save {
  background: green;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
