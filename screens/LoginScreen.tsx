import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../theme'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'

export function LoginScreen({ navigation }: any) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle login
      navigation.navigate('MainTabs')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue tracking your health</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={form.password}
            onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
            secureTextEntry
            error={errors.password}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            variant="primary"
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Log In
          </Button>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              Don't have an account? <Text style={styles.registerTextBold}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  submitButton: {
    marginBottom: theme.spacing.lg,
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  registerTextBold: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

