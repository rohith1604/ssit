import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Platform } from 'react-native'
import { Check, X } from 'lucide-react-native'
import { theme } from '../theme'

interface SpikeReductionToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

export function SpikeReductionToggle({ value, onChange }: SpikeReductionToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.yesButton,
          value && styles.buttonActive,
        ]}
        onPress={() => onChange(true)}
      >
        <Check
          size={20}
          color={value ? theme.colors.success : theme.colors.success}
        />
        <Text
          style={[
            styles.buttonText,
            styles.yesText,
            value && styles.yesButtonTextActive,
          ]}
        >
          Yes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.noButton,
          !value && styles.buttonActive,
        ]}
        onPress={() => onChange(false)}
      >
        <X
          size={20}
          color={!value ? theme.colors.error : theme.colors.error}
        />
        <Text
          style={[
            styles.buttonText,
            styles.noText,
            !value && styles.noButtonTextActive,
          ]}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.white,
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
  buttonActive: {
    borderWidth: 2,
  },
  yesButton: {
    borderColor: theme.colors.success,
  },
  noButton: {
    borderColor: theme.colors.error,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  yesButtonTextActive: {
    color: theme.colors.success,
  },
  noButtonTextActive: {
    color: theme.colors.error,
  },
  yesText: {
    color: theme.colors.success,
  },
  noText: {
    color: theme.colors.error,
  },
})

