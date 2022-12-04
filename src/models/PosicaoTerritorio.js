const PosicaoTerritorio = {
  CABECALHO: {
    key: 'CABECALHO',
    value: 'Cabeçalho',
  },
  LINHA: {
    key: 'LINHA',
    value: 'Linha',
  },
  CABECALHO_LINHA: {
    key: 'CABECALHO_LINHA',
    value: 'Cabeçalho/Linha',
  },
  AUTO: {
    key: 'AUTO',
    value: 'Automática',
  },
}

Object.defineProperty(PosicaoTerritorio, 'keys', {
  value: () => Object.entries(PosicaoTerritorio).map((e) => e[1].key),
  enumerable: false,
})

Object.defineProperty(PosicaoTerritorio, 'values', {
  value: () => Object.entries(PosicaoTerritorio).map((e) => e[1].value),
  enumerable: false,
})

Object.defineProperty(PosicaoTerritorio, 'entries', {
  value: () => Object.entries(PosicaoTerritorio).map((e) => e[1]),
  enumerable: false,
})

export { PosicaoTerritorio }
