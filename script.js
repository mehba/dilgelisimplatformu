// script.js
const { useState, useEffect } = React;

// Dil Veritabanı
const languages = [
    { id: 'en', name: 'İngilizce', flag: '🇬🇧', voice: 'en-US' },
    { id: 'de', name: 'Almanca', flag: '🇩🇪', voice: 'de-DE' },
    { id: 'fr', name: 'Fransızca', flag: '🇫🇷', voice: 'fr-FR' },
    { id: 'es', name: 'İspanyolca', flag: '🇪🇸', voice: 'es-ES' },
    { id: 'it', name: 'İtalyanca', flag: '🇮🇹', voice: 'it-IT' },
    { id: 'jp', name: 'Japonca', flag: '🇯🇵', voice: 'ja-JP' },
    { id: 'ru', name: 'Rusça', flag: '🇷🇺', voice: 'ru-RU' },
    { id: 'cn', name: 'Çince', flag: '🇨🇳', voice: 'zh-CN' },
    { id: 'ar', name: 'Arapça', flag: '🇸🇦', voice: 'ar-SA' },
];

// Genişletilmiş Kelime Dağarcığı
const dictionary = {
    // MEYVELER & SEBZELER
    'elma': {
        en: { word: 'Apple', sentence: 'I eat a red apple every morning.' },
        de: { word: 'Apfel', sentence: 'Der Apfel fällt nicht weit vom Stamm.' },
        fr: { word: 'Pomme', sentence: 'Je mange une pomme rouge.' },
        es: { word: 'Manzana', sentence: 'Me gusta comer una manzana fresca.' },
        it: { word: 'Mela', sentence: 'Una mela al giorno toglie il medico di torno.' },
        jp: { word: 'りんご (Ringo)', sentence: '私はりんごが好きです。' },
        ru: { word: 'Яблоко (Yabloko)', sentence: 'Я люблю есть яблоки.' },
        cn: { word: '苹果 (Píngguǒ)', sentence: '我每天吃一个苹果。' },
        ar: { word: 'تفاحة (Tuffaha)', sentence: 'أكل تفاحة كل يوم.' }
    },
    'armut': {
        en: { word: 'Pear', sentence: 'Pears are sweet and juicy.' },
        de: { word: 'Birne', sentence: 'Die Birne ist süß und saftig.' },
        fr: { word: 'Poire', sentence: 'Cette poire est très juteuse.' },
        es: { word: 'Pera', sentence: 'La pera es una fruta deliciosa.' },
        it: { word: 'Pera', sentence: 'Mangio una pera a merenda.' },
        jp: { word: '梨 (Nashi)', sentence: '梨は甘くて美味しいです。' },
        ru: { word: 'Груша (Grusha)', sentence: 'Груша очень сладкая.' },
        cn: { word: '梨 (Lí)', sentence: '梨又甜又多汁。' },
        ar: { word: 'كمثرى (Kumithra)', sentence: 'الكمثرى حلوة وعصيرية.' }
    },
    'muz': {
        en: { word: 'Banana', sentence: 'Monkeys love to eat bananas.' },
        de: { word: 'Banane', sentence: 'Affen essen gerne Bananen.' },
        fr: { word: 'Banane', sentence: 'Les singes adorent les bananes.' },
        es: { word: 'Plátano', sentence: 'El plátano es rico en potasio.' },
        it: { word: 'Banana', sentence: 'Le scimmie amano le banane.' },
        jp: { word: 'バナナ (Banana)', sentence: '猿はバナナが大好きです。' },
        ru: { word: 'Банан (Banan)', sentence: 'Обезьяны любят есть бананы.' },
        cn: { word: '香蕉 (Xiāngjiāo)', sentence: '猴子爱吃香蕉。' },
        ar: { word: 'موز (Mawz)', sentence: 'القرود تحب أكل الموز.' }
    },
    'çilek': {
        en: { word: 'Strawberry', sentence: 'Strawberry cake is my favorite.' },
        de: { word: 'Erdbeere', sentence: 'Erdbeerkuchen ist mein Favorit.' },
        fr: { word: 'Fraise', sentence: 'J\'aime la confiture de fraises.' },
        es: { word: 'Fresa', sentence: 'Las fresas son rojas y dulces.' },
        it: { word: 'Fragola', sentence: 'La torta alle fragole è buonissima.' },
        jp: { word: 'いちご (Ichigo)', sentence: 'いちごのケーキが好きです。' },
        ru: { word: 'Клубника (Klubnika)', sentence: 'Клубника очень вкусная.' },
        cn: { word: '草莓 (Cǎoméi)', sentence: '草莓蛋糕是我的最爱。' },
        ar: { word: 'فراولة (Frawla)', sentence: 'كعكة الفراولة هي المفضلة لدي.' }
    },
    // YİYECEK & İÇECEK
    'makarna': {
        en: { word: 'Pasta', sentence: 'We are cooking pasta for dinner.' },
        de: { word: 'Nudeln', sentence: 'Wir kochen Nudeln zum Abendessen.' },
        fr: { word: 'Pâtes', sentence: 'J\'aime les pâtes à la sauce tomate.' },
        es: { word: 'Pasta', sentence: 'La pasta italiana es la mejor.' },
        it: { word: 'Pasta', sentence: 'La pasta al pomodoro è un classico.' },
        jp: { word: 'パスタ (Pasuta)', sentence: '夕食にパスタを作っています。' },
        ru: { word: 'Макароны (Makarony)', sentence: 'Мы готовим макароны на ужин.' },
        cn: { word: '意大利面 (Yìdàlì miàn)', sentence: '我们正在做意大利面当晚餐。' },
        ar: { word: 'معكرونة (Maqaruna)', sentence: 'نحن نطبخ المعكرونة للعشاء.' }
    },
    'ekmek': {
        en: { word: 'Bread', sentence: 'Fresh bread smells amazing.' },
        de: { word: 'Brot', sentence: 'Frisches Brot riecht wunderbar.' },
        fr: { word: 'Pain', sentence: 'J\'achète du pain à la boulangerie.' },
        es: { word: 'Pan', sentence: 'El pan está recién horneado.' },
        it: { word: 'Pane', sentence: 'Il pane fresco ha un buon profumo.' },
        jp: { word: 'パン (Pan)', sentence: '焼きたてのパンはいい匂いがします。' },
        ru: { word: 'Хлеб (Khleb)', sentence: 'Свежий хлеб пахнет чудесно.' },
        cn: { word: '面包 (Miànbāo)', sentence: '新鲜的面包闻起来很香。' },
        ar: { word: 'خبز (Khubz)', sentence: 'الخبز الطازج رائحته مذهلة.' }
    },
    'su': {
        en: { word: 'Water', sentence: 'Please give me a glass of water.' },
        de: { word: 'Wasser', sentence: 'Bitte gib mir ein Glas Wasser.' },
        fr: { word: 'Eau', sentence: 'Je bois de l\'eau tous les jours.' },
        es: { word: 'Agua', sentence: 'Necesito beber agua.' },
        it: { word: 'Acqua', sentence: 'L\'acqua è essenziale per la vita.' },
        jp: { word: '水 (Mizu)', sentence: '水を一杯ください。' },
        ru: { word: 'Вода (Voda)', sentence: 'Пожалуйста, дайте мне стакан воды.' },
        cn: { word: '水 (Shuǐ)', sentence: '请给我一杯水。' },
        ar: { word: 'ماء (Ma\'a)', sentence: 'أعطني كوب ماء من فضلك.' }
    },
    'pizza': {
        en: { word: 'Pizza', sentence: 'Lets order a large pizza.' },
        de: { word: 'Pizza', sentence: 'Lass uns eine große Pizza bestellen.' },
        fr: { word: 'Pizza', sentence: 'J\'aime la pizza au fromage.' },
        es: { word: 'Pizza', sentence: 'Vamos a comer pizza esta noche.' },
        it: { word: 'Pizza', sentence: 'La pizza napoletana è famosa.' },
        jp: { word: 'ピザ (Piza)', sentence: '大きなピザを注文しましょう。' },
        ru: { word: 'Пицца (Pizza)', sentence: 'Давай закажем большую пиццу.' },
        cn: { word: '披萨 (Pīsà)', sentence: '我们点一个大披萨吧。' },
        ar: { word: 'بيتزا (Bitza)', sentence: 'لنطلب بيتزا كبيرة.' }
    },
    // MEKANLAR
    'hastane': {
        en: { word: 'Hospital', sentence: 'The doctor works at the hospital.' },
        de: { word: 'Krankenhaus', sentence: 'Der Arzt arbeitet im Krankenhaus.' },
        fr: { word: 'Hôpital', sentence: 'Le médecin travaille à l\'hôpital.' },
        es: { word: 'Hospital', sentence: 'El hospital está cerca de aquí.' },
        it: { word: 'Ospedale', sentence: 'Il dottore lavora in ospedale.' },
        jp: { word: '病院 (Byōin)', sentence: '医者は病院で働いています。' },
        ru: { word: 'Больница (Bolnitsa)', sentence: 'Врач работает в больнице.' },
        cn: { word: '医院 (Yīyuàn)', sentence: '医生在医院工作。' },
        ar: { word: 'مستشفى (Mustashfa)', sentence: 'الطبيب يعمل في المستشفى.' }
    },
    'okul': {
        en: { word: 'School', sentence: 'I go to school by bus every day.' },
        de: { word: 'Schule', sentence: 'Ich gehe jeden Tag mit dem Bus zur Schule.' },
        fr: { word: 'École', sentence: 'Je vais à l\'école en bus.' },
        es: { word: 'Escuela', sentence: 'Voy a la escuela en autobús.' },
        it: { word: 'Scuola', sentence: 'Vado a scuola in autobus.' },
        jp: { word: '学校 (Gakkō)', sentence: '私はバスで学校に行きます。' },
        ru: { word: 'Школа (Shkola)', sentence: 'Я еду в школу на автобусе.' },
        cn: { word: '学校 (Xuéxiào)', sentence: '我坐公共汽车去学校。' },
        ar: { word: 'مدرسة (Madrasa)', sentence: 'أذهب إلى المدرسة بالحافلة.' }
    },
    'ev': {
        en: { word: 'House', sentence: 'Our house has a big garden.' },
        de: { word: 'Haus', sentence: 'Unser Haus hat einen großen Garten.' },
        fr: { word: 'Maison', sentence: 'Notre maison a un grand jardin.' },
        es: { word: 'Casa', sentence: 'Mi casa es tu casa.' },
        it: { word: 'Casa', sentence: 'La nostra casa ha un grande giardino.' },
        jp: { word: '家 (Ie)', sentence: '私たちの家には大きな庭があります。' },
        ru: { word: 'Дом (Dom)', sentence: 'У нашего дома большой сад.' },
        cn: { word: '房子 (Fángzi)', sentence: '我们的房子有一个大花园。' },
        ar: { word: 'منزل (Manzil)', sentence: 'منزلنا لديه حديقة كبيرة.' }
    },
    'park': {
        en: { word: 'Park', sentence: 'Children are playing in the park.' },
        de: { word: 'Park', sentence: 'Kinder spielen im Park.' },
        fr: { word: 'Parc', sentence: 'Les enfants jouent dans le parc.' },
        es: { word: 'Parque', sentence: 'Los niños juegan en el parque.' },
        it: { word: 'Parco', sentence: 'I bambini giocano nel parco.' },
        jp: { word: '公園 (Kōen)', sentence: '子供たちは公園で遊んでいます。' },
        ru: { word: 'Парк (Park)', sentence: 'Дети играют в парке.' },
        cn: { word: '公园 (Gōngyuán)', sentence: '孩子们在公园里玩耍。' },
        ar: { word: 'حديقة (Hadiqa)', sentence: 'الأطفال يلعبون في الحديقة.' }
    },
    // HAYVANLAR
    'kedi': {
        en: { word: 'Cat', sentence: 'The cat is sleeping on the sofa.' },
        de: { word: 'Katze', sentence: 'Die Katze schläft auf dem Sofa.' },
        fr: { word: 'Chat', sentence: 'Le chat dort sur le canapé.' },
        es: { word: 'Gato', sentence: 'El gato está durmiendo.' },
        it: { word: 'Gatto', sentence: 'Il gatto dorme sul divano.' },
        jp: { word: '猫 (Neko)', sentence: '猫はソファで寝ています。' },
        ru: { word: 'Кошка (Koshka)', sentence: 'Кошка спит на диване.' },
        cn: { word: '猫 (Māo)', sentence: '猫在沙发上睡觉。' },
        ar: { word: 'قط (Qitt)', sentence: 'القط نائم على الأريكة.' }
    },
    'köpek': {
        en: { word: 'Dog', sentence: 'My dog loves to run fast.' },
        de: { word: 'Hund', sentence: 'Mein Hund rennt gerne schnell.' },
        fr: { word: 'Chien', sentence: 'Mon chien aime courir vite.' },
        es: { word: 'Perro', sentence: 'Mi perro es mi mejor amigo.' },
        it: { word: 'Cane', sentence: 'Il mio cane ama correre.' },
        jp: { word: '犬 (Inu)', sentence: '私の犬は速く走るのが大好きです。' },
        ru: { word: 'Собака (Sobaka)', sentence: 'Моя собака любит быстро бегать.' },
        cn: { word: '狗 (Gǒu)', sentence: '我的狗喜欢跑得快。' },
        ar: { word: 'كلب (Kalb)', sentence: 'كلبي يحب الجري بسرعة.' }
    },
    'balık': {
        en: { word: 'Fish', sentence: 'Fish live in water.' },
        de: { word: 'Fisch', sentence: 'Fische leben im Wasser.' },
        fr: { word: 'Poisson', sentence: 'Les poissons vivent dans l\'eau.' },
        es: { word: 'Pez', sentence: 'El pez nada en el mar.' },
        it: { word: 'Pesce', sentence: 'I pesci vivono nell\'acqua.' },
        jp: { word: '魚 (Sakana)', sentence: '魚は水の中に住んでいます。' },
        ru: { word: 'Рыба (Ryba)', sentence: 'Рыба живет в воде.' },
        cn: { word: '鱼 (Yú)', sentence: '鱼生活在水中。' },
        ar: { word: 'سمكة (Samaka)', sentence: 'الأسماك تعيش في الماء.' }
    },
    // EŞYALAR
    'araba': {
        en: { word: 'Car', sentence: 'My father drives a blue car.' },
        de: { word: 'Auto', sentence: 'Mein Vater fährt ein blaues Auto.' },
        fr: { word: 'Voiture', sentence: 'Mon père conduit une voiture bleue.' },
        es: { word: 'Coche', sentence: 'Mi padre conduce un coche azul.' },
        it: { word: 'Macchina', sentence: 'Mio padre guida una macchina blu.' },
        jp: { word: '車 (Kuruma)', sentence: '父は青い車を運転します。' },
        ru: { word: 'Машина (Mashina)', sentence: 'Мой папа водит синюю машину.' },
        cn: { word: '汽车 (Qìchē)', sentence: '我爸爸开一辆蓝色的车。' },
        ar: { word: 'سيارة (Sayara)', sentence: 'أبي يقود سيارة زرقاء.' }
    },
    'kitap': {
        en: { word: 'Book', sentence: 'This book is very interesting.' },
        de: { word: 'Buch', sentence: 'Dieses Buch ist sehr interessant.' },
        fr: { word: 'Livre', sentence: 'Ce livre est très intéressant.' },
        es: { word: 'Libro', sentence: 'Este libro es muy interesante.' },
        it: { word: 'Libro', sentence: 'Questo libro è molto interessante.' },
        jp: { word: '本 (Hon)', sentence: 'この本はとても面白いです。' },
        ru: { word: 'Книга (Kniga)', sentence: 'Эта книга очень интересная.' },
        cn: { word: '书 (Shū)', sentence: '这本书很有趣。' },
        ar: { word: 'كتاب (Kitāb)', sentence: 'هذا الكتاب ممتع جداً.' }
    },
    'bilgisayar': {
        en: { word: 'Computer', sentence: 'I use my computer for homework.' },
        de: { word: 'Computer', sentence: 'Ich benutze meinen Computer für Hausaufgaben.' },
        fr: { word: 'Ordinateur', sentence: 'J\'utilise mon ordinateur pour les devoirs.' },
        es: { word: 'Computadora', sentence: 'Uso mi computadora para la tarea.' },
        it: { word: 'Computer', sentence: 'Uso il mio computer per i compiti.' },
        jp: { word: 'コンピュータ (Konpyūta)', sentence: '宿題にコンピュータを使います。' },
        ru: { word: 'Компьютер (Komp\'yuter)', sentence: 'Я использую компьютер для домашней работы.' },
        cn: { word: '电脑 (Diànnǎo)', sentence: '我用电脑做作业。' },
        ar: { word: 'حاسوب (Hasub)', sentence: 'أستخدم حاسوبي للواجبات المنزلية.' }
    },
    'kalem': {
        en: { word: 'Pen', sentence: 'Can I borrow your pen?' },
        de: { word: 'Stift', sentence: 'Kann ich deinen Stift leihen?' },
        fr: { word: 'Stylo', sentence: 'Puis-je emprunter ton stylo?' },
        es: { word: 'Bolígrafo', sentence: '¿Puedo tomar prestado tu bolígrafo?' },
        it: { word: 'Penna', sentence: 'Posso prendere in prestito la tua penna?' },
        jp: { word: 'ペン (Pen)', sentence: 'ペンを借りてもいいですか？' },
        ru: { word: 'Ручка (Ruchka)', sentence: 'Могу я одолжить твою ручку?' },
        cn: { word: '笔 (Bǐ)', sentence: '我可以借你的笔吗？' },
        ar: { word: 'قلم (Qalam)', sentence: 'هل يمكنني استعارة قلمك؟' }
    }
};

function App() {
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setResult(null);

        setTimeout(() => {
            const lowerTerm = searchTerm.toLowerCase().trim();
            let translationData = dictionary[lowerTerm] ? dictionary[lowerTerm][selectedLang.id] : null;

            if (!translationData) {
                translationData = {
                    word: `[${selectedLang.name} Çevirisi]`,
                    sentence: `${searchTerm} kelimesi ${selectedLang.name} dilinde cümle içinde kullanıldı.`
                };
            }

            const promptKeyword = dictionary[lowerTerm] && dictionary[lowerTerm]['en'] 
                ? dictionary[lowerTerm]['en'].word 
                : lowerTerm;

            const imagePrompt = `single isolated ${promptKeyword}, realistic, high quality, white background, educational illustration, 4k`; 
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=600&nologo=true&seed=${Math.random()}`;

            setResult({
                original: searchTerm,
                translated: translationData.word,
                sentence: translationData.sentence,
                image: imageUrl
            });
            setLoading(false);
        }, 1000);
    };

    const speak = (text, isTranslated = true) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = isTranslated ? selectedLang.voice : 'tr-TR';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tarayıcınız sesli okumayı desteklemiyor.");
        }
    };

    const bgStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23E0F2FE' d='M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.1,22.9,70.9,34.5C59.7,46.1,48.7,55.7,36.4,62.8C24.1,69.9,10.5,74.5,-2.2,78.3C-14.9,82.1,-26.7,85.1,-37.2,80.5C-47.7,75.9,-56.9,63.7,-64.7,51.1C-72.5,38.5,-78.9,25.5,-80.6,11.8C-82.3,-1.9,-79.3,-16.3,-71.3,-28.4C-63.3,-40.5,-50.3,-50.3,-37.2,-58.1C-24.1,-65.9,-10.9,-71.7,3.1,-77.1C17.1,-82.5,30.5,-83.6,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-4 font-sans text-slate-800" style={bgStyle}>
            
            {/* Header */}
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2 drop-shadow-sm flex items-center justify-center gap-3">
                    <i className="fas fa-language text-orange-400"></i>
                    Dil Gelişim Platformu
                </h1>
                <p className="text-slate-600 text-lg font-medium">9 Dilde Kelime ve Cümle Öğrenme Asistanı</p>
            </header>

            {/* Main Container */}
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                
                {/* Dil Seçimi */}
                <div className="bg-blue-50/80 p-6 border-b border-blue-100">
                    <h3 className="text-center text-blue-800 font-bold mb-4 flex items-center justify-center gap-2">
                        <i className="fas fa-globe"></i>
                        Öğrenmek İstediğin Dili Seç
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setSelectedLang(lang)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${
                                    selectedLang.id === lang.id
                                        ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 scale-105'
                                        : 'bg-white text-slate-700 hover:bg-blue-100 border border-slate-200'
                                }`}
                            >
                                <span className="text-xl leading-none">{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Arama Alanı */}
                <div className="p-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <div className="relative w-full md:w-2/3 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fas fa-search text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Kelime yaz (Örn: hastane, makarna, armut, köpek)..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-lg transition-all shadow-sm"
                            />
                        </div>
                        <button
                            type="button" 
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            ) : (
                                <><i className="fas fa-magic"></i> Oluştur</>
                            )}
                        </button>
                    </form>
                </div>

                {/* Sonuç Kartı */}
                {result && (
                    <div className="px-8 pb-10">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-inner flex flex-col md:flex-row gap-8 items-center animate-fade-in">
                            
                            {/* Görsel Alanı */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="bg-slate-200 w-full h-64 rounded-xl flex items-center justify-center overflow-hidden shadow-md border-4 border-white relative">
                                    <img 
                                        src={result.image} 
                                        alt={result.translated} 
                                        className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '[https://via.placeholder.com/800x600?text=Görsel+Bulunamadı](https://via.placeholder.com/800x600?text=Görsel+Bulunamadı)';
                                        }}
                                    />
                                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] text-slate-500 font-bold uppercase tracking-wider shadow-sm z-20 flex items-center gap-1">
                                        <i className="fas fa-image"></i> AI Generated
                                    </div>
                                </div>
                            </div>

                            {/* Bilgi Alanı */}
                            <div className="w-full md:w-1/2 flex flex-col gap-4">
                                
                                {/* Kelime */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i className="fas fa-language text-6xl text-blue-600"></i>
                                    </div>
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Kelime</span>
                                    </div>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <h2 className="text-4xl font-extrabold text-blue-600 mb-1">{result.translated}</h2>
                                            <p className="text-slate-500 text-lg font-medium capitalize">{result.original}</p>
                                        </div>
                                        <button 
                                            onClick={() => speak(result.translated)}
                                            className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
                                            title="Telaffuz Et"
                                        >
                                            <i className="fas fa-volume-up text-xl"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Cümle */}
                                <div className="bg-orange-50 p-5 rounded-2xl shadow-sm border border-orange-100 group hover:border-orange-200 transition-colors">
                                    <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <i className="fas fa-book-open"></i>
                                        <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Örnek Cümle</span>
                                    </div>
                                    <p className="text-slate-800 text-lg font-medium leading-relaxed mb-4 italic">
                                        "{result.sentence}"
                                    </p>
                                    <button 
                                        onClick={() => speak(result.sentence)}
                                        className="text-orange-600 font-bold text-sm flex items-center gap-2 hover:text-orange-700 transition-colors px-3 py-2 bg-orange-100/50 rounded-lg hover:bg-orange-100 w-fit"
                                    >
                                        <i className="fas fa-play-circle"></i> Cümleyi Dinle
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* Başlangıç Durumu */}
                {!result && !loading && (
                    <div className="text-center pb-12 pt-4 px-10 opacity-50 flex flex-col items-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-language text-5xl text-slate-300"></i>
                        </div>
                        <p className="text-slate-500 font-medium text-lg">Bir kelime yaz ve sihrin gerçekleşmesini izle!</p>
                        <p className="text-xs text-slate-400 mt-2 bg-slate-100 px-3 py-1 rounded-full">Görseller yapay zeka ile anlık oluşturulur</p>
                    </div>
                )}
            </div>
            
            <footer className="mt-8 text-center text-slate-500 text-sm font-medium">
                &copy; 2025 Dil Gelişim Platformu
            </footer>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
