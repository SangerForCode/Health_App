import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BPInputScreen() {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    console.log({
      systolic,
      diastolic,
      pulse,
      notes
    });
    alert(`BP Record Saved!\n${systolic}/${diastolic} | Pulse: ${pulse}`);
  };

  return (
    <LinearGradient colors={['#f7f9fc', '#eef2f5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Record Your Blood Pressure</Text>
              <Text style={styles.headerSubtitle}>Enter your latest readings</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Systolic (mmHg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="120"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={systolic}
                    onChangeText={setSystolic}
                  />
                </View>

                <View style={styles.divider}>
                  <Text style={styles.slash}>/</Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Diastolic (mmHg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="80"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={diastolic}
                    onChangeText={setDiastolic}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Pulse (bpm)</Text>
                <TextInput
                  style={[styles.input, styles.fullWidthInput]}
                  placeholder="72"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={pulse}
                  onChangeText={setPulse}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.notesInput]}
                  placeholder="E.g. After morning walk"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={['#6e45e2', '#88d3ce']}
                style={styles.buttonGradient}
              >
                <Text style={styles.submitButtonText}>Save Measurement</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
//hehe
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
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
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  fullWidthInput: {
    width: '100%',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  divider: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  slash: {
    fontSize: 24,
    color: '#999',
    marginTop: 20,
  },
  submitButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#6e45e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});