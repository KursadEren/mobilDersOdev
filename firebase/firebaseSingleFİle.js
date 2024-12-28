// 1) Firebase SDK'ları yükleyin
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 2) Firebase Config (Projenize özgü bilgiler)
const firebaseConfig = {
  apiKey: "AIzaSyBaTa-gXEe7VlIH99kFQhAoct1j6SZq47U",
  authDomain: "mobildersapp.firebaseapp.com",
  projectId: "mobildersapp",
  storageBucket: "mobildersapp.firebasestorage.app",
  messagingSenderId: "470541547468",
  appId: "1:470541547468:web:d719c31600bb0911d14f69",
  measurementId: "G-Y41C8DZ6GH",
};


// 3) Firebase App ve Firestore başlatma
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4) JSON Veriyi Firestore'a Yazma
async function importJsonData() {
  // Örnek JSON verisi
  const jsonData = {
    name: "Ali Veli",
    age: 30,
    createdAt: new Date().toISOString(),
    tags: ["firebase", "json", "import"],
    nested: {
      address: "Istanbul",
      status: "active"
    }
  };

  try {
    // "users" koleksiyonuna veri ekleyelim
    const docRef = doc(db, "users", "user1"); // Rastgele bir ID yerine "user1" sabit ID
    await setDoc(docRef, jsonData);
    console.log("JSON verisi Firestore'a başarıyla aktarıldı!");
  } catch (error) {
    console.error("JSON verisi aktarılırken bir hata oluştu:", error);
  }
}

// 5) JSON Veriyi Yükleme İşlevini Çağır
importJsonData();
