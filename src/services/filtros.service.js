import { PosicaoTerritorio } from '../models/PosicaoTerritorio'
import { TipoDado } from '../models/TipoDado'
import { FormatoDado } from '../models/FormatoDado'
import { FormatoArquivo } from '../models/FormatoArquivo'

export function getPosicoesByTabelas(tabelas) {
  let posicoes = PosicaoTerritorio.entries()

  const incluirCabecalho = tabelas.every((t) => !!t.indicadoras)

  if (!incluirCabecalho) {
    posicoes = posicoes.filter((p) => p.key !== PosicaoTerritorio.CABECALHO.key)
  }

  return posicoes
}

export function getTiposDadoByPesquisa(pesquisa) {
  let tiposDado = []

  if (pesquisa.tiposDado?.length) {
    tiposDado = TipoDado.entries().filter((td) =>
      pesquisa.tiposDado.includes(td.key)
    )
  }

  return tiposDado
}

export function getFormatosDadoByPesquisa(pesquisa) {
  let formatosDado = []

  if (pesquisa.formatosDado?.length) {
    formatosDado = FormatoDado.entries().filter((fd) =>
      pesquisa.formatosDado.includes(fd.key)
    )
  }

  return formatosDado
}

export function getFormatosArquivo() {
  return FormatoArquivo.entries()
}
