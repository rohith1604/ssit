import React from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native'
import { theme } from '../theme'

interface IntensitySliderProps {
  value: number
  onValueChange: (value: number) => void
}

export function IntensitySlider({ value, onValueChange }: IntensitySliderProps) {
  const [panX] = React.useState(new Animated.Value(0))
  const width = 260 // Total width of the slider
  const steps = 10 // Number of steps (1-10)
  const stepWidth = width / (steps - 1)

  React.useEffect(() => {
    Animated.spring(panX, {
      toValue: (value - 1) * stepWidth,
      useNativeDriver: true,
    }).start()
  }, [value])

  const getColor = (level: number) => {
    if (level <= 3) return theme.colors.success
    if (level <= 7) return theme.colors.warning
    return theme.colors.error
  }

  const handlePress = (index: number) => {
    onValueChange(index + 1)
  }

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <Text style={[styles.valueText, { color: getColor(value) }]}>
          {value}
        </Text>
      </View>
      <View style={styles.track}>
        {Array.from({ length: 10 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={styles.stepContainer}
          >
            <View
              style={[
                styles.step,
                {
                  backgroundColor: index < value ? getColor(value) : theme.colors.gray[200],
                  height: index < value ? 24 : 16,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: panX }],
              backgroundColor: getColor(value),
            },
          ]}
        />
      </View>
      <View style={styles.labels}>
        <Text style={[styles.label, { color: theme.colors.success }]}>Mild</Text>
        <Text style={[styles.label, { color: theme.colors.warning }]}>Moderate</Text>
        <Text style={[styles.label, { color: theme.colors.error }]}>Severe</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  valueContainer: {
    marginBottom: theme.spacing.md,
  },
  valueText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  track: {
    width: 300,
    height: 40,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  step: {
    width: 4,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
})

