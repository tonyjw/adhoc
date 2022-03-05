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
    <input type="text" placeholder={blankType} onChange={(e) => {
      onBlankChange(id, e)
    }} />
  )
}