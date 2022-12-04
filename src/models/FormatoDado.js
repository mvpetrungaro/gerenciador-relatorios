const FormatoDado = {
  PROPORCAO: {
    key: 'PROPORCAO',
    value: '% de Proporção (Relativo)',
  },
  DISTRIBUICAO: {
    key: 'DISTRIBUICAO',
    value: '% de Distribuição (Linha)',
  },
}

Object.defineProperty(FormatoDado, 'keys', {
  value: () => Object.entries(FormatoDado).map((e) => e[1].key),
  enumerable: false,
})

Object.defineProperty(FormatoDado, 'values', {
  value: () => Object.entries(FormatoDado).map((e) => e[1].value),
  enumerable: false,
})

Object.defineProperty(FormatoDado, 'entries', {
  value: () => Object.entries(FormatoDado).map((e) => e[1]),
  enumerable: false,
})

export { FormatoDado }
