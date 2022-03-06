import styles from './blank.module.css'

export default function Blank({ 
  id,
  blankType,
  onBlankChange
}: {
  id: string
  blankType: string
  onBlankChange: any
}) {
  return (
    <label className={styles.vertical}>
      {blankType}
      <input className={styles.blankInput} type="text" placeholder={blankType} onChange={(e) => {
        onBlankChange(id, e)
      }} />
    </label>
  )
}