import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { theme } from '../theme'
import { Button } from '../components/Button'
import { TabletSelector } from '../components/TabletSelector'
import { SpikeReductionToggle } from '../components/SpikeReductionToggle'

type DosageType = '100mg' | '200mg'

export function LogMedicationScreen({ navigation }: any) {
  const [form, setForm] = useState({
    dosage: '100mg' as DosageType,
    isFullTablet: true,
    timeTaken: new Date(),
    spikeReduction: false,
  })

  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false)
    if (selectedDate) {
      setForm(prev => ({ ...prev, timeTaken: selectedDate }))
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting medication data:', form)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Log Medication</Text>
          <Text style={styles.subtitle}>Record your medication intake</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>Carbamazepine</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Select Dosage & Type</Text>
            <TabletSelector
              dosage={form.dosage}
              isFullTablet={form.isFullTablet}
              onDosageChange={(dosage) => setForm(prev => ({ ...prev, dosage }))}
              onTabletTypeChange={(isFullTablet) => setForm(prev => ({ ...prev, isFullTablet }))}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Time Taken</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeButtonText}>
                {form.timeTaken.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={form.timeTaken}
                mode="time"
                is24Hour={false}
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Spike Reduction Observed</Text>
            <SpikeReductionToggle
              value={form.spikeReduction}
              onChange={(spikeReduction) => setForm(prev => ({ ...prev, spikeReduction }))}
            />
          </View>

          <Button
            variant="primary"
            size="large"
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Log Medication
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
    marginTop: theme.spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
    fontFamily: 'Inter-Regular',
  },
  form: {
    flex: 1,
  },
  medicationInfo: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  medicationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
  },
  formGroup: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    fontFamily: 'Inter-Medium',
  },
  timeButton: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  timeButtonText: {
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: 'Inter-Regular',
  },
  submitButton: {
    marginTop: 'auto',
  },
})

