const StatusExecucao = {
  AGUARDANDO_EXECUCAO: {
    key: 'AGUARDANDO_EXECUCAO',
    value: 'Aguardando Execução',
  },
  EM_EXECUCAO: {
    key: 'EM_EXECUCAO',
    value: 'Em Execução',
  },
  SUCESSO: {
    key: 'SUCESSO',
    value: 'Sucesso',
  },
  FALHA: {
    key: 'FALHA',
    value: 'Falha',
  },
  ABORTADO: {
    key: 'ABORTADO',
    value: 'Abortado',
  },
}

Object.defineProperty(StatusExecucao, 'keys', {
  value: () => Object.entries(StatusExecucao).map((e) => e[1].key),
  enumerable: false,
})

Object.defineProperty(StatusExecucao, 'values', {
  value: () => Object.entries(StatusExecucao).map((e) => e[1].value),
  enumerable: false,
})

Object.defineProperty(StatusExecucao, 'entries', {
  value: () => Object.entries(StatusExecucao).map((e) => e[1]),
  enumerable: false,
})

export { StatusExecucao }
