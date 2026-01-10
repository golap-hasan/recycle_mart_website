import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/theme/theme-provider';
import UserProvider from '@/context/UserContext';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Recycle Mart - Buy & Sell Everything in Bangladesh',
    template: '%s | Recycle Mart',
  },
  description:
    "Recycle Mart is Bangladesh's most trusted online marketplace. Buy and sell used electronics, vehicles, property, home appliances, and more. Safe, fast, and easy local trading.",
  keywords: [
    'Recycle Mart',
    'Online Marketplace',
    'Buy and Sell',
    'Bangladesh',
    'Used Electronics',
    'Second hand cars',
    'Property for sale',
    'Dhaka',
    'Chittagong',
    'Sylhet',
  ],
  authors: [{ name: 'SmartEdge Technologies' }],
  creator: 'SmartEdge Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://recyclemart.bd',
    title: 'Recycle Mart - Buy & Sell Everything in Bangladesh',
    description:
      'Join millions of users on Recycle Mart to buy and sell used goods, find jobs, or rent properties in Bangladesh.',
    siteName: 'Recycle Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recycle Mart - Buy & Sell Everything in Bangladesh',
    description:
      "Bangladesh's trusted marketplace for buying and selling everything.",
    creator: '@recyclemartbd',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased max-w-[1920px] mx-auto`}
      >
        <UserProvider>
          <NextTopLoader
            color="#2ecc71"
            showSpinner={false}
          />
          <Toaster
            richColors
            //   position="top-center"
            toastOptions={{
              style: {
                // background: "#2ecc71",
                border: 'none',
              },
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
