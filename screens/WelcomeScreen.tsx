import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '../components/Button'
import { theme } from '../theme'

export function WelcomeScreen({ navigation }: any) {
  const [fadeAnim] = React.useState(new Animated.Value(0))
  const [slideAnim] = React.useState(new Animated.Value(50))

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(52, 199, 89, 0.1)', 'rgba(255, 255, 255, 0)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>NeuroPulse</Text>
            <Text style={styles.subtitle}>
              Track your health journey with precision and care
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Button
              variant="primary"
              size="large"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              Login
            </Button>

            <Button
              variant="outline"
              size="large"
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
            >
              Create Account
            </Button>

            <Button
              variant="secondary"
              size="large"
              onPress={() => navigation.navigate('MainTabs')}
              style={styles.guestButton}
            >
              Continue as Guest
            </Button>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl * 2,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
  loginButton: {
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  registerButton: {
    width: '100%',
    marginBottom: theme.spacing.sm,
  },
  guestButton: {
    width: '100%',
  },
})

