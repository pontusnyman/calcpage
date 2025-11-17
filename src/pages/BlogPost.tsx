import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Book } from 'lucide-react';
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
  content: string;
  author: string;
}

// Blog post data with full content
const blogPosts: BlogPost[] = [
  {
    id: 'ranta-pa-ranta',
    title: 'Ränta på ränta – den enkla principen som bygger stora förmögenheter över tid',
    description: 'Ränta på ränta brukar kallas världens åttonde underverk – och det är lätt att förstå varför. Upptäck hur denna kraftfulla princip kan hjälpa dig bygga förmögenhet över tid.',
    date: '2024-12-15',
    readTime: '6 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    link: '/blog/ranta-pa-ranta',
    author: 'Pontus',
    content: `
      <p><b>Ränta på ränta brukar kallas världens åttonde underverk</b> – och det är lätt att förstå varför. Det är nämligen en av de starkaste ekonomiska krafterna som finns, och en av de enklaste att dra nytta av. Genom att låta dina pengar växa vidare på tidigare avkastning kan du skapa en snöbollseffekt som, över tid, blir allt större.</p>

      <p>Men hur fungerar ränta på ränta egentligen, och varför är det så kraftfullt? Låt oss gå igenom grunderna – och hur du själv kan testa effekten med hjälp av vår egen ränta-på-ränta-kalkylator.</p>

      <h2>Vad är ränta på ränta?</h2>
      
      <p>Ränta på ränta innebär att du får avkastning inte bara på ditt ursprungliga kapital, utan också på den avkastning du redan har fått. Det betyder att ditt kapital växer i en allt snabbare takt ju längre tiden går.</p>

      <h3>Ett förenklat exempel:</h3>
      
      <ul>
        <li>Du investerar 10 000 kr</li>
        <li>Avkastningen är 7 % per år</li>
        <li>Efter första året har du 10 700 kr</li>
        <li>Året efter får du 7 % på 10 700 kr – inte bara på dina ursprungliga 10 000 kr.</li>
      </ul>

      <p>Det är denna snöbollseffekt som gör långsiktigt sparande så kraftfullt.</p>

      <h2>Tiden är din bästa vän</h2>
      
      <p>Den viktigaste faktorn för att dra nytta av ränta på ränta är tid. Ju längre du sparar, desto fler gånger hinner avkastningen "ränta på sig".</p>

      <p>Skillnaden mellan 10 och 30 års sparande kan vara enorm – även om du sparar samma belopp varje månad. Det är därför många ekonomer säger att det bästa du kan göra för din ekonomi är att börja spara idag, även om det är små summor.</p>

      <h2>Månadssparande förstärker effekten</h2>
      
      <p>Genom att kombinera långsiktighet med regelbundet månadssparande skapar du en ännu starkare utveckling. Varje insatt krona får nämligen sin egen växtresa genom tiden.</p>

      <p>Det innebär att:</p>
      
      <ul>
        <li>Ett konsekvent sparande slår ett perfekt tajmat sparande.</li>
        <li>Små belopp varje månad kan bli stora summor över tid.</li>
        <li>Ju tidigare du börjar, desto mer arbetar ränta på ränta för dig.</li>
      </ul>

      <h2>Testa själv: vår ränta-på-ränta-kalkylator</h2>
      
      <p>En liten kaviat: För att göra det enklare för dig att se hur dina pengar kan utvecklas över tid har vi skapat en ränta-på-ränta-kalkylator. Där kan du fylla i:</p>
      
      <ul>
        <li>Startkapital</li>
        <li>Månadssparande</li>
        <li>Sparhorisont</li>
        <li>Årlig avkastning (%)</li>
      </ul>

      <p>Kalkylatorn visar sedan hur sparandet växer år för år och hur stor del som faktiskt består av ren avkastning — den magiska snöbollseffekten.</p>

      <p>Det här är ett perfekt verktyg för att utforska olika scenarier och se vad även små justeringar i tid eller sparande kan innebära för slutresultatet.</p>
    `
  },
  {
    id: 'personal-finance-101',
    title: 'Grunderna i privatekonomi: En nybörjarguide',
    description: 'Lär dig grunderna i privatekonomi, från budgetering till investeringar. Vi går igenom de viktigaste verktygen för att ta kontroll över din ekonomi.',
    date: '2024-03-15',
    readTime: '8 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    link: '/blog/personal-finance-101',
    author: 'Pontus',
    content: `
      <h2>Välkommen till din resa mot ekonomisk frihet</h2>
      
      <p>Privatekonomi kan verka överväldigande, men med rätt kunskap och verktyg kan du ta kontroll över din ekonomi och bygga en trygg framtid. I denna guide går vi igenom grunderna som alla bör känna till.</p>

      <h3>1. Budgetering - Grunden till allt</h3>
      
      <p>En budget är din ekonomiska kompass. Den hjälper dig att förstå var dina pengar går och säkerställer att du spenderar mindre än du tjänar. Här är hur du kommer igång:</p>
      
      <ul>
        <li><strong>Räkna in alla inkomster:</strong> Lön, bidrag, investeringsavkastning</li>
        <li><strong>Lista alla utgifter:</strong> Hyra, mat, transport, nöjen</li>
        <li><strong>Kategorisera utgifterna:</strong> Fast (hyra, el) vs rörliga (mat, nöjen)</li>
        <li><strong>Sätt mål:</strong> Hur mycket vill du spara varje månad?</li>
      </ul>

      <h3>2. Nödkassa - Din ekonomiska säkerhet</h3>
      
      <p>Innan du börjar investera är det viktigt att bygga upp en nödkassa. Denna ska täcka 3-6 månaders utgifter och placeras på ett sparkonto med snabb tillgång.</p>

      <h3>3. Skulder - Prioritera rätt</h3>
      
      <p>Om du har skulder, prioritera dem efter ränta. Betala av högränteskulder först, som kreditkortsskuld. Lågränteskulder som bolån kan vänta.</p>

      <h3>4. Investeringar - Bygg din framtid</h3>
      
      <p>När du har en nödkassa och kontrollerat dina skulder kan du börja investera. För nybörjare rekommenderas:</p>
      
      <ul>
        <li>Indexfonder med låga avgifter</li>
        <li>Diversifiering över olika branscher och länder</li>
        <li>Långsiktigt tänk - minst 5-10 år</li>
      </ul>

      <h3>5. Använd våra kalkylatorer</h3>
      
      <p>På Kalkulatorn.se hittar du verktyg som kan hjälpa dig:</p>
      
      <ul>
        <li><strong>Räntekalkylator:</strong> Se hur dina pengar växer över tid</li>
        <li><strong>Lånekalkylator:</strong> Planera dina lån och amorteringar</li>
        <li><strong>Bolånekalkylator:</strong> Beräkna dina månadskostnader</li>
        <li><strong>Sparkalkylator:</strong> Sätt upp sparande för specifika mål</li>
      </ul>

      <h3>Slutsats</h3>
      
      <p>Privatekonomi handlar om att ta små, konsekventa steg. Börja med en budget, bygg en nödkassa, och börja sedan investera regelbundet. Kom ihåg att det aldrig är för sent att börja, och varje liten förändring kan göra stor skillnad över tid.</p>

      <p>Vill du lära dig mer? Utforska våra andra artiklar om ekonomi och använd våra kalkylatorer för att planera din ekonomiska framtid.</p>
    `
  },
  {
    id: 'healthy-sleep-habits',
    title: 'Så optimerar du din sömn för bättre hälsa',
    description: 'Upptäck vetenskapen bakom god sömn och hur du kan använda sömnkalkylatorn för att förbättra din sömnkvalitet.',
    date: '2024-03-12',
    readTime: '6 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=800',
    link: '/blog/healthy-sleep-habits',
    author: 'Maria Svensson',
    content: `
      <h2>Varför sömn är grunden för all hälsa</h2>
      
      <p>Sömn är inte bara en paus från vardagen - det är en aktiv process där kroppen reparerar sig själv, konsoliderar minnen och förbereder sig för nästa dag. Utan tillräcklig sömn påverkas allt från ditt immunförsvar till din förmåga att fatta beslut.</p>

      <h3>Vad händer under sömn?</h3>
      
      <p>Sömncykeln består av flera faser som upprepar sig under natten:</p>
      
      <ul>
        <li><strong>Lätt sömn (N1):</strong> Övergången från vakenhet till sömn</li>
        <li><strong>Mellan sömn (N2):</strong> Djupare sömn där hjärtfrekvensen och kroppstemperaturen sjunker</li>
        <li><strong>Djup sömn (N3):</strong> Den mest reparativa fasen för kroppen</li>
        <li><strong>REM-sömn:</strong> Där drömmar och minneskonsolidering sker</li>
      </ul>

      <h3>Optimal sömnlängd</h3>
      
      <p>Vuxna behöver vanligtvis 7-9 timmars sömn per natt, men det kan variera. Använd vår sömnkalkylator för att hitta din optimala läggtid baserat på när du behöver vakna.</p>

      <h3>Tips för bättre sömn</h3>
      
      <ol>
        <li><strong>Håll regelbunden sömnrytm:</strong> Gå och lägg dig samma tid varje dag</li>
        <li><strong>Skapa en sömnvänlig miljö:</strong> Mörkt, tyst och svalt</li>
        <li><strong>Undvik skärmar före läggdags:</strong> Blått ljus stör melatoninproduktionen</li>
        <li><strong>Begränsa koffein:</strong> Undvik koffein 6 timmar före läggdags</li>
        <li><strong>Träna regelbundet:</strong> Men inte för sent på kvällen</li>
      </ol>

      <h3>Använd vår sömnkalkylator</h3>
      
      <p>Vår sömnkalkylator hjälper dig att planera din sömn genom att beräkna optimala läggtider baserat på sömncykler. Genom att vakna vid rätt tidpunkt i sömncykeln känner du dig mer utvilad.</p>

      <h3>När ska du söka hjälp?</h3>
      
      <p>Om du regelbundet har problem med sömn i mer än tre veckor, överväg att konsultera en läkare. Sömnstörningar kan påverka din hälsa och livskvalitet avsevärt.</p>
    `
  }
];

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav currentPage="blog" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bloggpost hittades inte</h1>
            <p className="text-gray-600 mb-8">Den bloggpost du letar efter finns inte.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka till bloggen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav currentPage="blog" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tillbaka till bloggen
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-1" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('sv-SE')}
            </time>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span>Av {post.author}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {post.category}
            </span>
          </div>
        </header>

        {/* Featured image */}
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Article content */}
        <article className="max-w-none blog-content">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-700 leading-relaxed"
          />
        </article>

        {/* Author info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Book className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
              <p className="text-gray-600">Skribent på Kalkulatorn.se</p>
            </div>
          </div>
        </div>

        {/* Related articles or CTA */}
        <div className="mt-12 p-6 bg-indigo-50 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Vill du lära dig mer?
          </h3>
          <p className="text-gray-600 mb-4">
            Utforska våra kalkylatorer för att planera din ekonomi, hälsa och vardag.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Se alla kalkylatorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
