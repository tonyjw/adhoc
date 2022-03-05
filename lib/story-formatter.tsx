export function formatStory(story: string, blanks: any[]): string {

  return `${story} ${blanks.map((b) => { return b.value }).join(' ** ')}`
}