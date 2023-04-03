import './globals.css'
import styles from './page.module.css'

export const metadata = {
  title: 'Weather App',
  description: 'Created with Next.JS 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <h2 className={styles.logo}>Weather App</h2>
        </nav>
        {children}</body>
    </html>
  )
}
