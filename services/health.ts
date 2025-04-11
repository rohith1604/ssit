import { firestore } from "../firebase/config"
import type { SpikeEntry, MedicationEntry } from "../types"

export const healthService = {
  // Spike related functions
  async logSpike(data: Omit<SpikeEntry, "id" | "createdAt">): Promise<SpikeEntry> {
    try {
      const spikeData = {
        ...data,
        createdAt: new Date(),
      }

      const docRef = await firestore().collection("spikes").add(spikeData)

      return {
        id: docRef.id,
        ...spikeData,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getSpikeHistory(userId: string): Promise<SpikeEntry[]> {
    try {
      const snapshot = await firestore()
        .collection("spikes")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get()

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SpikeEntry[]
    } catch (error) {
      throw new Error(error.message)
    }
  },

  // Medication related functions
  async logMedication(data: Omit<MedicationEntry, "id">): Promise<MedicationEntry> {
    try {
      const docRef = await firestore().collection("medications").add(data)

      return {
        id: docRef.id,
        ...data,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async getMedications(userId: string): Promise<MedicationEntry[]> {
    try {
      const snapshot = await firestore()
        .collection("medications")
        .where("userId", "==", userId)
        .orderBy("schedule", "asc")
        .get()

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MedicationEntry[]
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async updateMedicationStatus(medicationId: string, taken: boolean): Promise<void> {
    try {
      await firestore()
        .collection("medications")
        .doc(medicationId)
        .update({
          taken,
          takenAt: taken ? new Date() : null,
        })
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

