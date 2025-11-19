import { defineStore } from "pinia";

export const useMedicationStore = defineStore("medications", {
  state: () => ({
    medications: JSON.parse(localStorage.getItem("medications") || "[]"),
  }),

  actions: {
    addMedication(med) {
      this.medications.push(med);
      this.save();
    },

    toggleDoseTaken(medId, hourIndex) {
      const med = this.medications.find(m => m.id === medId);
      med.hours[hourIndex].taken = !med.hours[hourIndex].taken;
      this.save();
    },

    save() {
      localStorage.setItem("medications", JSON.stringify(this.medications));
    }
  }
});
