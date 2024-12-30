import { View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from './firebase/FirebaseConfig';
import DateTime from './Components/DateTime';


const { width, height } = Dimensions.get("window");

export default function Admin() {
  const [kilavuz, setKilavuz] = useState([]);
  const [UserIga, setUserIga] = useState();
  const [UserIga1, setUserIga1] = useState();
  const [UserIga2, setUserIga2] = useState();
  const [UserIgG, setUserIgG] = useState();
  const [UserIgG1, setUserIgG1] = useState();
  const [UserIgG2, setUserIgG2] = useState();
  const [UserIgG3, setUserIgG3] = useState();
  const [UserIgG4, setUserIg4] = useState();
  const [UserIgM, setUserIgM] = useState();
  const [dataLenght, setDataLenght] = useState(0);

  const [day, setDay] = useState(''); // Gün
  const [month, setMonth] = useState(''); // Ay
  const [year, setYear] = useState(''); // Yıl

  const [BirthDate, setBirtDate] = useState();
  const getAllkilavuz = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dataCollection"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setKilavuz(data);

    } catch (error) {
      console.error("Veri alırken hata oluştu:", error);
    }
  };

  useEffect(() => {


    getAllkilavuz();
    setDataLenght(kilavuz.length);
  }, []);




  const FilterKilavuz = () => {
    if (!day || !month || !year) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }

    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    setBirtDate(formattedDate)
    console.log(formattedDate)

    if (isNaN(dateObject.getTime())) {
      Alert.alert('Hata', 'Geçersiz tarih girdiniz.');
      return;
    }

    setCombinedDate(formattedDate); // Birleşmiş tarihi sakla
    Alert.alert('Başarılı', `Birleşmiş Tarih: ${formattedDate}`);

    for (let i = 0; i < kilavuz.length; i++) {
      const today = new Date();

      if (UserIga != "" && BirthDate) {

        for (let a = 0; a < kilavuz[i].IgAlevels.length; a++) {

        }



      }
      else if (UserIga1 != "" && BirthDate) {

      }
      else if (UserIga2 != "" && BirthDate) {

      }
      else if (UserIga2 != "" && BirthDate) {

      }
      else if (UserIgG != "" && BirthDate) {

      }
      else if (UserIgG1 != "" && BirthDate) {

      }
      else if (UserIgG2 != "" && BirthDate) {

      }
      else if (UserIgG3 != "" && BirthDate) {

      }
      else if (UserIgG4 != "" && BirthDate) {

      }
      else if (UserIgM != "" && BirthDate) {

      }

    }
  }


  return (
    <ScrollView style={styles.container}>
      <Button onPress={() => FilterKilavuz()} title="hey"></Button>
      <DateTime day={day}
        month={month}
        year={year}
        onDayChange={setDay}
        onMonthChange={setMonth}
        onYearChange={setYear} />

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
        placeholder="UserIgG4 değeri giriniz"
        placeholderTextColor={"#e3e3e3"}
        value={UserIgG4}
        onChangeText={setUserIgG2}
      />
      <Text style={styles.Text}>UserIgG4</Text>
      <TextInput
        style={styles.input}
        placeholder="UserIgG3 değeri giriniz"
        placeholderTextColor={"#e3e3e3"}
        value={UserIgG3}
        onChangeText={setUserIgG3}
      />
      <Text style={styles.Text}>UserIgM</Text>
      <TextInput
        style={styles.input}
        placeholder="UserIgM değeri giriniz"
        placeholderTextColor={"#e3e3e3"}
        value={UserIgM}
        onChangeText={setUserIgM}
      />
      <View style={styles.ButtonStyle}>
        <Button onPress={() => ("")} title="Ara" />
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
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 10
  },
  Text: {
    fontSize: 18,
    marginVertical: height * 0.02,
    fontWeight: "bold",
    color: "#aaa"
  },
  ButtonStyle: {
    marginVertical: height * 0.1,

  },

});