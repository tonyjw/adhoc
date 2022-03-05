import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const adhocsDirectory = path.join(process.cwd(), 'adhocs')

function getSortedAdHocs() {
  const fileNames = fs.readdirSync(adhocsDirectory)
  const allAdhocsData = fileNames.map(fileName => {
    // Remove .md from file name to get the id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(adhocsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to prase the metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  // Sort adhocs by id
  return allAdhocsData.sort(({ id: a }, { id: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

function getAllAdhocIds() {
  const fileNames = fs.readdirSync(adhocsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

async function getAdhocData(id) {
  const fullPath = path.join(adhocsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the adhoc metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export { getSortedAdHocs, getAllAdhocIds, getAdhocData }