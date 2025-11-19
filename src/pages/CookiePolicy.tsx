import React from 'react';
import Layout from '../components/Layout';

const CookiePolicy: React.FC = () => {
  return (
    <Layout
      seo={{
        title: 'Cookie Policy',
        description: 'Läs vår cookie policy för att förstå hur vi använder cookies och liknande tekniker på vår webbplats.',
        canonicalUrl: 'https://kalkulatorn.se/cookiepolicy',
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <p className="text-sm text-gray-500 mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Vad är cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies är små textfiler som placeras på din enhet (dator, surfplatta eller mobil) när du besöker en webbplats. 
                  Cookies gör det möjligt för webbplatsen att komma ihåg dina åtgärder och preferenser under en viss tidsperiod, 
                  så att du inte behöver ange dem igen varje gång du återvänder till webbplatsen eller navigerar från en sida till en annan.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hur använder vi cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Kalkulatorn.se använder cookies för följande ändamål:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>För att förbättra användarupplevelsen</li>
                  <li>För att analysera webbplatstrafik och användningsmönster</li>
                  <li>För att visa relevanta annonser via Google AdSense</li>
                  <li>För att komma ihåg dina preferenser</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Typer av cookies vi använder</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Nödvändiga cookies</h3>
                <p className="text-gray-700 mb-4">
                  Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt. De kan inte stängas av i våra system.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Analytiska cookies</h3>
                <p className="text-gray-700 mb-4">
                  Dessa cookies hjälper oss att förstå hur besökare interagerar med vår webbplats genom att samla in och rapportera information anonymt.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Marknadsföringscookies</h3>
                <p className="text-gray-700 mb-4">
                  Dessa cookies används för att spåra besökare på olika webbplatser. Målet är att visa annonser som är relevanta 
                  och engagerande för den enskilda användaren och därmed mer värdefulla för utgivare och tredjepartsannonsörer.
                </p>
                <p className="text-gray-700 mb-4">
                  Vi använder Google AdSense, som använder cookies för att visa annonser baserat på dina tidigare besök på vår webbplats 
                  eller andra webbplatser. Du kan välja bort personaliserade annonser genom att besöka 
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800"> Google's annonsinställningar</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tredjepartscookies</h2>
                <p className="text-gray-700 mb-4">
                  Vissa cookies placeras av tredje part som visas på vår webbplats. Dessa inkluderar:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Google AdSense:</strong> Används för att visa annonser. Läs mer i <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Google's integritetspolicy</a></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Hantera dina cookie-inställningar</h2>
                <p className="text-gray-700 mb-4">
                  Du kan kontrollera och/eller ta bort cookies som du vill. Du kan ta bort alla cookies som redan finns på din dator 
                  och du kan ställa in de flesta webbläsare så att de förhindrar att cookies placeras.
                </p>
                <p className="text-gray-700 mb-4">
                  Observera att om du gör detta kan du behöva justera vissa inställningar manuellt varje gång du besöker en webbplats 
                  och vissa tjänster och funktioner kanske inte fungerar.
                </p>
                <p className="text-gray-700 mb-4">
                  För att hantera cookies i din webbläsare, följ instruktionerna i din webbläsares hjälpfil:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/sv/kb/cookies-information-webbplatser-lagrar-pa-din-dator" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Safari</a></li>
                  <li><a href="https://support.microsoft.com/sv-se/microsoft-edge/ta-bort-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Microsoft Edge</a></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie Consent</h2>
                <p className="text-gray-700 mb-4">
                  När du först besöker vår webbplats kommer du att se en cookie-meddelande där du kan välja att acceptera eller avvisa 
                  icke-nödvändiga cookies. Du kan ändra dina inställningar när som helst.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Om du har frågor om vår användning av cookies, kontakta oss på:
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

export default CookiePolicy;

