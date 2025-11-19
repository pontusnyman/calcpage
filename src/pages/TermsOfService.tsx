import React from 'react';
import Layout from '../components/Layout';

const TermsOfService: React.FC = () => {
  return (
    <Layout
      seo={{
        title: 'Användarvillkor',
        description: 'Läs våra användarvillkor för att förstå reglerna och villkoren för användning av Kalkulatorn.se.',
        canonicalUrl: 'https://kalkulatorn.se/anvandarvillkor',
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Användarvillkor</h1>
            <p className="text-sm text-gray-500 mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Godkännande av villkor</h2>
                <p className="text-gray-700 mb-4">
                  Genom att komma åt och använda Kalkulatorn.se ("webbplatsen") godkänner du att vara bunden av dessa användarvillkor. 
                  Om du inte godkänner dessa villkor, vänligen använd inte webbplatsen.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Användning av tjänsten</h2>
                <p className="text-gray-700 mb-4">
                  Kalkulatorn.se tillhandahåller gratis onlinekalkylatorer för olika vardagliga beräkningar. Du får använda dessa kalkylatorer 
                  för personliga eller kommersiella ändamål, under förutsättning att:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Du använder kalkylatorerna i enlighet med dessa villkor</li>
                  <li>Du inte kopierar, modifierar eller distribuerar kalkylatorerna utan tillstånd</li>
                  <li>Du inte använder webbplatsen på något sätt som kan skada eller störa tjänsten</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellektuell egendom</h2>
                <p className="text-gray-700 mb-4">
                  Allt innehåll på Kalkulatorn.se, inklusive men inte begränsat till text, grafik, logotyper, ikoner, bilder och programvara, 
                  är ägda av eller licensierad till Kalkulatorn.se och är skyddat av svensk och internationell upphovsrättslagstiftning.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Användningsbegränsningar</h2>
                <p className="text-gray-700 mb-4">Du förbinder dig att inte:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Använda webbplatsen på något sätt som bryter mot tillämplig lagstiftning</li>
                  <li>Försöka få obehörig åtkomst till webbplatsen eller relaterade system</li>
                  <li>Använda automatiserade system för att komma åt webbplatsen utan tillstånd</li>
                  <li>Störa eller försöka störa webbplatsens funktionalitet</li>
                  <li>Kopiera eller replikera webbplatsens design eller funktionalitet</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Ansvar och garantier</h2>
                <p className="text-gray-700 mb-4">
                  Kalkulatorn.se tillhandahålls "som det är" utan garantier av något slag, vare sig uttryckliga eller underförstådda. 
                  Vi garanterar inte att:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Tjänsten kommer att vara oavbruten eller felfri</li>
                  <li>Resultaten från kalkylatorerna kommer att vara 100% korrekta i alla situationer</li>
                  <li>Webbplatsen kommer att vara säker eller fri från virus eller skadlig kod</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Kalkulatorerna är avsedda som hjälpmedel och bör inte ersätta professionell rådgivning. 
                  Vi ansvarar inte för eventuella beslut eller åtgärder som fattas baserat på resultat från kalkylatorerna.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Begränsning av ansvar</h2>
                <p className="text-gray-700 mb-4">
                  I den utsträckning som tillåts enligt lag, ska Kalkulatorn.se inte vara ansvarig för några direkta, indirekta, 
                  tillfälliga, följdskador eller förlust av vinst som uppstår från användning av eller oförmåga att använda webbplatsen.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Tredjepartslänkar</h2>
                <p className="text-gray-700 mb-4">
                  Vår webbplats kan innehålla länkar till tredjepartswebbplatser. Vi ansvarar inte för innehållet, 
                  integritetspraxis eller villkor för dessa webbplatser.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Annonser</h2>
                <p className="text-gray-700 mb-4">
                  Kalkulatorn.se visar annonser via Google AdSense. Vi ansvarar inte för innehållet i dessa annonser. 
                  Annonserna visas baserat på dina tidigare besök och andra faktorer. Du kan välja bort personaliserade annonser 
                  genom att besöka <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Google's annonsinställningar</a>.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>VIKTIGT:</strong> Klicka aldrig på annonser med avsikt att generera intäkter för oss. 
                  Detta är strängt förbjudet enligt Google AdSense policy och kan leda till permanent avstängning.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Ändringar av villkor</h2>
                <p className="text-gray-700 mb-4">
                  Vi förbehåller oss rätten att ändra dessa användarvillkor när som helst. Ändringar träder i kraft omedelbart 
                  efter publicering på webbplatsen. Din fortsatta användning av webbplatsen efter ändringar innebär att du godkänner de nya villkoren.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Tillämplig lag</h2>
                <p className="text-gray-700 mb-4">
                  Dessa användarvillkor regleras av och tolkas i enlighet med svensk lag. 
                  Eventuella tvister ska lösas i svenska domstolar.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Om du har frågor om dessa användarvillkor, kontakta oss på:
                </p>
                <p className="text-gray-700">
                  Email: <a href="mailto:kontakt@kalkylatorn.com" className="text-indigo-600 hover:text-indigo-800">kontakt@kalkylatorn.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;

