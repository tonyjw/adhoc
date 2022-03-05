import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAdhocData, getAllAdhocIds } from '../../lib/adhocs'
import Head from 'next/head'
import Layout from '../../components/layout'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllAdhocIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const adhocData = await getAdhocData(params.id as string)
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
    parameters: string[]
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{adhocData.title}</title>
      </Head>
      <article>
        <h1>{adhocData.title}</h1>

        <ul>
          {adhocData.parameters.map((parameter) => (
            <li>
              {parameter}
            </li>
          ))}
        </ul>

        <div dangerouslySetInnerHTML={{ __html: adhocData.story }} />
      </article>
    </Layout>
  )
}
