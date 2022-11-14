import { useState } from 'react'
import StepsExecucao from '../components/execucao/StepsExecucao'
import PesquisasStep from '../components/execucao/PesquisasStep'
import ProjetosStep from '../components/execucao/ProjetosStep'
import TabelasStep from '../components/execucao/TabelasStep'

export default function ExecucaoPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [pesquisa, setPesquisa] = useState(null)
  const [projeto, setProjeto] = useState(null)

  function nextStep() {
    setActiveStepIndex(activeStepIndex + 1)
  }

  function onPesquisaSelect(pesquisa) {
    setPesquisa(pesquisa)
    nextStep()
  }

  function onProjetoSelect(projeto) {
    setProjeto(projeto)
    nextStep()
  }

  function onTabelasSelect(tabelas) {
    nextStep()
  }

  let content = <></>

  switch (activeStepIndex) {
    case 0:
      content = <PesquisasStep onPesquisaSelect={onPesquisaSelect} />
      break
    case 1:
      content = (
        <ProjetosStep pesquisa={pesquisa} onProjetoSelect={onProjetoSelect} />
      )
      break
    case 2:
      content = (
        <TabelasStep projeto={projeto} onTabelasSelect={onTabelasSelect} />
      )
      break

    default:
      break
  }

  return (
    <div>
      <StepsExecucao
        activeStepIndex={activeStepIndex}
        onStepSelect={setActiveStepIndex}
      />
      {content}
    </div>
  )
}
