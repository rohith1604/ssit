import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SSAHE Health</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
})

