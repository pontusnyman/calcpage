export interface BlogPostLinkMeta {
  id: string;
  title: string;
  link: string;
  category: string;
  date: string;
}

export const BLOG_POST_LINKS: BlogPostLinkMeta[] = [
  {
    id: 'viktminskningskalkylator-guide',
    title: 'Viktminskningskalkylator: sätta kalorimål för hållbar viktnedgång',
    link: '/blog/viktminskningskalkylator-guide',
    category: 'Hälsa',
    date: '2026-05-12',
  },
  {
    id: 'bmrkalkylator-guide',
    title: 'BMR-kalkylator: så får du fram din basalmetabolism',
    link: '/blog/bmrkalkylator-guide',
    category: 'Hälsa',
    date: '2026-05-09',
  },
  {
    id: 'loparkalkylator-sluttid-och-tempo',
    title: 'Löparkalkylator: beräkna sluttid, tempo per km och mellantider inför ditt lopp',
    link: '/blog/loparkalkylator-sluttid-och-tempo',
    category: 'Träning',
    date: '2026-05-04',
  },
  {
    id: 'kaloribehov-bmr-och-tdee',
    title: 'Kaloribehov: vad är BMR och TDEE — och hur räknar du ut dem?',
    link: '/blog/kaloribehov-bmr-och-tdee',
    category: 'Hälsa',
    date: '2026-04-30',
  },
  {
    id: 'ranta-pa-ranta',
    title: 'Ränta på ränta – den enkla principen som bygger stora förmögenheter över tid',
    link: '/blog/ranta-pa-ranta',
    category: 'Ekonomi',
    date: '2024-12-15',
  },
  {
    id: 'personal-finance-101',
    title: 'Grunderna i privatekonomi: En nybörjarguide',
    link: '/blog/personal-finance-101',
    category: 'Ekonomi',
    date: '2024-03-15',
  },
  {
    id: 'healthy-sleep-habits',
    title: 'Så optimerar du din sömn för bättre hälsa',
    link: '/blog/healthy-sleep-habits',
    category: 'Hälsa',
    date: '2024-03-12',
  },
  {
    id: 'lanekostnad-guide',
    title: 'Vad kostar ditt privatlån – och hur räknar du ut det?',
    link: '/blog/lanekostnad-guide',
    category: 'Ekonomi',
    date: '2025-12-02',
  },
  {
    id: 'savings-strategies',
    title: 'Smarta sparstrategier för olika livssituationer',
    link: '/blog/savings-strategies',
    category: 'Ekonomi',
    date: '2025-12-03',
  },
  {
    id: 'fasta-24-till-96-timmar',
    title: 'Fasta från 24 till 96 timmar: vad händer i kroppen och vilka kan fördelarna vara?',
    link: '/blog/fasta-24-till-96-timmar',
    category: 'Hälsa',
    date: '2026-04-30',
  },
  {
    id: 'bmi-vad-det-ar-och-kalkylatorn',
    title: 'BMI: vad det är, hur det räknas — och hur vår kalkylator tolkar resultatet',
    link: '/blog/bmi-vad-det-ar-och-kalkylatorn',
    category: 'Hälsa',
    date: '2026-04-20',
  },
  {
    id: 'svenska-mattomvandlaren',
    title: 'Måttomvandlare: så räknar du om svenska vikt- och volymmått i köket',
    link: '/blog/svenska-mattomvandlaren',
    category: 'Matlagning',
    date: '2026-04-15',
  },
  {
    id: 'amerikansk-mattomvandlaren',
    title: 'Amerikansk måttomvandlare: cups, pints och fluid ounces till deciliter',
    link: '/blog/amerikansk-mattomvandlaren',
    category: 'Matlagning',
    date: '2026-04-12',
  },
  {
    id: 'lopning-var-tempo-och-mal',
    title: 'Vår och löprunda: sätt rätt tempo när säsongen vänder',
    link: '/blog/lopning-var-tempo-och-mal',
    category: 'Träning',
    date: '2026-04-10',
  },
];

const BLOG_TO_CALCULATORS: Record<string, string[]> = {
  'viktminskningskalkylator-guide': ['/viktminskningskalkylator', '/kalorikalkylator'],
  'bmrkalkylator-guide': ['/bmrkalkylator', '/kalorikalkylator'],
  'loparkalkylator-sluttid-och-tempo': ['/loparkalkylator', '/tempokalkylator'],
  'kaloribehov-bmr-och-tdee': ['/kalorikalkylator', '/bmrkalkylator'],
  'ranta-pa-ranta': ['/rantakalkylator', '/sparmalskalkylator'],
  'personal-finance-101': ['/rantakalkylator', '/lanekalkylator', '/bolanekalkylator', '/sparmalskalkylator'],
  'healthy-sleep-habits': ['/sovkalkylator'],
  'lanekostnad-guide': ['/lanekalkylator'],
  'savings-strategies': ['/sparmalskalkylator', '/rantakalkylator'],
  'fasta-24-till-96-timmar': ['/fastekalkylator'],
  'bmi-vad-det-ar-och-kalkylatorn': ['/bmikalkylator'],
  'svenska-mattomvandlaren': ['/mattomvandlare'],
  'amerikansk-mattomvandlaren': ['/kopparkalkylator', '/mattomvandlare'],
  'lopning-var-tempo-och-mal': ['/tempokalkylator', '/loparkalkylator'],
};

const CALCULATOR_TO_BLOGS = Object.entries(BLOG_TO_CALCULATORS).reduce<Record<string, string[]>>(
  (acc, [blogId, calculatorPaths]) => {
    calculatorPaths.forEach((path) => {
      acc[path] = acc[path] || [];
      acc[path].push(blogId);
    });
    return acc;
  },
  {}
);

const sortByNewest = (a: BlogPostLinkMeta, b: BlogPostLinkMeta) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const getRelatedCalculatorPathsForBlogPost = (blogPostId: string): string[] =>
  BLOG_TO_CALCULATORS[blogPostId] || [];

export const getRelatedBlogPostIdsForCalculator = (calculatorPath: string): string[] =>
  CALCULATOR_TO_BLOGS[calculatorPath] || [];

export const getRelatedBlogPostsForCalculator = (calculatorPath: string): BlogPostLinkMeta[] => {
  const ids = getRelatedBlogPostIdsForCalculator(calculatorPath);
  return BLOG_POST_LINKS.filter((post) => ids.includes(post.id)).sort(sortByNewest);
};
