import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from './firebase/FirebaseConfig'; // Firebase bağlantısını içe aktar
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore"; // Firestore için gerekli fonksiyonları içe aktar

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = async () => {
    // Girişlerin dolu olup olmadığını kontrol et
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // Yeni kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Kullanıcıyı Firestore'a ekle
      const userDoc = doc(db, "users", user.uid); // Her kullanıcı için `uid` kullanılıyor
      await setDoc(userDoc, {
        email: user.email,
        isAdmin: false, // Varsayılan olarak kullanıcı admin değil
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Kayıt Başarılı!', `Hoş geldiniz, ${email}!`);
      console.log("Kullanıcı oluşturuldu ve Firestore'a eklendi:", user);

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Hata durumuna göre kullanıcıya bilgi ver
      if (errorCode === "auth/email-already-in-use") {
        Alert.alert("Hata", "Bu e-posta adresi zaten kullanılıyor.");
      } else if (errorCode === "auth/invalid-email") {
        Alert.alert("Hata", "Geçersiz e-posta adresi.");
      } else if (errorCode === "auth/weak-password") {
        Alert.alert("Hata", "Şifre çok zayıf. Daha güçlü bir şifre seçin.");
      } else {
        Alert.alert("Hata", errorMessage);
      }

      console.error("Kayıt hatası:", errorCode, errorMessage);
    }
  };

  const handleLogin = async () => {
    // Kullanıcı giriş işlemi
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
  
    try {
      // Firebase Authentication ile giriş
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore'dan kullanıcı bilgilerini al
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isAdmin = userData.isAdmin;
  
        // Kullanıcıyı ilgili ekrana yönlendir
        if (isAdmin) {
          Alert.alert('Giriş Başarılı!', 'Admin ekranına yönlendiriliyorsunuz.');
          navigation.navigate("Admin");
        } else {
          Alert.alert('Giriş Başarılı!', 'User ekranına yönlendiriliyorsunuz.');
          navigation.navigate("user");
        }
      } else {
        Alert.alert('Hata', 'Kullanıcı bilgileri bulunamadı.');
      }
  
      console.log("Kullanıcı giriş yaptı:", user);
  
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      if (errorCode === "auth/user-not-found") {
        Alert.alert("Hata", "Bu kullanıcı bulunamadı.");
      } else if (errorCode === "auth/wrong-password") {
        Alert.alert("Hata", "Şifreniz yanlış.");
      } else {
        Alert.alert("Hata", errorMessage);
      }
  
      console.error("Giriş hatası:", errorCode, errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignUp ? 'Kayıt Ol' : 'Kullanıcı Girişi'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isSignUp ? (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => setIsSignUp(!isSignUp)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleButtonText}>
          {isSignUp ? 'Giriş Yapmak için Tıklayın' : 'Kayıt Olmak için Tıklayın'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
