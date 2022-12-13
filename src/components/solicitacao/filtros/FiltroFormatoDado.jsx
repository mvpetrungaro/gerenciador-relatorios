import { Checkbox } from 'primereact/checkbox'

export default function FiltroFormatoDado({
  formatosDado,
  formatosDadoSelected,
  onSelectFormatosDado,
}) {
  function onSelectFormatoDado(checkboxFormatoDado) {
    let formatosDado = [...formatosDadoSelected]

    if (checkboxFormatoDado.checked) {
      formatosDado.push(checkboxFormatoDado.value)
    } else {
      formatosDado.splice(formatosDado.indexOf(checkboxFormatoDado.value), 1)
    }

    onSelectFormatosDado(formatosDado)
  }

  return (
    <fieldset className="mt-3 p-3 text-left flex">
      <legend>Formatos de Dado</legend>

      {formatosDado.map((fd, i) => (
        <div key={i} className="m-2">
          <Checkbox
            inputId={`checkboxFormatoDado${i}`}
            value={fd.key}
            onChange={onSelectFormatoDado}
            checked={formatosDadoSelected.includes(fd.key)}
            className="mr-1"
          ></Checkbox>
          <label
            htmlFor={`checkboxFormatoDado${i}`}
            className="p-checkbox-label"
          >
            {fd.value}
          </label>
        </div>
      ))}
    </fieldset>
  )
}
