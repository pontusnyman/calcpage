import React from 'react';
import { Calendar, Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SEO from '../components/SEO';
import { BLOG_POSTS, type BlogPost } from '../content/blogPosts';

const BLOG_INDEX_POST_IDS = [
  'goteborgsvarvet-2026-guide',
  'viktminskningskalkylator-guide',
  'bmrkalkylator-guide',
  'loparkalkylator-sluttid-och-tempo',
  'fasta-24-till-96-timmar',
  'kaloribehov-bmr-och-tdee',
  'bmi-vad-det-ar-och-kalkylatorn',
  'svenska-mattomvandlaren',
  'amerikansk-mattomvandlaren',
  'lopning-var-tempo-och-mal',
  'savings-strategies',
  'lanekostnad-guide',
  'ranta-pa-ranta',
];

const blogPosts: BlogPost[] = BLOG_POSTS.filter((post) => BLOG_INDEX_POST_IDS.includes(post.id));

const Blog: React.FC = () => {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Kalkylatorn.com Blogg',
    description: 'Artiklar om ekonomi, hälsa, träning och smartare vardagsberäkningar.',
    url: 'https://www.kalkylatorn.com/blog',
    inLanguage: 'sv-SE',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      image: post.image,
      url: `https://www.kalkylatorn.com${post.link}`
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Blogg"
        description="Läs guider och artiklar om kalkyler, ekonomi, hälsa och träning på Kalkylatorn.com."
        canonicalUrl="https://www.kalkylatorn.com/blog"
        schema={blogSchema}
      />
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
                width={800}
                height={533}
                loading="lazy"
                decoding="async"
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