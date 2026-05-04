import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Book } from 'lucide-react';
import TopNav from '../components/TopNav';
import SEO from '../components/SEO';
import { useFeatureFlags } from '../contexts/FeatureFlagContext';

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
    id: 'loparkalkylator-sluttid-och-tempo',
    title: 'Löparkalkylator: beräkna sluttid, tempo per km och mellantider inför ditt lopp',
    description: 'Lär dig hur du räknar ut förväntad sluttid på 5 km, 10 km, halvmaraton eller maraton baserat på ditt tempo. Testa direkt i vår Löparkalkylator.',
    date: '2026-05-04',
    readTime: '7 min',
    category: 'Träning',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    link: '/blog/loparkalkylator-sluttid-och-tempo',
    author: 'Pontus',
    content: `
      <p><b>Vill du veta din sannolika sluttid innan loppdagen?</b> Med en tydlig beräkning av tempo och distans blir det enklare att planera rätt fart från start till mål. Oavsett om du springer 5 km, 10 km, halvmaraton eller maraton kan du använda vår <a href="/loparkalkylator" class="text-blue-600 underline hover:text-blue-800">Löparkalkylator</a> för att få en snabb uppskattning av sluttid och mellantider.</p>

      <p>Den här guiden går igenom hur beräkningen fungerar, hur du använder resultaten i praktiken och hur du undviker vanliga pacing-misstag.</p>

      <h2>Så räknas förväntad sluttid ut</h2>

      <p>Grunden är enkel: om du har ett planerat löptempo i minuter och sekunder per kilometer multipliceras det med total distans i kilometer. Då får du en uppskattad sluttid.</p>

      <p><strong>Formel:</strong> sluttid i sekunder = tempo (sek/km) × distans (km)</p>

      <p>I vår <a href="/loparkalkylator" class="text-blue-600 underline hover:text-blue-800">Löparkalkylator</a> fyller du i tempo och distans, och får direkt:</p>

      <ul>
        <li><strong>Förväntad sluttid</strong> för vald distans</li>
        <li><strong>Tempo per kilometer</strong> i min:sek</li>
        <li><strong>Genomsnittshastighet</strong> i km/h</li>
        <li><strong>Mellantider</strong> på utvalda checkpoint-kilometrar</li>
      </ul>

      <h2>Exempel: halvmaraton på 4:30 min/km</h2>

      <p>Om du siktar på 4 minuter 30 sekunder per kilometer över 21,1 km kan du snabbt få fram en rimlig sluttid och använda den som pacingmål. Då blir det lättare att avgöra om du behöver öppna lugnare, hålla jämn fart eller spara tryck till sista delen av loppet.</p>

      <p>Just den typen av planering gör ofta större skillnad än att bara "springa på känsla" i starten.</p>

      <h2>Varför mellantider är viktiga</h2>

      <p>Många löpare tappar tid för att första kilometrarna går för snabbt. När du vet dina mellantider i förväg får du en konkret check under loppet: ligger du rätt, för fort eller för långsamt?</p>

      <p>För längre distanser som halvmaraton och maraton är jämn fart ofta mer effektivt än stora fartsvängningar. Därför visar kalkylatorn mellantider som hjälper dig hålla planen.</p>

      <h2>Vanliga misstag vid tempoplanering</h2>

      <ul>
        <li><strong>För optimistiskt ingångstempo:</strong> ett för högt måltempo ger ofta kraftigt farttapp i slutet.</li>
        <li><strong>Ingen hänsyn till bana och väder:</strong> kupering, vind och värme påverkar tempot mer än många tror.</li>
        <li><strong>Ingen plan B:</strong> ha gärna ett alternativt tempo om dagen inte känns perfekt.</li>
      </ul>

      <h2>Bygg en bättre loppstrategi</h2>

      <p>Ett bra upplägg är att först testa realistiskt tempo från träning eller tidigare lopp, sedan mata in det i <a href="/loparkalkylator" class="text-blue-600 underline hover:text-blue-800">Löparkalkylatorn</a> och jämföra scenarier. Du kan till exempel testa skillnaden mellan 4:50 och 4:40 min/km för att se hur mycket sluttiden påverkas.</p>

      <p>Om du också vill räkna om tid och distans till tempo i efterhand kan du använda vår <a href="/tempokalkylator" class="text-blue-600 underline hover:text-blue-800">Tempokalkylator</a> som komplement.</p>

      <h2>Testa Löparkalkylatorn</h2>

      <p><a href="/loparkalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna Löparkalkylatorn</a> och fyll i ditt målfartstempo och din distans. På några sekunder får du en tydlig prognos för sluttid och en enkel pacingplan att ta med till nästa lopp.</p>

      <h2>Slutsats</h2>

      <p>En löparkalkylator gör loppplanering konkret: du ser direkt kopplingen mellan tempo och sluttid, får bättre kontroll över mellantider och kan fatta smartare beslut under loppet. Med rätt plan ökar chansen att springa jämnt, starkt och nära ditt mål.</p>
    `
  },
  {
    id: 'kaloribehov-bmr-och-tdee',
    title: 'Kaloribehov: vad är BMR och TDEE — och hur räknar du ut dem?',
    description: 'Så funkar basalmetabolism och total energiförbrukning enligt Mifflin–St Jeor, vilka aktivitetsnivåer som används — och hur du kan räkna ut ditt eget dagliga behov med kalorikalkylatorn.',
    date: '2026-04-30',
    readTime: '7 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    link: '/blog/kaloribehov-bmr-och-tdee',
    author: 'Pontus',
    content: `
      <p><b>Kaloribehov</b> är den energi (kilokalorier, kcal) som kroppen behöver per dag för att hålla igång basfunktioner — andning, cirkulation, temperatur, hjärna — och för att täcka rörelse och vardagsaktivitet. På vår sajt uttrycks det som två tal: <strong>basalmetabolism (BMR)</strong> och <strong>totalt dagligt energibehov (TDEE)</strong>, precis som i vår kalorikalkylator.</p>

      <p>Här går vi igenom vad skillnaden är, vilken formel kalkylatorn använder, hur aktivitetsnivåerna är tänkta — och varför resultatet alltid är en <strong>uppskattning</strong> som kan skilja sig åt mellan individer.</p>

      <p>Vill du slippa räkna för hand? Använd vår <a href="/kalorikalkylator" class="text-blue-600 underline hover:text-blue-800">Kaloribehovskalkylator</a> — fyll i vikt, längd, ålder, kön och aktivitetsnivå så får du BMR och TDEE direkt.</p>

      <h2>BMR: energin i vila</h2>

      <p>BMR är den energi kroppen behöver i vila för att hålla liv i organen, utan att räkna in att du går till jobbet, tränar eller står upp mer än absolut nödvändigt. Det är alltså ett <em>golv</em> för din dagliga förbrukning — i praktiken ligger nästan alltid det verkliga behovet högre eftersom du rör dig, tänker och står på fötterna.</p>

      <h2>TDEE: BMR plus vardag och träning</h2>

      <p>TDEE (”Total Daily Energy Expenditure”) är kalkylatorns svar på <strong>ungefär hur många kcal du förbrukar under en genomsnittlig dag</strong> med din valda aktivitetsnivå. Den räknas genom att ta BMR och multiplicera med en <strong>aktivitetsfaktor</strong> — samma princip som i vår <a href="/kalorikalkylator" class="text-blue-600 underline hover:text-blue-800">Kaloribehovskalkylator</a>.</p>

      <p>Kort sagt: <strong>TDEE ≈ BMR × aktivitetsfaktor</strong>.</p>

      <h2>Mifflin–St Jeor: samma ekvation som i kalkylatorn</h2>

      <p>Kalkylatorn använder <strong>Mifflin–St Jeor-ekvationen</strong> för BMR. Den är vanlig i kost- och träningsappar eftersom den ofta ger rimliga värden för vuxna utan att kräva kroppsfettprocent.</p>

      <p>Först räknas ett gemensamt uttryck utifrån vikt (kg), längd (cm) och ålder (år):</p>

      <p><strong>BMR-del = 10 × vikt + 6,25 × längd − 5 × ålder</strong></p>

      <p>Sedan justeras för kön, i linje med kalkylatorns knappar för man respektive kvinna:</p>

      <ul>
        <li><strong>Man:</strong> BMR = BMR-del + 5</li>
        <li><strong>Kvinna:</strong> BMR = BMR-del − 161</li>
      </ul>

      <p>Därefter: <strong>TDEE = BMR × vald aktivitetsfaktor</strong> (se nästa avsnitt). I gränssnittet avrundas värdena till hela kcal, som i resultatrutan för BMR och TDEE.</p>

      <h2>Aktivitetsnivåerna — som i kalkylatorn</h2>

      <p>För att gå från BMR till TDEE behövs en rimlig skattning av hur mycket du rör dig utöver vila. I kalkylatorn väljer du en av fem nivåer; varje nivå är kopplad till en fast faktor:</p>

      <ul>
        <li><strong>Lite till ingen träning</strong> (stillasittande livsstil) — faktor <strong>1,2</strong></li>
        <li><strong>Träning 1–3 dagar/vecka</strong> (lätt aktiv) — <strong>1,375</strong></li>
        <li><strong>Träning 4–5 dagar/vecka</strong> (måttligt aktiv) — <strong>1,55</strong></li>
        <li><strong>Träning 6–7 dagar/vecka</strong> (mycket aktiv) — <strong>1,725</strong></li>
        <li><strong>Träning 2 gånger per dag, tung träning</strong> (extra aktiv) — <strong>1,9</strong></li>
      </ul>

      <p>Om du ligger mitt emellan två nivåer kan ditt verkliga behov hamna däremellan. Målet är inte perfektion utan ett <strong>startvärde</strong> du kan justera utifrån hur vikt, prestation och hunger faktiskt beter sig över några veckor.</p>

      <h2>Viktuppgång, viktnedgång eller bibehållen vikt</h2>

      <p>TDEE är ofta beskrivet som ungefär det du behöver för att <strong>bibehålla</strong> nuvarande vikt om uppskattningen stämmer. Att äta konsekvent under TDEE ger i regel viktnedgång över tid; över TDEE kan ge viktuppgång. Hur snabbt det sker beror på hur stor skillnaden är, vätskebalans och enskilda faktorer — därför är det klokt att spåra trend över veckor, inte dag för dag.</p>

      <h2>Varför är siffrorna ”bara” en uppskattning?</h2>

      <p>Samma formel för två personer med identiska mått kan ge samma BMR — men deras verkliga förbrukning skiljer sig ändå åt, bland annat beroende på <strong>kroppssammansättning</strong> (muskel förbrukar mer i vila än lika mycket fettvolym), <strong>genetik</strong>, sömn, stress, sjukdom och exakt hur hård träningen är. Det är därför kalkylatorn också betonar att resultatet är en riktlinje, inte ett exakt mått från laboratorium.</p>

      <h2>Pröva med Kaloribehovskalkylatorn</h2>

      <p>Sammanfattningsvis: kalkylatorn visar <strong>BMR via Mifflin–St Jeor</strong> och <strong>TDEE via vald aktivitetsfaktor</strong>, med tydliga etiketter för varje steg — precis som beskrivs i avsnittet ”Om kalkylatorn” på sidan.</p>

      <p><a href="/kalorikalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna Kaloribehovskalkylatorn</a> och testa med dina egna värden. Där kan du också dela länk med ifyllda parametrar om du vill jämföra med en tränare eller vän.</p>

      <h2>Slutsats</h2>

      <p>Kaloribehov handlar om att förstå <strong>basbehov i vila (BMR)</strong> och <strong>total förbrukning med aktivitet (TDEE)</strong>. Med samma metod som i vår kalkylator får du en begriplig och reproducerbar uppskattning — och sedan finjusterar du utifrån verkliga resultat, inte bara formeln.</p>
    `
  },
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
      
      <p>På Kalkylatorn.com hittar du verktyg som kan hjälpa dig:</p>
      
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
  },
  {
    id: 'lanekostnad-guide',
    title: 'Vad kostar ditt privatlån – och hur räknar du ut det?',
    description: 'Lär dig hur lånekostnader fungerar och testa själv med vår Lånekostnadskalkylator.',
    date: '2025-12-02',
    readTime: '7 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/blog/lanekostnad-guide',
    author: 'Pontus',
    content: `
      <p><b>När du tar ett privatlån är det viktigt att förstå den verkliga kostnaden</b> – inte bara räntan, utan alla avgifter och kostnader som kommer med lånet. Många fokuserar enbart på räntesatsen, men den totala lånekostnaden kan vara betydligt högre än du tror.</p>

      <p>I denna guide går vi igenom vad som faktiskt ingår i kostnaden för ett privatlån, hur du beräknar den totala kostnaden och hur du kan använda vår lånekostnadskalkylator för att jämföra olika alternativ.</p>
      <p>
        Vill du själv räkna ut din lånekostnad? Prova vår <a href="/lanekalkylator" class="text-blue-600 underline hover:text-blue-800">Lånekostnadskalkylator</a> för att få en tydlig översikt och jämföra olika lånevillkor.
      </p>

      <h2>Vad ingår i lånekostnaden?</h2>
      
      <p>Den totala kostnaden för ett privatlån består av flera komponenter:</p>

      <h3>1. Ränta</h3>
      
      <p>Räntan är den mest kända kostnaden och är den procentuella avgiften du betalar för att låna pengar. Räntan kan vara fast eller rörlig:</p>
      
      <ul>
        <li><strong>Fast ränta:</strong> Förändras inte under låneperioden, ger förutsägbarhet</li>
        <li><strong>Rörlig ränta:</strong> Kan ändras över tid, ofta lägre initialt men med osäkerhet</li>
      </ul>

      <h3>2. Uppläggningsavgift</h3>
      
      <p>Många banker tar ut en engångsavgift när lånet upprättas. Denna kan variera från några hundra kronor till flera tusen, beroende på lånebelopp och bank.</p>

      <h3>3. Årsavgift</h3>
      
      <p>Vissa långivare tar ut en årlig avgift för att administrera lånet. Detta är en återkommande kostnad som kan påverka den totala kostnaden avsevärt över tid.</p>

      <h3>4. Amorteringskrav</h3>
      
      <p>Även om amorteringar inte är en "kostnad" i traditionell mening, påverkar de din månadsbetalning och din ekonomiska situation. Vissa lån kräver amorteringar medan andra inte gör det.</p>

      <h2>Hur beräknar du den totala lånekostnaden?</h2>
      
      <p>Den totala kostnaden för ett lån beräknas genom att lägga ihop alla räntebetalningar, avgifter och andra kostnader över hela låneperioden. Detta kallas ofta för den totala kreditkostnaden.</p>

      <p>Formeln ser ut så här:</p>
      
      <p><strong>Total kostnad = (Ränta × Lånebelopp × Antal år) + Uppläggningsavgift + (Årsavgift × Antal år)</strong></p>

      <h3>Ett praktiskt exempel:</h3>
      
      <ul>
        <li>Lånebelopp: 100 000 kr</li>
        <li>Ränta: 5,5 % per år</li>
        <li>Lånetid: 5 år</li>
        <li>Uppläggningsavgift: 1 500 kr</li>
        <li>Årsavgift: 500 kr per år</li>
      </ul>

      <p>Beräkning:</p>
      <ul>
        <li>Räntekostnad: 100 000 × 0,055 × 5 = 27 500 kr</li>
        <li>Uppläggningsavgift: 1 500 kr</li>
        <li>Årsavgift: 500 × 5 = 2 500 kr</li>
        <li><strong>Total kostnad: 31 500 kr</strong></li>
      </ul>

      <p>Det betyder att du totalt betalar 131 500 kr för att låna 100 000 kr över 5 år.</p>

      <h2>Effektiv ränta – den verkliga kostnaden</h2>
      
      <p>Effektiv ränta är ett sätt att jämföra olika lån på ett rättvist sätt. Den inkluderar alla kostnader och visar den verkliga årliga kostnaden i procent. Detta gör det lättare att jämföra olika lånealternativ.</p>

      <p>En låg nominell ränta kan faktiskt vara dyrare än en högre om det finns många avgifter kopplade till lånet.</p>

      <h2>Faktorer som påverkar lånekostnaden</h2>
      
      <h3>1. Kreditvärdighet</h3>
      
      <p>Din kreditvärdighet är en av de viktigaste faktorerna. En bättre kreditvärdighet ger ofta lägre räntor och bättre villkor.</p>

      <h3>2. Lånebelopp</h3>
      
      <p>Större lån kan ibland ge bättre räntor, men det beror på banken och dina förutsättningar.</p>

      <h3>3. Lånetid</h3>
      
      <p>Längre lånetid innebär ofta högre total kostnad eftersom räntan betalas under en längre period, även om månadskostnaden kan vara lägre.</p>

      <h3>4. Säkerhet</h3>
      
      <p>Lån med säkerhet (som bil eller fastighet) har ofta lägre räntor än obundna lån.</p>

      <h2>Använd vår lånekostnadskalkylator</h2>
      
      <p>För att göra det enklare att förstå och jämföra olika lånealternativ har vi skapat en lånekostnadskalkylator. Med den kan du:</p>
      
      <ul>
        <li>Beräkna den totala kostnaden för ditt lån</li>
        <li>Se månadskostnaden inklusive ränta och amortering</li>
        <li>Jämföra olika lånealternativ</li>
        <li>Förstå hur olika faktorer påverkar kostnaden</li>
      </ul>

      <p>Kalkylatorn tar hänsyn till alla relevanta kostnader och ger dig en tydlig bild av vad lånet faktiskt kommer att kosta.</p>

      <h2>Tips för att minska lånekostnaden</h2>
      
      <ol>
        <li><strong>Förbättra din kreditvärdighet:</strong> Betala räkningar i tid och håll låg kreditanvändning</li>
        <li><strong>Jämför olika långivare:</strong> Använd vår kalkylator för att hitta det bästa alternativet</li>
        <li><strong>Förhandla:</strong> Många banker är beredda att förhandla, särskilt om du är en god kund</li>
        <li><strong>Överväg kortare lånetid:</strong> Om du har råd kan en kortare löptid minska den totala kostnaden</li>
        <li><strong>Undvik onödiga avgifter:</strong> Läs villkoren noggrant och undvik långivare med många dolda avgifter</li>
      </ol>

      <h2>Slutsats</h2>
      
      <p>Att förstå den verkliga kostnaden för ett privatlån är avgörande för att fatta rätt ekonomiska beslut. Genom att titta på mer än bara räntan och inkludera alla avgifter får du en rättvis bild av vad lånet faktiskt kostar.</p>

      <p>Använd vår lånekostnadskalkylator för att utforska olika scenarier och hitta det lån som passar dig bäst. Kom ihåg att även små skillnader i ränta eller avgifter kan göra stor skillnad över tid.</p>
    `
  },
  {
    id: 'savings-strategies',
    title: 'Smarta sparstrategier för olika livssituationer',
    description: 'Upptäck olika sparstrategier och hur du kan använda våra sparkalkylatorer för att nå dina ekonomiska mål.',
    date: '2025-12-03',
    readTime: '9 min',
    category: 'Ekonomi',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=800',
    link: '/blog/savings-strategies',
    author: 'Pontus',
    content: `
      <p><b>Sparande är en av de viktigaste grundpelarna för ekonomisk trygghet</b> – men rätt strategi varierar beroende på var du befinner dig i livet. En student har andra behov än en familj med barn, och någon som närmar sig pensionen behöver en annan approach än en ung professionell som precis börjat arbeta.</p>

      <p>I denna guide går vi igenom smarta sparstrategier för olika livssituationer och hur du kan använda våra sparkalkylatorer för att planera och nå dina ekonomiska mål.</p>

      <h2>Varför behövs olika sparstrategier?</h2>
      
      <p>Din livssituation påverkar både dina ekonomiska möjligheter och dina behov. En student har ofta begränsade inkomster men också färre ansvar, medan en familj med barn har större utgifter men också fler ekonomiska mål att spara för. Genom att anpassa din sparstrategi efter din nuvarande situation kan du maximera effekten av ditt sparande.</p>

      <h2>Student: Bygg grunden för framtiden</h2>
      
      <p>Som student har du ofta begränsade inkomster, men du har också en unik fördel: tid. Att börja spara tidigt, även små belopp, kan ge enorma resultat tack vare ränta-på-ränta effekten.</p>

      <h3>Strategier för studenter:</h3>
      
      <ul>
        <li><strong>Börja små men konsekvent:</strong> Även 500 kr per månad kan bli en betydande summa över tid</li>
        <li><strong>Fokusera på nödkassa:</strong> Bygg upp en buffert på 10 000–20 000 kr för oväntade utgifter</li>
        <li><strong>Utnyttja studielån smart:</strong> Om du har överskott, spara det istället för att spendera det</li>
        <li><strong>Långsiktigt tänk:</strong> Investera i indexfonder med låga avgifter för långsiktig tillväxt</li>
      </ul>

      <p>Använd vår <a href="/rantakalkylator" class="text-blue-600 underline hover:text-blue-800">ränta-på-ränta kalkylator</a> för att se hur även små månadsbelopp kan växa över tid. Testa att se vad 500 kr per månad kan bli om 10, 20 eller 30 år!</p>

      <h2>Ung professionell: Bygg momentum</h2>
      
      <p>När du börjar arbeta och få en stabil inkomst öppnas nya möjligheter. Det här är en kritisk period för att bygga ekonomisk trygghet och sätta upp goda vanor.</p>

      <h3>Strategier för unga professionella:</h3>
      
      <ul>
        <li><strong>50/30/20-regeln:</strong> 50% till nödvändiga utgifter, 30% till nöjen, 20% till sparande</li>
        <li><strong>Automatisera sparandet:</strong> Sätt upp automatiska överföringar så att du sparar innan du hinner spendera</li>
        <li><strong>Bygg nödkassa:</strong> Sikta på 3–6 månaders utgifter som buffert</li>
        <li><strong>Börja investera:</strong> När nödkassan är på plats, börja investera regelbundet i fonder</li>
        <li><strong>Sätt upp sparande för specifika mål:</strong> Bil, bostad, resor – planera för vad du vill uppnå</li>
      </ul>

      <p>Vår <a href="/sparmalskalkylator" class="text-blue-600 underline hover:text-blue-800">sparmålskalkylator</a> är perfekt för att planera dina mål. Vill du köpa en bil om två år? Eller spara till kontantinsats? Kalkylatorn visar exakt hur mycket du behöver spara varje månad.</p>

      <h2>Familj med barn: Balansera nu och framtid</h2>
      
      <p>Med familj kommer fler ekonomiska ansvar och mål. Du behöver balansera nuvarande utgifter med långsiktigt sparande, samtidigt som du planerar för barnens framtid.</p>

      <h3>Strategier för familjer:</h3>
      
      <ul>
        <li><strong>Prioritera nödkassa:</strong> Med större utgifter behöver ni en större buffert – sikta på 6 månaders utgifter</li>
        <li><strong>Barnsparande:</strong> Börja spara tidigt för barnens framtid, använd ränta-på-ränta effekten</li>
        <li><strong>Pensionssparande:</strong> Fortsätt spara för pensionen även om det känns långt bort</li>
        <li><strong>Kortsiktiga mål:</strong> Planera för semester, renoveringar och andra familjeaktiviteter</li>
        <li><strong>Försäkringar:</strong> Säkerställ att familjen är skyddad ekonomiskt</li>
      </ul>

      <p>För familjer är det extra viktigt att ha tydliga mål. Använd våra kalkylatorer för att planera både kortsiktiga mål (som semester) och långsiktiga mål (som barnens utbildning eller egen pension).</p>

      <h2>Närmar sig pension: Säkerställ trygghet</h2>
      
      <p>När pensionen närmar sig skiftar fokus från tillväxt till trygghet och bevarande av kapital. Det är dags att omvärdera din sparstrategi.</p>

      <h3>Strategier närmare pension:</h3>
      
      <ul>
        <li><strong>Diversifiera mer:</strong> Minska risk genom att sprida investeringar över olika tillgångar</li>
        <li><strong>Öka kontantbuffert:</strong> Ha mer pengar tillgängliga för oväntade utgifter</li>
        <li><strong>Planera uttag:</strong> Beräkna hur mycket du kan ta ut per månad utan att äta upp kapitalet</li>
        <li><strong>Minimera skulder:</strong> Betala av skulder innan pensionen för att minska månadskostnader</li>
        <li><strong>Överväg konservativa investeringar:</strong> Fokusera mer på stabilitet än tillväxt</li>
      </ul>

      <h2>Allmänna sparstrategier som fungerar för alla</h2>
      
      <p>Oavsett livssituation finns det några grundprinciper som alltid är värdefulla:</p>

      <h3>1. Börja tidigt</h3>
      
      <p>Tid är din största tillgång när det gäller sparande. Ju tidigare du börjar, desto mer arbetar ränta-på-ränta effekten för dig. Använd vår ränta-på-ränta kalkylator för att se skillnaden mellan att börja spara vid 25 års ålder jämfört med 35.</p>

      <h3>2. Var konsekvent</h3>
      
      <p>Regelbundet sparande, även i små belopp, slår ofta perfekt tajmat sparande. Genom att automatisera ditt sparande säkerställer du att det faktiskt händer varje månad.</p>

      <h3>3. Sätt tydliga mål</h3>
      
      <p>Det är mycket lättare att spara när du har ett specifikt mål. Oavsett om det är en resa, en bil, en bostad eller pension – sätt upp tydliga mål och använd vår sparmålskalkylator för att se vad som krävs.</p>

      <h3>4. Justera kontinuerligt</h3>
      
      <p>Din livssituation förändras, och din sparstrategi bör också göra det. Gör regelbundna genomgångar och justera ditt sparande efter dina nuvarande behov och mål.</p>

      <h3>5. Använd ränta-på-ränta effekten</h3>
      
      <p>Genom att investera dina besparingar och låta dem växa över tid kan du dra nytta av ränta-på-ränta effekten. Detta är en av de kraftfullaste ekonomiska principerna som finns.</p>

      <h2>Hur använder du våra sparkalkylatorer?</h2>
      
      <p>På Kalkylatorn.com hittar du två kraftfulla verktyg för att planera ditt sparande:</p>

      <h3>Ränta-på-ränta kalkylator</h3>
      
      <p>Denna kalkylator visar hur ditt sparande växer över tid med ränta-på-ränta effekten. Du kan:</p>
      
      <ul>
        <li>Se hur ditt startkapital växer</li>
        <li>Testa olika månadsbelopp</li>
        <li>Jämföra olika avkastningar</li>
        <li>Förstå hur tiden påverkar resultatet</li>
      </ul>

      <p>Perfekt för att se den långsiktiga potentialen i ditt sparande och motivera dig att fortsätta.</p>

      <h3>Sparmålskalkylator</h3>
      
      <p>Denna kalkylator hjälper dig att planera för specifika mål. Du kan:</p>
      
      <ul>
        <li>Sätta ett målbelopp och tidsram</li>
        <li>Se exakt hur mycket du behöver spara per månad</li>
        <li>Testa olika scenarier och justeringar</li>
        <li>Förstå hur ränta påverkar ditt sparande</li>
      </ul>

      <p>Idealisk för att planera konkreta mål som bilköp, kontantinsats, semester eller andra större utgifter.</p>

      <h2>Praktiska tips för att komma igång</h2>
      
      <ol>
        <li><strong>Börja idag:</strong> Även om det är ett litet belopp, börja spara idag. Varje dag du väntar är en förlorad dag för ränta-på-ränta effekten.</li>
        <li><strong>Automatisera:</strong> Sätt upp automatiska överföringar så att sparandet händer automatiskt varje månad.</li>
        <li><strong>Öka gradvis:</strong> När din inkomst ökar, öka också ditt sparande. Du behöver inte öka allt på en gång.</li>
        <li><strong>Använd kalkylatorerna:</strong> Testa olika scenarier för att hitta en strategi som fungerar för dig.</li>
        <li><strong>Var realistisk:</strong> Sätt upp mål som är uppnåeliga. Det är bättre att spara lite konsekvent än mycket sporadiskt.</li>
      </ol>

      <h2>Slutsats</h2>
      
      <p>Rätt sparstrategi varierar beroende på var du befinner dig i livet, men grundprinciperna förblir desamma: börja tidigt, var konsekvent, sätt tydliga mål och utnyttja ränta-på-ränta effekten.</p>

      <p>Oavsett din livssituation kan våra sparkalkylatorer hjälpa dig att planera och visualisera dina ekonomiska mål. Använd dem för att utforska olika scenarier, förstå vad som krävs för att nå dina mål och hitta en sparstrategi som fungerar för just dig.</p>

      <p>Kom ihåg att varje resa börjar med ett första steg. Börja spara idag, även om det är ett litet belopp, och låt tiden och ränta-på-ränta effekten arbeta för dig.</p>
    `
  },
  {
    id: 'fasta-24-till-96-timmar',
    title: 'Fasta från 24 till 96 timmar: vad händer i kroppen och vilka kan fördelarna vara?',
    description: 'En översikt av kort till medellång fasta — från ett dygn upp till fyra dygn — och vanliga hälsovinster diskuterade i forskning. Planera din fasta med vår Fastekalkylator.',
    date: '2026-04-30',
    readTime: '8 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    link: '/blog/fasta-24-till-96-timmar',
    author: 'Pontus',
    content: `
      <p><b>Fasta är en av mänsklighetens äldsta vanor</b> — och intresset för strukturerade fasteperioder har vuxit kraftigt. Här fokuserar vi på fastor från cirka 24 timmar upp till 96 timmar (fyra dygn): vad som ofta beskrivs i vetenskaplig litteratur, vilka effekter som kan uppstå vid olika längder, och hur du kan planera tiderna praktiskt.</p>

      <p>Det här är <strong>inte medicinsk rådgivning</strong>. Längre fastor passar inte alla; rådfråga alltid vård vid sjukdom, graviditet, amning, diabetes eller mediciner som påverkar blodsocker. Stoppa om du mår illa, yr eller osäker.</p>

      <p>Vill du räkna ut när din fasta börjar och slutar, eller hur länge du fastat? Använd vår <a href="/fastekalkylator" class="text-blue-600 underline hover:text-blue-800">Fastekalkylator</a> — där kan du enkelt följa tidsfönstret för just din plan.</p>

      <h2>Varför pratar man om 24–96 timmar?</h2>

      <p>Många kroppsliga processer styrs av om du nyligen ätit eller inte. När du inte tar in energi under en längre period förändras hormoner, bränsleanvändning och cellreparation. Exakt tidslinje varierar mellan individer, men forskning och klinisk erfarenhet ger ungefärliga intervaller som är användbara att känna till.</p>

      <h2>24 timmar (ett dygn)</h2>

      <p>En helfasta över ett dygn är ofta en begriplig första nivå för friska vuxna. Kroppen går från att främst använda glukos från mat till i större utsträckning att mobilisera lagrat glykogen och fett.</p>

      <p><strong>Möjliga effekter som ofta nämns:</strong> Insulin kan sjunka, vilket underlättar fettomsättning; många upplever mental klarhet när hungervågen passerat; för vissa blir ett dygn ett sätt att bryta snacking utan extrem belastning.</p>

      <h2>Cirka 36–48 timmar (halvannat till två dygn)</h2>

      <p>När glykogenlager tömts mer väsentligt ökar omfattningen av fettnedbrytning och ketoner kan börja spela en större roll som energikälla för hjärnan jämfört med strax efter måltid.</p>

      <p><strong>Möjliga effekter som ofta nämns:</strong> Fortsatt förbättrad insulinkänslighet hos många över tid med upprepade protokoll; autofagi (cellernas ”städning”) diskuteras ofta i litteraturen vid längre brist på näringsintag, men exakt mätning i människa är svår; hunger kan komma och gå i vågor.</p>

      <h2>72 timmar (tre dygn)</h2>

      <p>Efter cirka tre dygn är många djupt i ketos om de är friska och välhydrade. Immunologiska och stamcellsmekanismer har studerats i djur och i begränsade humana studier — lovande men inte färdigt kartlagda för alla målgrupper.</p>

      <p><strong>Möjliga effekter som ofta nämns:</strong> Kraftigare metabolt skifte; viktigast är noggrann vätske- och elektrolytbalans och att inte pressa på om kroppen protesterar. Tre dygn kräver ofta mer erfarenhet eller uppsikt.</p>

      <h2>96 timmar (fyra dygn)</h2>

      <p>Fyra dygn tillhör de längre volontära fastorna. Här ökar risken för biverkningar som yrsel, utmattning eller elektrolytobalans om du inte är van och inte följer säkerhetsrutiner.</p>

      <p><strong>Möjliga effekter som ofta nämns:</strong> Fortsatt förlängning av samma metabola och reparativa teman som vid kortare fasta, men med högre krav på övervakning, vila och i många fall professionell vägledning. De flesta som fastar så här länge gör det under kontrollerade former.</p>

      <h2>Gemensamma teman: vad brukar lyftas som potentiella fördelar?</h2>

      <ul>
        <li><strong>Metabol flexibilitet:</strong> Kroppen tränas att växla mellan bränslen.</li>
        <li><strong>Insulin och blodsocker:</strong> Hos friska kan perioder utan kalorier ge lägre insulinbelastning.</li>
        <li><strong>Inflammation och biologiska signalsystem:</strong> Vissa biomarkörer för inflammation har visat på förbättring i studier på fastoprotocol.</li>
        <li><strong>Fokus och ritual:</strong> Många uppskattar enkelhet i kosten under fastan och tydliga tidsramar.</li>
      </ul>

      <p>Effekten varierar med kön, ålder, sömn, stress och genetik — det som fungerar för en person är inte automatiskt rätt för en annan.</p>

      <h2>Hydrering, elektrolyter och brytande av fastan</h2>

      <p>Vid all fasta utan mat: drick tillräckligt med vatten; vid längre fastor är balansen av salt, magnesium och kalium ofta viktigare att hålla koll på tillsammans med vården vid behov. Bryt långa fastor mjukt med mindre måltider för att minska matsmältningsbesvär.</p>

      <h2>Planera med Fastekalkylatorn</h2>

      <p>När du jämför scenarier — till exempel 24 jämfört med 48 eller 72 timmar — hjälper det att se exakt var på dygnet fastan börjar och slutar. Vår <a href="/fastekalkylator" class="text-blue-600 underline hover:text-blue-800">Fastekalkylator</a> är till för precis det: sätt starttid eller sluttid och få fram hur länge du fastat eller när nästa måltid är planerad enligt ditt mål.</p>

      <h2>Slutsats</h2>

      <p>Fastor mellan ett och fyra dygn kan för vissa friska vuxna vara ett sätt att utforska metabol hälsa och enkelhet kring måltider — samtidigt som längre spann kräver mer förberedelse, respekt för kroppens signaler och oftast kontakt med vårdpersonal. Utforska tidsintervallet först på kortare nivåer, dokumentera hur du mår och anpassa sedan.</p>

      <p><a href="/fastekalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna Fastekalkylatorn</a> och planera din nästa fasta med tydliga tider.</p>
    `
  },
  {
    id: 'bmi-vad-det-ar-och-kalkylatorn',
    title: 'BMI: vad det är, hur det räknas — och hur vår kalkylator tolkar resultatet',
    description: 'Så här fungerar Body Mass Index, vilka gränser som används för undervikt till fetma — och hur du kan prova själv med BMI-kalkylatorn på Kalkylatorn.com.',
    date: '2026-04-20',
    readTime: '6 min',
    category: 'Hälsa',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    link: '/blog/bmi-vad-det-ar-och-kalkylatorn',
    author: 'Pontus',
    content: `
      <p><b>Body Mass Index (BMI)</b> är ett enkelt mått som sätter ihop din vikt och din längd till ett enda tal. Det används ofta som riktlinje för att bedöma om vikten i förhållande till längden ligger i ett spann som klassas som undervikt, normalvikt, övervikt eller fetma — samma gränser som i vår <a href="/bmikalkylator" class="text-blue-600 underline hover:text-blue-800">BMI-kalkylator</a>.</p>

      <p>Här går vi igenom formeln, vad kategorierna betyder, varför BMI inte säger allt om hälsa — och vad du får utöver själva siffran när du använder vårt verktyg.</p>

      <p>Vill du räkna direkt? Öppna <a href="/bmikalkylator" class="text-blue-600 underline hover:text-blue-800">BMI-kalkylatorn</a>, fyll i längd (cm) och vikt (kg) och tryck på ”Beräkna BMI”.</p>

      <h2>Hur räknas BMI?</h2>

      <p>BMI beräknas som <strong>vikt delat med längden i meter i kvadrat</strong>. Om du mäter längd i centimeter, som i kalkylatorn, räknas först om till meter: längd i meter = längd i cm ÷ 100. Sedan:</p>

      <p><strong>BMI = vikt (kg) ÷ (längd i meter)²</strong></p>

      <p>Exempel: 170 cm och 70 kg ger 1,70 m och BMI = 70 ÷ (1,70 × 1,70) ≈ <strong>24,2</strong>, vilket hamnar i intervallet för normalvikt enligt vanliga gränser.</p>

      <h2>Kategorierna — som i kalkylatorn</h2>

      <p>På Kalkylatorn.com används samma huvudintervall som i många internationella riktlinjer (t.ex. WHO):</p>

      <ul>
        <li><strong>Undervikt:</strong> BMI under 18,5</li>
        <li><strong>Normalvikt:</strong> 18,5 upp till men inte inklusive 25</li>
        <li><strong>Övervikt:</strong> 25 upp till men inte inklusive 30</li>
        <li><strong>Fetma:</strong> BMI 30 eller högre</li>
      </ul>

      <p>I gränssnittet visas detta också som en färgad <strong>BMI-skala</strong> så du ser var du landar i förhållande till de andra intervallen.</p>

      <h2>Vad mer gör BMI-kalkylatorn?</h2>

      <p>Förutom själva indexet och kategorin visar sidan texter om <strong>hälsorisker</strong> och <strong>rekommendationer</strong> kopplade till respektive klass — tänkt som allmän informationsnivå, inte personlig diagnos.</p>

      <p>Ligger du utanför normalviktsspannet (18,5–24,9) får du ett kort avsnitt om ungefär <strong>vilken vikt som motsvarar gränsen mot ”grön zon”</strong> (normalvikt) för din angivna längd — praktiskt om du vill förstå storleksordningen på skillnaden, inte som ett löfte om exakt målvikt.</p>

      <p>Du kan också <strong>dela resultatet med en länk</strong>; kalkylatorn kan läsa in höjd och vikt från URL-parametrar så att mottagaren ser samma beräkning.</p>

      <h2>BMI:s begränsningar</h2>

      <p>BMI är grovt: det tar inte hänsyn till <strong>muskelmassa</strong>, benstomme, hur fettet är fördelat, <strong>ålder</strong> eller <strong>kön</strong>. En vältränad person kan få högt BMI trots låg kroppsfettprocent; äldre kan ha andra hänsyn än unga vuxna.</p>

      <p>Därför skriver vi också på kalkylatorns sida att BMI bara är en tumregel — för individuell bedömning ska du vända dig till legitimerad vård eller dietist.</p>

      <h2>Pröva BMI-kalkylatorn</h2>

      <p>Sammanfattningsvis får du med <a href="/bmikalkylator" class="text-blue-600 underline hover:text-blue-800">BMI-kalkylatorn</a> en snabb, tydlig beräkning utifrån längd och vikt, samma kategorier som ovan, visuell skala, kort information om risker och rekommendationer, samt vikthänvisning om du ligger utanför normalviktsspannet.</p>

      <p><a href="/bmikalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna BMI-kalkylatorn</a> och testa med dina egna mått.</p>

      <h2>Slutsats</h2>

      <p>BMI är ett välkänt och lättberäknat mått på vikt i förhållande till längd. Det hjälper många att orientera sig — men ersätter inte klinisk bedömning. Använd vår kalkylator som ett pedagogiskt verktyg och komplettera med professionell rådgivning om du funderar på större livsstilsförändringar eller har medicinska frågor.</p>
    `
  },
  {
    id: 'svenska-mattomvandlaren',
    title: 'Måttomvandlare: så räknar du om svenska vikt- och volymmått i köket',
    description: 'Från kilogram till gram, liter till matsked och kryddmått — så hänger de svenska köksmåtten ihop och hur du kan konvertera snabbt med måttomvandlaren.',
    date: '2026-04-15',
    readTime: '5 min',
    category: 'Matlagning',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
    link: '/blog/svenska-mattomvandlaren',
    author: 'Pontus',
    content: `
      <p><b>Svenska recept och matlagningsrutiner bygger på en tågordning av enheter</b> som de flesta lär sig utantill: deciliter till koppen, matsked mot tesked, gram när det handlar om vikt. När du ska hälva eller dubbla ett recept, eller när något bara finns angivet i en annan enhet än du tänker, räcker det med några fasta omräkningsregler — eller ett klick i <a href="/mattomvandlare" class="text-blue-600 underline hover:text-blue-800">måttomvandlaren</a>.</p>

      <p>Här går vi igenom hur <strong>vikt</strong> och <strong>volym</strong> hänger ihop i svenska kök, och vad som skiljer volym i milliliter från vikt i gram när du bakar.</p>

      <p><a href="/mattomvandlare" class="text-blue-600 underline hover:text-blue-800">Öppna måttomvandlaren</a> och välj vilken enhet du utgår från och vilken du vill ha — kalkylatorn håller isär volym och vikt så du inte av misstag blandar mängder som inte går att jämföra direkt.</p>

      <h2>Vikt: kilogram, hektogram och gram</h2>

      <p>I Sverige används i köket oftast <strong>gram</strong> som finaste steg, med <strong>kilogram</strong> (1000 g) för större mängder och <strong>hektogram</strong> (100 g) som du fortfarande ser på förpackningar och i äldre recept. Kedjan är rak: 1 kg = 10 hg = 1000 g. Det gör det enkelt att skala recept — halverar du ett kilo till 500 g vet du exakt var du ligger.</p>

      <h2>Volym: liter, deciliter, centiliter och milliliter</h2>

      <p>Volym i metriska enheter följer tiopotenser: 1 liter = 10 dl = 100 cl = 1000 ml. Det är grunden till nästan all svensk måttagning av vätskor och av ”måttade” torrvaror i mått.</p>

      <h2>Matsked, tesked och kryddmått</h2>

      <p>Matlagningsmått i Sverige är i praktiken volymmått kopplade till milliliter: en <strong>matsked (msk)</strong> är ofta satt till 15 ml, en <strong>tesked (tsk)</strong> till 5 ml och ett <strong>kryddmått (krm)</strong> till 1 ml i många recept och tabeller — samma princip som i vår <a href="/mattomvandlare" class="text-blue-600 underline hover:text-blue-800">måttomvandlare</a>. Det betyder att tre matskedar vätska motsvarar ungefär 4,5 cl eller 0,45 dl, vilket är lätt att kontrollera om du föredrar mått med dl-skala.</p>

      <h2>Varför ”2 dl mjöl” inte alltid är samma antal gram</h2>

      <p><strong>Deciliter mäter volym</strong>, medan mjöl, socker och liknande väger olika mycket per deciliter beroende på hur packat måttet är och vilket sorts mjöl det är. På sidan finns kort referens till typiska omräkningar (t.ex. strösocker och vetemjöl) — men när precision spelar roll (macarons, bröd, chokladtårta) är våg och gram ofta säkrast.</p>

      <h2>Använd måttomvandlaren i vardagen</h2>

      <p>Sammanfattningsvis: svenska köksmått är byggda så att du kan hoppa mellan kg–hg–g och l–dl–cl–ml samt msk–tsk–krm utan att memorera allt. <a href="/mattomvandlare" class="text-blue-600 underline hover:text-blue-800">Måttomvandlaren</a> gör samma jobb på sekunder när du står med en sked i ena handen och receptet i den andra.</p>
    `
  },
  {
    id: 'amerikansk-mattomvandlaren',
    title: 'Amerikansk måttomvandlare: cups, pints och fluid ounces till deciliter',
    description: 'Amerikanska recept använder andra enheter. Här är skillnaden mellan cup, pint och fluid ounce — och hur du får rätt volym i deciliter med kopparkalkylatorn.',
    date: '2026-04-12',
    readTime: '6 min',
    category: 'Matlagning',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
    link: '/blog/amerikansk-mattomvandlaren',
    author: 'Pontus',
    content: `
      <p><b>Översätter du recept från USA till svenska mått stöter du snabbt på cup, tablespoon och fluid ounce</b> — enheter som inte alls motsvarar ”en kopp” från köksskåpet eller en svensk matsked rakt av. Amerikanska volymenheter är definierade utifrån US customary system, och en vanlig kopp i bakrecept (”cup”) är ett fast mått, inte valfri kaffemugg.</p>

      <p>Med <a href="/kopparkalkylator" class="text-blue-600 underline hover:text-blue-800">amerikansk måttomvandlare (kopparkalkylatorn)</a> får du omräkning direkt till <strong>deciliter</strong>, så du kan mäta med det du redan har hemma.</p>

      <h2>Vad är en US cup i praktiken?</h2>

      <p>En <strong>amerikansk standard ”cup”</strong> för matlagning motsvarar i vår kalkylator ungefär 2,37 dl (värdet följer samma definition som på själva verktyget). Det är det första du bör låsa fast när du bakar efter amerikanska bloggar eller kokböcker — annars blir deg och smet fel i proportion.</p>

      <h2>Tablespoon och teaspoon — inte samma som msk och tsk alltid</h2>

      <p>Amerikanska <strong>tablespoon (Tbsp)</strong> och <strong>teaspoon (tsp)</strong> är egna standardmått. I kalkylatorn är de omräknade till deciliter i linje med US mått (t.ex. matsked och tesked som egna poster), så du slipper gissa om receptet menar ”level” eller ”heaping” — utgå från angivna mängder och justera smak om det behövs.</p>

      <h2>Pint, quart och gallon — vätskor i större skala</h2>

      <p>För soppor, lemonad och storkok förekommer <strong>liquid pint</strong>, <strong>quart</strong> och <strong>gallon</strong>. Där skiljer sig också amerikanska vätskepinten från en imperial (brittisk) pint — därför är det viktigt att använda ett verktyg som följer <strong>US definitions</strong>, vilket <a href="/kopparkalkylator" class="text-blue-600 underline hover:text-blue-800">kopparkalkylatorn</a> är byggd för.</p>

      <p>Har du torra ingredienser angivna i <strong>dry pint</strong> är volymen annorlunda än för vätska; kalkylatorn har separat alternativ för det.</p>

      <h2>Fluid ounces (fl oz)</h2>

      <p><strong>Fluid ounce</strong> är ett volymmått, inte vikt. Många dryckes- och såsrecept anger fl oz — slå dem till dl i <a href="/kopparkalkylator" class="text-blue-600 underline hover:text-blue-800">amerikansk måttomvandlare</a> innan du häller.</p>

      <h2>Så jobbar du effektivt med amerikanska recept</h2>

      <ol>
        <li>Identifiera vilken enhet receptet använder (cup, Tbsp, fl oz, med mera).</li>
        <li>Mata in mängden i <a href="/kopparkalkylator" class="text-blue-600 underline hover:text-blue-800">kopparkalkylatorn</a> och läs av deciliter.</li>
        <li>Kom ihåg att ingredienser som mjöl eller smör i cups fortfarande kan behöva våg för bästa resultat — volym i cup säger hur mycket du fyller måttet, inte alltid exakt densitet.</li>
      </ol>

      <p>Vill du bara konvertera mellan svenska enheter (kg, dl, msk) använder du i stället <a href="/mattomvandlare" class="text-blue-600 underline hover:text-blue-800">måttomvandlaren för svenska mått</a>. Tillsammans täcker de två verktygen de vanligaste situationerna när recept och kökslåda inte talar samma språk.</p>

      <p><a href="/kopparkalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna amerikansk måttomvandlare</a> och prova med ditt nästa recept.</p>
    `
  },
  {
    id: 'lopning-var-tempo-och-mal',
    title: 'Vår och löprunda: sätt rätt tempo när säsongen vänder',
    description: 'Ljusare kvällar lockar många ut – men spring för snabbt för tidigt gör ofta mer skada än nytta. Tips för mjuk start, vad löptempo betyder – och hur du räknar ut minuter per kilometer och km/h med temporäknaren.',
    date: '2026-04-10',
    readTime: '6 min',
    category: 'Träning',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    link: '/blog/lopning-var-tempo-och-mal',
    author: 'Pontus',
    content: `
      <p><b>När våren närmar sig</b> märker du det ofta inte bara på temperaturen utan på humöret och kvällarna: ljusare längre och en känsla av att vilja ”bara sticka iväg lite”. Samtidigt har många inte sprungit regelbundet sedan hösten – eller så är det första säsongen på asfalt eller grus för länge sedan. Tyvärr är just det ett vanligt tillfälle att öka för snabbt, vilket ofta ger värk eller att motivationen tar slut innan rutinen är etablerad.</p>

      <p>Här är en enkel riktlinje: <strong>långsiktig löpning vinner oftast på rimlig puls och tolerabel ansträngning</strong>, inte på att första månaden kännas som en tävling. Och för att konkret förstå hur hårt du faktiskt sprang – eller vill springa nästa tur – hjälper det att sätta tempo i konkreta siffror: tid per kilometer och hastighet i km/h.</p>

      <p>Det är precis vad vår <a href="/tempokalkylator" class="text-blue-600 underline hover:text-blue-800">Tempokalkylator</a> hjälper dig med: du anger <strong>distans</strong> (km) och <strong>tiden</strong> du låg eller planerar att ligga ute och får då tempo i minuter och sekunder per kilometer samt genomsnittlig hastighet.</p>

      <h2>Varför tempo spelar roll i början av säsongen</h2>

      <p>Ben, senor och ditt hjärta anpassar sig inte lika fort som motivationen gör. De flesta får mest ut av att kombinera <strong>korta, lätta rundor med några vilodagar mellan snäppet lite längre pass</strong> – inte av att jämföra sig med vad grannen eller appen säger är ”bra tid” för fem kilometer första aprilveckorna.</p>

      <p>Tempo är därför ett neutralt sätt att prata om ansträngning: du kan säga ”jag låg nära åtta minuter per kilometer idag och det kändes behagligt” utan att det handlar om prestation eller formkurvor du inte själv valt.</p>

      <h2>Så här tänker tempokalkylatorn – distans och tid</h2>

      <p>Om du sprungit en rundsväng och vet att den var cirka åtta kilometer på trekvart behöver du inte räkna i huvudet. Skriv bara:</p>

      <ul>
        <li><strong>Distans:</strong> 8 km</li>
        <li><strong>Tid:</strong> till exempel 0 timmar 45 minuter 0 sekunder</li>
      </ul>

      <p>då visas ditt tempo per kilometer och din snitthastighet. Vill du förbereda ett nytt mål på samma sätt – till exempel hur det känns att gå nedåt eller uppåt från förra säsongens tider – gör du på samma sätt och jämför siffrorna.</p>

      <p><a href="/tempokalkylator" class="text-blue-600 underline hover:text-blue-800">Öppna Tempokalkylatorn</a>, fyll i dina egna mått och tryck på ”Beräkna tempo” för att se resultatet direkt på skärmen – inklusive exempeltider för lite längre sträckor utifrån samma fart.</p>

      <h2>Dela länken med träningskompisar</h2>

      <p>När du har räknat fram ett läge du vill jämföra eller planera rundor kring finns en <strong>dela-funktion</strong> på sidan som kopierar en länk med dina angivna värden, så mottagaren ser samma inställning. Praktiskt om ni lägger upp säsongsinformation i en chattrad eller löparklubbens forum.</p>

      <h2>Kort checklista innan du ökar fart eller distans nästa gång</h2>

      <ul>
        <li><strong>Håller du dig till behaglig andning?</strong> Om du måste krysta för att kunna säga en hel mening mitt i passet kan det vara dags att mjuka upp farten.</li>
        <li><strong>Tänker du kontinuitet före maximal mängd?</strong> Regelbundna, lagom långa pass slår oftast många slitna pass direkt efter varandra.</li>
        <li><strong>Öka bara ena axeln åt gången:</strong> antingen lite längre sträcka, eller lite snabbare – sällan båda under samma veckor.</li>
      </ul>

      <h2>Ett förbehåll</h2>

      <p>Det här är <strong>allmän praktisk information och inspiration</strong> för hälsosam motionering, inte sjukvårdsrådgivning. Vid smärta som inte går över eller om du inte vet om du ska intensifiera aktivitet finns det all anledning att prata med legitimerad vård eller fysioterapeut först.</p>

      <h2>Slutsats</h2>

      <p>Vår och sommar gör det lätt att vilja sätta igång – och det är härligt – men säsongens bästa resultat är ofta den som inte bränner dig i april. Använd <a href="/tempokalkylator" class="text-blue-600 underline hover:text-blue-800">Tempokalkylatorn</a> för att göra löptempot begripligt, planera mjuka steg framåt och hålla kollen på hur din snittid och hastighet faktiskt utvecklas.</p>
    `
  }
];

const extractInternalLinks = (html: string): string[] =>
  Array.from(html.matchAll(/href="(\/[^"]+)"/g)).map((match) => match[1]);

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getVisibleCalculators } = useFeatureFlags();
  
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

  const postUrl = `https://www.kalkylatorn.com${post.link}`;
  const visibleCalculators = getVisibleCalculators();
  const visibleCalculatorByPath = new Map(visibleCalculators.map((calculator) => [calculator.path, calculator]));
  const linkedCalculatorPaths = Array.from(
    new Set(
      extractInternalLinks(post.content).filter((path) => visibleCalculatorByPath.has(path))
    )
  );

  const relatedCalculators = [
    ...linkedCalculatorPaths
      .map((path) => visibleCalculatorByPath.get(path))
      .filter((calculator): calculator is (typeof visibleCalculators)[number] => Boolean(calculator)),
    ...visibleCalculators.filter(
      (calculator) =>
        !linkedCalculatorPaths.includes(calculator.path) &&
        calculator.category === post.category
    ),
    ...visibleCalculators.filter(
      (calculator) =>
        !linkedCalculatorPaths.includes(calculator.path) &&
        calculator.category !== post.category
    ),
  ].slice(0, 4);

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.id !== post.id)
    .sort((a, b) => {
      const aSameCategory = a.category === post.category ? 1 : 0;
      const bSameCategory = b.category === post.category ? 1 : 0;
      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  const postSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'sv-SE',
        author: {
          '@type': 'Person',
          name: post.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'Kalkylatorn.com',
          url: 'https://www.kalkylatorn.com'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl
        },
        url: postUrl
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Hem',
            item: 'https://www.kalkylatorn.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogg',
            item: 'https://www.kalkylatorn.com/blog'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: postUrl
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={post.title}
        description={post.description}
        canonicalUrl={postUrl}
        type="article"
        imageUrl={post.image}
        schema={postSchema}
      />
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
            width={800}
            height={533}
            fetchPriority="high"
            decoding="async"
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

        <section className="mt-12 rounded-2xl border border-gray-200 bg-transparent p-6">
          <h2 className="text-xl font-bold text-gray-900">Relaterade kalkylatorer</h2>
          <p className="mt-2 text-gray-600">
            Testa fler verktyg som hjälper dig att räkna vidare på samma tema.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedCalculators.map((calculator) => (
              <Link
                key={calculator.id}
                to={calculator.path}
                className="rounded-lg border border-indigo-200 bg-white px-4 py-3 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                {calculator.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">Relaterade inlägg</h2>
          <div className="mt-4 space-y-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={relatedPost.link}
                className="block rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
              >
                <p className="text-sm text-indigo-700">{relatedPost.category}</p>
                <p className="mt-1 font-semibold text-gray-900">{relatedPost.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Author info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Book className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
              <p className="text-gray-600">Skribent på Kalkylatorn.com</p>
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
