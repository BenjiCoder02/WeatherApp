import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.locationForm}>
          <div className={styles.card}>
            <h3>Loading...</h3>
          </div>
        </div>
      </div>
    </main>
  )
}
