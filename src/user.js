import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform, Image, TextInput, Button } from 'react-native';
import { db } from './firebase/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;

const User = () => {
  const [tcNumber, setTcNumber] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'patients'), where('TC', '==', tcNumber));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0])
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setPatientData(data);
      } else {
        setPatientData(null);
        alert('Bu TC kimlik numarasıyla eşleşen bir kayıt bulunamadı.');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('Veri sorgulama sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* TC Kimlik Giriş ve Sorgula Butonu */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="T.C. Kimlik Numarası"
          value={tcNumber}
          onChangeText={setTcNumber}
          keyboardType="numeric"
        />
        <Button title="Sorgula" onPress={fetchPatientData} color="#4CAF50" />
      </View>

      {loading && <Text style={styles.loadingText}>Yükleniyor...</Text>}

      {patientData && (
        <>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
              <Text style={styles.subHeaderText}>Hasta Bilgi Sistemi</Text>
              <Text style={styles.headerBoldText}>TIBBİ LABORATUVAR TETKİK SONUÇ RAPORU</Text>
            </View>
          </View>

          {/* Patient Info Section */}
          <View style={styles.section}>
            <Text style={styles.label}>Adı Soyadı: <Text style={styles.value}>{patientData.name}</Text></Text>
            <Text style={styles.label}>T.C. Numarası: <Text style={styles.value}>{patientData.TC}</Text></Text>
            <Text style={styles.label}>Doğum Tarihi: <Text style={styles.value}>{patientData.birthDate}</Text></Text>
            <Text style={styles.label}>Oluşturulma Tarihi: <Text style={styles.value}>{new Date(patientData.createdAt).toLocaleString()}</Text></Text>
          </View>

          {/* Lab Results Section */}
          <View style={styles.sectionGray}>
            <Text style={styles.subHeader}>Laboratuvar Sonuçları</Text>
          {patientData.UserIgG ?  <Text style={styles.label}>IgG: <Text style={styles.value}>{patientData.UserIgG || 'Belirtilmemiş'}</Text></Text>: ""}
          {patientData.UserIgG1 ? <Text style={styles.label}>IgG1: <Text style={styles.value}>{patientData.UserIgG1 || 'Belirtilmemiş'}</Text></Text>: ""}
          {patientData.UserIgG2 ? <Text style={styles.label}>IgG2: <Text style={styles.value}>{patientData.UserIgG2 || 'Belirtilmemiş'}</Text></Text>: ""}
          {patientData.UserIgM ? <Text style={styles.label}>IgM: <Text style={styles.value}>{patientData.UserIgM || 'Belirtilmemiş'}</Text></Text>: ""}
          {patientData.UserIga ? <Text style={styles.label}>IgA: <Text style={styles.value}>{patientData.UserIga}</Text></Text>: ""}
          </View>
        </>
        
      )}
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
  searchSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#fff',
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
  },
  headerBoldText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#444',
  },
  section: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  sectionGray: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});

export default User;
