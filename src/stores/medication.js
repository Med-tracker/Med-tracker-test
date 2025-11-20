import { defineStore } from "pinia";

export const useMedicationStore = defineStore("medications", {
    // Initialize state with medications from localStorage or an empty array
    state: () => ({
        medications: JSON.parse(localStorage.getItem("medications") || "[]"),
    }),

    actions: {
        addMedication(med) {
        this.medications.push(med);
        this.save();
        },

    // Toggle the 'taken' status for a specific hour of a medication
    toggleDoseTaken(medId, hourIndex) {
      const med = this.medications.find(m => m.id === medId);
      med.hours[hourIndex].taken = !med.hours[hourIndex].taken;
      this.save();
    },

    // Save the current medications state to localStorage
    save() {
      localStorage.setItem("medications", JSON.stringify(this.medications));
    }
  }
});
