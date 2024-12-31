







import { View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, TouchableOpacity, Alert, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from './firebase/FirebaseConfig';
import DateTime from './Components/DateTime';


const { width, height } = Dimensions.get("window");

export default function Admin({ navigation }) {
  const [kilavuz, setKilavuz] = useState([]);
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



    for (let i = 0; i < kilavuz.length; i++) {


      if (UserIga != "" && BirthDate) {

        if (kilavuz[i].key === "IgAlevels" ||
          kilavuz[i].key === "IgAlevelsBayram" ||
          kilavuz[i].key === "IgAlevelsSahin" ||
          kilavuz[i].key === "IgAlevelsStiehm") {
          if (userMonth) {
            //IgAlevels 
            if (kilavuz[i].key === "IgAlevels")
              for (let a = 0; a < kilavuz[i].values.length; a++) {

                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga && UserIga <= kilavuz[i].values[a]?.geoMax) {

                    const data = {
                      ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                      confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                      confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                      geoMax: kilavuz[i].values[a]?.geoMax || null,
                      geoMin: kilavuz[i].values[a]?.geoMin || null,
                      max: kilavuz[i].values[a]?.max || null,
                      min: kilavuz[i].values[a]?.min || null,
                      maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                      minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                      maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                      minMonth: kilavuz[i].values[a]?.minMonth || null,
                      number: kilavuz[i].values[a]?.number || null,
                      kilavuzname: kilavuz[i]?.id,
                      Type: "IgA",
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
                      maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                      minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                      maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                      minMonth: kilavuz[i].values[a]?.minMonth || null,
                      number: kilavuz[i].values[a]?.number || null,
                      kilavuzname: kilavuz[i]?.id,
                      Type: "IgA",
                      isactive: false
                    }
                    setList((prevList) => [...prevList, data]);

                  }
                }
              }
            //IgaLevels Bayram
            if (kilavuz[i].key === "IgAlevelsBayram")
              for (let a = 0; a < kilavuz[i].values.length; a++) {

                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga && UserIga <= kilavuz[i].values[a]?.geoMax) {

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
                      kilavuzname: kilavuz[i]?.id,
                      isactive: false
                    }
                    setList((prevList) => [...prevList, data]);

                  }
                }
              }
            //IgAlevels Sahin
            if (kilavuz[i].key === "IgAlevelsSahin")
              for (let a = 0; a < kilavuz[i].values.length; a++) {

                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga && UserIga <= kilavuz[i].values[a]?.geoMax) {

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
                      kilavuzname: kilavuz[i]?.id,
                      isactive: false
                    }
                    setList((prevList) => [...prevList, data]);

                  }
                }
              }
            //IgAlevels Stiehm 
            if (kilavuz[i].key === "IgAlevelsStiehm")
              for (let a = 0; a < kilavuz[i].values.length; a++) {

                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga && UserIga <= kilavuz[i].values[a]?.geoMax) {

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
                      kilavuzname: kilavuz[i]?.id,
                      isactive: false
                    }
                    setList((prevList) => [...prevList, data]);

                  }
                }
              }

          }
        }



      }
      if (UserIga1 != "" && BirthDate) {




        if (kilavuz[i].key === "IgA1levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIga1 && UserIga1 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga1 && UserIga1 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIga1 && UserIga1 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIga1 && UserIga1 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA1",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA1",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }








      }
      if (UserIga2 != "" && BirthDate) {

        if (kilavuz[i].key === "IgA2levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIga2 && UserIga2 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga2 && UserIga2 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIga2 && UserIga2 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIga2 && UserIga2 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA2",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA2",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }


      }
      if (UserIga3 != "" && BirthDate) {
        if (kilavuz[i].key === "IgA3levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIga3 && UserIga3 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga3 && UserIga3 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIga3 && UserIga3 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIga3 && UserIga3 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA3",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgA3",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgG != "" && BirthDate) {
        if (kilavuz[i].key === "IgGlevels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgG && UserIgG <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgG && UserIgG <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgG && UserIgG <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgG && UserIgG <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgG1 != "" && BirthDate) {
        if (kilavuz[i].key === "IgG1levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgG1 && UserIgG1 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgG1 && UserIgG1 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgG1 && UserIgG1 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgG1 && UserIgG1 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG1",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG1",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgG2 != "" && BirthDate) {
        if (kilavuz[i].key === "IgG2levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgG2 && UserIgG2 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgG2 && UserIgG2 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgG2 && UserIgG2 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgG2 && UserIgG2 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG2",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG2",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgG3 != "" && BirthDate) {
        if (kilavuz[i].key === "IgG3levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgG3 && UserIgG3 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgG3 && UserIgG3 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgG3 && UserIgG3 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgG3 && UserIgG3 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG3",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG3",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgG4 != "" && BirthDate) {
        if (kilavuz[i].key === "IgG4levels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgG4 && UserIgG4 <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgG4 && UserIgG4 <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgG4 && UserIgG4 <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgG4 && UserIgG4 <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG4",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgG4",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }
      if (UserIgM != "" && BirthDate) {
        if (kilavuz[i].key === "IgMlevels") {
          if (userMonth) {
            for (let a = 0; a < kilavuz[i].values.length; a++) {
              if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {

                if (kilavuz[i].values[a]?.min <= UserIgM && UserIgM <= kilavuz[i].values[a]?.max ||
                  kilavuz[i].values[a]?.confidenceInterval?.min <= UserIgM && UserIgM <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                  kilavuz[i].values[a]?.geoMin <= UserIgM && UserIgM <= kilavuz[i].values[a]?.geoMax ||
                  kilavuz[i].values[a]?.minMeanSd <= UserIgM && UserIgM <= kilavuz[i].values[a]?.maxMeanSd) {
                  const data = {
                    ageGroup: kilavuz[i].values[a]?.ageGroup || null,
                    confidenceIntervalMin: kilavuz[i].values[a]?.confidenceInterval?.min || null,
                    confidenceIntervalMax: kilavuz[i].values[a]?.confidenceInterval?.max || null,
                    geoMax: kilavuz[i].values[a]?.geoMax || null,
                    geoMin: kilavuz[i].values[a]?.geoMin || null,
                    max: kilavuz[i].values[a]?.max || null,
                    min: kilavuz[i].values[a]?.min || null,
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgM",
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
                    maxMeanSd: kilavuz[i].values[a]?.maxMeanSd || null,
                    minMeanSd: kilavuz[i].values[a]?.minMeanSd || null,
                    maxMonth: kilavuz[i].values[a]?.maxMonth || null,
                    minMonth: kilavuz[i].values[a]?.minMonth || null,
                    number: kilavuz[i].values[a]?.number || null,
                    kilavuzname: kilavuz[i]?.id,
                    Type: "IgM",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);

                }
              }
            }
          }
        }
      }

    }
  }




  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>T.C. SAĞLIK BAKANLIĞI</Text>
        <Text style={styles.subHeaderText}>Filtreleme</Text>
      </View>

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
      <FlatList
        data={Object.entries(
          list.reduce((groups, item) => {
            const groupName = item.kilavuzname || 'Unknown';
            if (!groups[groupName]) {
              groups[groupName] = [];
            }
            groups[groupName].push(item);
            return groups;
          }, {})
        )}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const [groupName, groupData] = item;
          return (
            <View style={styles.groupContainer}>
              <Text style={styles.groupTitle}>Kılavuz: {groupName}</Text>
              <FlatList
                data={groupData}
                keyExtractor={(subItem, index) => `${groupName}-${index}`}
                horizontal
                renderItem={({ item: subItem }) => (
                  <View
                    style={[
                      styles.listItem,
                      {
                        borderWidth: 1,
                        borderColor: subItem.isactive ? 'green' : 'red',
                        borderRadius: 10,
                        backgroundColor: '#e3e3e3',
                        marginVertical: 10,
                        marginHorizontal: 10,
                        padding: 10,
                      },
                    ]}
                  >
                    {/* Type */}
                    {subItem.Type && <Text style={styles.itemText}>Type: {subItem.Type || 'N/A'}</Text>}
                    {/* Age Group */}
                    {subItem.ageGroup && (
                      <Text style={styles.itemText}>Age Group: {subItem.ageGroup || 'N/A'}</Text>
                    )}
                    {/* Confidence Interval Min */}
                    {subItem.confidenceIntervalMin && (
                      <Text style={styles.itemText}>
                        Confidence Interval Min: {subItem.confidenceIntervalMin || 'N/A'}
                      </Text>
                    )}
                    {/* Confidence Interval Max */}
                    {subItem.confidenceIntervalMax && (
                      <Text style={styles.itemText}>
                        Confidence Interval Max: {subItem.confidenceIntervalMax || 'N/A'}
                      </Text>
                    )}
                    {/* Geo Max */}
                    {subItem.geoMax && <Text style={styles.itemText}>Geo Max: {subItem.geoMax || 'N/A'}</Text>}
                    {/* Geo Min */}
                    {subItem.geoMin && <Text style={styles.itemText}>Geo Min: {subItem.geoMin || 'N/A'}</Text>}
                    {/* Max */}
                    {subItem.max && <Text style={styles.itemText}>Max: {subItem.max || 'N/A'}</Text>}
                    {/* Min */}
                    {subItem.min && <Text style={styles.itemText}>Min: {subItem.min || 'N/A'}</Text>}
                    {/* Active */}
                    <Text style={styles.itemText}>Active: {subItem.isactive ? 'Yes' : 'No'}</Text>
                  </View>
                )}
              />
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz veri yok</Text>}
      />
      <View style={styles.ButtonStyle}>
        <Button onPress={() => FilterKilavuz()} title="Filterele"></Button>
      </View>
      <View style={styles.ButtonStyle}>
        <Button onPress={() => navigation.navigate("KilavuzEkle")} title="Kilavuz Ekle" />
      </View>
      <View style={styles.ButtonStyle}>
        <Button onPress={() => navigation.navigate("HastaEkle")} title="Hasta Ekle" />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 20,
    marginTop: 40,
    backgroundColor: '#fff'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 10,

  },
  Text: {
    fontSize: 18,
    marginVertical: height * 0.02,
    fontWeight: "bold",
    color: "#aaa"
  },
  ButtonStyle: {
    marginVertical: height * 0.01,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,

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