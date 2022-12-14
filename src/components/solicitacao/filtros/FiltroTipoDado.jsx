import { Checkbox } from 'primereact/checkbox'

export default function FiltroTipoDado({
  tiposDado,
  tiposDadoSelected,
  onSelectTiposDado,
}) {
  function onSelectTipoDado(checkboxTipoDado) {
    let tiposDado = [...tiposDadoSelected]

    if (checkboxTipoDado.checked) {
      tiposDado.push(checkboxTipoDado.value)
    } else {
      tiposDado.splice(tiposDado.indexOf(checkboxTipoDado.value), 1)
    }

    onSelectTiposDado(tiposDado)
  }

  return (
    <fieldset className="mt-3 p-3 text-left flex">
      <legend>Tipos de Dado</legend>

      {tiposDado.map((td, i) => (
        <div key={i} className="m-2">
          <Checkbox
            inputId={`checkboxTipoDado${i}`}
            value={td.key}
            onChange={onSelectTipoDado}
            checked={tiposDadoSelected.includes(td.key)}
            className="mr-1"
          ></Checkbox>
          <label htmlFor={`checkboxTipoDado${i}`} className="p-checkbox-label">
            {td.value}
          </label>
        </div>
      ))}
    </fieldset>
  )
}
