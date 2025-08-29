import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import '../styles/globals.css';

const mdxComponents = {
  // You can customize MDX components here
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6 text-green-400" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mb-4 mt-8 text-white" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mb-3 mt-6 text-white" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
  code: (props: any) => (
    <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 border border-gray-700 p-4 rounded overflow-x-auto mb-4" {...props} />
  ),
  ul: (props: any) => <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-300" {...props} />
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  );
}