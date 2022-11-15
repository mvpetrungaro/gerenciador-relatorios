import { Steps as PrimeSteps } from 'primereact/steps'

export default function Steps({ activeIndex, indexChangeHandler, children }) {
  const steps = children?.filter((c) => c.type.name === 'Step')

  const items = steps?.map((step, i) => ({
    label: step.props.label ?? `Step ${i}`,
    command: step.props.onSelect,
  }))

  //Desabilitando seleção de steps seguintes
  items?.forEach((item, i) => {
    if (i >= activeIndex) {
      item.disabled = true
    }
  })

  return (
    <>
      <PrimeSteps
        model={items}
        className="m-4"
        activeIndex={activeIndex}
        onSelect={(e) => indexChangeHandler(e.index)}
        readOnly={false}
      />

      {steps?.[activeIndex]}
    </>
  )
}
