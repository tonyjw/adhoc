import fs from 'fs'
import path from 'path'

const adhocsDirectory = path.join(process.cwd(), 'adhocs')

export function getSortedAdHocs() {
  const fileNames = fs.readdirSync(adhocsDirectory)
  const allAdhocsData = fileNames.map(fileName => {
    // Remove .json from file name to get the id
    const id = fileName.replace(/\.json$/, '')

    // Read markdown file as string
    const fullPath = path.join(adhocsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const jsonFileContents = JSON.parse(fileContents)

    // Combine the data with the id
    return {
      id,
      ...jsonFileContents
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
        id: fileName.replace(/\.json$/, '')
      }
    }
  })
}

export async function getAdhocData(id) {
  const fullPath = path.join(adhocsDirectory, `${id}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const jsonFileContents = JSON.parse(fileContents)

  // Combine the data with the id
  return {
    id,
    ...jsonFileContents
  }
}
