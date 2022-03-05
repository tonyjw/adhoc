export default function Blank({ 
  content,
  blanks
}: {
  content: string
  blanks: any[]
}) {
  return (
    <>
    TODO: Combine the content with the blanks using string replacement. Highlight the words in the story
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div>Blanks: {blanks.map((b) => { return b.value }).join(' ** ')}</div>
    </>
  )
}