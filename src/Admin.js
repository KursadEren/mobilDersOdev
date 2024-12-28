import { View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, setDoc } from "firebase/firestore";


const {width ,height} = Dimensions.get("window");

export default function Admin() {
  const [kilavuz, setKilavuz] = useState([]);
  const [UserIga, setUserIga] = useState();
  const [UserIga1, setUserIga1] = useState();
  const [UserIga2, setUserIga2] = useState();
  const [UserIgG, setUserIgG] = useState();
  const [UserIgG1, setUserIgG1] = useState();
  const [UserIgG2, setUserIgG2] = useState();
  const [UserIgG3, setUserIgG3] = useState();
  const [UserIgM, setUserIgM] = useState();
  const [BirthDate, setBirtDate] = useState();
  const getAllkilavuz = async () => {
    const querySnapshot = await getDocs(collection(db, "kilavuz"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setKilavuz(doc.data());
    });
  }
  useEffect(() => {


    getAllkilavuz();
  }, []);


  const FilterKilavuz = () => {
    const filteredKilavuz = kilavuz.filter

  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Text}>Doğum Günü</Text>
      <TextInput
        style={styles.input}
        placeholder="doğum Günü örn: 07/12/2001"
        placeholderTextColor={"#e3e3e3"}
        value={BirthDate}
        onChangeText={setBirtDate}
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
      <Text style={styles.Text}>UserIgM</Text>
      <TextInput
        style={styles.input}
        placeholder="UserIgM değeri giriniz"
        placeholderTextColor={"#e3e3e3"}
        value={UserIgM}
        onChangeText={setUserIgM}
      />
      <View style={styles.ButtonStyle}>
      <Button  onPress={()=>("")} title="Ara"/>
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
      fontSize:18,
      marginVertical:height*0.02,
      fontWeight:"bold",
      color:"#aaa"
  },
  ButtonStyle:{
    marginVertical:height*0.1,
   
  }
});