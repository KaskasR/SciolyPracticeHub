// frontend/src/app/layout.js
import './globals.css'
import AuthGuard from '@/components/AuthGuard'

export const metadata = {
  title: 'Codebusters Hub',
  description: 'A puzzle practice site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  )
}
