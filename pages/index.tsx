import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Adhoc - The story generator for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          adhoc
        </h1>

        <p className={styles.description}>
        the story generator for kids
        </p>

      </main>
    </Layout>
  )
}

export default Home
