const TG_CONFIG = {
    // Настройки Telegram
    botToken: '', // Ваш токен бота от @BotFather
    chatId: '',    // Ваш ID чата от @userinfobot

    // Настройка Карты (2GIS)
    mapsApiKey: 'rudcgu3317', // Ваш API ключ от dev.2gis.ru

    // Настройки цен калькулятора
    basePrice: 5000,        // Базовая цена за м2

    // Типы судов и их множители
    vesselTypes: [
        { name: 'Малый катер (до 5м)', multiplier: 1 },
        { name: 'Катер (5-8м)', multiplier: 1.5 },
        { name: 'Яхта (8-15м)', multiplier: 2.5 },
        { name: 'Крупное судно (15м+)', multiplier: 4 }
    ],

    // Характер повреждения (Базовая цена за тип)
    damageTypes: [
        { name: 'Царапины и потертости', price: 5000 },
        { name: 'Мелкие сколы и трещины', price: 15000 },
        { name: 'Глубокие пробоины', price: 45000 },
        { name: 'Осмос (вздутие)', price: 30000 },
        { name: 'Только полировка', price: 10000 }
    ],

    // Материал корпуса и множители
    materialTypes: [
        { name: 'Классический стеклопластик', multiplier: 1 },
        { name: 'Углепластик (Карбон)', multiplier: 1.4 },
        { name: 'Кевлар / Гибрид', multiplier: 1.2 }
    ],

    // Зона ремонта и множители
    repairZones: [
        { name: 'Надводная часть', multiplier: 1 },
        { name: 'Ниже ватерлинии', multiplier: 1.25 },
        { name: 'Палуба / Интерьер', multiplier: 1.1 }
    ]
};
