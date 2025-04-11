import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Moon, MoonStar, CircleDot, Circle } from 'lucide-react-native'
import { theme } from '../theme'

type MoonPhaseType = 'full' | 'half' | 'quarter' | 'new'

interface MoonPhaseProps {
  phase: MoonPhaseType
  onSelect: (phase: MoonPhaseType) => void
}

export function MoonPhase({ phase, onSelect }: MoonPhaseProps) {
  const getMoonIcon = (currentPhase: MoonPhaseType) => {
    switch (currentPhase) {
      case 'full':
        return <Moon size={32} color={phase === 'full' ? theme.colors.white : theme.colors.gray[600]} />
      case 'half':
        return <MoonStar size={32} color={phase === 'half' ? theme.colors.white : theme.colors.gray[600]} />
      case 'quarter':
        return <CircleDot size={32} color={phase === 'quarter' ? theme.colors.white : theme.colors.gray[600]} />
      case 'new':
        return <Circle size={32} color={phase === 'new' ? theme.colors.white : theme.colors.gray[600]} />
    }
  }

  const phases: MoonPhaseType[] = ['full', 'half', 'quarter', 'new']

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Moon Phase</Text>
      <View style={styles.phasesContainer}>
        {phases.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.phaseButton,
              phase === p && styles.selectedPhase,
            ]}
            onPress={() => onSelect(p)}
          >
            {getMoonIcon(p)}
            <Text style={[
              styles.phaseText,
              phase === p && styles.selectedPhaseText,
            ]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    fontFamily: 'Inter-Medium',
  },
  phasesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  phaseButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[100],
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
  selectedPhase: {
    backgroundColor: theme.colors.primary,
  },
  phaseText: {
    fontSize: 12,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
    fontFamily: 'Inter-Regular',
  },
  selectedPhaseText: {
    color: theme.colors.white,
  },
})

