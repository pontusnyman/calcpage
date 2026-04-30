import React from 'react';
import { Calendar, Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'fasta-24-till-96-timmar',
    title: 'Fasta från 24 till 96 timmar: vad händer i kroppen och vilka kan fördelarna vara?',
    description: 'En översikt av kort till medellång fasta — från ett dygn upp till fyra dygn — och vanliga hälsovinster diskuterade i forskning. Planera din fasta med vår Fastekalkylator.',
    date: '2026-04-30',
    readTime: '8 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    link: '/blog/fasta-24-till-96-timmar'
  },
  {
    id: 'kaloribehov-bmr-och-tdee',
    title: 'Kaloribehov: vad är BMR och TDEE — och hur räknar du ut dem?',
    description: 'Så funkar basalmetabolism och total energiförbrukning enligt Mifflin–St Jeor, vilka aktivitetsnivåer som används — och hur du kan räkna ut ditt eget dagliga behov med kalorikalkylatorn.',
    date: '2026-04-29',
    readTime: '7 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    link: '/blog/kaloribehov-bmr-och-tdee'
  },
  {
    id: 'bmi-vad-det-ar-och-kalkylatorn',
    title: 'BMI: vad det är, hur det räknas — och hur vår kalkylator tolkar resultatet',
    description: 'Så här fungerar Body Mass Index, vilka gränser som används för undervikt till fetma — och hur du kan prova själv med BMI-kalkylatorn på Kalkulatorn.se.',
    date: '2026-04-20',
    readTime: '6 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    link: '/blog/bmi-vad-det-ar-och-kalkylatorn'
  },
  {
    id: 'svenska-mattomvandlaren',
    title: 'Måttomvandlare: så räknar du om svenska vikt- och volymmått i köket',
    description: 'Från kilogram till gram, liter till matsked och kryddmått — så hänger de svenska köksmåtten ihop och hur du kan konvertera snabbt med måttomvandlaren.',
    date: '2026-04-15',
    readTime: '5 min',
    category: 'Matlagning',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    link: '/blog/svenska-mattomvandlaren'
  },
  {
    id: 'amerikansk-mattomvandlaren',
    title: 'Amerikansk måttomvandlare: cups, pints och fluid ounces till deciliter',
    description: 'Amerikanska recept använder andra enheter. Här är skillnaden mellan cup, pint och fluid ounce — och hur du får rätt volym i deciliter med kopparkalkylatorn.',
    date: '2026-04-12',
    readTime: '6 min',
    category: 'Matlagning',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    link: '/blog/amerikansk-mattomvandlaren'
  },
  {
    id: 'savings-strategies',
    title: 'Smarta sparstrategier för olika livssituationer',
    description: 'Upptäck olika sparstrategier och hur du kan använda våra sparkalkylatorer för att nå dina ekonomiska mål.',
    date: '2025-12-03',
    readTime: '9 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=800',
    link: '/blog/savings-strategies'
  },
  {
    id: 'lanekostnad-guide',
    title: 'Vad kostar ditt privatlån – och hur räknar du ut det?',
    description: 'Lär dig hur lånekostnader fungerar, vilka avgifter som ingår och hur du själv kan räkna ut din totala lånekostnad. Utforska olika scenarier och testa själv med vår Lånekostnadskalkylator för att ta kontroll över din ekonomi.',
    date: '2025-12-02',
    readTime: '7 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/blog/lanekostnad-guide'
  },
  {
    id: 'ranta-pa-ranta',
    title: 'Ränta på ränta – den enkla principen som bygger stora förmögenheter över tid',
    description: 'Ränta på ränta brukar kallas världens åttonde underverk – och det är lätt att förstå varför. Upptäck hur denna kraftfulla princip kan hjälpa dig bygga förmögenhet över tid.',
    date: '2025-12-01',
    readTime: '6 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    link: '/blog/ranta-pa-ranta'
  },
  // {
  //   id: 'healthy-sleep-habits',
  //   title: 'Så optimerar du din sömn för bättre hälsa',
  //   description: 'Upptäck vetenskapen bakom god sömn och hur du kan använda sömnkalkylatorn för att förbättra din sömnkvalitet.',
  //   date: '2024-03-12',
  //   readTime: '6 min',
  //   category: 'Hälsa',
  //   image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=800',
  //   link: '/blog/healthy-sleep-habits'
  // },
  // {
  //   id: 'weight-loss-science',
  //   title: 'Viktminskning: Vetenskap och beräkningar',
  //   description: 'En djupdykning i vetenskapen bakom viktminskning och hur du kan använda våra kalkylatorer för att nå dina mål.',
  //   date: '2024-03-10',
  //   readTime: '10 min',
  //   category: 'Hälsa',
  //   image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
  //   link: '/blog/weight-loss-science'
  // },
  // {
  //   id: 'mortgage-guide',
  //   title: 'Guide: Vägen till ditt första bolån',
  //   description: 'Allt du behöver veta om bolån, från räntor till amortering. Använd vår bolånekalkylator för att planera ditt bostadsköp.',
  //   date: '2024-03-08',
  //   readTime: '12 min',
  //   category: 'Ekonomi',
  //   image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
  //   link: '/blog/mortgage-guide'
  // },
  // {
  //   id: 'running-basics',
  //   title: 'Löpning för nybörjare: Tempo och distans',
  //   description: 'Kom igång med löpning på rätt sätt. Lär dig om tempo, distans och hur du använder våra löparkalkylatorer.',
  //   date: '2024-03-05',
  //   readTime: '7 min',
  //   category: 'Träning',
  //   image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
  //   link: '/blog/running-basics'
  // },
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav currentPage="blog" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          {/* <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka till kalkylatorer
          </Link> */}
          <h1 className="text-3xl font-bold text-gray-900">Blogg</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('sv-SE')}
                  </time>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {post.category}
                  </span>
                  <Link
                    to={post.link}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                  >
                    <span className="mr-2">Läs mer</span>
                    <Book className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;