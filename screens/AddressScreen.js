// screens/AddressScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddressScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSaveAddress = () => {
    // Zorunlu alanların kontrolü
    if (!fullName || !address) {
      Alert.alert('Error', 'Full Name and Address are required.');
      return;
    }

    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Details</Text>
      <TextInput
        placeholder="Type Your Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        placeholder="Type Your mobile no."
        style={styles.input}
        value={mobileNo}
        onChangeText={setMobileNo}
      />
      <Text style={styles.heading}>Address</Text>
      <TextInput
        placeholder="Pin Code"
        style={styles.input}
        value={pinCode}
        onChangeText={setPinCode}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Locality/Town"
        style={styles.input}
        value={locality}
        onChangeText={setLocality}
      />
      <View style={styles.row}>
        <TextInput
          placeholder="City/District"
          style={[styles.input, styles.halfInput]}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          placeholder="State"
          style={[styles.input, styles.halfInput]}
          value={state}
          onChangeText={setState}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
