







import { View, Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, TouchableOpacity, Alert, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from './firebase/FirebaseConfig';
import DateTime from './Components/DateTime';


const { width, height } = Dimensions.get("window");

export default function Admin({ navigation }) {
  const [kilavuz, setKilavuz] = useState([]);
  const [UserIga, setUserIga] = useState("");
  const [UserIga1, setUserIga1] = useState("");
  const [UserIga2, setUserIga2] = useState("");
  const [UserIga3, setUserIga3] = useState("");
  const [UserIgG, setUserIgG] = useState("");
  const [UserIgG1, setUserIgG1] = useState("");
  const [UserIgG2, setUserIgG2] = useState("");
  const [UserIgG3, setUserIgG3] = useState("");
  const [UserIgG4, setUserIg4] = useState("");
  const [UserIgM, setUserIgM] = useState("");
  const [dataLenght, setDataLenght] = useState(0);

  const [day, setDay] = useState(''); // Gün
  const [month, setMonth] = useState(''); // Ay
  const [year, setYear] = useState(''); // Yıl
  const [userMonth, setUserMonth] = useState(0);
  const [BirthDate, setBirtDate] = useState();
  const [list, setList] = useState([]);
  const [flag, setFlag] = useState(0);
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
      let foundRangeUserIga = false;
      let foundRangeUserIgBayram = false;
      let foundRangeUserIgSahin = false;
      let foundRangeUserIgStiehm = false;
      let foundRangeUserIgA2 = false;
      let foundRangeUserIgA3 = false;
      let foundRangeUserIgG1 = false;
      let foundRangeUserIgG2 = false;
      let foundRangeUserIgG3 = false;
      let foundRangeUserIgG4 = false;
      let foundRangeUserIgM = false;

      if (UserIga != "" && BirthDate) {
        

        if (kilavuz[i].key == "IgAlevels" ||
          kilavuz[i].key === "IgAlevelsBayram" ||
          kilavuz[i].key === "IgAlevelsSahin" ||
          kilavuz[i].key === "IgAlevelsStiehm") {
          if (userMonth) {
            //IgAlevels 
            if (kilavuz[i].key == "IgAlevels") {

              for (let a = 0; a < kilavuz[i].values.length; a++) {
                if (kilavuz[i].values[a].minMonth <= userMonth && userMonth <= kilavuz[i].values[a].maxMonth) {


                  if (kilavuz[i].values[a]?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.max ||
                    kilavuz[i].values[a]?.confidenceInterval?.min <= UserIga && UserIga <= kilavuz[i].values[a]?.confidenceInterval?.max ||
                    kilavuz[i].values[a]?.geoMin <= UserIga && UserIga <= kilavuz[i].values[a]?.geoMax) {
                    foundRangeUserIga = true;
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
                      kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                      Type: "IgA",
                      isactive: true
                    }

                    setList((prevList) => [...prevList, data]);
                  }

                }

                if (foundRangeUserIga === false && a === kilavuz[i].values.length - 1) {
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
                    kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
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

                }
                if (foundRangeUserIgBayram === false && a === kilavuz[i].values.length - 1) {
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
                    kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                    Type: "IgA",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);
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

                }
                if (foundRangeUserIgSahin === false && a === kilavuz[i].values.length - 1) {
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
                    kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                    Type: "IgA",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);
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

                }
                if (foundRangeUserIgStiehm === false && a === kilavuz[i].values.length - 1) {
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
                    kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                    Type: "IgA",
                    isactive: false
                  }
                  setList((prevList) => [...prevList, data]);
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

              }
              if (foundRangeUserIgStiehm === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgA",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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

              }
              if (foundRangeUserIgA2 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgA2",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
              }
              if (foundRangeUserIgA3 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgA3",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
              }
              if (foundRangeUserIgG === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgG",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
                  
              }
              if (foundRangeUserIgG1 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgG1",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
              }
              if (foundRangeUserIgG2 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgG2",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
              }
              if (foundRangeUserIgG3 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgG3",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
                
                
              }
              if (foundRangeUserIgG4 === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
                  Type: "IgG4",
                  isactive: false
                }
                setList((prevList) => [...prevList, data]);
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
               
              }
              if (foundRangeUserIgM === false && a === kilavuz[i].values.length - 1) {
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
                  kilavuzname: kilavuz[i]?.id || kilavuz[i].values[a.max]?.guideName,
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
      <View style={styles.inputContainer}>
        {[
          { label: "UserIga", value: UserIga, setter: setUserIga },
          { label: "UserIga1", value: UserIga1, setter: setUserIga1 },
          { label: "UserIga2", value: UserIga2, setter: setUserIga2 },
          { label: "UserIga3", value: UserIga3, setter: setUserIga3 },
          { label: "UserIgG", value: UserIgG, setter: setUserIgG },
          { label: "UserIgG1", value: UserIgG1, setter: setUserIgG1 },
          { label: "UserIgG2", value: UserIgG2, setter: setUserIgG2 },
          { label: "UserIgG3", value: UserIgG3, setter: setUserIgG3 },
          { label: "UserIgG4", value: UserIgG4, setter: setUserIg4 },
          { label: "UserIgM", value: UserIgM, setter: setUserIgM },
        ].map((item, index) => (
          <View key={index} style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{item.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={`${item.label} giriniz`}
              placeholderTextColor="#000"
              value={item.value}
              onChangeText={item.setter}
            />
          </View>
        ))}
      </View>

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
              <Text style={{ fontSize: 20, marginTop: 10 }}> {groupName}</Text>
              <View style={{ borderBottomWidth: 1, width: "auto" }}></View>
              {groupData.map((subItem, index) => (
                <View
                  key={`${groupName}-${index}`}

                >
                  <View style={{ marginTop: 5, width: "100%", height: 50, flexDirection: "row", flex: 1, justifyContent: "space-around", borderWidth: 1, marginBottom: 3, borderRadius: 10, borderColor: subItem.isactive ? "green" : "red", padding: 3 }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}>

                      <Text>
                        {subItem.Type}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}>
                      <Text>
                        {(groupName === "kilavuz-cilv" || groupName === "kilavuz-ap") ? ("Min-Max Mean SD") : ("conf.ınterval")}
                      </Text>
                      <Text style={{ textDecorationLine: "underline" }}>
                        {(groupName === "kilavuz-cilv" || groupName === "kilavuz-ap") ? (
                          <>
                            <Text style={{ textDecorationLine: "underline" }}>{subItem.minMeanSd || 'N/A'}</Text>
                            <Text style={{ textDecorationLine: "none" }}> - </Text>
                            <Text style={{ textDecorationLine: "underline" }}>{subItem.maxMeanSd || 'N/A'}</Text>
                          </>
                        ) : (
                          <>
                            <Text style={{ textDecorationLine: "underline" }}>{subItem.geoMin || 'N/A'}</Text>
                            <Text style={{ textDecorationLine: "none" }}> - </Text>
                            <Text style={{ textDecorationLine: "underline" }}>{subItem.geoMax || 'N/A'}</Text>
                          </>
                        )}
                      </Text>

                    </View>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-evenly" }}>
                      {(groupName === "kilavuz-cilv" || groupName === "kilavuz-ap") ? (
                        <Text></Text>
                      ) : (
                        <View>
                          <Text>conf.Interval</Text>
                          <Text>
                            <Text style={{ textDecorationLine: "underline" }}>
                              {subItem.confidenceIntervalMin || 'N/A'}
                            </Text>
                            <Text style={{ textDecorationLine: "none" }}> - </Text>
                            <Text style={{ textDecorationLine: "underline" }}>
                              {subItem.confidenceIntervalMax || 'N/A'}
                            </Text>
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={{ borderBottomWidth: 0.5, width: "auto" }}></View>
                </View>
              ))}
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
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "30%", // TextInput genişliği
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 18,
    color: "#aaa",
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    textAlign: "center",
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