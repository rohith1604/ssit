import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AlertCircle } from 'lucide-react-native'
import { theme } from '../theme'
import { Button } from './Button'

interface ErrorProps {
  message: string
  onRetry?: () => void
}

export function Error({ message, onRetry }: ErrorProps) {
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color={theme.colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button variant="primary" onPress={onRetry} style={styles.button}>
          Try Again
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  message: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  button: {
    minWidth: 120,
  },
})

