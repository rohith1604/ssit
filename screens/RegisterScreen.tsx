import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'lucide-react-native'
import { theme } from '../theme'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'

export function RegisterScreen({ navigation }: any) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    photo: null as string | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setForm(prev => ({ ...prev, photo: result.assets[0].uri }))
    }
  }

  const handleSubmit = () => {
    // Validate form
    const newErrors: Record<string, string> = {}
    
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.age) newErrors.age = 'Age is required'
    if (!form.gender) newErrors.gender = 'Gender is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!form.contact) newErrors.contact = 'Contact number is required'
    if (form.contact && !/^\d{10}$/.test(form.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit contact number'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle registration
      navigation.navigate('Dashboard')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join SSAHE to track your health journey</Text>
        </View>

        <View style={styles.form}>
          <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
            {form.photo ? (
              <Image source={{ uri: form.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Camera size={32} color={theme.colors.gray[400]} />
                <Text style={styles.photoText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Full Name"
            value={form.name}
            onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
            error={errors.name}
            style={styles.input}
          />

          <TextInput
            placeholder="Age"
            value={form.age}
            onChangeText={(text) => setForm(prev => ({ ...prev, age: text }))}
            keyboardType="numeric"
            error={errors.age}
            style={styles.input}
          />

          <TextInput
            placeholder="Contact Number"
            value={form.contact}
            onChangeText={(text) => setForm(prev => ({ ...prev, contact: text.replace(/[^0-9]/g, '') }))}
            keyboardType="numeric"
            error={errors.contact}
            style={styles.input}
            maxLength={10}
          />

          <TextInput
            placeholder="Gender"
            value={form.gender}
            onChangeText={(text) => setForm(prev => ({ ...prev, gender: text }))}
            error={errors.gender}
            style={styles.input}
          />

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

          <TextInput
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => setForm(prev => ({ ...prev, confirmPassword: text }))}
            secureTextEntry
            error={errors.confirmPassword}
            style={styles.input}
          />

          <Button
            variant="primary"
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            Create Account
          </Button>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginTextBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
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
    padding: theme.spacing.lg,
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    marginTop: theme.spacing.xs,
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
  loginLink: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  loginTextBold: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

