import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'React ASCII UI' }) => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Getting Started', href: '/getting-started' },
    { name: 'Components', href: '/components' },
    { name: 'Roadmap', href: '/roadmap' }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="React ASCII UI - Complete component library for ASCII-style UIs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white font-mono">
        {/* Navigation */}
        <nav className="border-b border-white bg-black sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold hover:text-green-400">
                  React ASCII UI
                </Link>
              </div>
              
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 hover:text-green-400 before:content-['['] after:content-[']'] hover:before:text-green-400 hover:after:text-green-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-400">
              <p>Built with ❤️ for the ASCII aesthetic revolution</p>
              <p className="mt-2">© 2024 React ASCII UI. MIT License.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;