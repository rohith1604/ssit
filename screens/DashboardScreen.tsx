import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { theme } from '../theme'
import { Button } from '../components/Button'

export function DashboardScreen({ navigation }: any) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1, 0, 2, 0, 3, 0, 4],
        color: () => theme.colors.primary,
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.date}>Today, {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Today's Spikes</Text>
            <Text style={styles.statValue}>2</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Next Dose</Text>
            <Text style={styles.statValue}>2:30 PM</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Spike Frequency</Text>
          <LineChart
            data={chartData}
            width={280}
            height={250}
            chartConfig={{
              backgroundColor: theme.colors.white,
              backgroundGradientFrom: theme.colors.white,
              backgroundGradientTo: theme.colors.white,
              decimalPlaces: 0,
              color: () => theme.colors.primary,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              variant="primary"
              onPress={() => navigation.navigate('LogSpike')}
              style={styles.actionButton}
            >
              Log Spike
            </Button>
            <Button
              variant="secondary"
              onPress={() => navigation.navigate('LogMedication')}
              style={styles.actionButton}
            >
              Log Medication
            </Button>
          </View>
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
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingBottom:15,
    paddingTop:15,
  },
  date: {
    fontSize: 16,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,

  },
  statsContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  chartContainer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  chart: {
    borderRadius: theme.borderRadius.sm,
  },
  quickActions: {
    padding: theme.spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
})

