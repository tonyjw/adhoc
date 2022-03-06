import Head from "next/head"
import Link from "next/link"
import styles from './layout.module.css'

const siteDescription = "Adhoc - the story generator for kids"

function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
      <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={siteDescription}
        />
        <meta name="og:title" content={siteDescription} />
      </Head>
      <main className={styles.main}>
        {children}
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a className='button'>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={styles.footer}>
        &copy; 2022 Tony Wieczorek
      </footer>
    </div>
  )
}

export default Layout