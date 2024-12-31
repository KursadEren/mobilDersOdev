import { View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from './firebase/FirebaseConfig';
import DateTime from './Components/DateTime';


const { width, height } = Dimensions.get("window");

export default function Admin({navigation}) {
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
  const [userMonth, setUserMonth] = useState(0);
  const [BirthDate, setBirtDate] = useState();
  const [list, setList] = useState([]);

  const getAllkilavuz = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dataCollection"));
      const data = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        // Dinamik olarak tüm alanları bir diziye ekleyin
        Object.keys(docData).forEach((key) => {
          if (Array.isArray(docData[key])) {
            data.push({ key, values: docData[key], id: doc.id }); // Key ve değerleri bir dizi olarak sakla
          }
        });
      });

      setKilavuz(data); // Dinamik veriyi kaydedin
    } catch (error) {
      console.error("Veri alırken hata oluştu:", error);
    }
  };


  useEffect(() => {


    getAllkilavuz();
    setDataLenght(kilavuz.length);
  }, []);

  useEffect(() => {
    console.log("list", list)
  }, [list])


  const FilterKilavuz = () => {
    if (!day || !month || !year) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }
    setList([]);
    // Doğum tarihini oluştur ve kontrol et
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const birthDateObject = new Date(formattedDate);

    if (isNaN(birthDateObject.getTime())) {
      Alert.alert('Hata', 'Geçersiz tarih girdiniz.');
      return;
    }

    setBirtDate(birthDateObject); // Doğum tarihini sakla

    // Bugünün tarihi
    const today = new Date();

    // Yaşın toplam ay cinsinden hesaplanması
    const totalYears = today.getFullYear() - birthDateObject.getFullYear();
    const totalMonths = totalYears * 12 + (today.getMonth() - birthDateObject.getMonth());

    // Gün farkını dikkate al
    if (today.getDate() < birthDateObject.getDate()) {
      totalMonths--;
    }

    setUserMonth(totalMonths); // Kullanıcının toplam ayını sakla
    console.log(`Toplam Yaş (Ay Cinsinden): ${totalMonths}`);

    console.log("kilavuz2", kilavuz)
    for (let i = 0; i < kilavuz.length; i++) {


      if (UserIga != "" && BirthDate) {

        if (kilavuz[i].key === "IgAlevels" ||
          kilavuz[i].key === "IgAlevelsBayram" ||
          kilavuz[i].key === "IgAlevelsSahin" ||
          kilavuz[i].key === "IgAlevelsStiehm") {
          if (userMonth) {

            if (kilavuz[i].key === "IgAlevels")
              for (let a = 0; a < kilavuz[i].values.length; a++) {
            
                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {
                  
                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga<= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga&&UserIga<= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga&&UserIga <= kilavuz[i].values[a]?.geoMax) {

                    const data = {
                      ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                      confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                      confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                      geoMax: kilavuz[i].values[a]?.geoMax || null,
                      geoMin: kilavuz[i].values[a]?.geoMin || null,
                      max: kilavuz[i].values[a]?.max || null,
                      min: kilavuz[i].values[a]?.min || null,
                      maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                      minMonth: kilavuz[i].values[a]?.minMonth || null,
                      number: kilavuz[i].values[a]?.number || null,
                      kilavuzname: kilavuz[i]?.id,
                      isactive: true
                    }
                    setList((prevList) => [...prevList, data]);
                  }
                  else {
                    const data = {
                      ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                      confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                      confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                      geoMax: kilavuz[i].values[a]?.geoMax || null,
                      geoMin: kilavuz[i].values[a]?.geoMin || null,
                      max: kilavuz[i].values[a]?.max || null,
                      min: kilavuz[i].values[a]?.min || null,
                      maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                      minMonth: kilavuz[i].values[a]?.minMonth || null,
                      number: kilavuz[i].values[a]?.number || null,
                      kilavuzname: kilavuz?.id,
                      isactive: false
                    }
                    setList((prevList) => [...prevList, data]);

                  }
                }
              }


            //IgaLevels Bayram


          }
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


  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      {/* ID */}
      {item.kilavuzname !== 'null' && (
        <Text style={styles.itemText}>ID: {item.kilavuzname || 'Unknown'}</Text>
      )}
  
      {/* Age Group */}
      {item.ageGroup !== 'null' && (
        <Text style={styles.itemText}>Age Group: {item.ageGroup || 'N/A'}</Text>
      )}
  
      {/* Confidence Interval Min */}
      {item.confidenceIntervalMin !== 'null' && (
        <Text style={styles.itemText}>
          Confidence Interval Min: {item.confidenceIntervalMin || 'N/A'}
        </Text>
      )}
  
      {/* Confidence Interval Max */}
      {item.confidenceIntervalMax !== '' && (
        <Text style={styles.itemText}>
          Confidence Interval Max: {item.confidenceIntervalMax || 'N/A'}
        </Text>
      )}
  
      {/* Geo Max */}
      {item.geoMax !== 'null' && (
        <Text style={styles.itemText}>Geo Max: {item.geoMax || 'N/A'}</Text>
      )}
  
      {/* Geo Min */}
      {item.geoMin !== 'null' && (
        <Text style={styles.itemText}>Geo Min: {item.geoMin || 'N/A'}</Text>
      )}
  
      {/* Max */}
      {item.max !== 'null' && (
        <Text style={styles.itemText}>Max: {item.max || 'N/A'}</Text>
      )}
  
      {/* Min */}
      {item.min !== 'null' && (
        <Text style={styles.itemText}>Min: {item.min || 'N/A'}</Text>
      )}
  
      {/* Max Month */}
      {item.maxMonth !== 'null' && (
        <Text style={styles.itemText}>Max Month: {item.maxMonth || 'N/A'}</Text>
      )}
  
      {/* Min Month */}
      {item.minMonth !== 'null' && (
        <Text style={styles.itemText}>Min Month: {item.minMonth || 'N/A'}</Text>
      )}
  
      {/* Number */}
      {item.number !== 'null' && (
        <Text style={styles.itemText}>Number: {item.number || 'N/A'}</Text>
      )}
  
      {/* Active */}
      <Text style={styles.itemText}>Active: {item.isactive ? 'Yes' : 'No'}</Text>
    </View>
  );
  

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
      <FlatList
        key={list.length} // key her güncellemede değişir
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz veri yok</Text>}
      />
      <View style={styles.ButtonStyle}>
        <Button onPress={() => navigation.navigate("KilavuzEkle")} title="Kilavuz Ekle" />
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