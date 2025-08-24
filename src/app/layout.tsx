import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider';
import ModalProvider from '../providers/ModalProvider/ModalProvider';
import { Provider } from '../components/ui/provider';


export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Create your own todo list',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
    <body
      className={`antialiased`}
    >
    <StoreProvider>
      <Provider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </Provider>
    </StoreProvider>
    </body>
    </html>
  );
}
