import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAdhocData, getAllAdhocIds } from '../../lib/adhocs'
import { formatStory } from '../../lib/story-formatter'
import Head from 'next/head'
import Layout from '../../components/layout'
import Blank from '../../components/blank'
import Story from '../../components/story'
import React from 'react'
import styles from './[id].module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllAdhocIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const adhocData = await getAdhocData(params?.id as string)
  return {
    props: {
      adhocData
    }
  }
}

export default function Adhoc({
  adhocData
}: {
  adhocData: {
    title: string
    story: string
    blanks: any[]
  }
}) {

  const [blanks, setBlanks] = React.useState(adhocData.blanks)

  function handleBlankUpdate(id: string, e: any) {
    const nextBlanks = blanks.map((blank, i) => {
      if (blank.id == id) {
        return {
          ...blank,
          value: e.currentTarget.value
        }
      } else {
        // the rest haven't changed
        return blank
      }
    })
    setBlanks(nextBlanks)
  }

  return (
    <Layout>
      <Head>
        <title>{adhocData.title}</title>
      </Head>
      <article>
        <h1>{adhocData.title}</h1>

        <ul className={styles.blanksList}>
          {adhocData.blanks.map(({ id, blankType }) => (
            <li key={id} className={styles.blankListItem}>
              <Blank id={id} blankType={blankType} onBlankChange={handleBlankUpdate} />
            </li>
          ))}
        </ul>

        <Story content={formatStory(adhocData.story, blanks)} />
      </article>
    </Layout>
  )
}
