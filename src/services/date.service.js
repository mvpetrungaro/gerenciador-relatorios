export function parseDate(isoDateText) {
  const date = new Date(isoDateText)

  const dd = date.getDay().toString().padStart(2, '0')
  const MM = (date.getMonth() + 1).toString().padStart(2, '0')
  const yyyy = date.getFullYear().toString()
  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  return `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss}`
}
