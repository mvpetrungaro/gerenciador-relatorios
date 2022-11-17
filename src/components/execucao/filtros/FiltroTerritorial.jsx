import { useState } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

export default function FiltroTerritorial({
  territorios,
  territoriosSelected,
  onSelectTerritorios,
  posicoes,
  posicoesSelected,
  onSelectPosicoes,
}) {
  const [territoriosCount, setTerritoriosCount] = useState(1)

  function addTerritorio() {
    const territorios = [...territoriosSelected]
    territorios.push(null)

    const posicoes = [...posicoesSelected]
    posicoes.push(null)

    onSelectTerritorios(territorios)
    onSelectPosicoes(posicoes)
    setTerritoriosCount(territoriosCount + 1)
  }

  function removeTerritorio() {
    const territorios = [...territoriosSelected]
    territorios.pop()

    const posicoes = [...posicoesSelected]
    posicoes.pop()

    onSelectTerritorios(territorios)
    onSelectPosicoes(posicoes)
    setTerritoriosCount(territoriosCount - 1)
  }

  function onSelectTerritorio(i, territorio) {
    const territorios = [...territoriosSelected]
    territorios[i] = territorio

    onSelectTerritorios(territorios)
  }

  function onSelectPosicao(i, posicao) {
    const posicoes = [...posicoesSelected]
    posicoes[i] = posicao

    onSelectPosicoes(posicoes)
  }

  return (
    <fieldset className="p-3 text-left">
      <legend>Territórios</legend>

      {[...Array(territoriosCount).keys()].map((i) => (
        <div key={i} className="mt-5">
          <div className="grid">
            <span className="col-8 p-float-label">
              <Dropdown
                id={`dropdownTerritorio${i}`}
                value={territoriosSelected[i]}
                options={territorios}
                onChange={(e) => onSelectTerritorio(i, e.target.value)}
                optionLabel="nome"
                placeholder="Selecione um território"
                className="w-12"
              />
              <label htmlFor={`dropdownTerritorio${i}`}>
                Território {territoriosCount > 1 ? i + 1 : ''}
              </label>
            </span>

            <span className="col-4 p-float-label">
              <Dropdown
                id={`dropdownPosicao${i}`}
                value={posicoesSelected[i]}
                options={posicoes}
                optionLabel="nome"
                onChange={(e) => onSelectPosicao(i, e.target.value)}
                placeholder="Selecione uma posição para o território"
                className="w-12"
              />
              <label htmlFor={`dropdownPosicao${i}`}>
                Posição {territoriosCount > 1 ? i + 1 : ''}
              </label>
            </span>
          </div>
        </div>
      ))}

      <div className="text-right">
        {territoriosCount > 1 && (
          <Button
            icon="pi pi-minus"
            className="p-button-text"
            onClick={removeTerritorio}
          />
        )}

        <Button
          icon="pi pi-plus"
          className="p-button-text"
          onClick={addTerritorio}
        />
      </div>
    </fieldset>
  )
}
