const TipoDado = {
  SEM_EXPANSAO: {
    key: 'SEM_EXPANSAO',
    value: 'Sem Expansão',
  },
  CV: {
    key: 'CV',
    value: 'CV',
  },
  IC: {
    key: 'IC',
    value: 'IC',
  },
}

Object.defineProperty(TipoDado, 'keys', {
  value: () => Object.entries(TipoDado).map((e) => e[1].key),
  enumerable: false,
})

Object.defineProperty(TipoDado, 'values', {
  value: () => Object.entries(TipoDado).map((e) => e[1].value),
  enumerable: false,
})

Object.defineProperty(TipoDado, 'entries', {
  value: () => Object.entries(TipoDado).map((e) => e[1]),
  enumerable: false,
})

export { TipoDado }
