import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform, Image, TextInput, Button } from 'react-native';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

const PatientRegistration = () => {
  const [patientData, setPatientData] = React.useState({
    name: '',
    tcNo: '',
    dob: '',
    gender: '',
    place: '',
  });

  const handleInputChange = (key, value) => {
    setPatientData({ ...patientData, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Patient Data Submitted:', patientData);
    // Submit logic here (e.g., send data to a server or database)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
        <Text style={styles.subHeaderText}>Hasta Kayıt Sayfası</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Adı Soyadı:</Text>
        <TextInput
          style={styles.input}
          placeholder="Adı Soyadı"
          value={patientData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        <Text style={styles.label}>T.C. Numarası:</Text>
        <TextInput
          style={styles.input}
          placeholder="T.C. Numarası"
          keyboardType="numeric"
          value={patientData.tcNo}
          onChangeText={(text) => handleInputChange('tcNo', text)}
        />

        <Text style={styles.label}>Doğum Tarihi:</Text>
        <TextInput
          style={styles.input}
          placeholder="Doğum Tarihi (GG.AA.YYYY)"
          value={patientData.dob}
          onChangeText={(text) => handleInputChange('dob', text)}
        />

        <Text style={styles.label}>Cinsiyet:</Text>
        <TextInput
          style={styles.input}
          placeholder="Cinsiyet (E/K)"
          value={patientData.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
        />

        <Text style={styles.label}>Doğum Yeri:</Text>
        <TextInput
          style={styles.input}
          placeholder="Doğum Yeri"
          value={patientData.place}
          onChangeText={(text) => handleInputChange('place', text)}
        />

        <Button title="Kaydet" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  formSection: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
});

export { PatientRegistration };
