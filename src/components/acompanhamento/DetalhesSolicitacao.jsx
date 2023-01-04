import { FormatoDado } from '../../models/FormatoDado'
import { PosicaoTerritorio } from '../../models/PosicaoTerritorio'
import { TipoDado } from '../../models/TipoDado'

export default function DetalhesSolicitacao({
  solicitacao,
  projeto,
  territorios,
}) {
  return (
    <div className="flex gap-3 flex-wrap justify-content-center align-items-baseline">
      <div className="m-3">
        <span className="mr-1">
          <span className="font-semibold underline">Data da solicitação</span>:
        </span>
        {solicitacao.dataSolicitacao}
      </div>

      <div className="m-3">
        <span className="mr-1">
          <span className="font-semibold underline">Projeto</span>:
        </span>
        {projeto.nome}
      </div>

      <div className="m-3 grid">
        <div className="mr-1">
          <span className="font-semibold underline">Territórios</span>:
        </div>
        <ul className="m-0 p-0 list-none text-left">
          {territorios.map((t) => (
            <li key={t.id}>
              {t.nome} ({PosicaoTerritorio[t.posicao].value})
            </li>
          ))}
        </ul>
      </div>

      {!!solicitacao.tiposDado?.length && (
        <div className="m-3 grid">
          <div className="mr-1">
            <span className="font-semibold underline">Tipos de Dado</span>:
          </div>
          <ul className="m-0 p-0 list-none text-left">
            {solicitacao.tiposDado.map((td, i) => (
              <li key={i}>{TipoDado[td].value}</li>
            ))}
          </ul>
        </div>
      )}

      {!!solicitacao.formatosDado?.length && (
        <div className="m-3 grid">
          <div className="mr-1">
            <span className="font-semibold underline">Formatos de Dado</span>:
          </div>
          <ul className="m-0 p-0 list-none text-left">
            {solicitacao.formatosDado.map((fd, i) => (
              <li key={i}>{FormatoDado[fd].value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="m-3">
        <span className="mr-1">
          <span className="font-semibold underline">Formato do Arquivo</span>:
        </span>
        {solicitacao.formatoArquivo}
      </div>

      {!!solicitacao.paginacao && (
        <div className="m-3">
          <span className="mr-1">
            <span className="font-semibold underline">Paginação</span>:
          </span>
          {solicitacao.paginacao}
        </div>
      )}
    </div>
  )
}
