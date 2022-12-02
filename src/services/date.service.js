export function parseDate(isoDateText) {
  const date = new Date(isoDateText)

  const ddDateText = date.getDay().toString().padStart(2, '0')
  const mmDateText = (date.getMonth() + 1).toString().padStart(2, '0')
  const yyyyDateText = date.getFullYear().toString()

  return `${ddDateText}/${mmDateText}/${yyyyDateText}`
}
