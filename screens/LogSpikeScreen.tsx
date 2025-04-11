import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native'
import { theme } from '../theme'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { IntensitySlider } from '../components/IntensitySlider'
import { SpasmLevel } from '../components/SpasmLevel'
import { MoonPhase } from '../components/MoonPhase'

type SpasmLevelType = 'high' | 'moderate' | 'low' | null
type MoonPhaseType = 'full' | 'half' | 'quarter' | 'new'

export function LogSpikeScreen({ navigation }: any) {
  const [intensity, setIntensity] = useState(5)
  const [spasmLevel, setSpasmLevel] = useState<SpasmLevelType>(null)
  const [symptoms, setSymptoms] = useState('')
  const [moonPhase, setMoonPhase] = useState<MoonPhaseType>('full')

  const handleSubmit = () => {
    // Handle form submission
    const spikeData = {
      intensity,
      spasmLevel,
      symptoms,
      moonPhase,
      timestamp: new Date(),
    }
    console.log('Submitting spike data:', spikeData)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Log Spike</Text>
          <Text style={styles.subtitle}>Record your spike details</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Intensity</Text>
            <IntensitySlider
              value={intensity}
              onValueChange={setIntensity}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Spasm Level</Text>
            <SpasmLevel
              value={spasmLevel}
              onChange={setSpasmLevel}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Other Symptoms</Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={symptoms}
              onChangeText={setSymptoms}
              placeholder="Describe any other symptoms..."
              style={styles.textArea}
            />
          </View>

          <View style={styles.weatherInfo}>
            <Text style={styles.sectionTitle}>Current Conditions</Text>
            <View style={styles.weatherGrid}>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherLabel}>Temperature</Text>
                <Text style={styles.weatherValue}>72°F</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherLabel}>Altitude</Text>
                <Text style={styles.weatherValue}>1,234 ft</Text>
              </View>
            </View>
            <MoonPhase
              phase={moonPhase}
              onSelect={setMoonPhase}
            />
          </View>

          <Button
            variant="primary"
            size="large"
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Log Spike
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
    marginTop:theme.spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
    fontFamily: 'Inter-Regular',
  },
  form: {
    padding: theme.spacing.lg,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  weatherInfo: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    fontFamily: 'Inter-SemiBold',
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  weatherItem: {
    alignItems: 'center',
    flex: 1,
  },
  weatherLabel: {
    fontSize: 14,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.xs,
    fontFamily: 'Inter-Regular',
  },
  weatherValue: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text,
    fontFamily: 'Inter-Medium',
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
})
