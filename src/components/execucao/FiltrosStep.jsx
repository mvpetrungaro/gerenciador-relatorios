import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import Loading from '../Loading'

export default function FiltrosStep({ pesquisa, tabelas, onFiltrosSelect }) {
  const [error, setError] = useState('')
  // const [loading, setLoading] = useState(true)
  const [numNiveisTerritoriais, setNumNiveisTerritoriais] = useState(1)
  const [niveisTerritoriaisSelecionados, setNiveisTerritoriaisSelecionados] =
    useState([null])

  function addNivelTerritorial() {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais.push(null)

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
    setNumNiveisTerritoriais(numNiveisTerritoriais + 1)
  }

  function removeNivelTerritorial() {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais.pop()

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
    setNumNiveisTerritoriais(numNiveisTerritoriais - 1)
  }

  function onChangeNivelTerritorial(i, nivelTerritorial) {
    const niveisTerritoriais = [...niveisTerritoriaisSelecionados]
    niveisTerritoriais[i] = nivelTerritorial

    setNiveisTerritoriaisSelecionados(niveisTerritoriais)
  }

  if (error) {
    return <div className="text-center">{error}</div>
  }

  let content = <></>

  // if (loading) {
  //   content = <Loading />
  // } else
  if (!pesquisa) {
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
        <div className="m-5 text-center">
          <div className="m-auto p-3" style={{ maxWidth: 500 }}>
            {[...Array(numNiveisTerritoriais).keys()].map((n) => (
              <div key={n} className="text-left mt-5">
                <span className="p-float-label">
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
          </div>
          <div className="m-auto p-3 text-right" style={{ maxWidth: 500 }}>
            <Button value="Avançar">Avançar</Button>
          </div>
        </div>
      </>
    )
  }

  return <div>{content}</div>
}
