import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.css'
import { getSortedAdHocs } from '../lib/adhocs'

export const getStaticProps: GetStaticProps = async () => {
  const allAdhocsData = getSortedAdHocs()

  return {
    props: {
      allAdhocsData
    }
  }
}

export default function Home({ 
  allAdhocsData 
}: {
  allAdhocsData: {
    id: string
    title: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>Adhoc - Home</title>
      </Head>

      <section>
        <div className={styles.logo}>
          <Image src="/favicon.png" width={100} height={100} alt="Adhoc logo - open book" />
        </div>
        <h1 className={styles.title}>
          adhoc
        </h1>

        <p className={styles.description}>
        the story generator for kids
        </p>
      </section>

      <section>
        <ul className={styles.adhocList}>
          {allAdhocsData.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/adhocs/${id}`}>
                <a className='button'>{title}</a>
              </Link>
              
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}
