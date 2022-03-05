import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const adhocsDirectory = path.join(process.cwd(), 'adhocs')

export function getSortedAdHocs() {
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

export function getAllAdhocIds() {
  const fileNames = fs.readdirSync(adhocsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getAdhocData(id) {
  const fullPath = path.join(adhocsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the adhoc metadata section
  const matterResult = matter(fileContents)
  const contentHtml = matterResult.content

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
