export interface User {
  id: string
  name: string
  age: string
  gender: string
  email: string
  contact: string
  photoURL: string | null
  createdAt: Date
}

export interface SpikeEntry {
  id: string
  userId: string
  intensity: number
  hasSpasms: boolean
  symptoms: string
  weather: {
    temperature: number
    moonPhase: string
  }
  createdAt: Date
}

export interface MedicationEntry {
  id: string
  userId: string
  name: string
  dosage: string
  schedule: Date
  taken: boolean
  takenAt?: Date
}

