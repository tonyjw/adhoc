import styles from './story.module.css'

export default function Story({ 
  content
}: {
  content: string
}) {
  return (
    <>
      <div className={styles.story} dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}