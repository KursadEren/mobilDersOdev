import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView, Button, Image } from 'react-native'
import React, { useState } from 'react'
import DateTime from './Components/DateTime';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase/FirebaseConfig';

const { width, height } = Dimensions.get("window")
export default function HastaEkle() {

    const HandleSetPatients = async () => {
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const newPatient = {
            name: name.trim(),
            TC: TC.trim(),
            birthDate: formattedDate,
            UserIga: UserIga || null,
            UserIga1: UserIga1 || null,
            UserIga2: UserIga2 || null,
            UserIga3: UserIga3 || null,
            UserIgG: UserIgG || null,
            UserIgG1: UserIgG1 || null,
            UserIgG2: UserIgG2 || null,
            UserIgG3: UserIgG3 || null,
            UserIgG4: UserIgG4 || null,
            UserIgM: UserIgM || null,
            createdAt: new Date().toISOString(),
        };

        try {
            const docRef = await addDoc(collection(db, "patients"), newPatient);
            alert("Kullanıcı başarıyla kaydedildi!");
            console.log("Kullanıcı ID:", docRef.id);


            setName("");
            setTC("");
            setDay("");
            setMonth("");
            setYear("");
            setUserIga("");
            setUserIga1("");
            setUserIga2("");
            setUserIga3("");
            setUserIgG("");
            setUserIgG1("");
            setUserIgG2("");
            setUserIgG3("");
            setUserIg4("");
            setUserIgM("");

        } catch (error) {
            console.error("Kullanıcı kaydedilirken hata oluştu:", error);
            alert("Kullanıcı kaydedilirken bir hata oluştu.");
        }
    }

    const [UserIga, setUserIga] = useState();
    const [UserIga1, setUserIga1] = useState();
    const [UserIga2, setUserIga2] = useState();
    const [UserIga3, setUserIga3] = useState();
    const [UserIgG, setUserIgG] = useState();
    const [UserIgG1, setUserIgG1] = useState();
    const [UserIgG2, setUserIgG2] = useState();
    const [UserIgG3, setUserIgG3] = useState();
    const [UserIgG4, setUserIg4] = useState();
    const [UserIgM, setUserIgM] = useState();

    const [name, setName] = useState();
    const [TC, setTC] = useState();

    const [day, setDay] = useState(''); // Gün
    const [month, setMonth] = useState(''); // Ay
    const [year, setYear] = useState(''); // Yıl

    const [list, setList] = useState([]);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerSection}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
                <Text style={styles.subHeaderText}>Hasta Kayıt Sayfası</Text>
            </View>



            <DateTime day={day}
                month={month}
                year={year}
                onDayChange={setDay}
                onMonthChange={setMonth}
                onYearChange={setYear} />
            <Text style={styles.Text}>Ad Soyad</Text>
            <TextInput
                style={styles.input}
                placeholder="Ad soyad"
                placeholderTextColor={"#e3e3e3"}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.Text}>Kimlik Numarası:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ad soyad"
                placeholderTextColor={"#e3e3e3"}
                value={TC}
                onChangeText={setTC}
            />

            <Text style={styles.Text}>UserIga</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIga değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIga}
                onChangeText={setUserIga}
            />
            <Text style={styles.Text}>UserIga1</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIga1 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIga1}
                onChangeText={setUserIga1}
            />
            <Text style={styles.Text}>UserIga2</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIga2 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIga2}
                onChangeText={setUserIga2}
            />
            <Text style={styles.Text}>UserIga3</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIga3 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIga3}
                onChangeText={setUserIga3}
            />
            <Text style={styles.Text}>UserIgG</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgG değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgG}
                onChangeText={setUserIgG}
            />
            <Text style={styles.Text}>UserIgG1</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgG1 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgG1}
                onChangeText={setUserIgG1}
            />
            <Text style={styles.Text}>UserIgG2</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgG2 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgG2}
                onChangeText={setUserIgG2}
            />

            <Text style={styles.Text}>UserIgG3</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgG3 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgG3}
                onChangeText={setUserIgG3}
            />
            <Text style={styles.Text}>UserIgG4</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgG4 değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgG4}
                onChangeText={setUserIg4}
            />
            <Text style={styles.Text}>UserIgM</Text>
            <TextInput
                style={styles.input}
                placeholder="UserIgM değeri giriniz"
                placeholderTextColor={"#e3e3e3"}
                value={UserIgM}
                onChangeText={setUserIgM}
            />
            <View style={{ marginVertical: 30 }}>
                <Button title="Kaydet" onPress={HandleSetPatients} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 40,
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
        padding: 8,
        marginTop: 10
    },
    Text: {
        marginVertical: height * 0.02,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    ButtonStyle: {
        marginVertical: height * 0.1,

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