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
      "You're Luna, a warm and energetic Spanish teacher. Today's lesson covers exactly four greetings: hola, adiós, buenos días, and buenas noches — nothing else. Introduce each word one at a time, say it clearly, give its English meaning, then ask the student to repeat it. Use contractions, keep it fun, and celebrate every correct try.",
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
      "You're Luna, a warm Spanish teacher. This lesson covers four phrases only: me llamo, ¿cómo te llamas?, soy de, and mucho gusto. Teach each phrase in order — say it, give the English meaning in one short sentence, then ask the student to repeat. After all four, do a quick role-play introduction together. Stay within these phrases only.",
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
      "You're Luna, a friendly Spanish teacher. Today's lesson has four polite expressions: por favor, gracias, de nada, and perdón. Introduce each one with a tiny real-life example — like ordering a coffee or bumping into someone — then ask the student to say it. Keep each explanation to one sentence and cheer them on warmly.",
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
    goals: [
      "Count from 1 to 10 in Spanish",
      "Recognize written Spanish numbers",
    ],
    vocabulary: [
      {
        word: "uno",
        translation: "one",
        pronunciation: "OO-noh",
        example: "Tengo un hijo.",
        exampleTranslation: "I have one child.",
      },
      {
        word: "dos",
        translation: "two",
        pronunciation: "DOS",
        example: "Son las dos.",
        exampleTranslation: "It is two o'clock.",
      },
      {
        word: "tres",
        translation: "three",
        pronunciation: "TRES",
        example: "Tres amigos.",
        exampleTranslation: "Three friends.",
      },
      {
        word: "cuatro",
        translation: "four",
        pronunciation: "KWAH-troh",
        example: "Cuatro mesas.",
        exampleTranslation: "Four tables.",
      },
      {
        word: "cinco",
        translation: "five",
        pronunciation: "SINK-oh",
        example: "Cinco minutos.",
        exampleTranslation: "Five minutes.",
      },
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
      "You're Luna, a cheerful Spanish teacher. This lesson covers uno, dos, tres, cuatro, cinco — just these five numbers. Introduce them one at a time, say each number clearly with a fun example like counting fingers, then ask the student to say it back. Keep it playful and move at their pace.",
  },

  // ─── Spanish › Unit 2 › Lesson 2 ───────────────────────────────────────────
  {
    id: "es-2-2",
    unitId: "es-unit-2",
    order: 2,
    title: "Numbers 6–10",
    description: "Complete counting from six to ten in Spanish",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Count from 6 to 10 in Spanish", "Use numbers in simple sentences"],
    vocabulary: [
      {
        word: "seis",
        translation: "six",
        pronunciation: "SAYS",
        example: "Hay seis manzanas.",
        exampleTranslation: "There are six apples.",
      },
      {
        word: "siete",
        translation: "seven",
        pronunciation: "SYEH-teh",
        example: "Son las siete.",
        exampleTranslation: "It is seven o'clock.",
      },
      {
        word: "ocho",
        translation: "eight",
        pronunciation: "OH-cho",
        example: "Ocho horas de sueño.",
        exampleTranslation: "Eight hours of sleep.",
      },
      {
        word: "nueve",
        translation: "nine",
        pronunciation: "NWEH-veh",
        example: "Nueve estudiantes.",
        exampleTranslation: "Nine students.",
      },
      {
        word: "diez",
        translation: "ten",
        pronunciation: "DYETH",
        example: "Diez minutos más.",
        exampleTranslation: "Ten more minutes.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "es-2-2-a1",
        type: "vocabulary",
        question: "What does 'ocho' mean?",
        correctAnswer: "eight",
        options: ["six", "seven", "eight", "nine"],
      },
      {
        id: "es-2-2-a2",
        type: "translate",
        question: "Translate: ten",
        correctAnswer: "diez",
        options: ["seis", "siete", "nueve", "diez"],
      },
    ],
    aiTeacherPrompt:
      "You're Luna, a cheerful Spanish teacher. Today you're teaching seis, siete, ocho, nueve, and diez — only those five. Say each number, give a quick fun example like 'siete días' (seven days), and ask the student to repeat. Celebrate every correct answer and gently guide them if they need another try.",
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
      "You're Claire, an enthusiastic French teacher. This lesson covers four greetings only: bonjour, salut, au revoir, and bonsoir. Introduce each one, say whether it's formal or casual in one quick phrase, model the pronunciation, and ask the student to say it back. Keep it light and conversational — you're chatting, not lecturing.",
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
        options: [
          "good morning",
          "hello / good afternoon",
          "good evening",
          "goodbye",
        ],
      },
      {
        id: "ja-1-1-a2",
        type: "translate",
        question: "Translate: good morning (formal)",
        correctAnswer: "おはようございます",
        options: [
          "こんにちは",
          "こんばんは",
          "おはようございます",
          "さようなら",
        ],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a warm and patient Japanese teacher. Today's lesson has four greetings: こんにちは, おはようございます, こんばんは, and さようなら. Introduce each one in Japanese, give the romaji pronunciation, explain in one short sentence when to use it, and ask the student to repeat. Go slowly and celebrate every attempt — Japanese sounds are new for most students!",
  },

  // ─── French › Unit 1 › Lesson 2 ────────────────────────────────────────────
  {
    id: "fr-1-2",
    unitId: "fr-unit-1",
    order: 2,
    title: "Je m'appelle… Introductions",
    description: "Learn how to introduce yourself in French",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Say your name in French",
      "Ask someone's name",
      "Say where you're from",
    ],
    vocabulary: [
      {
        word: "je m'appelle",
        translation: "my name is",
        pronunciation: "zhuh ma-PEL",
        example: "Je m'appelle Marie.",
        exampleTranslation: "My name is Marie.",
      },
      {
        word: "je suis de",
        translation: "I am from",
        pronunciation: "zhuh swee duh",
        example: "Je suis de Paris.",
        exampleTranslation: "I am from Paris.",
      },
      {
        word: "enchanté(e)",
        translation: "nice to meet you",
        pronunciation: "on-shon-TAY",
        example: "Enchanté, Pierre!",
        exampleTranslation: "Nice to meet you, Pierre!",
      },
    ],
    phrases: [
      {
        phrase: "Comment vous appelez-vous?",
        translation: "What is your name? (formal)",
        pronunciation: "koh-MON voo za-play-VOO",
        context: "Formal way to ask someone's name",
      },
      {
        phrase: "Tu t'appelles comment?",
        translation: "What is your name? (informal)",
        pronunciation: "tu ta-PEL koh-MON",
        context: "Casual way to ask a friend's name",
      },
    ],
    activities: [
      {
        id: "fr-1-2-a1",
        type: "translate",
        question: "Translate: my name is",
        correctAnswer: "je m'appelle",
        options: ["je suis de", "je m'appelle", "enchanté", "bonjour"],
      },
      {
        id: "fr-1-2-a2",
        type: "vocabulary",
        question: "How do you say 'nice to meet you' in French?",
        correctAnswer: "enchanté(e)",
        options: ["bonjour", "salut", "enchanté(e)", "au revoir"],
      },
    ],
    aiTeacherPrompt:
      "You're Claire, a warm French teacher. This lesson covers three phrases: je m'appelle, je suis de, and enchanté. Teach each one with a short natural example, ask the student to repeat, then role-play a quick café introduction together. Stay within these three phrases only — keep it fun and personal.",
  },

  // ─── French › Unit 1 › Lesson 3 ────────────────────────────────────────────
  {
    id: "fr-1-3",
    unitId: "fr-unit-1",
    order: 3,
    title: "S'il vous plaît! Politeness",
    description: "Master French courtesy words",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Say please and thank you in French", "Use polite expressions"],
    vocabulary: [
      {
        word: "s'il vous plaît",
        translation: "please (formal)",
        pronunciation: "seel voo PLAY",
        example: "Un café, s'il vous plaît.",
        exampleTranslation: "A coffee, please.",
      },
      {
        word: "merci",
        translation: "thank you",
        pronunciation: "mer-SEE",
        example: "Merci beaucoup!",
        exampleTranslation: "Thank you very much!",
      },
      {
        word: "de rien",
        translation: "you're welcome",
        pronunciation: "duh RYEN",
        example: "—Merci. —De rien.",
        exampleTranslation: "—Thank you. —You're welcome.",
      },
      {
        word: "excusez-moi",
        translation: "excuse me",
        pronunciation: "ex-koo-zay MWAH",
        example: "Excusez-moi, où sont les toilettes?",
        exampleTranslation: "Excuse me, where are the toilets?",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "fr-1-3-a1",
        type: "vocabulary",
        question: "What does 'merci' mean?",
        correctAnswer: "thank you",
        options: ["please", "thank you", "you're welcome", "excuse me"],
      },
      {
        id: "fr-1-3-a2",
        type: "fill_blank",
        question: "Un café, ___ vous plaît.",
        correctAnswer: "s'il",
        options: ["s'il", "de", "avec", "pour"],
      },
    ],
    aiTeacherPrompt:
      "You're Claire, a friendly French teacher. Today's lesson has four polite expressions: s'il vous plaît, merci, de rien, and excusez-moi. For each one, give a one-sentence café example, say the word, and ask the student to repeat. Keep every reply to one or two sentences and stay within these four expressions only.",
  },

  // ─── French › Unit 1 › Lesson 4 ────────────────────────────────────────────
  {
    id: "fr-1-4",
    unitId: "fr-unit-1",
    order: 4,
    title: "Les Nombres: Numbers 1–10",
    description: "Count from one to ten in French",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Count from 1 to 10 in French", "Recognize French number words"],
    vocabulary: [
      {
        word: "un / une",
        translation: "one",
        pronunciation: "UH / OON",
        example: "Un café, s'il vous plaît.",
        exampleTranslation: "One coffee, please.",
      },
      {
        word: "deux",
        translation: "two",
        pronunciation: "DUH",
        example: "Deux billets.",
        exampleTranslation: "Two tickets.",
      },
      {
        word: "trois",
        translation: "three",
        pronunciation: "TWAH",
        example: "Trois amis.",
        exampleTranslation: "Three friends.",
      },
      {
        word: "quatre",
        translation: "four",
        pronunciation: "KAT-ruh",
        example: "Quatre pommes.",
        exampleTranslation: "Four apples.",
      },
      {
        word: "cinq",
        translation: "five",
        pronunciation: "SANK",
        example: "Cinq minutes.",
        exampleTranslation: "Five minutes.",
      },
      {
        word: "six",
        translation: "six",
        pronunciation: "SEESS",
        example: "Six chaises.",
        exampleTranslation: "Six chairs.",
      },
      {
        word: "sept",
        translation: "seven",
        pronunciation: "SEHT",
        example: "Sept jours.",
        exampleTranslation: "Seven days.",
      },
      {
        word: "huit",
        translation: "eight",
        pronunciation: "WHEET",
        example: "Huit heures.",
        exampleTranslation: "Eight o'clock.",
      },
      {
        word: "neuf",
        translation: "nine",
        pronunciation: "NUHF",
        example: "Neuf livres.",
        exampleTranslation: "Nine books.",
      },
      {
        word: "dix",
        translation: "ten",
        pronunciation: "DEES",
        example: "Dix euros.",
        exampleTranslation: "Ten euros.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "fr-1-4-a1",
        type: "vocabulary",
        question: "What does 'quatre' mean?",
        correctAnswer: "four",
        options: ["three", "four", "five", "six"],
      },
      {
        id: "fr-1-4-a2",
        type: "translate",
        question: "Translate: nine",
        correctAnswer: "neuf",
        options: ["sept", "huit", "neuf", "dix"],
      },
    ],
    aiTeacherPrompt:
      "You're Claire, a cheerful French teacher. This lesson covers all ten French numbers: un through dix. Go through them one at a time, give a quick practical example for each (ordering coffees, buying tickets), and ask the student to say each number back to you. Move at their pace and celebrate every correct answer.",
  },

  // ─── French › Unit 1 › Lesson 5 ────────────────────────────────────────────
  {
    id: "fr-1-5",
    unitId: "fr-unit-1",
    order: 5,
    title: "Les Couleurs: Colors",
    description: "Learn the most common colors in French",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Name common colors in French", "Describe objects using colors"],
    vocabulary: [
      {
        word: "rouge",
        translation: "red",
        pronunciation: "ROOZH",
        example: "Une rose rouge.",
        exampleTranslation: "A red rose.",
      },
      {
        word: "bleu(e)",
        translation: "blue",
        pronunciation: "BLUH",
        example: "Le ciel est bleu.",
        exampleTranslation: "The sky is blue.",
      },
      {
        word: "vert(e)",
        translation: "green",
        pronunciation: "VEHR",
        example: "Un arbre vert.",
        exampleTranslation: "A green tree.",
      },
      {
        word: "blanc(he)",
        translation: "white",
        pronunciation: "BLON",
        example: "Une chemise blanche.",
        exampleTranslation: "A white shirt.",
      },
      {
        word: "noir(e)",
        translation: "black",
        pronunciation: "NWAHR",
        example: "Un chat noir.",
        exampleTranslation: "A black cat.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "fr-1-5-a1",
        type: "vocabulary",
        question: "What does 'rouge' mean?",
        correctAnswer: "red",
        options: ["red", "blue", "green", "white"],
      },
      {
        id: "fr-1-5-a2",
        type: "translate",
        question: "Translate: black",
        correctAnswer: "noir(e)",
        options: ["rouge", "bleu", "vert", "noir(e)"],
      },
    ],
    aiTeacherPrompt:
      "You're Claire, a warm French teacher. Today's lesson has five colors: rouge, bleu, vert, blanc, and noir. For each color say it clearly, describe a vivid object — like 'une rose rouge' (a red rose!) — and ask the student to repeat the color. Keep each turn to one or two sentences and stay within these five colors only.",
  },

  // ─── French › Unit 1 › Lesson 6 ────────────────────────────────────────────
  {
    id: "fr-1-6",
    unitId: "fr-unit-1",
    order: 6,
    title: "Les Jours: Days of the Week",
    description: "Learn the days of the week in French",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: ["Name all days of the week in French", "Say what day it is"],
    vocabulary: [
      {
        word: "lundi",
        translation: "Monday",
        pronunciation: "LUN-dee",
        example: "Lundi je travaille.",
        exampleTranslation: "On Monday I work.",
      },
      {
        word: "mardi",
        translation: "Tuesday",
        pronunciation: "MAR-dee",
        example: "Mardi je vais au marché.",
        exampleTranslation: "On Tuesday I go to the market.",
      },
      {
        word: "mercredi",
        translation: "Wednesday",
        pronunciation: "mehr-KRUH-dee",
        example: "Mercredi c'est le marché.",
        exampleTranslation: "Wednesday is market day.",
      },
      {
        word: "jeudi",
        translation: "Thursday",
        pronunciation: "zhuh-DEE",
        example: "Jeudi j'ai un cours.",
        exampleTranslation: "On Thursday I have a class.",
      },
      {
        word: "vendredi",
        translation: "Friday",
        pronunciation: "von-DRUH-dee",
        example: "Vendredi soir on sort!",
        exampleTranslation: "Friday night we go out!",
      },
      {
        word: "samedi",
        translation: "Saturday",
        pronunciation: "SAH-meh-dee",
        example: "Samedi je fais du sport.",
        exampleTranslation: "On Saturday I exercise.",
      },
      {
        word: "dimanche",
        translation: "Sunday",
        pronunciation: "dee-MONSh",
        example: "Le dimanche je me repose.",
        exampleTranslation: "On Sunday I rest.",
      },
    ],
    phrases: [
      {
        phrase: "Quel jour sommes-nous?",
        translation: "What day is it?",
        pronunciation: "kel ZHOOR som-NOO",
        context: "Asking what day of the week it is",
      },
      {
        phrase: "Aujourd'hui c'est lundi.",
        translation: "Today is Monday.",
        pronunciation: "oh-zhoor-DWEE say lun-dee",
        context: "Stating today's day",
      },
    ],
    activities: [
      {
        id: "fr-1-6-a1",
        type: "vocabulary",
        question: "What does 'jeudi' mean?",
        correctAnswer: "Thursday",
        options: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      },
      {
        id: "fr-1-6-a2",
        type: "translate",
        question: "Translate: Saturday",
        correctAnswer: "samedi",
        options: ["lundi", "jeudi", "samedi", "dimanche"],
      },
    ],
    aiTeacherPrompt:
      "You're Claire, a friendly French teacher. This lesson covers the seven days of the week: lundi through dimanche. Introduce each day, give a quick schedule example like 'le vendredi soir on sort!' (Friday night we go out!), and ask the student to say the day back. Keep it breezy — one day at a time, one sentence per turn.",
  },

  // ─── Japanese › Unit 1 › Lesson 2 ──────────────────────────────────────────
  {
    id: "ja-1-2",
    unitId: "ja-unit-1",
    order: 2,
    title: "Hajimemashite! Introductions",
    description: "Learn how to introduce yourself in Japanese",
    xpReward: 10,
    estimatedMinutes: 7,
    goals: [
      "Introduce yourself in Japanese",
      "Ask someone's name politely",
      "Use -san honorific",
    ],
    vocabulary: [
      {
        word: "はじめまして",
        translation: "nice to meet you",
        pronunciation: "ha-ji-me-MA-shi-te",
        example: "はじめまして、田中です。",
        exampleTranslation: "Nice to meet you, I'm Tanaka.",
      },
      {
        word: "わたしは〜です",
        translation: "I am ~",
        pronunciation: "wa-TA-shi wa ~ de-su",
        example: "わたしはアリです。",
        exampleTranslation: "I am Ali.",
      },
      {
        word: "〜さん",
        translation: "Mr./Ms. ~ (honorific)",
        pronunciation: "~ san",
        example: "田中さん、こんにちは。",
        exampleTranslation: "Hello, Ms. Tanaka.",
      },
      {
        word: "どうぞよろしく",
        translation: "pleased to meet you",
        pronunciation: "DOH-zo yo-RO-shi-ku",
        example: "どうぞよろしくお願いします。",
        exampleTranslation: "I'm pleased to meet you.",
      },
    ],
    phrases: [
      {
        phrase: "おなまえは？",
        translation: "What is your name?",
        pronunciation: "o-NA-ma-e wa",
        context: "Casual way to ask someone's name",
      },
    ],
    activities: [
      {
        id: "ja-1-2-a1",
        type: "vocabulary",
        question: "What does 'はじめまして' mean?",
        correctAnswer: "nice to meet you",
        options: ["hello", "goodbye", "nice to meet you", "thank you"],
      },
      {
        id: "ja-1-2-a2",
        type: "translate",
        question: "Translate: I am ~",
        correctAnswer: "わたしは〜です",
        options: ["はじめまして", "さようなら", "わたしは〜です", "ありがとう"],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a friendly Japanese teacher. This lesson covers four introduction phrases: はじめまして, わたしは〜です, さん, and どうぞよろしく. For each phrase, say it, give the romaji, explain it in one short English sentence, and ask the student to repeat. After all four, do a quick self-introduction together. Stay within these phrases only.",
  },

  // ─── Japanese › Unit 1 › Lesson 3 ──────────────────────────────────────────
  {
    id: "ja-1-3",
    unitId: "ja-unit-1",
    order: 3,
    title: "Arigatou! Politeness",
    description: "Learn essential Japanese polite expressions",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say thank you and please in Japanese",
      "Use polite speech endings",
    ],
    vocabulary: [
      {
        word: "ありがとうございます",
        translation: "thank you (formal)",
        pronunciation: "a-ri-ga-TO go-ZAI-ma-su",
        example: "ありがとうございます！",
        exampleTranslation: "Thank you very much!",
      },
      {
        word: "すみません",
        translation: "excuse me / sorry",
        pronunciation: "su-mi-MA-sen",
        example: "すみません、ちょっといいですか？",
        exampleTranslation: "Excuse me, do you have a moment?",
      },
      {
        word: "どういたしまして",
        translation: "you're welcome",
        pronunciation: "do-i-TA-shi-MA-shi-te",
        example: "—ありがとう。—どういたしまして。",
        exampleTranslation: "—Thank you. —You're welcome.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "ja-1-3-a1",
        type: "vocabulary",
        question: "How do you say 'thank you (formal)' in Japanese?",
        correctAnswer: "ありがとうございます",
        options: [
          "こんにちは",
          "さようなら",
          "ありがとうございます",
          "すみません",
        ],
      },
      {
        id: "ja-1-3-a2",
        type: "translate",
        question: "Translate: excuse me / sorry",
        correctAnswer: "すみません",
        options: ["ありがとう", "すみません", "はじめまして", "どうぞ"],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a warm Japanese teacher. Today's lesson has three polite expressions: ありがとうございます, すみません, and どういたしまして. Teach each one with its romaji, a quick real-life example, and ask the student to say it. You can mention in one sentence that polite speech is really valued in Japanese culture — then move straight to practising.",
  },

  // ─── Japanese › Unit 1 › Lesson 4 ──────────────────────────────────────────
  {
    id: "ja-1-4",
    unitId: "ja-unit-1",
    order: 4,
    title: "Ichi, Ni, San! Numbers 1–10",
    description: "Count from one to ten in Japanese",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Count from 1 to 10 in Japanese",
      "Understand Japanese number readings",
    ],
    vocabulary: [
      {
        word: "いち",
        translation: "one",
        pronunciation: "i-CHI",
        example: "いち、に、さん！",
        exampleTranslation: "One, two, three!",
      },
      {
        word: "に",
        translation: "two",
        pronunciation: "ni",
        example: "ふたり。",
        exampleTranslation: "Two people.",
      },
      {
        word: "さん",
        translation: "three",
        pronunciation: "san",
        example: "さんにん。",
        exampleTranslation: "Three people.",
      },
      {
        word: "ご",
        translation: "five",
        pronunciation: "go",
        example: "ごえん。",
        exampleTranslation: "Five yen.",
      },
      {
        word: "じゅう",
        translation: "ten",
        pronunciation: "ju",
        example: "じゅっぷん。",
        exampleTranslation: "Ten minutes.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "ja-1-4-a1",
        type: "vocabulary",
        question: "What does 'さん' mean in Japanese?",
        correctAnswer: "three",
        options: ["one", "two", "three", "four"],
      },
      {
        id: "ja-1-4-a2",
        type: "translate",
        question: "Translate: ten",
        correctAnswer: "じゅう",
        options: ["いち", "ご", "なな", "じゅう"],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a cheerful Japanese teacher. This lesson covers Japanese numbers ichi through juu — all ten. Say each number with its romaji, give a tiny example like 'go-en' (five yen), and ask the student to repeat. Count together out loud and make it feel like a fun game.",
  },

  // ─── Japanese › Unit 1 › Lesson 5 ──────────────────────────────────────────
  {
    id: "ja-1-5",
    unitId: "ja-unit-1",
    order: 5,
    title: "Hiragana: A, I, U, E, O",
    description: "Learn the five Japanese vowel sounds",
    xpReward: 15,
    estimatedMinutes: 8,
    goals: ["Read hiragana vowels", "Recognize a-i-u-e-o sounds"],
    vocabulary: [
      {
        word: "あ",
        translation: "a (like 'ah')",
        pronunciation: "a",
        example: "あめ (ame)",
        exampleTranslation: "rain",
      },
      {
        word: "い",
        translation: "i (like 'ee')",
        pronunciation: "i",
        example: "いぬ (inu)",
        exampleTranslation: "dog",
      },
      {
        word: "う",
        translation: "u (like 'oo')",
        pronunciation: "u",
        example: "うみ (umi)",
        exampleTranslation: "sea",
      },
      {
        word: "え",
        translation: "e (like 'eh')",
        pronunciation: "e",
        example: "えき (eki)",
        exampleTranslation: "station",
      },
      {
        word: "お",
        translation: "o (like 'oh')",
        pronunciation: "o",
        example: "おとこ (otoko)",
        exampleTranslation: "man",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "ja-1-5-a1",
        type: "vocabulary",
        question: "What sound does 'あ' make?",
        correctAnswer: "a (like 'ah')",
        options: [
          "a (like 'ah')",
          "i (like 'ee')",
          "u (like 'oo')",
          "e (like 'eh')",
        ],
      },
      {
        id: "ja-1-5-a2",
        type: "translate",
        question: "What does 'いぬ (inu)' mean?",
        correctAnswer: "dog",
        options: ["cat", "dog", "rain", "sea"],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a patient and encouraging Japanese teacher. This lesson is the five hiragana vowels: あ (a), い (i), う (u), え (e), お (o). Introduce one character at a time — say its sound, give the example word, and ask the student to say the sound back. Go slowly and tell them it's totally normal if it feels tricky at first.",
  },

  // ─── Japanese › Unit 1 › Lesson 6 ──────────────────────────────────────────
  {
    id: "ja-1-6",
    unitId: "ja-unit-1",
    order: 6,
    title: "Kazoku: Family",
    description: "Learn how to talk about family in Japanese",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Name family members in Japanese",
      "Introduce your family politely",
    ],
    vocabulary: [
      {
        word: "おかあさん",
        translation: "mother",
        pronunciation: "o-KA-san",
        example: "おかあさんはどこですか？",
        exampleTranslation: "Where is mother?",
      },
      {
        word: "おとうさん",
        translation: "father",
        pronunciation: "o-TO-san",
        example: "おとうさんは医者です。",
        exampleTranslation: "My father is a doctor.",
      },
      {
        word: "あに",
        translation: "older brother",
        pronunciation: "a-ni",
        example: "あには大学生です。",
        exampleTranslation: "My older brother is a university student.",
      },
      {
        word: "あね",
        translation: "older sister",
        pronunciation: "a-ne",
        example: "あねはきれいです。",
        exampleTranslation: "My older sister is beautiful.",
      },
    ],
    phrases: [
      {
        phrase: "かぞくはなんにんですか？",
        translation: "How many people are in your family?",
        pronunciation: "KA-zo-ku wa NAN-nin des-ka",
        context: "Asking about family size",
      },
    ],
    activities: [
      {
        id: "ja-1-6-a1",
        type: "vocabulary",
        question: "What does 'おかあさん' mean?",
        correctAnswer: "mother",
        options: ["father", "mother", "older brother", "older sister"],
      },
      {
        id: "ja-1-6-a2",
        type: "translate",
        question: "Translate: father",
        correctAnswer: "おとうさん",
        options: ["おかあさん", "おとうさん", "あに", "あね"],
      },
    ],
    aiTeacherPrompt:
      "You're Hana, a warm Japanese teacher. Today's lesson covers four family words: おかあさん, おとうさん, あに, and あね. Introduce each word with its romaji and a short example sentence, then ask the student to say it. Keep every turn to one or two sentences and stay strictly within these four words.",
  },

  // ─── German › Unit 1 › Lesson 1 ────────────────────────────────────────────
  {
    id: "de-1-1",
    unitId: "de-unit-1",
    order: 1,
    title: "Guten Tag! Greetings",
    description: "Learn how to greet people in German",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say hello and goodbye in German",
      "Use greetings at different times of day",
    ],
    vocabulary: [
      {
        word: "guten Morgen",
        translation: "good morning",
        pronunciation: "GOO-ten MOR-gen",
        example: "Guten Morgen! Wie geht's?",
        exampleTranslation: "Good morning! How are you?",
      },
      {
        word: "guten Tag",
        translation: "good day / hello",
        pronunciation: "GOO-ten TAHK",
        example: "Guten Tag, Herr Müller.",
        exampleTranslation: "Good day, Mr. Müller.",
      },
      {
        word: "guten Abend",
        translation: "good evening",
        pronunciation: "GOO-ten AH-bent",
        example: "Guten Abend, alle!",
        exampleTranslation: "Good evening, everyone!",
      },
      {
        word: "auf Wiedersehen",
        translation: "goodbye (formal)",
        pronunciation: "owf VEE-der-zay-en",
        example: "Auf Wiedersehen und bis morgen!",
        exampleTranslation: "Goodbye and see you tomorrow!",
      },
      {
        word: "tschüss",
        translation: "bye (informal)",
        pronunciation: "CHOOS",
        example: "Tschüss! Bis später.",
        exampleTranslation: "Bye! See you later.",
      },
    ],
    phrases: [
      {
        phrase: "Wie geht es Ihnen?",
        translation: "How are you? (formal)",
        pronunciation: "vee gayt es EE-nen",
        context: "Formal greeting to ask how someone is",
      },
      {
        phrase: "Wie geht's?",
        translation: "How are you? (informal)",
        pronunciation: "vee gayts",
        context: "Casual greeting between friends",
      },
    ],
    activities: [
      {
        id: "de-1-1-a1",
        type: "vocabulary",
        question: "What does 'guten Morgen' mean?",
        correctAnswer: "good morning",
        options: ["good morning", "good evening", "goodbye", "hello"],
      },
      {
        id: "de-1-1-a2",
        type: "translate",
        question: "Translate: goodbye (formal)",
        correctAnswer: "auf Wiedersehen",
        options: ["tschüss", "guten Tag", "auf Wiedersehen", "hallo"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, an energetic German teacher. This lesson covers five greetings: guten Morgen, guten Tag, guten Abend, auf Wiedersehen, and tschüss. Introduce each one, say in one quick phrase whether it's formal or casual and what time of day it fits, then ask the student to repeat. Keep it conversational and fun — one greeting at a time.",
  },

  // ─── German › Unit 1 › Lesson 2 ────────────────────────────────────────────
  {
    id: "de-1-2",
    unitId: "de-unit-1",
    order: 2,
    title: "Ich heiße… Introductions",
    description: "Introduce yourself and others in German",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Say your name in German",
      "Introduce yourself",
      "Say where you're from",
    ],
    vocabulary: [
      {
        word: "ich heiße",
        translation: "my name is",
        pronunciation: "ikh HY-suh",
        example: "Ich heiße Anna.",
        exampleTranslation: "My name is Anna.",
      },
      {
        word: "ich komme aus",
        translation: "I come from",
        pronunciation: "ikh KOM-uh ows",
        example: "Ich komme aus Berlin.",
        exampleTranslation: "I come from Berlin.",
      },
      {
        word: "freut mich",
        translation: "nice to meet you",
        pronunciation: "froyt mikh",
        example: "Freut mich, Sie kennenzulernen!",
        exampleTranslation: "Nice to meet you!",
      },
    ],
    phrases: [
      {
        phrase: "Wie heißen Sie?",
        translation: "What is your name? (formal)",
        pronunciation: "vee HY-sen zee",
        context: "Formal way to ask someone's name",
      },
      {
        phrase: "Wie heißt du?",
        translation: "What is your name? (informal)",
        pronunciation: "vee HYTST doo",
        context: "Casual way to ask a friend's name",
      },
    ],
    activities: [
      {
        id: "de-1-2-a1",
        type: "translate",
        question: "Translate: my name is",
        correctAnswer: "ich heiße",
        options: ["ich komme aus", "ich heiße", "freut mich", "guten Tag"],
      },
      {
        id: "de-1-2-a2",
        type: "vocabulary",
        question: "How do you say 'nice to meet you' in German?",
        correctAnswer: "freut mich",
        options: ["auf Wiedersehen", "tschüss", "freut mich", "wie geht's"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, a friendly German teacher. Today's lesson has three introduction phrases: ich heiße, ich komme aus, and freut mich. Teach each phrase with a short natural example, ask the student to repeat, and then do a quick role-play introduction together. Mention the formal/informal address difference in one sentence if it comes up naturally.",
  },

  // ─── German › Unit 1 › Lesson 3 ────────────────────────────────────────────
  {
    id: "de-1-3",
    unitId: "de-unit-1",
    order: 3,
    title: "Bitte & Danke! Politeness",
    description: "Master essential German courtesy expressions",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say please and thank you in German",
      "Use polite expressions in context",
    ],
    vocabulary: [
      {
        word: "bitte",
        translation: "please / you're welcome",
        pronunciation: "BIT-uh",
        example: "Einen Kaffee, bitte!",
        exampleTranslation: "A coffee, please!",
      },
      {
        word: "danke",
        translation: "thank you",
        pronunciation: "DAN-kuh",
        example: "Danke schön!",
        exampleTranslation: "Thank you very much!",
      },
      {
        word: "bitte schön",
        translation: "you're welcome / here you go",
        pronunciation: "BIT-uh shern",
        example: "—Danke. —Bitte schön!",
        exampleTranslation: "—Thank you. —You're welcome!",
      },
      {
        word: "entschuldigung",
        translation: "excuse me / sorry",
        pronunciation: "ent-SHUL-di-goong",
        example: "Entschuldigung, wo ist der Bahnhof?",
        exampleTranslation: "Excuse me, where is the train station?",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "de-1-3-a1",
        type: "vocabulary",
        question: "What does 'danke' mean?",
        correctAnswer: "thank you",
        options: ["please", "thank you", "you're welcome", "excuse me"],
      },
      {
        id: "de-1-3-a2",
        type: "fill_blank",
        question: "Einen Kaffee, ___!",
        correctAnswer: "bitte",
        options: ["bitte", "danke", "hallo", "tschüss"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, an enthusiastic German teacher. This lesson covers four polite expressions: bitte, danke, bitte schön, and entschuldigung. For each one, give a one-sentence restaurant or street example, model the pronunciation, and ask the student to say it back. Keep every reply short and celebrate each correct attempt warmly.",
  },

  // ─── German › Unit 1 › Lesson 4 ────────────────────────────────────────────
  {
    id: "de-1-4",
    unitId: "de-unit-1",
    order: 4,
    title: "Zahlen: Numbers 1–10",
    description: "Count from one to ten in German",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: ["Count from 1 to 10 in German", "Recognize German number words"],
    vocabulary: [
      {
        word: "eins",
        translation: "one",
        pronunciation: "AYNS",
        example: "Eins, zwei, drei!",
        exampleTranslation: "One, two, three!",
      },
      {
        word: "zwei",
        translation: "two",
        pronunciation: "TSVY",
        example: "Zwei Tassen Tee.",
        exampleTranslation: "Two cups of tea.",
      },
      {
        word: "drei",
        translation: "three",
        pronunciation: "DRY",
        example: "Drei Freunde.",
        exampleTranslation: "Three friends.",
      },
      {
        word: "fünf",
        translation: "five",
        pronunciation: "FOONF",
        example: "Fünf Minuten.",
        exampleTranslation: "Five minutes.",
      },
      {
        word: "zehn",
        translation: "ten",
        pronunciation: "TSAYN",
        example: "Zehn Euro.",
        exampleTranslation: "Ten euros.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "de-1-4-a1",
        type: "vocabulary",
        question: "What does 'drei' mean?",
        correctAnswer: "three",
        options: ["one", "two", "three", "four"],
      },
      {
        id: "de-1-4-a2",
        type: "translate",
        question: "Translate: ten",
        correctAnswer: "zehn",
        options: ["fünf", "acht", "neun", "zehn"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, a cheerful German teacher. Today's lesson covers all ten numbers: eins through zehn. Go through them one at a time, give a quick fun example each time (like 'zwei Tassen Tee' — two cups of tea!), and ask the student to say each number back. Make it feel like a game and keep each turn to one or two sentences.",
  },

  // ─── German › Unit 1 › Lesson 5 ────────────────────────────────────────────
  {
    id: "de-1-5",
    unitId: "de-unit-1",
    order: 5,
    title: "Farben: Colors",
    description: "Learn the most common colors in German",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Name common colors in German",
      "Describe objects using German colors",
    ],
    vocabulary: [
      {
        word: "rot",
        translation: "red",
        pronunciation: "ROHT",
        example: "Eine rote Rose.",
        exampleTranslation: "A red rose.",
      },
      {
        word: "blau",
        translation: "blue",
        pronunciation: "BLOW",
        example: "Der blaue Himmel.",
        exampleTranslation: "The blue sky.",
      },
      {
        word: "grün",
        translation: "green",
        pronunciation: "GROON",
        example: "Ein grüner Baum.",
        exampleTranslation: "A green tree.",
      },
      {
        word: "weiß",
        translation: "white",
        pronunciation: "VISS",
        example: "Ein weißes Hemd.",
        exampleTranslation: "A white shirt.",
      },
      {
        word: "schwarz",
        translation: "black",
        pronunciation: "SHVARTS",
        example: "Eine schwarze Katze.",
        exampleTranslation: "A black cat.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "de-1-5-a1",
        type: "vocabulary",
        question: "What does 'blau' mean?",
        correctAnswer: "blue",
        options: ["red", "blue", "green", "white"],
      },
      {
        id: "de-1-5-a2",
        type: "translate",
        question: "Translate: black",
        correctAnswer: "schwarz",
        options: ["rot", "grün", "weiß", "schwarz"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, a warm German teacher. This lesson covers five colors: rot, blau, grün, weiß, and schwarz. Describe a familiar object for each color — like 'eine rote Rose' (a red rose!) — ask the student to say the color, and gently correct pronunciation if needed. One color per turn, one or two sentences max.",
  },

  // ─── German › Unit 1 › Lesson 6 ────────────────────────────────────────────
  {
    id: "de-1-6",
    unitId: "de-unit-1",
    order: 6,
    title: "Wochentage: Days of the Week",
    description: "Learn the days of the week in German",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: ["Name all days of the week in German", "Say what day it is today"],
    vocabulary: [
      {
        word: "Montag",
        translation: "Monday",
        pronunciation: "MON-tahk",
        example: "Am Montag arbeite ich.",
        exampleTranslation: "On Monday I work.",
      },
      {
        word: "Mittwoch",
        translation: "Wednesday",
        pronunciation: "MIT-vokh",
        example: "Mittwoch ist Markttag.",
        exampleTranslation: "Wednesday is market day.",
      },
      {
        word: "Freitag",
        translation: "Friday",
        pronunciation: "FRY-tahk",
        example: "Am Freitag gehen wir aus.",
        exampleTranslation: "On Friday we go out.",
      },
      {
        word: "Sonntag",
        translation: "Sunday",
        pronunciation: "ZON-tahk",
        example: "Am Sonntag ruhe ich mich aus.",
        exampleTranslation: "On Sunday I rest.",
      },
    ],
    phrases: [
      {
        phrase: "Welcher Tag ist heute?",
        translation: "What day is today?",
        pronunciation: "VEL-kher tahk ist HOY-tuh",
        context: "Asking what day of the week it is",
      },
      {
        phrase: "Heute ist Montag.",
        translation: "Today is Monday.",
        pronunciation: "HOY-tuh ist MON-tahk",
        context: "Stating today's day",
      },
    ],
    activities: [
      {
        id: "de-1-6-a1",
        type: "vocabulary",
        question: "What does 'Freitag' mean?",
        correctAnswer: "Friday",
        options: ["Monday", "Wednesday", "Friday", "Sunday"],
      },
      {
        id: "de-1-6-a2",
        type: "translate",
        question: "Translate: Sunday",
        correctAnswer: "Sonntag",
        options: ["Montag", "Mittwoch", "Freitag", "Sonntag"],
      },
    ],
    aiTeacherPrompt:
      "You're Max, a friendly German teacher. Today's lesson is the seven days of the week: Montag through Sonntag. Introduce each day with a quick example sentence, mention in your very first turn that they all end in -tag meaning 'day' — that's a great memory trick! — then ask the student to say each day back. One day per turn.",
  },

  // ─── Portuguese › Unit 1 › Lesson 1 ────────────────────────────────────────
  {
    id: "pt-1-1",
    unitId: "pt-unit-1",
    order: 1,
    title: "Olá! Greetings",
    description: "Learn how to greet people in Portuguese",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say hello and goodbye in Portuguese",
      "Greet people at different times of day",
    ],
    vocabulary: [
      {
        word: "olá",
        translation: "hello",
        pronunciation: "oh-LAH",
        example: "Olá, tudo bem?",
        exampleTranslation: "Hello, how are you?",
      },
      {
        word: "bom dia",
        translation: "good morning",
        pronunciation: "bom JEE-ah",
        example: "Bom dia, professor!",
        exampleTranslation: "Good morning, professor!",
      },
      {
        word: "boa tarde",
        translation: "good afternoon",
        pronunciation: "BOH-ah TAR-deh",
        example: "Boa tarde a todos!",
        exampleTranslation: "Good afternoon, everyone!",
      },
      {
        word: "boa noite",
        translation: "good evening / good night",
        pronunciation: "BOH-ah NOY-chee",
        example: "Boa noite, família.",
        exampleTranslation: "Good night, family.",
      },
      {
        word: "tchau",
        translation: "bye",
        pronunciation: "chow",
        example: "Tchau! Até logo.",
        exampleTranslation: "Bye! See you soon.",
      },
    ],
    phrases: [
      {
        phrase: "Tudo bem?",
        translation: "How are you? / All good?",
        pronunciation: "TOO-doo beng",
        context: "Very common Brazilian greeting",
      },
      {
        phrase: "Tudo bem, obrigado!",
        translation: "All good, thank you!",
        pronunciation: "TOO-doo beng, oh-bree-GAH-doo",
        context: "Positive response to 'tudo bem'",
      },
    ],
    activities: [
      {
        id: "pt-1-1-a1",
        type: "vocabulary",
        question: "What does 'bom dia' mean?",
        correctAnswer: "good morning",
        options: ["good morning", "good afternoon", "good night", "goodbye"],
      },
      {
        id: "pt-1-1-a2",
        type: "translate",
        question: "Translate: bye",
        correctAnswer: "tchau",
        options: ["olá", "tudo bem", "tchau", "boa noite"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a warm and energetic Brazilian Portuguese teacher. Today's lesson covers five greetings: olá, bom dia, boa tarde, boa noite, and tchau. Introduce each one with its English meaning, model the pronunciation with Brazilian warmth, and ask the student to say it. Keep it friendly and fun — one greeting per turn.",
  },

  // ─── Portuguese › Unit 1 › Lesson 2 ────────────────────────────────────────
  {
    id: "pt-1-2",
    unitId: "pt-unit-1",
    order: 2,
    title: "Meu nome é… Introductions",
    description: "Learn how to introduce yourself in Portuguese",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: [
      "Say your name in Portuguese",
      "Ask someone's name",
      "Say where you're from",
    ],
    vocabulary: [
      {
        word: "meu nome é",
        translation: "my name is",
        pronunciation: "MEH-oo NO-mee eh",
        example: "Meu nome é Carlos.",
        exampleTranslation: "My name is Carlos.",
      },
      {
        word: "eu sou de",
        translation: "I am from",
        pronunciation: "eh-oo SOH jee",
        example: "Eu sou de São Paulo.",
        exampleTranslation: "I am from São Paulo.",
      },
      {
        word: "prazer",
        translation: "nice to meet you",
        pronunciation: "prah-ZEHR",
        example: "Muito prazer em conhecê-lo!",
        exampleTranslation: "Very nice to meet you!",
      },
    ],
    phrases: [
      {
        phrase: "Como você se chama?",
        translation: "What is your name?",
        pronunciation: "KO-moo vo-SEH see SHA-mah",
        context: "Asking someone's name in Brazilian Portuguese",
      },
      {
        phrase: "De onde você é?",
        translation: "Where are you from?",
        pronunciation: "jee ON-jee vo-SEH eh",
        context: "Asking about someone's origin",
      },
    ],
    activities: [
      {
        id: "pt-1-2-a1",
        type: "translate",
        question: "Translate: my name is",
        correctAnswer: "meu nome é",
        options: ["eu sou de", "meu nome é", "prazer", "olá"],
      },
      {
        id: "pt-1-2-a2",
        type: "vocabulary",
        question: "How do you say 'nice to meet you' in Portuguese?",
        correctAnswer: "prazer",
        options: ["tchau", "obrigado", "prazer", "tudo bem"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a friendly Brazilian Portuguese teacher. This lesson has three phrases: meu nome é, eu sou de, and prazer. Teach each one with a short natural example, ask the student to repeat, then do a quick introduction dialogue together. Stay within these three phrases only.",
  },

  // ─── Portuguese › Unit 1 › Lesson 3 ────────────────────────────────────────
  {
    id: "pt-1-3",
    unitId: "pt-unit-1",
    order: 3,
    title: "Por favor & Obrigado! Politeness",
    description: "Master Portuguese courtesy expressions",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Say please and thank you in Portuguese",
      "Use polite expressions naturally",
    ],
    vocabulary: [
      {
        word: "por favor",
        translation: "please",
        pronunciation: "por fa-VOR",
        example: "Uma água, por favor.",
        exampleTranslation: "A water, please.",
      },
      {
        word: "obrigado / obrigada",
        translation: "thank you (m/f)",
        pronunciation: "oh-bree-GAH-doo / dah",
        example: "Obrigado pela ajuda!",
        exampleTranslation: "Thank you for your help!",
      },
      {
        word: "de nada",
        translation: "you're welcome",
        pronunciation: "jee NAH-dah",
        example: "—Obrigado. —De nada!",
        exampleTranslation: "—Thank you. —You're welcome!",
      },
      {
        word: "com licença",
        translation: "excuse me",
        pronunciation: "kong lee-SEN-sah",
        example: "Com licença, posso passar?",
        exampleTranslation: "Excuse me, may I pass?",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "pt-1-3-a1",
        type: "vocabulary",
        question: "What does 'obrigado' mean?",
        correctAnswer: "thank you (m/f)",
        options: ["please", "thank you (m/f)", "you're welcome", "excuse me"],
      },
      {
        id: "pt-1-3-a2",
        type: "fill_blank",
        question: "Uma água, ___ favor.",
        correctAnswer: "por",
        options: ["por", "de", "com", "sem"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a warm Brazilian Portuguese teacher. Today's lesson has four polite expressions: por favor, obrigado/obrigada, de nada, and com licença. Teach each one with a one-sentence real-life example. When you reach obrigado, mention in one sentence that the ending changes based on who's speaking — then move on. Ask the student to repeat each expression.",
  },

  // ─── Portuguese › Unit 1 › Lesson 4 ────────────────────────────────────────
  {
    id: "pt-1-4",
    unitId: "pt-unit-1",
    order: 4,
    title: "Números: Numbers 1–10",
    description: "Count from one to ten in Portuguese",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Count from 1 to 10 in Portuguese",
      "Recognize Portuguese number words",
    ],
    vocabulary: [
      {
        word: "um / uma",
        translation: "one",
        pronunciation: "oong / OO-mah",
        example: "Um café, por favor.",
        exampleTranslation: "One coffee, please.",
      },
      {
        word: "dois / duas",
        translation: "two",
        pronunciation: "doysh / DOO-ahs",
        example: "Dois bilhetes.",
        exampleTranslation: "Two tickets.",
      },
      {
        word: "três",
        translation: "three",
        pronunciation: "trehsh",
        example: "Três amigos.",
        exampleTranslation: "Three friends.",
      },
      {
        word: "cinco",
        translation: "five",
        pronunciation: "SING-koo",
        example: "Cinco minutos.",
        exampleTranslation: "Five minutes.",
      },
      {
        word: "dez",
        translation: "ten",
        pronunciation: "dehsh",
        example: "Dez reais.",
        exampleTranslation: "Ten reais.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "pt-1-4-a1",
        type: "vocabulary",
        question: "What does 'três' mean?",
        correctAnswer: "three",
        options: ["one", "two", "three", "four"],
      },
      {
        id: "pt-1-4-a2",
        type: "translate",
        question: "Translate: ten",
        correctAnswer: "dez",
        options: ["cinco", "seis", "oito", "dez"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a cheerful Brazilian Portuguese teacher. This lesson covers numbers um through dez. Go through them one at a time and ask the student to say each one back. When you reach um and dois, mention in one quick sentence that they change to uma and duas for feminine nouns — that's it, then keep counting. Make it feel like a game!",
  },

  // ─── Portuguese › Unit 1 › Lesson 5 ────────────────────────────────────────
  {
    id: "pt-1-5",
    unitId: "pt-unit-1",
    order: 5,
    title: "Cores: Colors",
    description: "Learn the most common colors in Portuguese",
    xpReward: 10,
    estimatedMinutes: 5,
    goals: [
      "Name common colors in Portuguese",
      "Describe objects using colors",
    ],
    vocabulary: [
      {
        word: "vermelho",
        translation: "red",
        pronunciation: "vehr-MEL-yoo",
        example: "Uma rosa vermelha.",
        exampleTranslation: "A red rose.",
      },
      {
        word: "azul",
        translation: "blue",
        pronunciation: "ah-ZOOL",
        example: "O céu é azul.",
        exampleTranslation: "The sky is blue.",
      },
      {
        word: "verde",
        translation: "green",
        pronunciation: "VEH-dee",
        example: "Uma árvore verde.",
        exampleTranslation: "A green tree.",
      },
      {
        word: "branco",
        translation: "white",
        pronunciation: "BRAN-koo",
        example: "Uma camisa branca.",
        exampleTranslation: "A white shirt.",
      },
      {
        word: "preto",
        translation: "black",
        pronunciation: "PREH-too",
        example: "Um gato preto.",
        exampleTranslation: "A black cat.",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "pt-1-5-a1",
        type: "vocabulary",
        question: "What does 'vermelho' mean?",
        correctAnswer: "red",
        options: ["red", "blue", "green", "white"],
      },
      {
        id: "pt-1-5-a2",
        type: "translate",
        question: "Translate: black",
        correctAnswer: "preto",
        options: ["vermelho", "azul", "verde", "preto"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a vivid and warm Brazilian Portuguese teacher. Today's lesson has five colors: vermelho, azul, verde, branco, and preto. For each color, give a vivid one-sentence example — like 'o céu é azul' (the sky is blue!) — then ask the student to say the color. One color per turn, short and bright.",
  },

  // ─── Portuguese › Unit 1 › Lesson 6 ────────────────────────────────────────
  {
    id: "pt-1-6",
    unitId: "pt-unit-1",
    order: 6,
    title: "Família: Family",
    description: "Learn how to talk about family in Portuguese",
    xpReward: 10,
    estimatedMinutes: 6,
    goals: ["Name family members in Portuguese", "Talk about your family"],
    vocabulary: [
      {
        word: "mãe",
        translation: "mother",
        pronunciation: "mang",
        example: "Minha mãe é professora.",
        exampleTranslation: "My mother is a teacher.",
      },
      {
        word: "pai",
        translation: "father",
        pronunciation: "py",
        example: "Meu pai trabalha muito.",
        exampleTranslation: "My father works a lot.",
      },
      {
        word: "irmão / irmã",
        translation: "brother / sister",
        pronunciation: "eer-MONG / eer-MAH",
        example: "Tenho um irmão.",
        exampleTranslation: "I have one brother.",
      },
      {
        word: "avó / avô",
        translation: "grandmother / grandfather",
        pronunciation: "ah-VOH / ah-VOH",
        example: "Minha avó faz bolo delicioso.",
        exampleTranslation: "My grandmother makes delicious cake.",
      },
    ],
    phrases: [
      {
        phrase: "Tenho uma família grande.",
        translation: "I have a big family.",
        pronunciation: "TEN-yoo OO-mah fah-MEE-lyah GRAN-jee",
        context: "Talking about family size",
      },
    ],
    activities: [
      {
        id: "pt-1-6-a1",
        type: "vocabulary",
        question: "What does 'mãe' mean?",
        correctAnswer: "mother",
        options: ["father", "mother", "brother", "grandmother"],
      },
      {
        id: "pt-1-6-a2",
        type: "translate",
        question: "Translate: father",
        correctAnswer: "pai",
        options: ["mãe", "pai", "irmão", "avô"],
      },
    ],
    aiTeacherPrompt:
      "You're Sofia, a warm Brazilian Portuguese teacher. Today's lesson covers four family words: mãe, pai, irmão/irmã, and avó/avô. Introduce each word with a short personal example sentence, ask the student to say it back, and gently correct if needed. You can mention in one warm sentence that family is central to Brazilian life — then keep practising.",
  },
];
