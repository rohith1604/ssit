import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native'
import {
  Bell,
  User,
  Mail,
  Phone,
  HelpCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react-native'
import { theme } from '../theme'

export function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState({
    medicationReminders: true,
    spikeAlerts: true,
    reportSummaries: false,
  })

  const handleLogout = () => {
    // Handle logout
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.menuItemContent}>
              <User size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.themeContainer}>
            {/* Placeholder for ThemeSettings component */}
            {/*  You'll need to create and import this component */}
            <Text>Theme Settings Component will go here</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Bell size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Medication Reminders</Text>
            </View>
            <Switch
              value={notifications.medicationReminders}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, medicationReminders: value }))
              }
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Bell size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Spike Alerts</Text>
            </View>
            <Switch
              value={notifications.spikeAlerts}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, spikeAlerts: value }))
              }
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Bell size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Report Summaries</Text>
            </View>
            <Switch
              value={notifications.reportSummaries}
              onValueChange={(value) =>
                setNotifications(prev => ({ ...prev, reportSummaries: value }))
              }
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={theme.colors.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {/* Handle contact */}}
          >
            <View style={styles.menuItemContent}>
              <Mail size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Email Support</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {/* Handle contact */}}
          >
            <View style={styles.menuItemContent}>
              <Phone size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>Phone Support</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('FAQ')}
          >
            <View style={styles.menuItemContent}>
              <HelpCircle size={20} color={theme.colors.gray[600]} />
              <Text style={styles.menuItemText}>FAQ</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
    marginTop:theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.white,
  },
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.gray[600],
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    fontFamily: 'Inter-SemiBold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  menuItemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  logoutText: {
    fontSize: 16,
    color: theme.colors.error,
    fontWeight: '500',
  },
  themeContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
})

