const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, collection } = require("firebase/firestore");


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




    
const IgG4levels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 15,
    "Geometric Mean ± SD": "24 ± 17",
    "geoMax": 41,
    "geoMin": 7,
    "Min": 17.0,
    "Max": 81.0,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 17.0,
      "Max": 36.0
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 10,
    "Geometric Mean ± SD": "15 ± 14",
    "geoMax": 39,
    "geoMin": 1,
    "Min": 2.0,
    "Max": 48.0,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 10.0,
      "Max": 31.0
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 15,
    "Geometric Mean ± SD": "14 ± 11",
    "geoMax": 25,
    "geoMin": 3,
    "Min": 2.0,
    "Max": 52.0,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 12.0,
      "Max": 25.0
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 27,
    "Geometric Mean ± SD": "12 ± 5",
    "geoMax": 17,
    "geoMin": 7,
    "Min": 2.0,
    "Max": 20.0,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 12.0,
      "Max": 16.0
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 69,
    "Geometric Mean ± SD": "16 ± 17",
    "geoMax": 33,
    "geoMin": -1,
    "Min": 2.0,
    "Max": 99.0,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 18.0,
      "Max": 26.0
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 61,
    "Geometric Mean ± SD": "20 ± 40",
    "geoMax": 60,
    "geoMin": -20,
    "Min": 2.0,
    "Max": 171.0,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 23.0,
      "Max": 43.0
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 50,
    "Geometric Mean ± SD": "27 ± 37",
    "geoMax": 60,
    "geoMin": -10,
    "Min": 4.0,
    "Max": 185.0,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 27.0,
      "Max": 48.0
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 56,
    "Geometric Mean ± SD": "35 ± 46",
    "geoMax": 81,
    "geoMin": -11,
    "Min": 8.0,
    "Max": 227.0,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 37.0,
      "Max": 62.0
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 64,
    "Geometric Mean ± SD": "42 ± 46",
    "geoMax": 88,
    "geoMin": -4,
    "Min": 2.0,
    "Max": 198.0,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 49.0,
      "Max": 72.0
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 69,
    "Geometric Mean ± SD": "36 ± 45",
    "geoMax": 81,
    "geoMin": -9,
    "Min": 5.0,
    "Max": 202.0,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 41.0,
      "Max": 63.0
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 35,
    "Geometric Mean ± SD": "34 ± 44",
    "geoMax": 78,
    "geoMin": -10,
    "Min": 4.0,
    "Max": 160.0,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 34.0,
      "Max": 64.0
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 31,
    "Geometric Mean ± SD": "51 ± 45",
    "geoMax": 96,
    "geoMin": 6,
    "Min": 10.0,
    "Max": 144.0,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 51.0,
      "Max": 84.0
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 20,
    "Geometric Mean ± SD": "36 ± 44",
    "geoMax": 80,
    "geoMin": -8,
    "Min": 9.0,
    "Max": 187.0,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 30.0,
      "Max": 72.0
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 23,
    "Geometric Mean ± SD": "33 ± 47",
    "geoMax": 80,
    "geoMin": -14,
    "Min": 15.0,
    "Max": 202.0,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 25.0,
      "Max": 66.0
    }
  }
];

const IgG3levels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 15,
    "Geometric Mean ± SD": "37 ± 17",
    "geoMax": 54,
    "geoMin": 20,
    "Min": 18.0,
    "Max": 78.0,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 31.0,
      "Max": 50.0
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 10,
    "Geometric Mean ± SD": "24 ± 12",
    "geoMax": 36,
    "geoMin": 12,
    "Min": 13.0,
    "Max": 53.0,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 17.0,
      "Max": 35.0
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 14,
    "Geometric Mean ± SD": "35 ± 25",
    "geoMax": 60,
    "geoMin": 10,
    "Min": 14.0,
    "Max": 100.0,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 27.0,
      "Max": 56.0
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 29,
    "Geometric Mean ± SD": "38 ± 24",
    "geoMax": 62,
    "geoMin": 14,
    "Min": 18.0,
    "Max": 110.0,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 34.0,
      "Max": 53.0
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 65,
    "Geometric Mean ± SD": "37 ± 25",
    "geoMax": 62,
    "geoMin": 12,
    "Min": 16.0,
    "Max": 132.0,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 37.0,
      "Max": 49.0
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 54,
    "Geometric Mean ± SD": "32 ± 21",
    "geoMax": 53,
    "geoMin": 11,
    "Min": 14.0,
    "Max": 125.0,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 30.0,
      "Max": 42.0
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 45,
    "Geometric Mean ± SD": "37 ± 25",
    "geoMax": 62,
    "geoMin": 12,
    "Min": 15.0,
    "Max": 120.0,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 35.0,
      "Max": 50.0
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 54,
    "Geometric Mean ± SD": "37 ± 20",
    "geoMax": 57,
    "geoMin": 17,
    "Min": 15.0,
    "Max": 107.0,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 36.0,
      "Max": 47.0
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 62,
    "Geometric Mean ± SD": "51 ± 43",
    "geoMax": 94,
    "geoMin": 8,
    "Min": 21.0,
    "Max": 186.0,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 51.0,
      "Max": 73.0
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 65,
    "Geometric Mean ± SD": "51 ± 34",
    "geoMax": 85,
    "geoMin": 17,
    "Min": 20.0,
    "Max": 186.0,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 50.0,
      "Max": 67.0
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 34,
    "Geometric Mean ± SD": "53 ± 40",
    "geoMax": 93,
    "geoMin": 13,
    "Min": 29.0,
    "Max": 200.0,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 47.0,
      "Max": 75.0
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 29,
    "Geometric Mean ± SD": "80 ± 56",
    "geoMax": 136,
    "geoMin": 36,
    "Min": 28.0,
    "Max": 223.0,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 73.0,
      "Max": 117.0
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 18,
    "Geometric Mean ± SD": "58 ± 21",
    "geoMax": 79,
    "geoMin": 37,
    "Min": 30.0,
    "Max": 120.0,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 51.0,
      "Max": 73.0
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 21,
    "Geometric Mean ± SD": "50 ± 33",
    "geoMax": 83,
    "geoMin": 17,
    "Min": 21.0,
    "Max": 152.0,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 43.0,
      "Max": 73.0
    }
  }
];

const IgG2levels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 15,
    "Geometric Mean ± SD": "156 ± 50",
    "geoMax": 206,
    "geoMin": 106,
    "Min": 87.0,
    "Max": 263.0,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 135.0,
      "Max": 192.0
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 10,
    "Geometric Mean ± SD": "59 ± 26",
    "geoMax": 85,
    "geoMin": 33,
    "Min": 32.0,
    "Max": 108.0,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 46.0,
      "Max": 84.0
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 14,
    "Geometric Mean ± SD": "67 ± 37",
    "geoMax": 104,
    "geoMin": 30,
    "Min": 36.0,
    "Max": 146.0,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 53.0,
      "Max": 97.0
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 29,
    "Geometric Mean ± SD": "64 ± 35",
    "geoMax": 99,
    "geoMin": 29,
    "Min": 25.0,
    "Max": 161.0,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 58.0,
      "Max": 85.0
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 67,
    "Geometric Mean ± SD": "93 ± 49",
    "geoMax": 142,
    "geoMin": 44,
    "Min": 31.0,
    "Max": 264.0,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 92.0,
      "Max": 116.0
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 58,
    "Geometric Mean ± SD": "115 ± 85",
    "geoMax": 200,
    "geoMin": 30,
    "Min": 43.0,
    "Max": 380.0,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 112.0,
      "Max": 157.0
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 44,
    "Geometric Mean ± SD": "161 ± 92",
    "geoMax": 253,
    "geoMin": 69,
    "Min": 60.0,
    "Max": 410.0,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 155.0,
      "Max": 211.0
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 52,
    "Geometric Mean ± SD": "167 ± 78",
    "geoMax": 245,
    "geoMin": 89,
    "Min": 85.0,
    "Max": 440.0,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 160.0,
      "Max": 204.0
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 60,
    "Geometric Mean ± SD": "197 ± 101",
    "geoMax": 298,
    "geoMin": 96,
    "Min": 67.0,
    "Max": 460.0,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 193.0,
      "Max": 245.0
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 62,
    "Geometric Mean ± SD": "214 ± 121",
    "geoMax": 335,
    "geoMin": 93,
    "Min": 70.0,
    "Max": 543.0,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 211.0,
      "Max": 273.0
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 32,
    "Geometric Mean ± SD": "212 ± 88",
    "geoMax": 300,
    "geoMin": 124,
    "Min": 111.0,
    "Max": 515.0,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 195.0,
      "Max": 259.0
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 28,
    "Geometric Mean ± SD": "279 ± 134",
    "geoMax": 413,
    "geoMin": 145,
    "Min": 100.0,
    "Max": 573.0,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 257.0,
      "Max": 361.0
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 20,
    "Geometric Mean ± SD": "238 ± 83",
    "geoMax": 321,
    "geoMin": 155,
    "Min": 110.0,
    "Max": 398.0,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 214.0,
      "Max": 292.0
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 20,
    "Geometric Mean ± SD": "307 ± 128",
    "geoMax": 435,
    "geoMin": 179,
    "Min": 147.0,
    "Max": 610.0,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 271.0,
      "Max": 391.0
    }
  }
];
const IgG1levels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 16,
    "Geometric Mean ± SD": "675 ± 152",
    "geoMax": 827,
    "geoMin": 523,
    "Min": 430.0,
    "Max": 897.0,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 611.0,
      "Max": 773.0
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 11,
    "Geometric Mean ± SD": "319 ± 113",
    "geoMax": 432,
    "geoMin": 206,
    "Min": 160.0,
    "Max": 574.0,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 261.0,
      "Max": 413.0
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 14,
    "Geometric Mean ± SD": "485 ± 188",
    "geoMax": 673,
    "geoMin": 297,
    "Min": 279.0,
    "Max": 820.0,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 408.0,
      "Max": 625.0
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 29,
    "Geometric Mean ± SD": "562 ± 240",
    "geoMax": 802,
    "geoMin": 322,
    "Min": 328.0,
    "Max": 1250.0,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 506.0,
      "Max": 690.0
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 67,
    "Geometric Mean ± SD": "721 ± 292",
    "geoMax": 1013,
    "geoMin": 429,
    "Min": 344.0,
    "Max": 1435.0,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 702.0,
      "Max": 844.0
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 60,
    "Geometric Mean ± SD": "736 ± 285",
    "geoMax": 1021,
    "geoMin": 451,
    "Min": 340.0,
    "Max": 1470.0,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 712.0,
      "Max": 860.0
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 49,
    "Geometric Mean ± SD": "762 ± 246",
    "geoMax": 1008,
    "geoMin": 516,
    "Min": 439.0,
    "Max": 1333.0,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 726.0,
      "Max": 867.0
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 58,
    "Geometric Mean ± SD": "755 ± 209",
    "geoMax": 964,
    "geoMin": 546,
    "Min": 468.0,
    "Max": 1333.0,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 726.0,
      "Max": 837.0
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 63,
    "Geometric Mean ± SD": "806 ± 281",
    "geoMax": 1087,
    "geoMin": 525,
    "geoMax": 1087,
    "geoMin": 525,
    "Min": 420.0,
    "Max": 1470.0,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 778.0,
      "Max": 920.0
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 66,
    "Geometric Mean ± SD": "860 ± 329",
    "geoMax": 1189,
    "geoMin": 531,
    "Min": 380.0,
    "Max": 1840.0,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 834.0,
      "Max": 996.0
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 35,
    "Geometric Mean ± SD": "842 ± 241",
    "geoMax": 1083,
    "geoMin": 601,
    "Min": 599.0,
    "Max": 1560.0,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 787.0,
      "Max": 953.0
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 32,
    "Geometric Mean ± SD": "872 ± 354",
    "geoMax": 1226,
    "geoMin": 518,
    "Min": 490.0,
    "Max": 1560.0,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 805.0,
      "Max": 1061.0
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 21,
    "Geometric Mean ± SD": "796 ± 269",
    "geoMax": 1065,
    "geoMin": 527,
    "Min": 498.0,
    "Max": 1460.0,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 711.0,
      "Max": 956.0
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 21,
    "Geometric Mean ± SD": "857 ± 214",
    "geoMax": 1071,
    "geoMin": 643,
    "Min": 528.0,
    "Max": 1384.0,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 782.0,
      "Max": 978.0
    }
  }
];

const IgMlevels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 14,
    "Geometric Mean ± SD": "18.5 ± 3.5",
    "geoMax": 22,
    "geoMin": 15,
    "Min": 17.3,
    "Max": 29.6,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 16.7,
      "Max": 20.7
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 11,
    "Geometric Mean ± SD": "57.3 ± 37.4",
    "geoMax": 94.7,
    "geoMin": 19.9,
    "Min": 18.4,
    "Max": 145.0,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 41.9,
      "Max": 92.1
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 17,
    "Geometric Mean ± SD": "68.7 ± 38.9",
    "geoMax": 107.6,
    "geoMin": 29.8,
    "Min": 26.4,
    "Max": 146.0,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 58.5,
      "Max": 98.5
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 27,
    "Geometric Mean ± SD": "86.1 ± 40.3",
    "geoMax": 126.4,
    "geoMin": 45.8,
    "Min": 23.5,
    "Max": 180.0,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 78.9,
      "Max": 110.8
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 57,
    "Geometric Mean ± SD": "98.3 ± 40.3",
    "geoMax": 138.6,
    "geoMin": 58,
    "Min": 25.6,
    "Max": 201.0,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 96.3,
      "Max": 117.7
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 53,
    "Geometric Mean ± SD": "92.5 ± 33.9",
    "geoMax": 126.4,
    "geoMin": 58.6,
    "Min": 36.0,
    "Max": 199.0,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 89.0,
      "Max": 107.7
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 38,
    "Geometric Mean ± SD": "86.1 ± 35.3",
    "geoMax": 121.4,
    "geoMin": 50.8,
    "Min": 26.1,
    "Max": 188.0,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 80.9,
      "Max": 104.0
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 69,
    "Geometric Mean ± SD": "105.8 ± 40.8",
    "geoMax": 146.6,
    "geoMin": 65,
    "Min": 33.3,
    "Max": 207.0,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 103.7,
      "Max": 123.3
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 65,
    "Geometric Mean ± SD": "97.6 ± 42.9",
    "geoMax": 140.5,
    "geoMin": 54.7,
    "Min": 30.5,
    "Max": 220.0,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 95.5,
      "Max": 116.8
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 53,
    "Geometric Mean ± SD": "93.9 ± 49.3",
    "geoMax": 143.2,
    "geoMin": 44.6,
    "Min": 33.7,
    "Max": 257.0,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 90.8,
      "Max": 118.0
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 32,
    "Geometric Mean ± SD": "102.4 ± 38.8",
    "geoMax": 141.2,
    "geoMin": 63.6,
    "Min": 30.0,
    "Max": 187.0,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 96.0,
      "Max": 124.0
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 24,
    "Geometric Mean ± SD": "120.9 ± 43.8",
    "geoMax": 164.7,
    "geoMin": 77.1,
    "Min": 44.0,
    "Max": 206.0,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 110.3,
      "Max": 147.3
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 15,
    "Geometric Mean ± SD": "99.7 ± 49.7",
    "geoMax": 149.4,
    "geoMin": 50,
    "Min": 33.0,
    "Max": 205.0,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 83.7,
      "Max": 138.8
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 16,
    "Geometric Mean ± SD": "130.9 ± 44.5",
    "geoMax": 175.4,
    "geoMin": 86.4,
    "Min": 75.0,
    "Max": 198.5,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 114.6,
      "Max": 161.9
    }
  }
];
const IgAlevels = [{
  'Age Group': '0-30 days',
  'Subjects': 16,
  'Geometric Mean ± SD': '5.7 ± 0.2',
  "geoMax":5.9,
  "geoMin":5.5,
  'Min': 5.0,
  'Max': 5.8,
  'Confidence Interval': { 'Min': 5.6, 'Max': 5.9 },
  'minMonth': 0,
  'maxMonth': 1
},
{
  'Age Group': '1-5 months',
  'Subjects': 12,
  'Geometric Mean ± SD': '20.2 ± 19.7',
  "geoMax":40,
  "geoMin":0,
  'Min': 5.8,
  'Max': 58.0,
  'Confidence Interval': { 'Min': 15.8, 'Max': 40.9 },
  'minMonth': 1,
  'maxMonth': 5
},
{
  'Age Group': '6-8 months',
  'Subjects': 15,
  'Geometric Mean ± SD': '23.2 ± 25.2',
  "geoMax":48,
  "geoMin":-2,
  'Min': 5.8,
  'Max': 85.8,
  'Confidence Interval': { 'Min': 20.5, 'Max': 48.5 },
  'minMonth': 6,
  'maxMonth': 8
},
{
  'Age Group': '9-12 months',
  'Subjects': 26,
  'Geometric Mean ± SD': '52.9 ± 36.7',
  "geoMax":88,
  "geoMin":16,
  'Min': 18.4,
  'Max': 154.0,
  'Confidence Interval': { 'Min': 47.2, 'Max': 76.9 },
  'minMonth': 9,
  'maxMonth': 12
},
{
  'Age Group': '13-24 months',
  'Subjects': 57,
  'Geometric Mean ± SD': '44.1 ± 18.3',
  "geoMax":62,
  "geoMin":26,
  'Min': 11.5,
  'Max': 94.3,
  'Confidence Interval': { 'Min': 42.9, 'Max': 52.6 },
  'minMonth': 13,
  'maxMonth': 24
},
{
  'Age Group': '25-36 months',
  'Subjects': 52,
  'Geometric Mean ± SD': '53.5 ± 26.8',
  "geoMax":79,
  "geoMin":27,
  'Min': 23.0,
  'Max': 130.0,
  'Confidence Interval': { 'Min': 51.4, 'Max': 66.3 },
  'minMonth': 25,
  'maxMonth': 36
},
{
  'Age Group': '37-48 months',
  'Subjects': 39,
  'Geometric Mean ± SD': '68.8 ± 22.2',
  "geoMax":90,
  "geoMin":46,
  'Min': 40.7,
  'Max': 115.0,
  'Confidence Interval': { 'Min': 64.8, 'Max': 79.2 },
  'minMonth': 37,
  'maxMonth': 48
},
{
  'Age Group': '49-72 months',
  'Subjects': 68,
  'Geometric Mean ± SD': '91.9 ± 37.4',
  "geoMax":128,
  "geoMin":56,
  'Min': 23.0,
  'Max': 205.1,
  'Confidence Interval': { 'Min': 90.2, 'Max': 108.3 },
  'minMonth': 49,
  'maxMonth': 72
},
{
  'Age Group': '7-8 years',
  'Subjects': 64,
  'Geometric Mean ± SD': '108.4 ± 42.3',
  "geoMax":150,
  "geoMin":66,
  'Min': 36.1,
  'Max': 268.0,
  'Confidence Interval': { 'Min': 105.9, 'Max': 127.0 },
  'minMonth': 84,
  'maxMonth': 96
},
{
  'Age Group': '9-10 years',
  'Subjects': 53,
  'Geometric Mean ± SD': '116.7 ± 45.9',
  "geoMax":161,
  "geoMin":71,
  'Max': 268.0,
  'Confidence Interval': { 'Min': 111.8, 'Max': 137.0 },
  'minMonth': 108,
  'maxMonth': 120
},
{
  'Age Group': '11-12 years',
  'Subjects': 31,
  'Geometric Mean ± SD': '115.8 ± 43.0',
  "geoMax":158,
  "geoMin":72,
  'Min': 27.0,
  'Max': 198.0,
  'Confidence Interval': { 'Min': 109.7, 'Max': 141.3 },
  'minMonth': 132,
  'maxMonth': 144
},
{
  'Age Group': '13-14 years',
  'Subjects': 23,
  'Geometric Mean ± SD': '130.5 ± 47.4',
  "geoMax":177,
  "geoMin":83,
  'Min': 52.4,
  'Max': 225.0,
  'Confidence Interval': { 'Min': 118.0, 'Max': 159.0 },
  'minMonth': 156,
  'maxMonth': 168
},
{
  'Age Group': '15-16 years',
  'Subjects': 15,
  'Geometric Mean ± SD': '109.8 ± 29.4',
  "geoMax":80,
  "geoMin":138,
  'Min': 48.0,
  'Max': 158.0,
  'Confidence Interval': { 'Min': 97.8, 'Max': 130.3 },
  'minMonth': 180,
  'maxMonth': 192
},
{
  'Age Group': 'Older than 16 years',
  'Subjects': 15,
  'Geometric Mean ± SD': '121.3 ± 55.5',
  "geoMax":176,
  "geoMin":66,
  'Min': 46.5,
  'Max': 221.0,
  'Confidence Interval': { 'Min': 102.4, 'Max': 163.8 },
  'minMonth': 192,
  'maxMonth': 1000
}]


const IgGlevels = [
  {
    "Age Group": "0-30 days",
    "Subjects": 16,
    "Geometric Mean ± SD": "884.2 ± 230.4",
    "geoMax":1114,
    "geoMin":654,
    "Min": 492,
    "Max": 1190,
    "minMonth": 0,
    "maxMonth": 1,
    "Confidence Interval": {
      "Min": 792.0,
      "Max": 1037.5
    }
  },
  {
    "Age Group": "1-5 months",
    "Subjects": 12,
    "Geometric Mean ± SD": "473.8 ± 193.1",
    "geoMax":666,
    "geoMin":280,
    "Min": 270,
    "Max": 792,
    "minMonth": 1,
    "maxMonth": 5,
    "Confidence Interval": {
      "Min": 384.2,
      "Max": 629.7
    }
  },
  {
    "Age Group": "6-8 months",
    "Subjects": 18,
    "Geometric Mean ± SD": "581.9 ± 207.9",
    "geoMax":788,
    "geoMin":374,
    "Min": 268,
    "Max": 898,
    "minMonth": 6,
    "maxMonth": 8,
    "Confidence Interval": {
      "Min": 515.6,
      "Max": 722.4
    }
  },
  {
    "Age Group": "9-12 months",
    "Subjects": 26,
    "Geometric Mean ± SD": "692.7 ± 181.1",
    "geoMax":873,
    "geoMin":511,
    "Min": 421,
    "Max": 1100,
    "minMonth": 9,
    "maxMonth": 12,
    "Confidence Interval": {
      "Min": 641.9,
      "Max": 788.2
    }
  },
  {
    "Age Group": "13-24 months",
    "Subjects": 60,
    "Geometric Mean ± SD": "774.4 ± 199.7",
    "geoMax":973,
    "geoMin":575,
    "Min": 365,
    "Max": 1200,
    "minMonth": 13,
    "maxMonth": 24,
    "Confidence Interval": {
      "Min": 748.2,
      "Max": 851.4
    }
  },
  {
    "Age Group": "25-36 months",
    "Subjects": 52,
    "Geometric Mean ± SD": "822.3 ± 208.4",
    "geoMax":1030,
    "geoMin":614,
    "Min": 430,
    "Max": 1290,
    "minMonth": 25,
    "maxMonth": 36,
    "Confidence Interval": {
      "Min": 790.4,
      "Max": 906.4
    }
  },
  {
    "Age Group": "37-48 months",
    "Subjects": 40,
    "Geometric Mean ± SD": "879.9 ± 157.2",
    "geoMax":1036,
    "geoMin":722,
    "Min": 539,
    "Max": 1200,
    "minMonth": 37,
    "maxMonth": 48,
    "Confidence Interval": {
      "Min": 844.1,
      "Max": 944.6
    }
  },
  {
    "Age Group": "49-72 months",
    "Subjects": 70,
    "Geometric Mean ± SD": "986.2 ± 209.6",
    "geoMax":1195,
    "geoMin":777,
    "Min": 528,
    "Max": 1490,
    "minMonth": 49,
    "maxMonth": 72,
    "Confidence Interval": {
      "Min": 958.5,
      "Max": 1058.5
    }
  },
  {
    "Age Group": "7-8 years",
    "Subjects": 66,
    "Geometric Mean ± SD": "1040.7 ± 203.2",
    "geoMax":1243,
    "geoMin":797,
    "Min": 527,
    "Max": 1590,
    "minMonth": 84,
    "maxMonth": 96,
    "Confidence Interval": {
      "Min": 1011.5,
      "Max": 1111.4
    }
  },
  {
    "Age Group": "9-10 years",
    "Subjects": 57,
    "Geometric Mean ± SD": "1062.8 ± 238.8",
    "geoMax":1300,
    "geoMin":824,
    "Min": 646,
    "Max": 1620,
    "minMonth": 108,
    "maxMonth": 120,
    "Confidence Interval": {
      "Min": 1024.9,
      "Max": 1151.7
    }
  },
  {
    "Age Group": "11-12 years",
    "Subjects": 34,
    "Geometric Mean ± SD": "1051.7 ± 228.9",
    "geoMax":1279,
    "geoMin":823,
    "Min": 579,
    "Max": 1610,
    "minMonth": 132,
    "maxMonth": 144,
    "Confidence Interval": {
      "Min": 995.9,
      "Max": 1155.6
    }
  },
  {
    "Age Group": "13-14 years",
    "Subjects": 25,
    "Geometric Mean ± SD": "1087.8 ± 236.0",
    "geoMax":1323,
    "geoMin":851,
    "Min": 741,
    "Max": 1650,
    "minMonth": 156,
    "maxMonth": 168,
    "Confidence Interval": {
      "Min": 1014.2,
      "Max": 1209.0
    }
  },
  {
    "Age Group": "15-16 years",
    "Subjects": 17,
    "Geometric Mean ± SD": "981.1 ± 207.7",
    "geoMax":1188,
    "geoMin":774,
    "Min": 666,
    "Max": 1370,
    "minMonth": 180,
    "maxMonth": 192,
    "Confidence Interval": {
      "Min": 895.3,
      "Max": 1108.9
    }
  },
  {
    "Age Group": "Older than 16 years",
    "Subjects": 17,
    "Geometric Mean ± SD": "1224.9 ± 280.2",
    "geoMax":1504,
    "geoMin":944,
    "Min": 830,
    "Max": 1820,
    "minMonth": 192,
    "maxMonth": null,
    "Confidence Interval": {
      "Min": 1109.9,
      "Max": 1398.0
    }
  }
];
  
  

  // Tablodaki veriyi JSON formatına dönüştürdümü

  async function importAllJsonDataAsArrays() {
    try {
      // "dataCollection" koleksiyonu altında "immunoglobulinAllData" dokümanını oluştur/ya da güncelle
      const docRef = doc(db, "dataCollection", "kilavuz-tjp-2006");
  
      // Tek seferde, tüm array'leri alan olarak yazıyoruz
      await setDoc(docRef, {
        IgG4levels,
        IgG3levels,
        IgG2levels,
        IgG1levels,
        IgMlevels,
        IgAlevels,
        IgGlevels
      });
  
      console.log("Tüm veriler tek doküman altında array’ler olarak kaydedildi!");
    } catch (error) {
      console.error("JSON verisi aktarılırken bir hata oluştu:", error);
    }
  }
  
  // 6) Fonksiyonu çağırın
  importAllJsonDataAsArrays();