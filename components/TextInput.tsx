import React, { useState } from 'react'
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TextInputProps,
  Animated,
  Platform,
  TextStyle,
} from 'react-native'
import { theme } from '../theme'

interface Props extends TextInputProps {
  label?: string
  error?: string
  helper?: string
}

export function TextInput({ label, error, helper, style, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false)
  const [labelPosition] = useState(new Animated.Value(props.value ? 1 : 0))

  const handleFocus = () => {
    setIsFocused(true)
    animateLabel(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!props.value) {
      animateLabel(0)
    }
  }

  const animateLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const labelStyle: Animated.WithAnimatedValue<TextStyle> = {
    position: 'absolute' as const,
    left: theme.spacing.md,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.spacing.lg, theme.spacing.xs],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors.gray[500], theme.colors.primary],
    }),
  }

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          label && styles.inputWithLabel,
        ]}
        placeholderTextColor={theme.colors.gray[400]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {(error || helper) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helper}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputWithLabel: {
    paddingTop: theme.spacing.xl,
  },
  inputFocused: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  helperText: {
    marginTop: theme.spacing.xs,
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  errorText: {
    color: theme.colors.error,
  },
})

