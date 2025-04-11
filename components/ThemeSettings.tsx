import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Sun, Moon, Smartphone } from 'lucide-react-native'
import { useTheme } from '../context/ThemeContext'

export function ThemeSettings() {
  const { mode, setMode, colors } = useTheme()

  const options = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Smartphone },
  ]

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {options.map(({ value, label, icon: Icon }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.option,
            {
              backgroundColor: mode === value ? colors.primary : colors.gray[100],
            },
          ]}
          onPress={() => setMode(value)}
        >
          <Icon
            size={24}
            color={mode === value ? colors.white : colors.gray[600]}
          />
          <Text
            style={[
              styles.optionText,
              {
                color: mode === value ? colors.white : colors.text,
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  option: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
})

