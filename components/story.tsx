export default function Story({ 
  content
}: {
  content: string
}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}