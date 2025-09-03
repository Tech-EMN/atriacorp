// Arquivo: pages/blog/index.tsx
import Link from 'next/link';
import { GraphQLClient, gql } from 'graphql-request';
import { GetStaticProps } from 'next';

// --- INÍCIO DA CORREÇÃO ---
// 1. Definimos o "molde" para um único post na lista
interface Post {
  title: string;
  slug: string;
}

// 2. Definimos o "molde" para a resposta completa da API
interface AllPostsData {
  posts: {
    nodes: Post[];
  };
}
// --- FIM DA CORREÇÃO ---

// Tipamos a propriedade 'posts' que o componente recebe
export default function BlogIndexPage({ posts }: { posts: Post[] }) {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800">Nosso Blog</h1>
      <div className="max-w-3xl mx-auto grid gap-10">
        {posts.map((post) => (
          // A propriedade 'key' deve ser única, usamos o slug
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="p-6 border rounded-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2 text-blue-600">{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const graphQLClient = new GraphQLClient(process.env.WORDPRESS_GRAPHQL_ENDPOINT || '');

  const query = gql`
    query GetPosts {
      posts {
        nodes {
          title
          slug
        }
      }
    }
  `;
  
  // --- INÍCIO DA CORREÇÃO ---
  // 3. Dizemos ao 'request' para usar o nosso "molde" AllPostsData
  const data = await graphQLClient.request<AllPostsData>(query);
  // --- FIM DA CORREÇÃO ---

  return {
    props: {
      posts: data.posts.nodes,
    },
    revalidate: 60,
  };
};