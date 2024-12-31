import { View, Text,TextInput ,StyleSheet, Dimensions, ScrollView} from 'react-native'
import React,{useState} from 'react'
import DateTime from './Components/DateTime';

const {width,height} = Dimensions.get("window")
export default function HastaEkle() {

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