import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { LineChart, BarChart } from 'react-native-chart-kit'
import { Download } from 'lucide-react-native'
import { theme } from '../theme'
import { Button } from '../components/Button'

export function ReportsScreen() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  const spikeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3, 2, 4, 1, 5, 2, 3],
      },
    ],
  }

  const medicationData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [85, 78, 92, 88],
      },
    ],
  }

  const correlationData = {
    labels: ['Full', 'New', 'First Q', 'Last Q'],
    datasets: [
      {
        data: [4, 2, 3, 1],
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <View style={styles.timeRangeContainer}>
            {(['week', 'month', 'year'] as const).map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeButton,
                  timeRange === range && styles.timeRangeButtonActive,
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    timeRange === range && styles.timeRangeTextActive,
                  ]}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Spike Frequency</Text>
            <TouchableOpacity>
              <Download size={20} color={theme.colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <LineChart
            data={spikeData}
            width={280}
            height={200}
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

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Medication Effectiveness</Text>
            <TouchableOpacity>
              <Download size={20} color={theme.colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <BarChart
            data={medicationData}
            width={280}
            height={200}
            yAxisLabel="%"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: theme.colors.white,
              backgroundGradientFrom: theme.colors.white,
              backgroundGradientTo: theme.colors.white,
              decimalPlaces: 0,
              color: () => theme.colors.primary,
            }}
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Moon Phase Correlation</Text>
            <TouchableOpacity>
              <Download size={20} color={theme.colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <BarChart
            data={correlationData}
            width={280}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: theme.colors.white,
              backgroundGradientFrom: theme.colors.white,
              backgroundGradientTo: theme.colors.white,
              decimalPlaces: 0,
              color: () => theme.colors.primary,
            }}
            style={styles.chart}
          />
        </View>

        <View style={styles.exportContainer}>
          <Button
            variant="primary"
            onPress={() => {/* Handle export */}}
            style={styles.exportButton}
          >
            Export All Data (PDF)
          </Button>
          <Button
            variant="secondary"
            onPress={() => {/* Handle export */}}
            style={styles.exportButton}
          >
            Export Raw Data (CSV)
          </Button>
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
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text,
    fontFamily: 'Inter-Bold',
    paddingBottom:15,
    paddingTop:15,
    padding:100,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.xs,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
  },
  timeRangeButtonActive: {
    backgroundColor: theme.colors.success,
  },
  timeRangeText: {
    fontSize: 14,
    color: theme.colors.gray[600],
  },
  timeRangeTextActive: {
    color: theme.colors.text,
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: theme.colors.white,
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  chart: {
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  exportContainer: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  exportButton: {
    width: '100%',
  },
})

