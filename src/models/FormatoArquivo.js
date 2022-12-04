const FormatoArquivo = {
  CSV: {
    key: 'CSV',
    value: 'CSV',
  },
  HTML: {
    key: 'HTML',
    value: 'HTML',
  },
  XLSX: {
    key: 'HTML',
    value: 'XLSX',
  },
}

Object.defineProperty(FormatoArquivo, 'keys', {
  value: () => Object.entries(FormatoArquivo).map((e) => e[1].key),
  enumerable: false,
})

Object.defineProperty(FormatoArquivo, 'values', {
  value: () => Object.entries(FormatoArquivo).map((e) => e[1].value),
  enumerable: false,
})

Object.defineProperty(FormatoArquivo, 'entries', {
  value: () => Object.entries(FormatoArquivo).map((e) => e[1]),
  enumerable: false,
})

export { FormatoArquivo }
