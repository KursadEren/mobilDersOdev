import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { db } from './firebase/FirebaseConfig'; // Firebase bağlantısını içe aktar
import { doc, getDoc } from 'firebase/firestore';

export default function User() {
  const [inputId, setInputId] = useState('');
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputId) {
      Alert.alert('Hata', 'Lütfen bir ID girin.');
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, 'collectionName', inputId); // "collectionName" kısmını değiştirin
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocumentData(docSnap.data());
      } else {
        Alert.alert('Hata', 'Belge bulunamadı.');
        setDocumentData(null);
      }
    } catch (error) {
      console.error('Firestore sorgu hatası:', error);
      Alert.alert('Hata', 'Belge sorgularken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.key}</Text>
      <Text style={styles.cell}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belge Sorgulama</Text>

      <TextInput
        style={styles.input}
        placeholder="Belge ID'sini girin"
        value={inputId}
        onChangeText={setInputId}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>{loading ? 'Aranıyor...' : 'Sorgula'}</Text>
      </TouchableOpacity>

      {documentData && (
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Belge Detayları</Text>
          <FlatList
            data={Object.entries(documentData).map(([key, value]) => ({
              key,
              value: String(value),
            }))}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});
