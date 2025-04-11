import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import { theme } from '../theme'

interface ButtonProps {
  children: React.ReactNode
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'accent'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  withHaptics?: boolean
}

type StyleKey = 'button' | 'buttonSmall' | 'buttonMedium' | 'buttonLarge' | 
                'text' | 'textSmall' | 'textMedium' | 'textLarge';

type VariantTextStyle = 'primaryText' | 'secondaryText' | 'outlineText';

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  withHaptics = true,
}: ButtonProps) {
  const [scale] = React.useState(new Animated.Value(1))

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const handlePress = async () => {
    if (withHaptics) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress()
  }

  const getGradientColors = (): [string, string] => {
    if (disabled) return [theme.colors.gray[300], theme.colors.gray[400]]
    switch (variant) {
      case 'primary':
        return [theme.colors.primaryLight, theme.colors.primary]
      case 'secondary':
        return [theme.colors.secondaryLight, theme.colors.secondary]
      default:
        return [theme.colors.white, theme.colors.white]
    }
  }

  const buttonStyles: ViewStyle[] = [
    styles.button,
    styles[`button${size.charAt(0).toUpperCase()}${size.slice(1)}` as StyleKey],
    variant === 'outline' && styles.buttonOutline,
    disabled && styles.buttonDisabled,
    style,
  ].filter(Boolean) as ViewStyle[]

  const textStyles: TextStyle[] = [
    styles.text,
    styles[`text${size.charAt(0).toUpperCase()}${size.slice(1)}` as StyleKey],
    variant && styles[`${variant}Text` as VariantTextStyle],
    disabled && styles.textDisabled,
    textStyle,
  ].filter(Boolean) as TextStyle[]

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={styles.container}
      >
        {variant !== 'outline' ? (
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={buttonStyles}
          >
            {loading ? (
              <ActivityIndicator color={variant === 'primary' ? theme.colors.white : theme.colors.primary} />
            ) : (
              <Text style={textStyles}>{children}</Text>
            )}
          </LinearGradient>
        ) : (
          <Animated.View style={buttonStyles}>
            {loading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <Text style={textStyles}>{children}</Text>
            )}
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  button: {
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSmall: {
    height: 36,
    paddingHorizontal: theme.spacing.lg,
  },
  buttonMedium: {
    height: 48,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonLarge: {
    height: 56,
    paddingHorizontal: theme.spacing.xxl,
  },
  buttonOutline: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 15,
  },
  textMedium: {
    fontSize: 17,
  },
  textLarge: {
    fontSize: 19,
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  textDisabled: {
    color: theme.colors.gray[500],
  },
})

