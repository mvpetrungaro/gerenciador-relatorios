import { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'
import {
  getConfiguracoesArquivos,
  getConfiguracoesDados,
  getConfiguracoesGeografias,
} from '../../services/configuracoes.service'
import Loading from '../Loading'
import FiltroTerritorial from './filtros/FiltroTerritorial'
import FiltroTipoDado from './filtros/FiltroTipoDado'
import FiltroFormatoDado from './filtros/FiltroFormatoDado'

export default function FiltrosStep({ pesquisa, tabelas, onFiltrosSelect }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [territoriosSelected, setTerritoriosSelected] = useState([null])
  const [posicoesSelected, setPosicoesSelected] = useState([null])
  const [tiposDadoSelected, setTiposDadoSelected] = useState([])
  const [formatosDadoSelected, setFormatosDadoSelected] = useState([])
  const [formatoArquivoSelected, setFormatoArquivoSelected] = useState(null)
  const [variaveisPaginacao, setVariaveisPaginacao] = useState([])
  const [paginacao, setPaginacao] = useState(null)

  const [posicoes, setPosicoes] = useState([])
  const [tiposDado, setTiposDado] = useState([])
  const [formatosDado, setFormatosDado] = useState([])
  const [formatosArquivos, setFormatosArquivos] = useState([])

  const [showFormatosDado, setShowFormatosDado] = useState(false)

  async function loadPosicoes(tabelas) {
    let { posicoes } = await getConfiguracoesGeografias()

    const incluirCabecalho = tabelas.every((t) => !!t.indicadoras)

    if (!incluirCabecalho) {
      posicoes = posicoes.filter((p) => p.id !== 'Cabeçalho')
    }

    setPosicoes(posicoes)
  }

  async function loadTiposFormatosDado(pesquisa) {
    let { tiposDado, formatosDado } = await getConfiguracoesDados()

    if (!pesquisa.tiposDado?.length) {
      tiposDado = []
    } else {
      tiposDado = tiposDado.filter((td) => pesquisa.tiposDado.includes(td.id))
    }

    if (!pesquisa.formatosDado?.length) {
      formatosDado = []
    } else {
      formatosDado = formatosDado.filter((fd) =>
        pesquisa.formatosDado.includes(fd.id)
      )
    }

    setTiposDado(tiposDado)
    setFormatosDado(formatosDado)
  }

  async function loadFormatosArquivos() {
    const { formatos } = await getConfiguracoesArquivos()
    setFormatosArquivos(formatos)
  }

  useEffect(() => {
    ;(async () => {
      try {
        await Promise.all([
          loadPosicoes(tabelas),
          loadTiposFormatosDado(pesquisa),
          loadFormatosArquivos(),
        ])
      } catch (err) {
        setError(err.message ?? err)
      } finally {
        setLoading(false)
      }
    })()
  }, [tabelas, pesquisa])

  useEffect(() => {
    if (tiposDadoSelected.map((td) => td.id).includes('IC')) {
      setShowFormatosDado(true)
    } else {
      setShowFormatosDado(false)
      setFormatosDadoSelected([])
    }
  }, [tiposDadoSelected])

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
          <h4>Selecione os filtros da execução</h4>
        </div>
        <div
          className="mt-5 mr-auto mb-5 ml-auto p-3 text-center"
          style={{ maxWidth: 700 }}
        >
          <FiltroTerritorial
            territorios={pesquisa.territorios}
            territoriosSelected={territoriosSelected}
            onSelectTerritorios={setTerritoriosSelected}
            posicoes={posicoes}
            posicoesSelected={posicoesSelected}
            onSelectPosicoes={setPosicoesSelected}
          />

          {!!tiposDado?.length && (
            <FiltroTipoDado
              tiposDado={tiposDado}
              tiposDadoSelected={tiposDadoSelected}
              onSelectTiposDado={setTiposDadoSelected}
            />
          )}

          {showFormatosDado && !!formatosDado?.length && (
            <FiltroFormatoDado
              formatosDado={formatosDado}
              formatosDadoSelected={formatosDadoSelected}
              onSelectFormatosDado={setFormatosDadoSelected}
            />
          )}

          <div className="p-3 text-left">
            <span className="mt-4 p-float-label">
              <Dropdown
                id="dropdownFormatoArquivo"
                value={formatoArquivoSelected}
                options={formatosArquivos}
                onChange={(e) => setFormatoArquivoSelected(e.target.value)}
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
                placeholder="Digite um código ou nome de variável"
              />
              <label htmlFor="autocompletePaginacao">
                Variável de paginação
              </label>
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
