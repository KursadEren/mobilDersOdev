// AddLevels.js
import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet,
    ScrollView, Alert, TouchableOpacity, Image
} from 'react-native';
import { db, } from './firebase/FirebaseConfig'; // Firebase yapılandırmasını doğru şekilde import edin
import uuid from 'react-native-uuid'; // react-native-uuid paketini import ediyoruz
import { doc, setDoc } from 'firebase/firestore';


const AddLevels = () => {

    const [guideName, setGuideName] = useState('');

    // Her bir immünoglobulin seviyesi için ayrı state dizileri
    const [IgAlevels, setIgAlevels] = useState([]);
    const [IgGlevels, setIgGlevels] = useState([]);
    const [IgMlevels, setIgMlevels] = useState([]);
    const [IgG1levels, setIgG1levels] = useState([]);
    const [IgG2levels, setIgG2levels] = useState([]);
    const [IgG3levels, setIgG3levels] = useState([]);
    const [IgG4levels, setIgG4levels] = useState([]);

    // Genel form alanı ekleme fonksiyonu
    const addLevel = (levelType) => {
        const newLevel = {
            id: uuid.v4(), // react-native-uuid ile benzersiz ID oluşturuyoruz
            ageGroup: '',
            minMonth: 0,
            maxMonth: 0,
            number: '',
            geoMeanSD: '',
            geoMin: '',
            geoMax: '',
            meanSD: '',
            min: '',
            max: '',
            confidenceInterval: {
                min: '',
                max: ''
            }
        };

        switch (levelType) {
            case 'IgA':
                setIgAlevels([...IgAlevels, newLevel]);
                break;
            case 'IgG':
                setIgGlevels([...IgGlevels, newLevel]);
                break;
            case 'IgM':
                setIgMlevels([...IgMlevels, newLevel]);
                break;
            case 'IgG1':
                setIgG1levels([...IgG1levels, newLevel]);
                break;
            case 'IgG2':
                setIgG2levels([...IgG2levels, newLevel]);
                break;
            case 'IgG3':
                setIgG3levels([...IgG3levels, newLevel]);
                break;
            case 'IgG4':
                setIgG4levels([...IgG4levels, newLevel]);
                break;
            default:
                break;
        }
    };

    // Form alanını silme fonksiyonu
    const removeLevel = (levelType, id) => {
        switch (levelType) {
            case 'IgA':
                setIgAlevels(IgAlevels.filter(level => level.id !== id));
                break;
            case 'IgG':
                setIgGlevels(IgGlevels.filter(level => level.id !== id));
                break;
            case 'IgM':
                setIgMlevels(IgMlevels.filter(level => level.id !== id));
                break;
            case 'IgG1':
                setIgG1levels(IgG1levels.filter(level => level.id !== id));
                break;
            case 'IgG2':
                setIgG2levels(IgG2levels.filter(level => level.id !== id));
                break;
            case 'IgG3':
                setIgG3levels(IgG3levels.filter(level => level.id !== id));
                break;
            case 'IgG4':
                setIgG4levels(IgG4levels.filter(level => level.id !== id));
                break;
            default:
                break;
        }
    };

    // Form alanını güncelleme fonksiyonu
    const updateLevel = (levelType, id, field, value) => {
        const updateFunction = (levels, setLevels) => {
            const updatedLevels = levels.map(level => {
                if (level.id === id) {
                    if (field.includes('confidenceInterval')) {
                        const [parent, child] = field.split('.');
                        return {
                            ...level,
                            [parent]: {
                                ...level[parent],
                                [child]: value
                            }
                        };
                    } else {
                        return { ...level, [field]: value };
                    }
                }
                return level;
            });
            setLevels(updatedLevels);
        };

        switch (levelType) {
            case 'IgA':
                updateFunction(IgAlevels, setIgAlevels);
                break;
            case 'IgG':
                updateFunction(IgGlevels, setIgGlevels);
                break;
            case 'IgM':
                updateFunction(IgMlevels, setIgMlevels);
                break;
            case 'IgG1':
                updateFunction(IgG1levels, setIgG1levels);
                break;
            case 'IgG2':
                updateFunction(IgG2levels, setIgG2levels);
                break;
            case 'IgG3':
                updateFunction(IgG3levels, setIgG3levels);
                break;
            case 'IgG4':
                updateFunction(IgG4levels, setIgG4levels);
                break;
            default:
                break;
        }
    };

    // Formu Firebase'e kaydetme fonksiyonu
    const handleSubmit = async () => {
        if (!guideName.trim()) {
            Alert.alert('Hata', 'Kılavuz adını giriniz.');
            return;
        }

        // Boş alanları kontrol etme
        const allLevels = [IgAlevels, IgGlevels, IgMlevels, IgG1levels, IgG2levels, IgG3levels, IgG4levels];
        // Örnek: Yalnızca minMonth, maxMonth, min, max ve confidenceInterval alanlarını zorunlu kılalım
        for (let levelArray of allLevels) {
            for (let level of levelArray) {
                // confidenceInterval kontrolü
                if (level.confidenceInterval) {
                    if (
                        level.confidenceInterval.min === '' ||
                        level.confidenceInterval.max === ''
                    ) {
                        Alert.alert('Hata', 'Tüm güven aralığı alanlarını doldurunuz.');
                        return;
                    }
                }

                // minMonth, maxMonth, min, max
                const requiredNumericFields = ['minMonth', 'maxMonth', 'min', 'max'];
                for (let field of requiredNumericFields) {
                    // null veya boş string durumuna bak
                    if (level[field] === '' || level[field] === null || level[field] === undefined) {
                        Alert.alert('Hata', `${field} alanı boş bırakılamaz!`);
                        return;
                    }
                }
            }
        }


        console.log("hey")
        const data = {
            guideName: guideName.trim(),
            IgAlevels,
            IgGlevels,
            IgMlevels,
            IgG1levels,
            IgG2levels,
            IgG3levels,
            IgG4levels,
        };
        console.log("hey2")
        try {
            const docRef = doc(db, 'dataCollection', guideName.trim());
            await setDoc(docRef, data);
            Alert.alert('Başarılı', 'Veriler Firebase\'e kaydedildi.');

            // Formu temizlemek
            setGuideName('');
            setIgAlevels([]);
            setIgGlevels([]);
            setIgMlevels([]);
            setIgG1levels([]);
            setIgG2levels([]);
            setIgG3levels([]);
            setIgG4levels([]);
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert('Hata', 'Veriler kaydedilemedi.');
        }
    };

    // Dinamik form alanlarını render eden fonksiyon
    const renderLevels = (levels, levelType) => {
        return levels.map((level, index) => (
            <View key={level.id} style={styles.levelContainer}>
                <Text style={styles.levelHeader}>{levelType} Seviyesi {index + 1}</Text>

                <Text style={styles.label}>Age Group</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Age Group"
                    placeholderTextColor="#e3e3e3"
                    value={level.ageGroup}
                    onChangeText={(text) => updateLevel(levelType, level.id, 'ageGroup', text)}
                />

                <Text style={styles.label}>Min Month</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Min Month"
                    placeholderTextColor="#e3e3e3"
                    value={level.minMonth}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'minMonth', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Max Month</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Max Month"
                    placeholderTextColor="#e3e3e3"
                    value={level.maxMonth.toString()} // Sayısal değeri stringe çevir
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'maxMonth', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Number"
                    placeholderTextColor="#e3e3e3"
                    value={level.number}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        updateLevel(levelType, level.id, 'number', numericValue);
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Geo Mean ± SD</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Geo Mean ± SD"
                    placeholderTextColor="#e3e3e3"
                    value={level.geoMeanSD}
                    onChangeText={(text) => updateLevel(levelType, level.id, 'geoMeanSD', text)}
                />

                <Text style={styles.label}>Geo Min</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Geo Min"
                    placeholderTextColor="#e3e3e3"
                    value={level.geoMin}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'geoMin', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Geo Max</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Geo Max"
                    placeholderTextColor="#e3e3e3"
                    value={level.geoMax}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'geoMax', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Mean ± SD</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mean ± SD"
                    placeholderTextColor="#e3e3e3"
                    value={level.meanSD}
                    onChangeText={(text) => updateLevel(levelType, level.id, 'meanSD', text)}
                />

                <Text style={styles.label}>Min</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Min"
                    placeholderTextColor="#e3e3e3"
                    value={level.min}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        updateLevel(levelType, level.id, 'min', numericValue);
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Max</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Max"
                    placeholderTextColor="#e3e3e3"
                    value={level.max}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, '');
                        updateLevel(levelType, level.id, 'max', numericValue);
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Confidence Interval Min</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confidence Interval Min"
                    placeholderTextColor="#e3e3e3"
                    value={level.confidenceInterval.min}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'confidenceInterval.min', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Confidence Interval Max</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confidence Interval Max"
                    placeholderTextColor="#e3e3e3"
                    value={level.confidenceInterval.max}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10); // Sadece sayıları al
                        updateLevel(levelType, level.id, 'confidenceInterval.max', numericValue || 0); // NaN olursa 0 kullan
                    }}
                    keyboardType="numeric"
                />

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeLevel(levelType, level.id)}
                >
                    <Text style={styles.removeButtonText}>Sil</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerSection}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
                <Text style={styles.subHeaderText}>Yeni Kılavuz Ekle</Text>
            </View>


            <Text style={styles.label}>Kılavuz Adı</Text>
            <TextInput
                style={styles.input}
                placeholder="Kılavuz adını giriniz"
                placeholderTextColor="#e3e3e3"
                value={guideName}
                onChangeText={setGuideName}
            />

            {/* IgA Levels */}
            <Text style={styles.sectionHeader}>IgA Seviyeleri</Text>
            {renderLevels(IgAlevels, 'IgA')}
            <Button title="IgA Seviyesi Ekle" onPress={() => addLevel('IgA')} />

            {/* IgG Levels */}
            <Text style={styles.sectionHeader}>IgG Seviyeleri</Text>
            {renderLevels(IgGlevels, 'IgG')}
            <Button title="IgG Seviyesi Ekle" onPress={() => addLevel('IgG')} />

            {/* IgM Levels */}
            <Text style={styles.sectionHeader}>IgM Seviyeleri</Text>
            {renderLevels(IgMlevels, 'IgM')}
            <Button title="IgM Seviyesi Ekle" onPress={() => addLevel('IgM')} />

            {/* IgG1 Levels */}
            <Text style={styles.sectionHeader}>IgG1 Seviyeleri</Text>
            {renderLevels(IgG1levels, 'IgG1')}
            <Button title="IgG1 Seviyesi Ekle" onPress={() => addLevel('IgG1')} />

            {/* IgG2 Levels */}
            <Text style={styles.sectionHeader}>IgG2 Seviyeleri</Text>
            {renderLevels(IgG2levels, 'IgG2')}
            <Button title="IgG2 Seviyesi Ekle" onPress={() => addLevel('IgG2')} />

            {/* IgG3 Levels */}
            <Text style={styles.sectionHeader}>IgG3 Seviyeleri</Text>
            {renderLevels(IgG3levels, 'IgG3')}
            <Button title="IgG3 Seviyesi Ekle" onPress={() => addLevel('IgG3')} />

            {/* IgG4 Levels */}
            <Text style={styles.sectionHeader}>IgG4 Seviyeleri</Text>
            {renderLevels(IgG4levels, 'IgG4')}
            <Button title="IgG4 Seviyesi Ekle" onPress={() => addLevel('IgG4')} />

            <View style={{ marginVertical: 20 }}>
                <Button title="Kaydet" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        color: '#000',
    },
    levelContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    levelHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
});

export default AddLevels;
