import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

interface BPReading {
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: string;
  notes?: string;
}

export default function BPHistoryScreen() {
  const [readings, setReadings] = useState<BPReading[]>([]);

  useEffect(() => {
    loadReadings();
  }, []);

  const loadReadings = async () => {
    try {
      const storedReadings = await AsyncStorage.getItem('bp_readings');
      if (storedReadings) {
        const parsedReadings = JSON.parse(storedReadings);
        const sortedReadings = parsedReadings.sort((a: BPReading, b: BPReading) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setReadings(sortedReadings);
      }
    } catch (error) {
      console.error('Error loading readings:', error);
    }
  };

  const chartData = {
    labels: readings.map(r => new Date(r.timestamp).toLocaleDateString()),
    datasets: [
      {
        data: readings.map(r => r.systolic),
        color: (opacity = 1) => `rgba(196, 58, 49, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: readings.map(r => r.diastolic),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Systolic', 'Diastolic']
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    }
  };

  return (
    <LinearGradient colors={['#f7f9fc', '#eef2f5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Blood Pressure History</Text>
          <Text style={styles.headerSubtitle}>Your readings over time</Text>
        </View>

        <View style={styles.chartContainer}>
          {readings.length > 0 ? (
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={300}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              yAxisLabel=""
              yAxisSuffix=" mmHg"
            />
          ) : (
            <Text style={styles.noDataText}>No readings available yet</Text>
          )}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#c43a31' }]} />
            <Text style={styles.legendText}>Systolic</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.legendText}>Diastolic</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    paddingVertical: 40,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
});