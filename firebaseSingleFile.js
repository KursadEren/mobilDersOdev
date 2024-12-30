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


const IgGlevels =  [
    {
      "ageRange": "0-<5 months",
      "mean": "1.0-1.34",
      "minMeanSd": 1.0,
      "maxMeanSd": 1.34,
      "minMonth": 0,
      "maxMonth": 5
    },
    {
      "ageRange": "5-<9 months",
      "mean": "1.64-5.88",
      "minMeanSd": 1.64,
      "maxMeanSd": 5.88,
      "minMonth": 5,
      "maxMonth": 9
    },
    {
      "ageRange": "9-<15 months",
      "mean": "2.46-9.04",
      "minMeanSd": 2.46,
      "maxMeanSd": 9.04,
      "minMonth": 9,
      "maxMonth": 15
    },
    {
      "ageRange": "15-<24 months",
      "mean": "3.13-11.70",
      "minMeanSd": 3.13,
      "maxMeanSd": 11.70,
      "minMonth": 15,
      "maxMonth": 24
    },
    {
      "ageRange": "2-<4 years",
      "mean": "2.95-11.56",
      "minMeanSd": 2.95,
      "maxMeanSd": 11.56,
      "minMonth": 24,
      "maxMonth": 48
    },
    {
      "ageRange": "4-<7 years",
      "mean": "3.86-14.70",
      "minMeanSd": 3.86,
      "maxMeanSd": 14.70,
      "minMonth": 48,
      "maxMonth": 84
    },
    {
      "ageRange": "7-<10 years",
      "mean": "4.62-16.82",
      "minMeanSd": 4.62,
      "maxMeanSd": 16.82,
      "minMonth": 84,
      "maxMonth": 120
    },
    {
      "ageRange": "10-<13 years",
      "mean": "5.03-15.80",
      "minMeanSd": 5.03,
      "maxMeanSd": 15.80,
      "minMonth": 120,
      "maxMonth": 156
    },
    {
      "ageRange": "13-<16 years",
      "mean": "5.09-15.80",
      "minMeanSd": 5.09,
      "maxMeanSd": 15.80,
      "minMonth": 156,
      "maxMonth": 192
    },
    {
      "ageRange": "16-<18 years",
      "mean": "4.87-13.27",
      "minMeanSd": 4.87,
      "maxMeanSd": 13.27,
      "minMonth": 192,
      "maxMonth": 216
    },
    {
      "ageRange": "≥18 years",
      "mean": "7.67-15.90",
      "minMeanSd": 7.67,
      "maxMeanSd": 15.90,
      "minMonth": 216,
      "maxMonth": null
    }
  ];

  const IgG1levels = [
    {
      "ageRange": "0-<5 months",
      "mean": "0.56-2.15",
      "minMeanSd": 0.56,
      "maxMeanSd": 2.15,
      "minMonth": 0,
      "maxMonth": 5
    },
    {
      "ageRange": "5-<9 months",
      "mean": "1.02-3.69",
      "minMeanSd": 1.02,
      "maxMeanSd": 3.69,
      "minMonth": 5,
      "maxMonth": 9
    },
    {
      "ageRange": "9-<15 months",
      "mean": "1.60-5.62",
      "minMeanSd": 1.60,
      "maxMeanSd": 5.62,
      "minMonth": 9,
      "maxMonth": 15
    },
    {
      "ageRange": "15-<24 months",
      "mean": "2.09-7.24",
      "minMeanSd": 2.09,
      "maxMeanSd": 7.24,
      "minMonth": 15,
      "maxMonth": 24
    },
    {
      "ageRange": "2-<4 years",
      "mean": "1.58-7.21",
      "minMeanSd": 1.58,
      "maxMeanSd": 7.21,
      "minMonth": 24,
      "maxMonth": 48
    },
    {
      "ageRange": "4-<7 years",
      "mean": "2.09-9.02",
      "minMeanSd": 2.09,
      "maxMeanSd": 9.02,
      "minMonth": 48,
      "maxMonth": 84
    },
    {
      "ageRange": "7-<10 years",
      "mean": "2.53-10.19",
      "minMeanSd": 2.53,
      "maxMeanSd": 10.19,
      "minMonth": 84,
      "maxMonth": 120
    },
    {
      "ageRange": "10-<13 years",
      "mean": "2.80-10.30",
      "minMeanSd": 2.80,
      "maxMeanSd": 10.30,
      "minMonth": 120,
      "maxMonth": 156
    },
    {
      "ageRange": "13-<16 years",
      "mean": "2.89-9.34",
      "minMeanSd": 2.89,
      "maxMeanSd": 9.34,
      "minMonth": 156,
      "maxMonth": 192
    },
    {
      "ageRange": "16-<18 years",
      "mean": "2.83-7.72",
      "minMeanSd": 2.83,
      "maxMeanSd": 7.72,
      "minMonth": 192,
      "maxMonth": 216
    },
    {
      "ageRange": "≥18 years",
      "mean": "3.41-8.94",
      "minMeanSd": 3.41,
      "maxMeanSd": 8.94,
      "minMonth": 216,
      "maxMonth": null
    }
  ];
  const IgG2levels=  [
      {
        "ageRange": "0-<5 months",
        "mean": "≤0.82",
        "minMeanSd": 0,
        "maxMeanSd": 0.82,
        "minMonth": 0,
        "maxMonth": 5
      },
      {
        "ageRange": "5-<9 months",
        "mean": "≤0.89",
        "minMeanSd": 0,
        "maxMeanSd": 0.89,
        "minMonth": 5,
        "maxMonth": 9
      },
      {
        "ageRange": "9-<15 months",
        "mean": "0.24-0.98",
        "minMeanSd": 0.24,
        "maxMeanSd": 0.98,
        "minMonth": 9,
        "maxMonth": 15
      },
      {
        "ageRange": "15-<24 months",
        "mean": "0.35-1.05",
        "minMeanSd": 0.35,
        "maxMeanSd": 1.05,
        "minMonth": 15,
        "maxMonth": 24
      },
      {
        "ageRange": "2-<4 years",
        "mean": "0.39-1.76",
        "minMeanSd": 0.39,
        "maxMeanSd": 1.76,
        "minMonth": 24,
        "maxMonth": 48
      },
      {
        "ageRange": "4-<7 years",
        "mean": "0.44-3.16",
        "minMeanSd": 0.44,
        "maxMeanSd": 3.16,
        "minMonth": 48,
        "maxMonth": 84
      },
      {
        "ageRange": "7-<10 years",
        "mean": "0.54-4.35",
        "minMeanSd": 0.54,
        "maxMeanSd": 4.35,
        "minMonth": 84,
        "maxMonth": 120
      },
      {
        "ageRange": "10-<13 years",
        "mean": "0.66-5.02",
        "minMeanSd": 0.66,
        "maxMeanSd": 5.02,
        "minMonth": 120,
        "maxMonth": 156
      },
      {
        "ageRange": "13-<16 years",
        "mean": "0.82-5.16",
        "minMeanSd": 0.82,
        "maxMeanSd": 5.16,
        "minMonth": 156,
        "maxMonth": 192
      },
      {
        "ageRange": "16-<18 years",
        "mean": "0.98-4.86",
        "minMeanSd": 0.98,
        "maxMeanSd": 4.86,
        "minMonth": 192,
        "maxMonth": 216
      },
      {
        "ageRange": "≥18 years",
        "mean": "1.71-6.32",
        "minMeanSd": 1.71,
        "maxMeanSd": 6.32,
        "minMonth": 216,
        "maxMonth": null
      }
    ];
   const IgG3levels=[
      {
        "ageRange": "0-<5 months",
        "mean": "0.07-6.82",
        "minMeanSd": 0.07,
        "maxMeanSd": 6.82,
        "minMonth": 0,
        "maxMonth": 5
      },
      {
        "ageRange": "5-<9 months",
        "mean": "0.119-0.740",
        "minMeanSd": 0.119,
        "maxMeanSd": 0.740,
        "minMonth": 5,
        "maxMonth": 9
      },
      {
        "ageRange": "9-<15 months",
        "mean": "0.173-0.637",
        "minMeanSd": 0.173,
        "maxMeanSd": 0.637,
        "minMonth": 9,
        "maxMonth": 15
      },
      {
        "ageRange": "15-<24 months",
        "mean": "0.219-0.550",
        "minMeanSd": 0.219,
        "maxMeanSd": 0.550,
        "minMonth": 15,
        "maxMonth": 24
      },
      {
        "ageRange": "2-<4 years",
        "mean": "0.170-0.847",
        "minMeanSd": 0.170,
        "maxMeanSd": 0.847,
        "minMonth": 24,
        "maxMonth": 48
      },
      {
        "ageRange": "4-<7 years",
        "mean": "0.108-0.949",
        "minMeanSd": 0.108,
        "maxMeanSd": 0.949,
        "minMonth": 48,
        "maxMonth": 84
      },
      {
        "ageRange": "7-<10 years",
        "mean": "0.085-10.26",
        "minMeanSd": 0.085,
        "maxMeanSd": 10.26,
        "minMonth": 84,
        "maxMonth": 120
      },
      {
        "ageRange": "10-<13 years",
        "mean": "0.115-10.53",
        "minMeanSd": 0.115,
        "maxMeanSd": 10.53,
        "minMonth": 120,
        "maxMonth": 156
      },
      {
        "ageRange": "13-<16 years",
        "mean": "0.200-10.32",
        "minMeanSd": 0.200,
        "maxMeanSd": 10.32,
        "minMonth": 156,
        "maxMonth": 192
      },
      {
        "ageRange": "16-<18 years",
        "mean": "0.313-0.976",
        "minMeanSd": 0.313,
        "maxMeanSd": 0.976,
        "minMonth": 192,
        "maxMonth": 216
      },
      {
        "ageRange": "≥18 years",
        "mean": "0.184-10.60",
        "minMeanSd": 0.184,
        "maxMeanSd": 10.60,
        "minMonth": 216,
        "maxMonth": null
      }
    ];
 const IgG4levels=  [
      {
        "ageRange": "0-<5 months",
        "mean": "≤0.198",
        "minMeanSd": 0,
        "maxMeanSd": 0.198,
        "minMonth": 0,
        "maxMonth": 5
      },
      {
        "ageRange": "5-<9 months",
        "mean": "≤0.208",
        "minMeanSd": 0,
        "maxMeanSd": 0.208,
        "minMonth": 5,
        "maxMonth": 9
      },
      {
        "ageRange": "9-<15 months",
        "mean": "≤0.220",
        "minMeanSd": 0,
        "maxMeanSd": 0.220,
        "minMonth": 9,
        "maxMonth": 15
      },
      {
        "ageRange": "15-<24 months",
        "mean": "≤0.230",
        "minMeanSd": 0,
        "maxMeanSd": 0.230,
        "minMonth": 15,
        "maxMonth": 24
      },
      {
        "ageRange": "2-<4 years",
        "mean": "0.004-0.491",
        "minMeanSd": 0.004,
        "maxMeanSd": 0.491,
        "minMonth": 24,
        "maxMonth": 48
      },
      {
        "ageRange": "4-<7 years",
        "mean": "0.008-0.819",
        "minMeanSd": 0.008,
        "maxMeanSd": 0.819,
        "minMonth": 48,
        "maxMonth": 84
      },
      {
        "ageRange": "7-<10 years",
        "mean": "0.010-1.087",
        "minMeanSd": 0.010,
        "maxMeanSd": 1.087,
        "minMonth": 84,
        "maxMonth": 120
      },
      {
        "ageRange": "10-<13 years",
        "mean": "0.010-1.219",
        "minMeanSd": 0.010,
        "maxMeanSd": 1.219,
        "minMonth": 120,
        "maxMonth": 156
      },
      {
        "ageRange": "13-<16 years",
        "mean": "0.007-1.217",
        "minMeanSd": 0.007,
        "maxMeanSd": 1.217,
        "minMonth": 156,
        "maxMonth": 192
      },
      {
        "ageRange": "16-<18 years",
        "mean": "0.003-1.110",
        "minMeanSd": 0.003,
        "maxMeanSd": 1.110,
        "minMonth": 192,
        "maxMonth": 216
      },
      {
        "ageRange": "≥18 years",
        "mean": "0.024-1.210",
        "minMeanSd": 0.024,
        "maxMeanSd": 1.210,
        "minMonth": 216,
        "maxMonth": null
      }
    ]

    const IgAlevels =  [
        {
          "ageRange": "0-<5 months",
          "mean": "0.07-0.37",
          "minMeanSd": 0.07,
          "maxMeanSd": 0.37,
          "minMonth": 0,
          "maxMonth": 5
        },
        {
          "ageRange": "5-<9 months",
          "mean": "0.16-0.50",
          "minMeanSd": 0.16,
          "maxMeanSd": 0.50,
          "minMonth": 5,
          "maxMonth": 9
        },
        {
          "ageRange": "9-<15 months",
          "mean": "0.27-0.66",
          "minMeanSd": 0.27,
          "maxMeanSd": 0.66,
          "minMonth": 9,
          "maxMonth": 15
        },
        {
          "ageRange": "15-<24 months",
          "mean": "0.36-0.79",
          "minMeanSd": 0.36,
          "maxMeanSd": 0.79,
          "minMonth": 15,
          "maxMonth": 24
        },
        {
          "ageRange": "2-<4 years",
          "mean": "0.27-2.46",
          "minMeanSd": 0.27,
          "maxMeanSd": 2.46,
          "minMonth": 24,
          "maxMonth": 48
        },
        {
          "ageRange": "4-<7 years",
          "mean": "0.29-2.56",
          "minMeanSd": 0.29,
          "maxMeanSd": 2.56,
          "minMonth": 48,
          "maxMonth": 84
        },
        {
          "ageRange": "7-<10 years",
          "mean": "0.34-2.74",
          "minMeanSd": 0.34,
          "maxMeanSd": 2.74,
          "minMonth": 84,
          "maxMonth": 120
        },
        {
          "ageRange": "10-<13 years",
          "mean": "0.42-2.95",
          "minMeanSd": 0.42,
          "maxMeanSd": 2.95,
          "minMonth": 120,
          "maxMonth": 156
        },
        {
          "ageRange": "13-<16 years",
          "mean": "0.52-3.19",
          "minMeanSd": 0.52,
          "maxMeanSd": 3.19,
          "minMonth": 156,
          "maxMonth": 192
        },
        {
          "ageRange": "16-<18 years",
          "mean": "0.60-3.37",
          "minMeanSd": 0.60,
          "maxMeanSd": 3.37,
          "minMonth": 192,
          "maxMonth": 216
        },
        {
          "ageRange": "≥18 years",
          "mean": "0.61-3.56",
          "minMeanSd": 0.61,
          "maxMeanSd": 3.56,
          "minMonth": 216,
          "maxMonth": null
        }
      ];
  const IgA1levels= [
        {
          "ageRange": "0-<5 months",
          "mean": "0.10-0.34",
          "minMeanSd": 0.10,
          "maxMeanSd": 0.34,
          "minMonth": 0,
          "maxMonth": 5
        },
        {
          "ageRange": "5-<9 months",
          "mean": "0.14-0.41",
          "minMeanSd": 0.14,
          "maxMeanSd": 0.41,
          "minMonth": 5,
          "maxMonth": 9
        },
        {
          "ageRange": "9-<15 months",
          "mean": "0.20-0.50",
          "minMeanSd": 0.20,
          "maxMeanSd": 0.50,
          "minMonth": 9,
          "maxMonth": 15
        },
        {
          "ageRange": "15-<24 months",
          "mean": "0.24-0.58",
          "minMeanSd": 0.24,
          "maxMeanSd": 0.58,
          "minMonth": 15,
          "maxMonth": 24
        },
        {
          "ageRange": "2-<4 years",
          "mean": "0.16-1.62",
          "minMeanSd": 0.16,
          "maxMeanSd": 1.62,
          "minMonth": 24,
          "maxMonth": 48
        },
        {
          "ageRange": "4-<7 years",
          "mean": "0.17-1.87",
          "minMeanSd": 0.17,
          "maxMeanSd": 1.87,
          "minMonth": 48,
          "maxMonth": 84
        },
        {
          "ageRange": "7-<10 years",
          "mean": "0.21-2.21",
          "minMeanSd": 0.21,
          "maxMeanSd": 2.21,
          "minMonth": 84,
          "maxMonth": 120
        },
        {
          "ageRange": "10-<13 years",
          "mean": "0.27-2.50",
          "minMeanSd": 0.27,
          "maxMeanSd": 2.50,
          "minMonth": 120,
          "maxMonth": 156
        },
        {
          "ageRange": "13-<16 years",
          "mean": "0.36-2.75",
          "minMeanSd": 0.36,
          "maxMeanSd": 2.75,
          "minMonth": 156,
          "maxMonth": 192
        },
        {
          "ageRange": "16-<18 years",
          "mean": "0.44-2.89",
          "minMeanSd": 0.44,
          "maxMeanSd": 2.89,
          "minMonth": 192,
          "maxMonth": 216
        },
        {
          "ageRange": "≥18 years",
          "mean": "0.50-3.14",
          "minMeanSd": 0.50,
          "maxMeanSd": 3.14,
          "minMonth": 216,
          "maxMonth": null
        }
      ];
    const IgA2levels =  [
        {
          "ageRange": "0-<5 months",
          "mean": "0.004-0.055",
          "minMeanSd": 0.004,
          "maxMeanSd": 0.055,
          "minMonth": 0,
          "maxMonth": 5
        },
        {
          "ageRange": "5-<9 months",
          "mean": "0.015-0.062",
          "minMeanSd": 0.015,
          "maxMeanSd": 0.062,
          "minMonth": 5,
          "maxMonth": 9
        },
        {
          "ageRange": "9-<15 months",
          "mean": "0.028-0.070",
          "minMeanSd": 0.028,
          "maxMeanSd": 0.070,
          "minMonth": 9,
          "maxMonth": 15
        },
        {
          "ageRange": "15-<24 months",
          "mean": "0.039-0.077",
          "minMeanSd": 0.039,
          "maxMeanSd": 0.077,
          "minMonth": 15,
          "maxMonth": 24
        },
        {
          "ageRange": "2-<4 years",
          "mean": "0.013-0.311",
          "minMeanSd": 0.013,
          "maxMeanSd": 0.311,
          "minMonth": 24,
          "maxMonth": 48
        },
        {
          "ageRange": "4-<7 years",
          "mean": "0.011-0.391",
          "minMeanSd": 0.011,
          "maxMeanSd": 0.391,
          "minMonth": 48,
          "maxMonth": 84
        },
        {
          "ageRange": "7-<10 years",
          "mean": "0.014-0.480",
          "minMeanSd": 0.014,
          "maxMeanSd": 0.480,
          "minMonth": 84,
          "maxMonth": 120
        },
        {
          "ageRange": "10-<13 years",
          "mean": "0.026-0.534",
          "minMeanSd": 0.026,
          "maxMeanSd": 0.534,
          "minMonth": 120,
          "maxMonth": 156
        },
        {
          "ageRange": "13-<16 years",
          "mean": "0.047-0.551",
          "minMeanSd": 0.047,
          "maxMeanSd": 0.551,
          "minMonth": 156,
          "maxMonth": 192
        },
        {
          "ageRange": "16-<18 years",
          "mean": "0.066-0.543",
          "minMeanSd": 0.066,
          "maxMeanSd": 0.543,
          "minMonth": 192,
          "maxMonth": 216
        },
        {
          "ageRange": "≥18 years",
          "mean": "0.097-1.560",
          "minMeanSd": 0.097,
          "maxMeanSd": 1.560,
          "minMonth": 216,
          "maxMonth": null
        }
      ];
  const IgA3levels = [
        {
          "ageRange": "0-<5 months",
          "mean": "0.26-1.22",
          "minMeanSd": 0.26,
          "maxMeanSd": 1.22,
          "minMonth": 0,
          "maxMonth": 5
        },
        {
          "ageRange": "5-<9 months",
          "mean": "0.32-1.32",
          "minMeanSd": 0.32,
          "maxMeanSd": 1.32,
          "minMonth": 5,
          "maxMonth": 9
        },
        {
          "ageRange": "9-<15 months",
          "mean": "0.40-1.43",
          "minMeanSd": 0.40,
          "maxMeanSd": 1.43,
          "minMonth": 9,
          "maxMonth": 15
        },
        {
          "ageRange": "15-<24 months",
          "mean": "0.46-1.52",
          "minMeanSd": 0.46,
          "maxMeanSd": 1.52,
          "minMonth": 15,
          "maxMonth": 24
        },
        {
          "ageRange": "2-<4 years",
          "mean": "0.37-1.84",
          "minMeanSd": 0.37,
          "maxMeanSd": 1.84,
          "minMonth": 24,
          "maxMonth": 48
        },
        {
          "ageRange": "4-<7 years",
          "mean": "0.37-2.24",
          "minMeanSd": 0.37,
          "maxMeanSd": 2.24,
          "minMonth": 48,
          "maxMonth": 84
        },
        {
          "ageRange": "7-<10 years",
          "mean": "0.38-2.51",
          "minMeanSd": 0.38,
          "maxMeanSd": 2.51,
          "minMonth": 84,
          "maxMonth": 120
        },
        {
          "ageRange": "10-<13 years",
          "mean": "0.41-2.55",
          "minMeanSd": 0.41,
          "maxMeanSd": 2.55,
          "minMonth": 120,
          "maxMonth": 156
        },
        {
          "ageRange": "13-<16 years",
          "mean": "0.45-2.44",
          "minMeanSd": 0.45,
          "maxMeanSd": 2.44,
          "minMonth": 156,
          "maxMonth": 192
        },
        {
          "ageRange": "16-<18 years",
          "mean": "0.49-2.01",
          "minMeanSd": 0.49,
          "maxMeanSd": 2.01,
          "minMonth": 192,
          "maxMonth": 216
        },
        {
          "ageRange": "≥18 years",
          "mean": "0.37-2.86",
          "minMeanSd": 0.37,
          "maxMeanSd": 2.86,
          "minMonth": 216,
          "maxMonth": null
        }
      ]
    

    
  
  






  // Tablodaki veriyi JSON formatına dönüştürdümü

  async function importAllJsonDataAsArrays() {
    try {
      // "dataCollection" koleksiyonu altında "immunoglobulinAllData" dokümanını oluştur/ya da güncelle
      const docRef = doc(db, "dataCollection", "kilavuz-ap");
  
      // Tek seferde, tüm array'leri alan olarak yazıyoruz
      await setDoc(docRef, {
        IgGlevels,
        IgAlevels,
        IgG1levels,
        IgG2levels,
        IgG3levels,
        IgG4levels,
        IgA1levels,
        IgA2levels,
        IgA3levels
      });
  
      console.log("Tüm veriler tek doküman altında array’ler olarak kaydedildi!");
    } catch (error) {
      console.error("JSON verisi aktarılırken bir hata oluştu:", error);
    }
  }
  
  // 6) Fonksiyonu çağırın
  importAllJsonDataAsArrays();