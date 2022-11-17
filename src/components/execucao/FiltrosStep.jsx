import { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { AutoComplete } from 'primereact/autocomplete'
import {
  getConfiguracoesDados,
  getConfiguracoesGeografias,
} from '../../services/configuracoes.service'
import Loading from '../Loading'

const formatosArquivos = ['CSV', 'XLSX', 'HTML']

export default function FiltrosStep({ pesquisa, tabelas, onFiltrosSelect }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [numNiveisTerritoriais, setNumNiveisTerritoriais] = useState(1)
  const [niveisTerritoriaisSelecionados, setNiveisTerritoriaisSelecionados] =
    useState([null])
  const [
    posicoesNiveisTerritoriaisSelecionadas,
    setPosicoesNiveisTerritoriaisSelecionadas,
  ] = useState([null])
  const [tiposDadoSelecionados, setTiposDadoSelecionados] = useState([])
  const [formatosDadoSelecionados, setFormatosDadoSelecionados] = useState([])
  const [formatoArquivo, setFormatoArquivo] = useState(null)
  const [variaveisPaginacao, setVariaveisPaginacao] = useState([])
  const [paginacao, setPaginacao] = useState(null)

  const [posicoesDisponiveis, setPosicoesDisponiveis] = useState([])
  const [tiposDadoDisponiveis, setTiposDadoDisponiveis] = useState([])
  const [formatosDadoDisponiveis, setFormatosDadoDisponiveis] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        let { posicoes } = await getConfiguracoesGeografias()

        const incluirCabecalho = tabelas.every((t) => !!t.indicadoras)

        if (!incluirCabecalho) {
          posicoes = posicoes.filter((p) => p.id !== 'Cabeçalho')
        }

        setPosicoesDisponiveis(posicoes)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [tabelas])

  useEffect(() => {
    ;(async () => {
      try {
        let { tiposDado, formatosDado } = await getConfiguracoesDados()

        ;(() => {
          if (!pesquisa.tiposDado?.length) {
            tiposDado = []
            return
          }

          tiposDado = tiposDado.filter((td) =>
            pesquisa.tiposDado.includes(td.id)
          )
        })()
        ;(() => {
          if (!pesquisa.formatosDado?.length) {
            formatosDado = []
            return
          }

          formatosDado = formatosDado.filter((fd) =>
            pesquisa.formatosDado.includes(fd.id)
          )
        })()

        setTiposDadoDisponiveis(tiposDado)
        setFormatosDadoDisponiveis(formatosDado)
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [pesquisa])

  function addNivelTerritorial() {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais.push(null)

    const posicoesNiveisTerritoriais = [
      ...posicoesNiveisTerritoriaisSelecionadas,
    ]
    posicoesNiveisTerritoriais.push(null)

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
    setPosicoesNiveisTerritoriaisSelecionadas(posicoesNiveisTerritoriais)
    setNumNiveisTerritoriais(numNiveisTerritoriais + 1)
  }

  function removeNivelTerritorial() {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais.pop()

    const posicoesNiveisTerritoriais = [
      ...posicoesNiveisTerritoriaisSelecionadas,
    ]
    posicoesNiveisTerritoriais.pop()

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
    setPosicoesNiveisTerritoriaisSelecionadas(posicoesNiveisTerritoriais)
    setNumNiveisTerritoriais(numNiveisTerritoriais - 1)
  }

  function onChangeNivelTerritorial(i, nivelTerritorial) {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais[i] = nivelTerritorial

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
  }

  function onChangePosicaoNivelTerritorial(i, posicaoNivelTerritorial) {
    const posicoesNiveisTerritoriais = [
      ...posicoesNiveisTerritoriaisSelecionadas,
    ]
    posicoesNiveisTerritoriais[i] = posicaoNivelTerritorial

    setPosicoesNiveisTerritoriaisSelecionadas(posicoesNiveisTerritoriais)
  }

  function onChangeTipoDado(checkboxTipoDado) {
    let tiposDado = [...tiposDadoSelecionados]

    if (checkboxTipoDado.checked) {
      tiposDado.push(checkboxTipoDado.value)
    } else {
      tiposDado.splice(tiposDado.indexOf(checkboxTipoDado.value), 1)
    }

    setTiposDadoSelecionados(tiposDado)
  }

  function onChangeFormatoDado(checkboxFormatoDado) {
    let formatosDado = [...formatosDadoSelecionados]

    if (checkboxFormatoDado.checked) {
      formatosDado.push(checkboxFormatoDado.value)
    } else {
      formatosDado.splice(formatosDado.indexOf(checkboxFormatoDado.value), 1)
    }

    setFormatosDadoSelecionados(formatosDado)
  }

  function buscarVariaveisPaginacao(e) {
    const valorBusca = e.query.toLowerCase()
    const variaveisPaginacao = pesquisa.variaveis.filter(
      (v) =>
        v.codigo.toLowerCase().includes(valorBusca) ||
        v.nome.toLowerCase().includes(valorBusca)
    )

    setVariaveisPaginacao(variaveisPaginacao)
  }

  if (error) {
    return <div className="text-center">{error}</div>
  }

  let content = <></>

  if (loading) {
    content = <Loading />
  } else if (!pesquisa) {
    content = <div className="text-center">Pesquisa não encontrada</div>
  } else if (!tabelas) {
    content = <div className="text-center">Tabelas não encontradas</div>
  } else {
    content = (
      <>
        <div className="text-center">
          <h1>{tabelas.length} tabela(s) selecionada(s)</h1>
          <h4>Selecione os parâmetros de execução</h4>
        </div>
        <div
          className="mt-5 mr-auto mb-5 ml-auto p-3 text-center"
          style={{ maxWidth: 700 }}
        >
          <fieldset className="p-3 text-left">
            <legend>Níveis Territoriais</legend>

            {[...Array(numNiveisTerritoriais).keys()].map((n) => (
              <div key={n} className="mt-5">
                <div className="grid">
                  <span className="col-8 p-float-label">
                    <Dropdown
                      id={`dropdownNivelTerritorial${n}`}
                      value={niveisTerritoriaisSelecionados[n]}
                      options={pesquisa.niveisTerritoriais}
                      onChange={(e) =>
                        onChangeNivelTerritorial(n, e.target.value)
                      }
                      optionLabel="nome"
                      placeholder="Selecione um nível territorial"
                      className="w-12"
                    />
                    <label htmlFor={`dropdownNivelTerritorial${n}`}>
                      Nível Territorial {numNiveisTerritoriais > 1 ? n + 1 : ''}
                    </label>
                  </span>

                  <span className="col-4 p-float-label">
                    <Dropdown
                      id={`dropdownPosicaoNivelTerritorial${n}`}
                      value={posicoesNiveisTerritoriaisSelecionadas[n]}
                      options={posicoesDisponiveis}
                      optionLabel="nome"
                      onChange={(e) =>
                        onChangePosicaoNivelTerritorial(n, e.target.value)
                      }
                      placeholder="Selecione uma posição para o nível"
                      className="w-12"
                    />
                    <label htmlFor={`dropdownPosicaoNivelTerritorial${n}`}>
                      Posição {numNiveisTerritoriais > 1 ? n + 1 : ''}
                    </label>
                  </span>
                </div>
              </div>
            ))}

            <div className="text-right">
              {numNiveisTerritoriais > 1 && (
                <Button
                  icon="pi pi-minus"
                  className="p-button-text"
                  onClick={removeNivelTerritorial}
                />
              )}

              <Button
                icon="pi pi-plus"
                className="p-button-text"
                onClick={addNivelTerritorial}
              />
            </div>
          </fieldset>

          {!!tiposDadoDisponiveis?.length && (
            <fieldset className="mt-3 p-3 text-left flex">
              <legend>Tipos de Dado</legend>

              {tiposDadoDisponiveis.map((td, i) => (
                <div key={td.id} className="m-2">
                  <Checkbox
                    inputId={`checkboxTipoDado${i}`}
                    value={td}
                    onChange={onChangeTipoDado}
                    checked={tiposDadoSelecionados.includes(td)}
                    className="mr-1"
                  ></Checkbox>
                  <label
                    htmlFor={`checkboxTipoDado${i}`}
                    className="p-checkbox-label"
                  >
                    {td.nome}
                  </label>
                </div>
              ))}
            </fieldset>
          )}

          {!!formatosDadoDisponiveis?.length && (
            <fieldset className="mt-3 p-3 text-left flex">
              <legend>Formatos de Dado</legend>

              {formatosDadoDisponiveis.map((fd, i) => (
                <div key={fd.id} className="m-2">
                  <Checkbox
                    inputId={`checkboxFormatoDado${i}`}
                    value={fd}
                    onChange={onChangeFormatoDado}
                    checked={formatosDadoSelecionados.includes(fd)}
                    className="mr-1"
                  ></Checkbox>
                  <label
                    htmlFor={`checkboxFormatoDado${i}`}
                    className="p-checkbox-label"
                  >
                    {fd.nome}
                  </label>
                </div>
              ))}
            </fieldset>
          )}

          <div className="p-3 text-left">
            <span className="mt-4 p-float-label">
              <Dropdown
                id="dropdownFormatoArquivo"
                value={formatoArquivo}
                options={formatosArquivos}
                onChange={(e) => setFormatoArquivo(e.target.value)}
                placeholder="Selecione o formato do arquivo"
                className="w-12"
              />
              <label htmlFor="dropdownFormatoArquivo">Formato do Arquivo</label>
            </span>
          </div>

          <div className="p-3 text-left">
            <span className="p-float-label">
              <AutoComplete
                id="autocompletePaginacao"
                value={paginacao}
                suggestions={variaveisPaginacao}
                completeMethod={buscarVariaveisPaginacao}
                itemTemplate={(item) => `${item.codigo} - ${item.nome}`}
                selectedItemTemplate={(item) => `${item.codigo} - ${item.nome}`}
                onChange={(e) => setPaginacao(e.value)}
                onBlur={() => {
                  //Substituindo a propriedade forceSelection que está com problema
                  if (!variaveisPaginacao.includes(paginacao)) {
                    setPaginacao(null)
                  }
                }}
                className="w-12"
                inputClassName="w-12"
              />
              <label htmlFor="autocompletePaginacao">Paginação</label>
            </span>
          </div>

          <div className="m-auto p-3 text-right">
            <Button value="Avançar">Avançar</Button>
          </div>
        </div>
      </>
    )
  }

  return <div>{content}</div>
}
