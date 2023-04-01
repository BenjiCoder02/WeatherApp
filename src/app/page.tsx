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
            <h2 className={styles.heading}>Welcome to the Weather App!</h2>
            <a className={styles.linkDark} href='/weather'>Click Here to get started</a>
          </div>
        </div>
      </div>
    </main>
  )
}
