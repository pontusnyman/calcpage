import React from 'react';
import { Calendar, Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import AdBanner from '../components/AdBanner';
import AdSidebar from '../components/AdSidebar';

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
    id: 'ranta-pa-ranta',
    title: 'Ränta på ränta – den enkla principen som bygger stora förmögenheter över tid',
    description: 'Ränta på ränta brukar kallas världens åttonde underverk – och det är lätt att förstå varför. Upptäck hur denna kraftfulla princip kan hjälpa dig bygga förmögenhet över tid.',
    date: '2024-12-01',
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
  // {
  //   id: 'savings-strategies',
  //   title: 'Smarta sparstrategier för olika livssituationer',
  //   description: 'Upptäck olika sparstrategier och hur du kan använda våra sparkalkylatorer för att nå dina ekonomiska mål.',
  //   date: '2024-03-03',
  //   readTime: '9 min',
  //   category: 'Ekonomi',
  //   image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=800',
  //   link: '/blog/savings-strategies'
  // }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav currentPage="blog" />

      <AdBanner position="top" adSlot="YOUR_TOP_BANNER_AD_SLOT_ID" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <AdSidebar adSlot="YOUR_SIDEBAR_AD_SLOT_ID" />

          <div className="lg:col-span-8">
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
          </div>

          <AdSidebar adSlot="YOUR_SIDEBAR_AD_SLOT_ID" />
        </div>
      </main>

      <AdBanner position="bottom" adSlot="YOUR_BOTTOM_BANNER_AD_SLOT_ID" />
    </div>
  );
};

export default Blog;