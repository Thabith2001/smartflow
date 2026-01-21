import './globals.css';
import { AuthProvider } from '../lib/auth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col ">
            <div className="flex flex-1">
              <main className="flex-1 bg-gray-50">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
