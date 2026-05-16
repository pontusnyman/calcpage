import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout
      seo={{
        title: 'Integritetspolicy',
        description: 'Läs vår integritetspolicy för att förstå hur vi samlar in, använder och skyddar din personliga information.',
        canonicalUrl: 'https://www.kalkylatorn.com/integritetspolicy',
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Integritetspolicy</h1>
            <p className="text-sm text-gray-500 mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduktion</h2>
                <p className="text-gray-700 mb-4">
                  Kalkylatorn.com ("vi", "oss", "vår") respekterar din integritet och är engagerade i att skydda dina personuppgifter. 
                  Denna integritetspolicy förklarar hur vi samlar in, använder, delar och skyddar din information när du använder vår webbplats.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information vi samlar in</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Automatiskt insamlad information</h3>
                <p className="text-gray-700 mb-4">
                  När du besöker vår webbplats kan vi automatiskt samla in viss information, inklusive:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>IP-adress</li>
                  <li>Webbläsartyp och version</li>
                  <li>Operativsystem</li>
                  <li>Referrer-URL</li>
                  <li>Sidvisningar och klickbeteende</li>
                  <li>Tidpunkt för besök</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Cookies och liknande tekniker</h3>
                <p className="text-gray-700 mb-4">
                  Vi använder cookies och liknande spårningstekniker för att förbättra din upplevelse och analysera trafik.
                  Mer information finns i vår <a href="/cookiepolicy" className="text-indigo-600 hover:text-indigo-800">Cookie Policy</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Hur vi använder din information</h2>
                <p className="text-gray-700 mb-4">Vi använder den insamlade informationen för att:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Förbättra och underhålla vår webbplats</li>
                  <li>Analysera användningsmönster och trafik</li>
                  <li>Förbättra användarupplevelsen</li>
                  <li>Följa lagliga skyldigheter</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tredjepartstjänster</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Analystjänster</h3>
                <p className="text-gray-700 mb-4">
                  Vi kan använda tredjepartstjänster för analys och prestandamätning för att förstå hur webbplatsen används och hur tjänsten kan förbättras.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Dina rättigheter (GDPR)</h2>
                <p className="text-gray-700 mb-4">
                  Om du är bosatt i EU har du följande rättigheter enligt GDPR:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Rätt till tillgång:</strong> Du har rätt att få information om vilka personuppgifter vi har om dig</li>
                  <li><strong>Rätt till rättelse:</strong> Du kan begära att vi korrigerar felaktiga uppgifter</li>
                  <li><strong>Rätt till radering:</strong> Du kan begära att vi raderar dina personuppgifter</li>
                  <li><strong>Rätt till begränsning:</strong> Du kan begära att vi begränsar behandlingen av dina uppgifter</li>
                  <li><strong>Rätt till dataportabilitet:</strong> Du kan begära att få dina uppgifter i ett strukturerat format</li>
                  <li><strong>Rätt att invända:</strong> Du kan invända mot behandling av dina personuppgifter</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  För att utöva dessa rättigheter, kontakta oss på: <a href="mailto:kontakt@kalkylatorn.com" className="text-indigo-600 hover:text-indigo-800">kontakt@kalkylatorn.com</a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Dataskydd</h2>
                <p className="text-gray-700 mb-4">
                  Vi implementerar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstörelse. 
                  Dock kan ingen metod för överföring via internet eller elektronisk lagring vara 100% säker.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Lagring av data</h2>
                <p className="text-gray-700 mb-4">
                  Vi behåller dina personuppgifter endast så länge som det är nödvändigt för de ändamål som anges i denna policy, 
                  eller så länge som krävs enligt lag.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Ändringar av denna policy</h2>
                <p className="text-gray-700 mb-4">
                  Vi kan uppdatera denna integritetspolicy från tid till annan. Vi kommer att meddela dig om eventuella ändringar genom att publicera den nya policyn på denna sida 
                  och uppdatera "Senast uppdaterad"-datumet.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Om du har frågor om denna integritetspolicy, kontakta oss på:
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

export default PrivacyPolicy;

