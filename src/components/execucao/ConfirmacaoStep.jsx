import { Button } from 'primereact/button'

const getParamErrorMsg = (param) =>
  `Falha ao carregar ${param} dos passos anteriores`

export default function ConfirmacaoStep({
  projeto,
  tabelas,
  filtros,
  onConfirm,
}) {
  let content = <></>

  if (!projeto) {
    content = <div className="text-center">{getParamErrorMsg('o projeto')}</div>
  } else if (!tabelas) {
    content = (
      <div className="text-center">{getParamErrorMsg('as tabelas')}</div>
    )
  } else if (!filtros) {
    content = (
      <div className="text-center">{getParamErrorMsg('os filtros')}</div>
    )
  } else {
    content = (
      <>
        <div className="text-center">
          <h1>Confirmar solicitação</h1>
          <h4>Confirme as informações abaixo</h4>
        </div>
        <div
          className="mt-5 mr-auto mb-5 ml-auto p-3 text-center"
          style={{ maxWidth: 500 }}
        >
          <div className="text-left">
            <div>
              <label className="mr-2">Projeto:</label>
              <span>
                {projeto.id} - {projeto.nome}
              </span>
            </div>

            <div className="mt-3">
              <label className="mr-2">Tabelas:</label>
              <ul className="m-0">
                {tabelas.map((t) => (
                  <li key={t.id}>
                    {t.id} - {t.nome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <label className="mr-2">Territórios:</label>
              <ul className="m-0">
                {filtros.territorios.map((t) => (
                  <li key={t.territorio.id}>
                    {t.territorio.id} - {t.territorio.nome} ({t.posicao.nome})
                  </li>
                ))}
              </ul>
            </div>

            {!!filtros.tiposDado?.length && (
              <div className="mt-3">
                <label className="mr-2">Tipos de Dado:</label>
                <ul className="m-0">
                  {filtros.tiposDado.map((td) => (
                    <li key={td.id}>{td.nome}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!filtros.formatosDado?.length && (
              <div className="mt-3">
                <label className="mr-2">Formatos de Dado:</label>
                <ul className="m-0">
                  {filtros.formatosDado.map((fd) => (
                    <li key={fd.id}>{fd.nome}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3">
              <label className="mr-2">Formato do Arquivo:</label>
              <span>{filtros.formatoArquivo}</span>
            </div>

            {!!filtros.paginacao && (
              <div className="mt-3">
                <label className="mr-2">Paginação:</label>
                <span>
                  {filtros.paginacao.codigo} - {filtros.paginacao.nome}
                </span>
              </div>
            )}
          </div>

          <div className="m-auto p-3 text-right">
            <Button onClick={onConfirm}>Confirmar</Button>
          </div>
        </div>
      </>
    )
  }

  return <div>{content}</div>
}
