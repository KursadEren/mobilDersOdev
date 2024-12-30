import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const {width,height}= Dimensions.get("window")

const DateTime = ({  day , month, year, onDayChange, onMonthChange, onYearChange }) => {
    const [day, setDay] = useState(''); // Gün
    const [month, setMonth] = useState(''); // Ay
    const [year, setYear] = useState(''); // Yıl
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCombineDate = () => {
        if (!day || !month || !year) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
            return;
        }

        const combinedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const dateObject = new Date(combinedDate);

        if (isNaN(dateObject.getTime())) {
            Alert.alert('Hata', 'Geçersiz tarih girdiniz.');
            return;
        }

        setSelectedDate(combinedDate);
        Alert.alert('Başarılı', `Tarih: ${combinedDate}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.DateFormContaimner}>
                <Text style={styles.label}>Gün:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={day}
                    onChangeText={onDayChange}
                    placeholder="GG"
                   
                />
            </View>
            <View style={styles.DateFormContaimner}>
                <Text style={styles.label}>Ay:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={month}  
                    onChangeText={onMonthChange} 
                    placeholder="AA"
                />
            </View>
            <View style={styles.DateFormContaimner}>
                <Text style={styles.label}>Yıl:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={4}
                    value={year}
                    onChangeText={onYearChange}
                    placeholder="YYYY"
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        flexDirection: "row",
        marginVertical:height*0.02
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        
    },
    input: {
        width: 100,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
    },
    DateFormContaimner:{
        marginHorizontal:width*0.01
    }
});

export default DateTime;
