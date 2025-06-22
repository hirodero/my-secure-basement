'use client'
import "./globals.css";
import { Header } from "./components/ui/header";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  const router = usePathname();
  const hideFooterPages = ['/login','/register']
  const shouldShowHeader = !hideFooterPages.some(path => router.startsWith(path));
  return (
    <html lang="en">
      <body>
        <header>
          {
            shouldShowHeader&&
            <Header/>
          }
        </header>
        <main>
          {children}
          <Toaster position="top-right" />
        </main>
        <footer>
        </footer>
      </body>  
    </html>
  );
}
