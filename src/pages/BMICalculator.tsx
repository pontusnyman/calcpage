import { useEffect, useState } from 'react';
import { ArrowLeft, Scale, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculatorSEO } from '../seo/calculatorSEO';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCalculatorShare } from '../hooks/useCalculatorShare';
import ShareButton from '../components/ShareButton';
import { getNumberParam, getUrlParams } from '../utils/urlParams';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  description: string;
  healthRisks: string[];
  recommendations: string[];
}

const bmiSegments = [
  { label: 'Undervikt', range: '< 18.5', color: '#3B82F6', width: '25%' },
  { label: 'Normalvikt', range: '18.5-24.9', color: '#22C55E', width: '25%' },
  { label: 'Övervikt', range: '25-29.9', color: '#EAB308', width: '25%' },
  { label: 'Fetma', range: '>= 30', color: '#EF4444', width: '25%' }
];

const BMICalculator = () => {
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('70');
  const [result, setResult] = useState<BMIResult | null>(null);
  const location = useLocation();
  const seo = calculatorSEO[location.pathname];
  const healthyBmiMin = 18.5;
  const healthyBmiMax = 24.9;
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);
  const hasValidInputs = Number.isFinite(parsedHeight) && Number.isFinite(parsedWeight) && parsedHeight > 0 && parsedWeight > 0;
  const heightInMeters = hasValidInputs ? parsedHeight / 100 : 0;
  const healthyWeightMin = healthyBmiMin * heightInMeters * heightInMeters;
  const healthyWeightMax = healthyBmiMax * heightInMeters * heightInMeters;
  const { handleShare } = useCalculatorShare({
    params: {
      height,
      weight
    }
  });

  const getBMICategory = (bmi: number): BMIResult => {
    if (bmi < 18.5) {
      return {
        bmi,
        category: 'Undervikt',
        color: '#3B82F6', // Blue
        description: 'Du har ett BMI som klassas som undervikt.',
        healthRisks: [
          'Nedsatt immunförsvar',
          'Näringsbrist',
          'Försämrad sårläkning',
          'Menstruationsrubbningar'
        ],
        recommendations: [
          'Öka kaloriintaget gradvis',
          'Ät näringsrik mat',
          'Konsultera läkare eller dietist',
          'Regelbunden styrketräning'
        ]
      };
    } else if (bmi < 25) {
      return {
        bmi,
        category: 'Normalvikt',
        color: '#22C55E', // Green
        description: 'Du har ett BMI inom normalviktsspannet.',
        healthRisks: [
          'Du har inga hälsorisker',
        ],
        recommendations: [
          'Fortsätt med hälsosamma vanor',
          'Regelbunden motion',
          'Balanserad kost',
          'Tillräckligt med sömn'
        ]
      };
    } else if (bmi < 30) {
      return {
        bmi,
        category: 'Övervikt',
        color: '#EAB308', // Yellow
        description: 'Du har ett BMI som klassas som övervikt.',
        healthRisks: [
          'Ökad risk för hjärt-kärlsjukdomar',
          'Förhöjt blodtryck',
          'Typ 2-diabetes',
          'Ledproblem'
        ],
        recommendations: [
          'Öka fysisk aktivitet',
          'Se över kostvanor',
          'Regelbundna måltider',
          'Stresshantering'
        ]
      };
    } else {
      return {
        bmi,
        category: 'Fetma',
        color: '#EF4444', // Red
        description: 'Du har ett BMI som klassas som fetma.',
        healthRisks: [
          'Hög risk för hjärt-kärlsjukdomar',
          'Ökad risk för vissa cancerformer',
          'Sömnapné',
          'Belastningsskador'
        ],
        recommendations: [
          'Kontakta sjukvården för rådgivning',
          'Gradvis livsstilsförändring',
          'Regelbunden motion',
          'Kostomläggning med professionell hjälp'
        ]
      };
    }
  };

  const calculateBMI = () => {
    if (!hasValidInputs) {
      setResult(null);
      return;
    }

    const heightInMeters = parsedHeight / 100;
    const bmi = parsedWeight / (heightInMeters * heightInMeters);
    setResult(getBMICategory(bmi));
  };

  useEffect(() => {
    const params = getUrlParams();
    if (!params.has('height') && !params.has('weight')) return;

    const sharedHeight = Math.max(1, Math.min(300, getNumberParam(params, 'height', 170)));
    const sharedWeight = Math.max(1, Math.min(500, getNumberParam(params, 'weight', 70)));
    const sharedHeightInMeters = sharedHeight / 100;
    const sharedBmi = sharedWeight / (sharedHeightInMeters * sharedHeightInMeters);

    setHeight(String(sharedHeight));
    setWeight(String(sharedWeight));
    setResult(getBMICategory(sharedBmi));
  }, []);

  return (
    <Layout seo={seo}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tillbaka till kalkylatorer
          </Link>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Scale className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">BMI Kalkylator</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beräkna ditt Body Mass Index (BMI) för att få en uppfattning om din kroppsvikt i förhållande till din längd
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Längd (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setHeight('');
                        return;
                      }

                      const nextHeight = Number(e.target.value);
                      if (Number.isNaN(nextHeight)) return;
                      setHeight(String(Math.max(1, Math.min(300, nextHeight))));
                    }}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vikt (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setWeight('');
                        return;
                      }

                      const nextWeight = Number(e.target.value);
                      if (Number.isNaN(nextWeight)) return;
                      setWeight(String(Math.max(1, Math.min(500, nextWeight))));
                    }}
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={calculateBMI}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Beräkna BMI
                </button>
              </div>
            </div>

            {result && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Info className="w-6 h-6 mr-2" style={{ color: result.color }} />
                      Hälsorisker
                    </h2>
                    <ul className="space-y-2">
                      {result.healthRisks.map((risk, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: result.color }}></span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-xl font-semibold mb-4">Rekommendationer</h2>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: result.color }}></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
                  <div className="p-6 rounded-xl" style={{ backgroundColor: `${result.color}15` }}>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: result.color }}>
                        {result.bmi.toFixed(1)}
                      </div>
                      <div className="text-xl font-semibold mb-2" style={{ color: result.color }}>
                        {result.category}
                      </div>
                      <p className="text-gray-600">{result.description}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-blue-100 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">BMI-skala</h3>
                    <div className="h-3 w-full rounded-full overflow-hidden flex" aria-label="BMI kategoriskala">
                      {bmiSegments.map((segment) => (
                        <div
                          key={segment.label}
                          style={{ backgroundColor: segment.color, width: segment.width }}
                          title={`${segment.label}: ${segment.range}`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      {bmiSegments.map((segment) => (
                        <div key={`${segment.label}-label`} className="text-center">
                          <p className="text-sm font-medium text-gray-800">{segment.label}</p>
                          <p className="text-xs text-gray-500">{segment.range}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-gray-700">
                      Hälsosamt BMI ligger vanligtvis mellan{' '}
                      <span className="font-semibold text-green-700">18.5-24.9</span>.
                    </p>
                  </div>

                  {result.bmi > healthyBmiMax && (
                    <p className="text-sm text-gray-700 bg-green-50 border border-green-100 rounded-lg p-4">
                      För att nå grön nivå (normalvikt) behöver du väga cirka{' '}
                      <span className="font-semibold text-green-700">{healthyWeightMax.toFixed(1)} kg</span>, vilket
                      är ungefär <span className="font-semibold">{(parsedWeight - healthyWeightMax).toFixed(1)} kg</span>{' '}
                      mindre än nu.
                    </p>
                  )}

                  {result.bmi < healthyBmiMin && (
                    <p className="text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded-lg p-4">
                      För att nå grön nivå (normalvikt) behöver du väga minst{' '}
                      <span className="font-semibold text-green-700">{healthyWeightMin.toFixed(1)} kg</span>, vilket
                      är ungefär <span className="font-semibold">{(healthyWeightMin - parsedWeight).toFixed(1)} kg</span>{' '}
                      mer än nu.
                    </p>
                  )}

                  {result.bmi >= healthyBmiMin && result.bmi <= healthyBmiMax && (
                    <p className="text-sm text-gray-700 bg-green-50 border border-green-100 rounded-lg p-4">
                      Du är redan i den gröna BMI-zonen. Fortsätt med dina hälsosamma vanor.
                    </p>
                  )}

                  <ShareButton onShare={handleShare} color="blue" />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold mb-4">Om BMI</h2>
            <p className="text-gray-600 mb-4">
              BMI är ett mått som används för att bedöma om en person har undervikt, normalvikt, övervikt eller fetma. 
              Det är dock viktigt att komma ihåg att BMI är ett grovt mått som inte tar hänsyn till faktorer som 
              muskelmassa, kroppsbyggnad, ålder eller kön.
            </p>
            <p className="text-gray-600">
              För en mer komplett hälsobedömning rekommenderas att du konsulterar sjukvårdspersonal som kan ta 
              hänsyn till din individuella situation.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BMICalculator;