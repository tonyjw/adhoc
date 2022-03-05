import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import { getSortedAdHocs } from '../lib/adhocs'

export const getStaticProps: GetStaticProps = async context => {
  const allAdhocsData = getSortedAdHocs()

  return {
    props: {
      allAdhocsData
    }
  }
}

const Home: NextPage = ({ allAdhocsData }) => {
  return (
    <Layout home>
      <Head>
        <title>Adhoc - Home</title>
      </Head>

      <section>
        <h1 className={styles.title}>
          adhoc
        </h1>

        <p className={styles.description}>
        the story generator for kids
        </p>
      </section>

      <section>
        <ul>
          {allAdhocsData.map(({ id, title }) => (
            <li key={id}>
              {title}
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}

export default Home
