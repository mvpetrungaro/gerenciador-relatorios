import { Steps } from 'primereact/steps'

export default function StepsExecucao({ activeStepIndex, onStepSelect }) {
  const items = [
    {
      label: 'Pesquisas',
      command: () => {
        onStepSelect(0)
      },
    },
    {
      label: 'Projetos',
      command: () => {
        onStepSelect(1)
      },
    },
    {
      label: 'Tabelas',
      command: () => {
        onStepSelect(2)
      },
    },
    {
      label: 'Confirmação',
      command: () => {
        onStepSelect(3)
      },
    },
  ]

  //Desabilitando seleção de passos seguintes
  items.forEach((item, i) => {
    if (i >= activeStepIndex) {
      item.disabled = true
    }
  })

  return (
    <Steps
      model={items}
      className="m-4"
      activeIndex={activeStepIndex}
      readOnly={false}
    />
  )
}
