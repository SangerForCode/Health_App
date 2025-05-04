import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HealthData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  systolicBP: string;
  diastolicBP: string;
  medicalConditions: string;
  medications: string;
}

export default function UserRegistrationScreen() {
  const router = useRouter();
  const [healthData, setHealthData] = useState<HealthData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    systolicBP: '',
    diastolicBP: '',
    medicalConditions: '',
    medications: '',
  });

  const handleSubmit = async () => {
    try {
      // Save health data
      await AsyncStorage.setItem('health_data', JSON.stringify(healthData));
      
      // Get existing user data and update it
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        await AsyncStorage.setItem('user_data', JSON.stringify({
          ...parsedUserData,
          hasCompletedProfile: true,
        }));
      }

      // Navigate to main app
      router.replace('/input');
    } catch (error) {
      console.error('Error saving health data:', error);
    }
  };

  const updateHealthData = (field: keyof HealthData, value: string) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Health Profile</Text>
          <Text style={styles.subtitle}>Please provide your health information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={healthData.age}
              onChangeText={(value) => updateHealthData('age', value)}
              placeholder="Enter your age"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={healthData.gender}
              onChangeText={(value) => updateHealthData('gender', value)}
              placeholder="Enter your gender"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={healthData.height}
              onChangeText={(value) => updateHealthData('height', value)}
              placeholder="Enter your height in cm"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={healthData.weight}
              onChangeText={(value) => updateHealthData('weight', value)}
              placeholder="Enter your weight in kg"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Known Blood Pressure</Text>
            <View style={styles.bpContainer}>
              <TextInput
                style={[styles.input, styles.bpInput]}
                keyboardType="numeric"
                value={healthData.systolicBP}
                onChangeText={(value) => updateHealthData('systolicBP', value)}
                placeholder="Systolic"
              />
              <Text style={styles.bpSeparator}>/</Text>
              <TextInput
                style={[styles.input, styles.bpInput]}
                keyboardType="numeric"
                value={healthData.diastolicBP}
                onChangeText={(value) => updateHealthData('diastolicBP', value)}
                placeholder="Diastolic"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medical Conditions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={healthData.medicalConditions}
              onChangeText={(value) => updateHealthData('medicalConditions', value)}
              placeholder="List any medical conditions"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Medications</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={healthData.medications}
              onChangeText={(value) => updateHealthData('medications', value)}
              placeholder="List any medications you're taking"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Complete Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  bpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 24,
    marginHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});