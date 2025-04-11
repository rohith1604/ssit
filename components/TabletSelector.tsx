import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated,Platform } from 'react-native'
import { Pill } from 'lucide-react-native'
import { theme } from '../theme'

interface TabletSelectorProps {
  dosage: '100mg' | '200mg'
  isFullTablet: boolean
  onDosageChange: (dosage: '100mg' | '200mg') => void
  onTabletTypeChange: (isFullTablet: boolean) => void
}

export function TabletSelector({
  dosage,
  isFullTablet,
  onDosageChange,
  onTabletTypeChange,
}: TabletSelectorProps) {
  const [scaleAnim] = React.useState(new Animated.Value(1))

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <View style={styles.container}>
      <View style={styles.dosageContainer}>
        <TouchableOpacity
          style={[
            styles.dosageButton,
            dosage === '100mg' && styles.dosageButtonActive,
          ]}
          onPress={() => onDosageChange('100mg')}
        >
          <Text
            style={[
              styles.dosageText,
              dosage === '100mg' && styles.dosageTextActive,
            ]}
          >
            100mg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dosageButton,
            dosage === '200mg' && styles.dosageButtonActive,
          ]}
          onPress={() => onDosageChange('200mg')}
        >
          <Text
            style={[
              styles.dosageText,
              dosage === '200mg' && styles.dosageTextActive,
            ]}
          >
            200mg
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabletTypeContainer}>
        <TouchableOpacity
          onPress={() => {
            handlePress()
            onTabletTypeChange(false)
          }}
          style={[
            styles.tabletButton,
            !isFullTablet && styles.tabletButtonActive,
          ]}
        >
          <Animated.View
            style={[
              styles.tabletIconContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Pill
              size={48}
              color={!isFullTablet ? theme.colors.primary : theme.colors.gray[400]}
              style={{ transform: [{ rotate: '135deg' }] }}
            />
            <View style={styles.halfOverlay} />
          </Animated.View>
          <Text
            style={[
              styles.tabletText,
              !isFullTablet && styles.tabletTextActive,
            ]}
          >
            Half Tablet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handlePress()
            onTabletTypeChange(true)
          }}
          style={[
            styles.tabletButton,
            isFullTablet && styles.tabletButtonActive,
          ]}
        >
          <Animated.View
            style={[
              styles.tabletIconContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Pill
              size={48}
              color={isFullTablet ? theme.colors.primary : theme.colors.gray[400]}
              style={{ transform: [{ rotate: '135deg' }] }}
            />
          </Animated.View>
          <Text
            style={[
              styles.tabletText,
              isFullTablet && styles.tabletTextActive,
            ]}
          >
            Full Tablet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
  },
  dosageContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  dosageButton: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dosageButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  dosageText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray[600],
    fontFamily: 'Inter-SemiBold',
  },
  dosageTextActive: {
    color: theme.colors.white,
  },
  tabletTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  tabletButton: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[100],
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabletButtonActive: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  tabletIconContainer: {
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  halfOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: '50%',
    backgroundColor: theme.colors.white,
    opacity: 0.8,
  },
  tabletText: {
    fontSize: 14,
    color: theme.colors.gray[600],
    fontFamily: 'Inter-Medium',
  },
  tabletTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
})

