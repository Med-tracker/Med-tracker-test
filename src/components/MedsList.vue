<template>
  <div class="daily-container">

    <div class="title-button">
      <h2 class="title">Liste des prises du jour</h2>

      <button class="add-btn" @click="showModal = true">
        <i class="ri-add-line" style="margin-left: 5px; vertical-align: middle;"></i>
        Ajouter une prise 
      </button>
    </div>

    <div v-if="list.length === 0" class="empty">
      Aucune prise prévue aujourd’hui.
    </div>

    <table v-else class="daily-table">
      <thead>
        <tr>
          <th>Médicament</th>
          <th>Dose</th>
          <th>Heure</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in list"
          :key="item.uid"
          :class="{ late: isLate(item) && !item.taken }"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.dose }}</td>
          <td>{{ item.hour }}</td>

          <td>
            <span :class="['status', item.taken ? 'done' : 'todo']">
                <i :class="item.taken ? 'ri-checkbox-circle-line' : 'ri-time-line'"></i>
                {{ item.taken ? "Fait" : "À faire" }}
            </span>
          </td>

          <td>
            <button
              class="btn"
              :class="{ done: item.taken }"
              @click="toggle(item)"
            >
                <i :class="item.taken ? 'ri-close-line' : 'ri-check-line'"></i>
                {{ item.taken ? "Annuler" : "Marquer fait" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Medication Form -->
    <MedsForm
      v-if="showModal"
      :modelValue="form"
      @close="closeModal"
      @save="saveMedication"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMedicationStore } from "../stores/medication.js";
import MedsForm from "./MedsForm.vue";

const store = useMedicationStore();

const showModal = ref(false);

const form = ref({
  name: "",
  dose: "",
  frequency: "1",
  hours: [{ time: "", taken: false }]
});

/* Save medication */
function saveMedication(data) {
  const med = {
    id: Date.now().toString(),
    ...data,
  };

  store.addMedication(med);
  closeModal();
}

function closeModal() {
  showModal.value = false;

  form.value = {
    name: "",
    dose: "",
    frequency: "1",
    hours: [{ time: "", taken: false }],
  };
}

/*** List ***/
const list = computed(() => {
  const items = [];
  store.medications.forEach(med => {
    med.hours.forEach((h, index) => {
      items.push({
        uid: med.id + "-" + index,
        medId: med.id,
        name: med.name,
        dose: med.dose,
        hour: h.time,
        taken: h.taken
      });
    });
  });
  return items;
});

function toggle(item) {
  const index = Number(item.uid.split("-")[1]);
  store.toggleDoseTaken(item.medId, index);
}

function isLate(item) {
  const now = new Date();
  const [h, m] = item.hour.split(":");
  const t = new Date();
  t.setHours(h, m, 0);
  return now > t;
}
</script>



<style scoped>
.daily-container {
  padding: 20px;
}

.title-button{
    display: flex;
    justify-content: space-between;
}


.title {
  font-size: 20px;
  font-weight: 600;
  color: #3a4a58;
  margin-bottom: 20px;
}

.empty {
  padding: 15px;
  background: #ecf5ff;
  border-radius: 10px;
  color: #456;
  text-align: center;
}

/* Table style */
.daily-table {
  width: 100%;
  border-collapse: collapse;
  background: #f9fcff;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.daily-table th {
  background: #d8e8f5;
  padding: 12px;
  text-align: left;
  color: #2a3b4c;
  font-weight: 600;
}

.daily-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e5eef5;
  color: #345;
}

tr:last-child td {
  border-bottom: none;
}

tr.late {
  background: #fad8d8 !important;
}

.status {
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.status.todo {
  background: #ffe0e0;
  color: #b32a2a;
}

.status.done {
  background: #d9f6d7;
  color: #1b5e20;
}

.btn {
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #d3e8ff;
  color: #2b4b6b;
}

.btn.done {
  background: #c8f3c5;
  color: #1b5e20;
}

/* Responsive */
@media (max-width: 700px) {
  .daily-table {
    font-size: 14px;
  }

  .btn {
    padding: 4px 8px;
    font-size: 13px;
  }
}

.add-btn {
  background: #4a90e2;
  color: white;
  border: none;
  padding-inline: 8px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
