import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native'
import { theme } from '../theme'

type SpasmLevelType = 'high' | 'moderate' | 'low' | null

interface SpasmLevelProps {
  value: SpasmLevelType
  onChange: (value: SpasmLevelType) => void
}

export function SpasmLevel({ value, onChange }: SpasmLevelProps) {
  const scaleAnim = React.useRef({
    high: new Animated.Value(value === 'high' ? 1 : 0.8),
    moderate: new Animated.Value(value === 'moderate' ? 1 : 0.8),
    low: new Animated.Value(value === 'low' ? 1 : 0.8),
  }).current

  const animate = (selected: SpasmLevelType) => {
    const animations = Object.keys(scaleAnim).map((key) =>
      Animated.spring(scaleAnim[key as keyof typeof scaleAnim], {
        toValue: key === selected ? 1 : 0.8,
        useNativeDriver: true,
      })
    )
    Animated.parallel(animations).start()
  }

  const handlePress = (level: SpasmLevelType) => {
    onChange(value === level ? null : level)
    animate(level)
  }

  const getLevelColor = (level: SpasmLevelType) => {
    switch (level) {
      case 'high':
        return theme.colors.error
      case 'moderate':
        return theme.colors.warning
      case 'low':
        return theme.colors.success
      default:
        return theme.colors.gray[400]
    }
  }

  return (
    <View style={styles.container}>
      {(['high', 'moderate', 'low'] as const).map((level) => (
        <Animated.View
          key={level}
          style={[
            styles.buttonContainer,
            { transform: [{ scale: scaleAnim[level] }] },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  value === level
                    ? getLevelColor(level)
                    : theme.colors.gray[100],
              },
            ]}
            onPress={() => handlePress(level)}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    value === level
                      ? theme.colors.white
                      : theme.colors.gray[600],
                },
              ]}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
})

