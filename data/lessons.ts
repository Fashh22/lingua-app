import { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─── Spanish › Unit 1 › Lesson 1 ───────────────────────────────────────────
  {
    id: "es-1-1",
    unitId: "es-unit-1",
    order: 1,
    title: "Hello & Goodbye",
    description: "Learn the most common Spanish greetings",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say hello and goodbye in Spanish",
      "Understand basic greeting responses",
    ],
    vocabulary: [
      {
        word: "hola",
        translation: "hello",
        pronunciation: "OH-lah",
        example: "¡Hola! ¿Cómo estás?",
        exampleTranslation: "Hello! How are you?",
      },
      {
        word: "adiós",
        translation: "goodbye",
        pronunciation: "ah-DYOS",
        example: "¡Adiós! Hasta luego.",
        exampleTranslation: "Goodbye! See you later.",
      },
      {
        word: "buenos días",
        translation: "good morning",
        pronunciation: "BWEH-nos DEE-as",
        example: "Buenos días, señor.",
        exampleTranslation: "Good morning, sir.",
      },
      {
        word: "buenas noches",
        translation: "good night",
        pronunciation: "BWEH-nas NO-ches",
        example: "Buenas noches, familia.",
        exampleTranslation: "Good night, family.",
      },
    ],
    phrases: [
      {
        phrase: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh es-TAS",
        context: "Casual greeting between friends",
      },
      {
        phrase: "Estoy bien, gracias.",
        translation: "I am fine, thank you.",
        pronunciation: "es-TOY BYEN, GRAH-syas",
        context: "Standard positive response",
      },
    ],
    activities: [
      {
        id: "es-1-1-a1",
        type: "vocabulary",
        question: "What does 'hola' mean?",
        correctAnswer: "hello",
        options: ["hello", "goodbye", "good morning", "thank you"],
      },
      {
        id: "es-1-1-a2",
        type: "translate",
        question: "Translate: good night",
        correctAnswer: "buenas noches",
        options: ["buenas noches", "buenos días", "buenas tardes", "hola"],
      },
      {
        id: "es-1-1-a3",
        type: "fill_blank",
        question: "¡___! ¿Cómo estás?",
        correctAnswer: "Hola",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
      },
    ],
    aiTeacherPrompt:
      "You are Luna, a friendly Spanish teacher. Teach the student common Spanish greetings like hola, adiós, buenos días, and buenas noches. Use simple English explanations and pronunciation tips. Be encouraging and fun. Keep responses short and easy to follow.",
  },

  // ─── Spanish › Unit 1 › Lesson 2 ───────────────────────────────────────────
  {
    id: "es-1-2",
    unitId: "es-unit-1",
    order: 2,
    title: "Introductions",
    description: "Learn how to introduce yourself in Spanish",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Say your name in Spanish",
      "Ask someone their name",
      "Say where you are from",
    ],
    vocabulary: [
      {
        word: "me llamo",
        translation: "my name is",
        pronunciation: "meh YA-moh",
        example: "Me llamo Carlos.",
        exampleTranslation: "My name is Carlos.",
      },
      {
        word: "soy de",
        translation: "I am from",
        pronunciation: "SOY deh",
        example: "Soy de México.",
        exampleTranslation: "I am from Mexico.",
      },
      {
        word: "mucho gusto",
        translation: "nice to meet you",
        pronunciation: "MOO-cho GOOS-toh",
        example: "Mucho gusto, Ana.",
        exampleTranslation: "Nice to meet you, Ana.",
      },
    ],
    phrases: [
      {
        phrase: "¿Cómo te llamas?",
        translation: "What is your name?",
        pronunciation: "KOH-moh teh YA-mas",
        context: "Asking someone's name informally",
      },
      {
        phrase: "¿De dónde eres?",
        translation: "Where are you from?",
        pronunciation: "deh DON-deh EH-res",
        context: "Asking about someone's origin informally",
      },
    ],
    activities: [
      {
        id: "es-1-2-a1",
        type: "translate",
        question: "Translate: my name is",
        correctAnswer: "me llamo",
        options: ["me llamo", "soy de", "mucho gusto", "hola"],
      },
      {
        id: "es-1-2-a2",
        type: "listen_and_choose",
        question: "How do you say 'nice to meet you' in Spanish?",
        correctAnswer: "mucho gusto",
        options: ["mucho gusto", "buenos días", "de nada", "por favor"],
      },
    ],
    aiTeacherPrompt:
      "You are Luna, a friendly Spanish teacher. Teach the student how to introduce themselves in Spanish: 'me llamo', '¿cómo te llamas?', 'soy de', and 'mucho gusto'. Role-play a short introduction conversation. Keep it simple and fun.",
  },

  // ─── Spanish › Unit 1 › Lesson 3 ───────────────────────────────────────────
  {
    id: "es-1-3",
    unitId: "es-unit-1",
    order: 3,
    title: "Please & Thank You",
    description: "Be polite with common courtesy words",
    xpReward: 10,
    estimatedMinutes: 4,
    goals: [
      "Say please and thank you in Spanish",
      "Respond politely to thank you",
    ],
    vocabulary: [
      {
        word: "por favor",
        translation: "please",
        pronunciation: "por fa-VOR",
        example: "Un café, por favor.",
        exampleTranslation: "A coffee, please.",
      },
      {
        word: "gracias",
        translation: "thank you",
        pronunciation: "GRAH-syas",
        example: "Gracias por tu ayuda.",
        exampleTranslation: "Thank you for your help.",
      },
      {
        word: "de nada",
        translation: "you're welcome",
        pronunciation: "deh NAH-dah",
        example: "—Gracias. —De nada.",
        exampleTranslation: "—Thank you. —You're welcome.",
      },
      {
        word: "perdón",
        translation: "excuse me / sorry",
        pronunciation: "per-DON",
        example: "Perdón, ¿dónde está el baño?",
        exampleTranslation: "Excuse me, where is the bathroom?",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "es-1-3-a1",
        type: "vocabulary",
        question: "What does 'de nada' mean?",
        correctAnswer: "you're welcome",
        options: ["you're welcome", "please", "sorry", "thank you"],
      },
      {
        id: "es-1-3-a2",
        type: "fill_blank",
        question: "Un café, ___ favor.",
        correctAnswer: "por",
        options: ["por", "de", "con", "sin"],
      },
    ],
    aiTeacherPrompt:
      "You are Luna, a friendly Spanish teacher. Teach the student polite Spanish words: 'por favor', 'gracias', 'de nada', and 'perdón'. Give short, practical examples like ordering food or asking for directions. Be warm and encouraging.",
  },

  // ─── Spanish › Unit 2 › Lesson 1 ───────────────────────────────────────────
  {
    id: "es-2-1",
    unitId: "es-unit-2",
    order: 1,
    title: "Numbers 1–10",
    description: "Count from one to ten in Spanish",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Count from 1 to 10 in Spanish", "Recognize written Spanish numbers"],
    vocabulary: [
      { word: "uno", translation: "one", pronunciation: "OO-noh", example: "Tengo un hijo.", exampleTranslation: "I have one child." },
      { word: "dos", translation: "two", pronunciation: "DOS", example: "Son las dos.", exampleTranslation: "It is two o'clock." },
      { word: "tres", translation: "three", pronunciation: "TRES", example: "Tres amigos.", exampleTranslation: "Three friends." },
      { word: "cuatro", translation: "four", pronunciation: "KWAH-troh", example: "Cuatro mesas.", exampleTranslation: "Four tables." },
      { word: "cinco", translation: "five", pronunciation: "SINK-oh", example: "Cinco minutos.", exampleTranslation: "Five minutes." },
    ],
    phrases: [],
    activities: [
      {
        id: "es-2-1-a1",
        type: "vocabulary",
        question: "What does 'tres' mean?",
        correctAnswer: "three",
        options: ["one", "two", "three", "four"],
      },
      {
        id: "es-2-1-a2",
        type: "translate",
        question: "Translate: five",
        correctAnswer: "cinco",
        options: ["uno", "tres", "cuatro", "cinco"],
      },
    ],
    aiTeacherPrompt:
      "You are Luna, a friendly Spanish teacher. Teach the student the numbers 1 through 10 in Spanish. Use fun examples like counting objects or ages. Help them with pronunciation. Be patient and encouraging.",
  },

  // ─── French › Unit 1 › Lesson 1 ────────────────────────────────────────────
  {
    id: "fr-1-1",
    unitId: "fr-unit-1",
    order: 1,
    title: "Bonjour! Greetings",
    description: "Learn how to greet people in French",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say hello and goodbye in French",
      "Use formal and informal greetings",
    ],
    vocabulary: [
      {
        word: "bonjour",
        translation: "hello / good day",
        pronunciation: "bon-ZHOOR",
        example: "Bonjour, madame.",
        exampleTranslation: "Hello, ma'am.",
      },
      {
        word: "salut",
        translation: "hi (informal)",
        pronunciation: "sa-LU",
        example: "Salut, ça va?",
        exampleTranslation: "Hi, how's it going?",
      },
      {
        word: "au revoir",
        translation: "goodbye",
        pronunciation: "oh reh-VWAR",
        example: "Au revoir et bonne journée!",
        exampleTranslation: "Goodbye and have a good day!",
      },
      {
        word: "bonsoir",
        translation: "good evening",
        pronunciation: "bon-SWAR",
        example: "Bonsoir, tout le monde.",
        exampleTranslation: "Good evening, everyone.",
      },
    ],
    phrases: [
      {
        phrase: "Comment ça va?",
        translation: "How are you? (informal)",
        pronunciation: "koh-MAHN sa VAH",
        context: "Casual greeting between friends",
      },
      {
        phrase: "Ça va bien, merci.",
        translation: "I am fine, thank you.",
        pronunciation: "sa VAH byan, mer-SEE",
        context: "Standard positive response",
      },
    ],
    activities: [
      {
        id: "fr-1-1-a1",
        type: "vocabulary",
        question: "What does 'bonjour' mean?",
        correctAnswer: "hello / good day",
        options: ["hello / good day", "goodbye", "good evening", "hi"],
      },
      {
        id: "fr-1-1-a2",
        type: "translate",
        question: "Translate: goodbye",
        correctAnswer: "au revoir",
        options: ["bonjour", "salut", "au revoir", "bonsoir"],
      },
    ],
    aiTeacherPrompt:
      "You are Claire, a warm French teacher. Teach the student French greetings: 'bonjour', 'salut', 'au revoir', and 'bonsoir'. Explain the difference between formal and informal use. Make it conversational and fun. Keep responses short.",
  },

  // ─── Japanese › Unit 1 › Lesson 1 ──────────────────────────────────────────
  {
    id: "ja-1-1",
    unitId: "ja-unit-1",
    order: 1,
    title: "Konnichiwa! Hello",
    description: "Learn essential Japanese greetings",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Greet someone in Japanese at different times of day",
      "Say goodbye in Japanese",
    ],
    vocabulary: [
      {
        word: "こんにちは",
        translation: "hello / good afternoon",
        pronunciation: "kon-nee-chee-WA",
        example: "こんにちは、田中さん。",
        exampleTranslation: "Hello, Tanaka-san.",
      },
      {
        word: "おはようございます",
        translation: "good morning (formal)",
        pronunciation: "oh-hah-YOH go-ZAI-mas",
        example: "おはようございます！",
        exampleTranslation: "Good morning!",
      },
      {
        word: "こんばんは",
        translation: "good evening",
        pronunciation: "kon-BAN-wa",
        example: "こんばんは、元気ですか？",
        exampleTranslation: "Good evening, how are you?",
      },
      {
        word: "さようなら",
        translation: "goodbye",
        pronunciation: "sa-YOH-na-ra",
        example: "さようなら！またね。",
        exampleTranslation: "Goodbye! See you.",
      },
    ],
    phrases: [
      {
        phrase: "お元気ですか？",
        translation: "How are you? (formal)",
        pronunciation: "oh-GEN-ki des-KA",
        context: "Polite way to ask how someone is",
      },
    ],
    activities: [
      {
        id: "ja-1-1-a1",
        type: "vocabulary",
        question: "What does 'こんにちは' mean?",
        correctAnswer: "hello / good afternoon",
        options: ["good morning", "hello / good afternoon", "good evening", "goodbye"],
      },
      {
        id: "ja-1-1-a2",
        type: "translate",
        question: "Translate: good morning (formal)",
        correctAnswer: "おはようございます",
        options: ["こんにちは", "こんばんは", "おはようございます", "さようなら"],
      },
    ],
    aiTeacherPrompt:
      "You are Hana, a friendly Japanese teacher. Teach the student basic Japanese greetings: 'こんにちは', 'おはようございます', 'こんばんは', and 'さようなら'. Include pronunciation tips using romaji. Explain when to use each greeting. Be patient, clear, and encouraging.",
  },
];
