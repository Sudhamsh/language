const FLASHCARD_DATA = {
  "flashcards": [
    {
      "id": 1,
      "telugu": "నమస్కారం",
      "romanization": "Namaskāram",
      "english": "Hello/Greetings",
      "category": "Greetings"
    },
    {
      "id": 2,
      "telugu": "ధన్యవాదాలు",
      "romanization": "Dhanyavādālu",
      "english": "Thank you",
      "category": "Greetings"
    },
    {
      "id": 3,
      "telugu": "క్షమించండి",
      "romanization": "Kṣaminchandi",
      "english": "Sorry/Excuse me",
      "category": "Greetings"
    },
    {
      "id": 4,
      "telugu": "అవును",
      "romanization": "Avunu",
      "english": "Yes",
      "category": "Common Words"
    },
    {
      "id": 5,
      "telugu": "కాదు",
      "romanization": "Kādu",
      "english": "No",
      "category": "Common Words"
    },
    {
      "id": 6,
      "telugu": "దయచేసి",
      "romanization": "Dayachēsi",
      "english": "Please",
      "category": "Greetings"
    },
    {
      "id": 7,
      "telugu": "శుభోదయం",
      "romanization": "Śubhōdayam",
      "english": "Good morning",
      "category": "Greetings"
    },
    {
      "id": 8,
      "telugu": "శుభ రాత్రి",
      "romanization": "Śubha rātri",
      "english": "Good night",
      "category": "Greetings"
    },
    {
      "id": 9,
      "telugu": "ఒకటి",
      "romanization": "Okaṭi",
      "english": "One",
      "category": "Numbers"
    },
    {
      "id": 10,
      "telugu": "రెండు",
      "romanization": "Reṇḍu",
      "english": "Two",
      "category": "Numbers"
    },
    {
      "id": 11,
      "telugu": "మూడు",
      "romanization": "Mūḍu",
      "english": "Three",
      "category": "Numbers"
    },
    {
      "id": 12,
      "telugu": "నాలుగు",
      "romanization": "Nālugu",
      "english": "Four",
      "category": "Numbers"
    },
    {
      "id": 13,
      "telugu": "ఐదు",
      "romanization": "Aidu",
      "english": "Five",
      "category": "Numbers"
    },
    {
      "id": 14,
      "telugu": "ఆరు",
      "romanization": "Āru",
      "english": "Six",
      "category": "Numbers"
    },
    {
      "id": 15,
      "telugu": "ఏడు",
      "romanization": "Ēḍu",
      "english": "Seven",
      "category": "Numbers"
    },
    {
      "id": 16,
      "telugu": "ఎనిమిది",
      "romanization": "Enimidi",
      "english": "Eight",
      "category": "Numbers"
    },
    {
      "id": 17,
      "telugu": "తొమ్మిది",
      "romanization": "Tommidi",
      "english": "Nine",
      "category": "Numbers"
    },
    {
      "id": 18,
      "telugu": "పది",
      "romanization": "Padi",
      "english": "Ten",
      "category": "Numbers"
    },
    {
      "id": 19,
      "telugu": "తల్లి",
      "romanization": "Talli",
      "english": "Mother",
      "category": "Family"
    },
    {
      "id": 20,
      "telugu": "తండ్రి",
      "romanization": "Taṇḍri",
      "english": "Father",
      "category": "Family"
    },
    {
      "id": 21,
      "telugu": "అన్న",
      "romanization": "Anna",
      "english": "Elder brother",
      "category": "Family"
    },
    {
      "id": 22,
      "telugu": "అక్ka",
      "romanization": "Akka",
      "english": "Elder sister",
      "category": "Family"
    },
    {
      "id": 23,
      "telugu": "తమ్ముడు",
      "romanization": "Tammuḍu",
      "english": "Younger brother",
      "category": "Family"
    },
    {
      "id": 24,
      "telugu": "చెల్లెలు",
      "romanization": "Chellelu",
      "english": "Younger sister",
      "category": "Family"
    },
    {
      "id": 25,
      "telugu": "తాత",
      "romanization": "Tāta",
      "english": "Grandfather",
      "category": "Family"
    },
    {
      "id": 26,
      "telugu": "అమ్మమ్మ",
      "romanization": "Ammamma",
      "english": "Grandmother",
      "category": "Family"
    },
    {
      "id": 27,
      "telugu": "నేను",
      "romanization": "Nēnu",
      "english": "I/Me",
      "category": "Pronouns"
    },
    {
      "id": 28,
      "telugu": "నువ్వు",
      "romanization": "Nuvvu",
      "english": "You",
      "category": "Pronouns"
    },
    {
      "id": 29,
      "telugu": "అతను",
      "romanization": "Atanu",
      "english": "He",
      "category": "Pronouns"
    },
    {
      "id": 30,
      "telugu": "ఆమె",
      "romanization": "Āme",
      "english": "She",
      "category": "Pronouns"
    },
    {
      "id": 31,
      "telugu": "మనం",
      "romanization": "Manam",
      "english": "We",
      "category": "Pronouns"
    },
    {
      "id": 32,
      "telugu": "వారు",
      "romanization": "Vāru",
      "english": "They",
      "category": "Pronouns"
    },
    {
      "id": 33,
      "telugu": "తినండి",
      "romanization": "Tinaṇḍi",
      "english": "Eat",
      "category": "Verbs"
    },
    {
      "id": 34,
      "telugu": "త్రాగండి",
      "romanization": "Trāgaṇḍi",
      "english": "Drink",
      "category": "Verbs"
    },
    {
      "id": 35,
      "telugu": "వెళ్ళండి",
      "romanization": "Veḷḷaṇḍi",
      "english": "Go",
      "category": "Verbs"
    },
    {
      "id": 36,
      "telugu": "రండి",
      "romanization": "Raṇḍi",
      "english": "Come",
      "category": "Verbs"
    },
    {
      "id": 37,
      "telugu": "చదవండి",
      "romanization": "Chadavaṇḍi",
      "english": "Read",
      "category": "Verbs"
    },
    {
      "id": 38,
      "telugu": "వ్రాయండి",
      "romanization": "Vrāyaṇḍi",
      "english": "Write",
      "category": "Verbs"
    },
    {
      "id": 39,
      "telugu": "మాట్లాడండి",
      "romanization": "Māṭlāḍaṇḍi",
      "english": "Speak",
      "category": "Verbs"
    },
    {
      "id": 40,
      "telugu": "వినండి",
      "romanization": "Vinaṇḍi",
      "english": "Listen",
      "category": "Verbs"
    },
    {
      "id": 41,
      "telugu": "చూడండి",
      "romanization": "Chūḍaṇḍi",
      "english": "See/Look",
      "category": "Verbs"
    },
    {
      "id": 42,
      "telugu": "నిద్రపోండి",
      "romanization": "Nidrapōṇḍi",
      "english": "Sleep",
      "category": "Verbs"
    },
    {
      "id": 43,
      "telugu": "నీళ్ళు",
      "romanization": "Nīḷḷu",
      "english": "Water",
      "category": "Common Words"
    },
    {
      "id": 44,
      "telugu": "ఆహారం",
      "romanization": "Āhāram",
      "english": "Food",
      "category": "Common Words"
    },
    {
      "id": 45,
      "telugu": "ఇల్లు",
      "romanization": "Illu",
      "english": "House",
      "category": "Places"
    },
    {
      "id": 46,
      "telugu": "పాఠశాల",
      "romanization": "Pāṭhaśāla",
      "english": "School",
      "category": "Places"
    },
    {
      "id": 47,
      "telugu": "పుస్తకం",
      "romanization": "Pustakam",
      "english": "Book",
      "category": "Common Words"
    },
    {
      "id": 48,
      "telugu": "పేరు",
      "romanization": "Pēru",
      "english": "Name",
      "category": "Common Words"
    },
    {
      "id": 49,
      "telugu": "రోజు",
      "romanization": "Rōju",
      "english": "Day",
      "category": "Time"
    },
    {
      "id": 50,
      "telugu": "రాత్రి",
      "romanization": "Rātri",
      "english": "Night",
      "category": "Time"
    },
    {
      "id": 51,
      "telugu": "ఉదయం",
      "romanization": "Udayam",
      "english": "Morning",
      "category": "Time"
    },
    {
      "id": 52,
      "telugu": "సాయంత్రం",
      "romanization": "Sāyantram",
      "english": "Evening",
      "category": "Time"
    },
    {
      "id": 53,
      "telugu": "ఎలా",
      "romanization": "Elā",
      "english": "How",
      "category": "Questions"
    },
    {
      "id": 54,
      "telugu": "ఎక్కడ",
      "romanization": "Ekkaḍa",
      "english": "Where",
      "category": "Questions"
    },
    {
      "id": 55,
      "telugu": "ఎప్పుడు",
      "romanization": "Eppuḍu",
      "english": "When",
      "category": "Questions"
    },
    {
      "id": 56,
      "telugu": "ఎవరు",
      "romanization": "Evaru",
      "english": "Who",
      "category": "Questions"
    },
    {
      "id": 57,
      "telugu": "ఏమి",
      "romanization": "Ēmi",
      "english": "What",
      "category": "Questions"
    },
    {
      "id": 58,
      "telugu": "ఎందుకు",
      "romanization": "Enduku",
      "english": "Why",
      "category": "Questions"
    },
    {
      "id": 59,
      "telugu": "పెద్ద",
      "romanization": "Pedda",
      "english": "Big",
      "category": "Adjectives"
    },
    {
      "id": 60,
      "telugu": "చిన్న",
      "romanization": "Chinna",
      "english": "Small",
      "category": "Adjectives"
    },
    {
      "id": 61,
      "telugu": "మంచి",
      "romanization": "Manchi",
      "english": "Good",
      "category": "Adjectives"
    },
    {
      "id": 62,
      "telugu": "చెడు",
      "romanization": "Cheḍu",
      "english": "Bad",
      "category": "Adjectives"
    },
    {
      "id": 63,
      "telugu": "కొత్త",
      "romanization": "Kotta",
      "english": "New",
      "category": "Adjectives"
    },
    {
      "id": 64,
      "telugu": "పాత",
      "romanization": "Pāta",
      "english": "Old",
      "category": "Adjectives"
    },
    {
      "id": 65,
      "telugu": "అందమైన",
      "romanization": "Andamaina",
      "english": "Beautiful",
      "category": "Adjectives"
    },
    {
      "id": 66,
      "telugu": "తెలుపు",
      "romanization": "Telupu",
      "english": "White",
      "category": "Colors"
    },
    {
      "id": 67,
      "telugu": "నలుపు",
      "romanization": "Nalupu",
      "english": "Black",
      "category": "Colors"
    },
    {
      "id": 68,
      "telugu": "ఎరుపు",
      "romanization": "Erupu",
      "english": "Red",
      "category": "Colors"
    },
    {
      "id": 69,
      "telugu": "నీలం",
      "romanization": "Nīlam",
      "english": "Blue",
      "category": "Colors"
    },
    {
      "id": 70,
      "telugu": "ఆకుపచ్చ",
      "romanization": "Ākupachcha",
      "english": "Green",
      "category": "Colors"
    },
    {
      "id": 71,
      "telugu": "పసుపు",
      "romanization": "Pasupu",
      "english": "Yellow",
      "category": "Colors"
    },
    {
      "id": 72,
      "telugu": "తల",
      "romanization": "Tala",
      "english": "Head",
      "category": "Body Parts"
    },
    {
      "id": 73,
      "telugu": "కన్ను",
      "romanization": "Kannu",
      "english": "Eye",
      "category": "Body Parts"
    },
    {
      "id": 74,
      "telugu": "చెవి",
      "romanization": "Chevi",
      "english": "Ear",
      "category": "Body Parts"
    },
    {
      "id": 75,
      "telugu": "ముక్కు",
      "romanization": "Mukku",
      "english": "Nose",
      "category": "Body Parts"
    },
    {
      "id": 76,
      "telugu": "నోరు",
      "romanization": "Nōru",
      "english": "Mouth",
      "category": "Body Parts"
    },
    {
      "id": 77,
      "telugu": "చేయి",
      "romanization": "Chēyi",
      "english": "Hand",
      "category": "Body Parts"
    },
    {
      "id": 78,
      "telugu": "కాలు",
      "romanization": "Kālu",
      "english": "Leg",
      "category": "Body Parts"
    },
    {
      "id": 79,
      "telugu": "హృదయం",
      "romanization": "Hṛdayam",
      "english": "Heart",
      "category": "Body Parts"
    },
    {
      "id": 80,
      "telugu": "ఆసుపత్రి",
      "romanization": "Āsupatri",
      "english": "Hospital",
      "category": "Places"
    },
    {
      "id": 81,
      "telugu": "దుకాణం",
      "romanization": "Dukāṇam",
      "english": "Shop",
      "category": "Places"
    },
    {
      "id": 82,
      "telugu": "ఆలయం",
      "romanization": "Ālayam",
      "english": "Temple",
      "category": "Places"
    },
    {
      "id": 83,
      "telugu": "మార్కెట్",
      "romanization": "Mārkeṭ",
      "english": "Market",
      "category": "Places"
    },
    {
      "id": 84,
      "telugu": "కారు",
      "romanization": "Kāru",
      "english": "Car",
      "category": "Common Words"
    },
    {
      "id": 85,
      "telugu": "బస్సు",
      "romanization": "Bassu",
      "english": "Bus",
      "category": "Common Words"
    },
    {
      "id": 86,
      "telugu": "రైలు",
      "romanization": "Railu",
      "english": "Train",
      "category": "Common Words"
    },
    {
      "id": 87,
      "telugu": "డబ్బు",
      "romanization": "Ḍabbu",
      "english": "Money",
      "category": "Common Words"
    },
    {
      "id": 88,
      "telugu": "సమయం",
      "romanization": "Samayam",
      "english": "Time",
      "category": "Time"
    },
    {
      "id": 89,
      "telugu": "స్నేహితుడు",
      "romanization": "Snēhituḍu",
      "english": "Friend (male)",
      "category": "Common Words"
    },
    {
      "id": 90,
      "telugu": "స్నేహితురాలు",
      "romanization": "Snēhiturālu",
      "english": "Friend (female)",
      "category": "Common Words"
    },
    {
      "id": 91,
      "telugu": "ప్రేమ",
      "romanization": "Prēma",
      "english": "Love",
      "category": "Common Words"
    },
    {
      "id": 92,
      "telugu": "ఆనందం",
      "romanization": "Ānandam",
      "english": "Happiness",
      "category": "Common Words"
    },
    {
      "id": 93,
      "telugu": "దుఃఖం",
      "romanization": "Duḥkham",
      "english": "Sadness",
      "category": "Common Words"
    },
    {
      "id": 94,
      "telugu": "భాష",
      "romanization": "Bhāsha",
      "english": "Language",
      "category": "Common Words"
    },
    {
      "id": 95,
      "telugu": "దేశం",
      "romanization": "Dēśam",
      "english": "Country",
      "category": "Places"
    },
    {
      "id": 96,
      "telugu": "నగరం",
      "romanization": "Nagaram",
      "english": "City",
      "category": "Places"
    },
    {
      "id": 97,
      "telugu": "గ్రామం",
      "romanization": "Grāmam",
      "english": "Village",
      "category": "Places"
    },
    {
      "id": 98,
      "telugu": "వాతావరణం",
      "romanization": "Vātāvaraṇam",
      "english": "Weather",
      "category": "Common Words"
    },
    {
      "id": 99,
      "telugu": "వర్షం",
      "romanization": "Varṣam",
      "english": "Rain",
      "category": "Common Words"
    },
    {
      "id": 100,
      "telugu": "ఎండ",
      "romanization": "Eṇḍa",
      "english": "Sun/Heat",
      "category": "Common Words"
    }
  ]
};
