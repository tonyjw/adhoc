export function formatStory(story: string, blanks: any): string {

  return story.replace(/{([0-9]+)}/g, (match: string, index: string) => {
    const theMatch = blanks.find((b: { id: number }) => {
      return b.id.toString() == index
    })

    const returnMatch = typeof theMatch?.value == 'undefined' ? match : theMatch.value

    return `<span class="blank">${returnMatch}</span>`
  })
}
