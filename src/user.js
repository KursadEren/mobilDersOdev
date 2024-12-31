import React from 'react';
import { View, Text, StyleSheet, ScrollView,StatusBar,Platform } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 20;
const user = () => {
  const dummyData = {
    patientInfo: {
      name: 'M*** A***',
      tcNo: '37******90',
      dob: '21.01.2022 / 2',
      gender: 'E',
      place: 'ADAPAZARI',
      reportNo: '326972.-.31160234.2024',
      diagnosis: 'D80.7 - HİPOGAMAGLOBÜLİNEMİ, ÇOCUKLUK ÇAĞI, GEÇİCİ',
    },
    hospitalInfo: {
      hospitalName: 'SAKARYA EĞİTİM VE ARAŞTIRMA HASTANESİ',
      department: 'ÇOCUK ALERJİ VE İMMÜNOLOJİ SERVİSİ',
      doctor: 'Prof. Dr. Ö*** ÖZ***',
    },
    labResults: [
      { testName: 'IgG (Nefelometrik)', result: '7,66', range: '7 - 16 g/L' },
      { testName: 'IgM (Nefelometrik)', result: '0,58', range: '0,4 - 2,3 g/L' },
      { testName: 'IgA-S', result: '0,494', range: '0,7 - 4,0 g/L' },
    ],
  };

  return (

    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
        <Text style={styles.headerText}>{dummyData.hospitalInfo.hospitalName}</Text>
        <Text style={styles.headerText}>TIBBİ LABORATUVAR TETKİK SONUÇ RAPORU</Text>
      </View>

      {/* Patient Info Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Adı Soyadı: <Text style={styles.value}>{dummyData.patientInfo.name}</Text></Text>
        <Text style={styles.label}>T.C. Numarası: <Text style={styles.value}>{dummyData.patientInfo.tcNo}</Text></Text>
        <Text style={styles.label}>Doğum Tarihi / Yaşı: <Text style={styles.value}>{dummyData.patientInfo.dob}</Text></Text>
        <Text style={styles.label}>Cinsiyet / Doğum Yeri: <Text style={styles.value}>{dummyData.patientInfo.gender} / {dummyData.patientInfo.place}</Text></Text>
        <Text style={styles.label}>Rapor Numarası: <Text style={styles.value}>{dummyData.patientInfo.reportNo}</Text></Text>
        <Text style={styles.label}>Tanı: <Text style={styles.value}>{dummyData.patientInfo.diagnosis}</Text></Text>
      </View>

      {/* Hospital Info Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Doktor: <Text style={styles.value}>{dummyData.hospitalInfo.doctor}</Text></Text>
        <Text style={styles.label}>{dummyData.hospitalInfo.department}</Text>
      </View>

      {/* Lab Results Section */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Laboratuvar Sonuçları</Text>
        {dummyData.labResults.map((result, index) => (
          <View key={index} style={styles.resultRow}>
            <Text style={styles.resultText}>{result.testName}</Text>
            <Text style={styles.resultText}>Sonuç: {result.result}</Text>
            <Text style={styles.resultText}>Referans Aralığı: {result.range}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultRow: {
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
  },
});

export default user;
