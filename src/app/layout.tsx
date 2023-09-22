import '@/src/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { SessionListener } from '@/src/providers';

export const metadata = {
  title: {
    default: '🌱✨®',
    template: '%s | 🌱✨®',
  },
  description: 'Generated with love.',
  icons: {
    icon: '@src/app/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SessionListener />
      <html lang="en">
        <body className="font-mona text-[16px] bg-primary-color">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
