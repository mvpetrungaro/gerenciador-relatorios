import { useState } from 'react'
import Steps from '../components/Steps'
import Step from '../components/Step'
import PesquisasStep from '../components/execucao/PesquisasStep'
import ProjetosStep from '../components/execucao/ProjetosStep'
import TabelasStep from '../components/execucao/TabelasStep'
import FiltrosStep from '../components/execucao/FiltrosStep'

export default function ExecucaoPage() {
  const [stepsActiveIndex, setStepsActiveIndex] = useState(0)
  const [pesquisa, setPesquisa] = useState(null)
  const [projeto, setProjeto] = useState(null)
  const [tabelas, setTabelas] = useState(null)

  function onStepPesquisasSelect() {
    setPesquisa(null)
    setProjeto(null)
    setTabelas(null)
  }

  function onStepProjetosSelect() {
    setProjeto(null)
    setTabelas(null)
  }

  function onStepTabelasSelect() {
    setTabelas(null)
  }

  function onPesquisaSelect(pesquisa) {
    setPesquisa(pesquisa)
    setStepsActiveIndex(1)
  }

  function onProjetoSelect(projeto) {
    setProjeto(projeto)
    setStepsActiveIndex(2)
  }

  function onTabelasSelect(tabelas) {
    setTabelas(tabelas)
    setStepsActiveIndex(3)
  }

  function onFiltrosSelect() {
    setStepsActiveIndex(4)
  }

  return (
    <div style={{ minWidth: 300 }}>
      <Steps
        activeIndex={stepsActiveIndex}
        indexChangeHandler={(index) => setStepsActiveIndex(index)}
      >
        <Step label="Pesquisas" onSelect={onStepPesquisasSelect}>
          <PesquisasStep onPesquisaSelect={onPesquisaSelect} />
        </Step>
        <Step label="Projetos" onSelect={onStepProjetosSelect}>
          <ProjetosStep pesquisa={pesquisa} onProjetoSelect={onProjetoSelect} />
        </Step>
        <Step label="Tabelas" onSelect={onStepTabelasSelect}>
          <TabelasStep projeto={projeto} onTabelasSelect={onTabelasSelect} />
        </Step>
        <Step label="Filtros">
          <FiltrosStep
            pesquisa={pesquisa}
            tabelas={tabelas}
            onFiltrosSelect={onFiltrosSelect}
          />
        </Step>
        <Step label="Confirmação"></Step>
      </Steps>
    </div>
  )
}
