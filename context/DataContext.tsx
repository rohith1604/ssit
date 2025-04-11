import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Spike, Medication } from '../types'

interface DataContextType {
  spikes: Spike[]
  medications: Medication[]
  loading: boolean
  addSpike: (spike: Omit<Spike, 'id' | 'createdAt'>) => Promise<void>
  addMedication: (medication: Omit<Medication, 'id' | 'createdAt'>) => Promise<void>
  getSpikesForPeriod: (startDate: Date, endDate: Date) => Spike[]
  getMedicationsForPeriod: (startDate: Date, endDate: Date) => Medication[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [spikes, setSpikes] = useState<Spike[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [savedSpikes, savedMedications] = await Promise.all([
        AsyncStorage.getItem('@spikes'),
        AsyncStorage.getItem('@medications'),
      ])

      if (savedSpikes) setSpikes(JSON.parse(savedSpikes))
      if (savedMedications) setMedications(JSON.parse(savedMedications))
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSpike = async (spikeData: Omit<Spike, 'id' | 'createdAt'>) => {
    try {
      const newSpike: Spike = {
        ...spikeData,
        id: Date.now().toString(),
        createdAt: new Date(),
      }

      const updatedSpikes = [...spikes, newSpike]
      await AsyncStorage.setItem('@spikes', JSON.stringify(updatedSpikes))
      setSpikes(updatedSpikes)
    } catch (error) {
      console.error('Error adding spike:', error)
      throw error
    }
  }

  const addMedication = async (medicationData: Omit<Medication, 'id' | 'createdAt'>) => {
    try {
      const newMedication: Medication = {
        ...medicationData,
        id: Date.now().toString(),
        createdAt: new Date(),
      }

      const updatedMedications = [...medications, newMedication]
      await AsyncStorage.setItem('@medications', JSON.stringify(updatedMedications))
      setMedications(updatedMedications)
    } catch (error) {
      console.error('Error adding medication:', error)
      throw error
    }
  }

  const getSpikesForPeriod = (startDate: Date, endDate: Date) => {
    return spikes.filter(
      spike =>
        new Date(spike.createdAt) >= startDate && new Date(spike.createdAt) <= endDate
    )
  }

  const getMedicationsForPeriod = (startDate: Date, endDate: Date) => {
    return medications.filter(
      medication =>
        new Date(medication.createdAt) >= startDate && new Date(medication.createdAt) <= endDate
    )
  }

  return (
    <DataContext.Provider
      value={{
        spikes,
        medications,
        loading,
        addSpike,
        addMedication,
        getSpikesForPeriod,
        getMedicationsForPeriod,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
