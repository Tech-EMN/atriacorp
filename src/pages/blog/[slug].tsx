// Arquivo: pages/blog/[slug].tsx
import { GraphQLClient, gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// --- INÍCIO DA CORREÇÃO ---
// 1. Definimos o "molde" para os detalhes de um post
interface PostDetails {
  title: string;
  content: string;
}

// 2. Definimos o "molde" para a resposta completa da API
interface SinglePostData {
  post: PostDetails;
}

// 3. Molde para a lista de todos os slugs (para getStaticPaths)
interface AllSlugsData {
    posts: {
        nodes: {
            slug: string;
        }[];
    };
}
// --- FIM DA CORREÇÃO ---

// Tipamos a propriedade 'post' que o componente recebe
export default function BlogPostPage({ post }: { post: PostDetails }) {
  if (!post) { return <div>Post não encontrado!</div>; }

  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-800">{post.title}</h1>
        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}

interface IParams extends ParsedUrlQuery { slug: string; }

const graphQLClient = new GraphQLClient(process.env.WORDPRESS_GRAPHQL_ENDPOINT || '');

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
      }
    }
  `;
  const variables = { slug };

  // --- INÍCIO DA CORREÇÃO ---
  const data = await graphQLClient.request<SinglePostData>(query, variables);
  // --- FIM DA CORREÇÃO ---

  return {
    props: { post: data.post },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query GetAllSlugs {
      posts {
        nodes {
          slug
        }
      }
    }
  `;
  
  // --- INÍCIO DA CORREÇÃO ---
  const data = await graphQLClient.request<AllSlugsData>(query);
  // --- FIM DA CORREÇÃO ---

  const paths = data.posts.nodes.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
};