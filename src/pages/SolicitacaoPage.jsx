import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Steps from '../components/Steps'
import Step from '../components/Step'
import PesquisasStep from '../components/execucao/PesquisasStep'
import ProjetosStep from '../components/execucao/ProjetosStep'
import TabelasStep from '../components/execucao/TabelasStep'
import FiltrosStep from '../components/execucao/FiltrosStep'
import ConfirmacaoStep from '../components/execucao/ConfirmacaoStep'
import { solicitarRelatorios } from '../services/relatorio.service'
import { ToastContext } from '../contexts/ToastContext'

export default function SolicitacaoPage() {
  const navigate = useNavigate()
  const { showError } = useContext(ToastContext)

  const [stepsActiveIndex, setStepsActiveIndex] = useState(0)
  const [pesquisa, setPesquisa] = useState(null)
  const [projeto, setProjeto] = useState(null)
  const [tabelas, setTabelas] = useState(null)
  const [filtros, setFiltros] = useState(null)

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

  function onFiltrosSelect(filtros) {
    setFiltros(filtros)
    setStepsActiveIndex(4)
  }

  async function onConfirm() {
    let solicitacao = {
      idProjetoEdata: projeto.id,
      idsTabelasEdata: tabelas.map((t) => t.id),
      territorios: filtros.territorios.map((t) => ({
        idTerritorioEdata: t.territorio.id,
        posicao: t.posicao,
      })),
      tiposDado: filtros.tiposDado,
      formatosDado: filtros.formatosDado,
      formatoArquivo: filtros.formatoArquivo,
      paginacao: filtros.paginacao?.codigo,
    }

    try {
      solicitacao = await solicitarRelatorios(solicitacao)

      if (!solicitacao?.id) {
        throw Error(
          'Erro ao solicitar os relatórios, tente novamente mais tarde'
        )
      }

      navigate(`/acompanhamento/${solicitacao.id}`)
    } catch (err) {
      showError(err.message ?? err)
    }
  }

  return (
    <div>
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
        <Step label="Confirmação">
          <ConfirmacaoStep
            projeto={projeto}
            tabelas={tabelas}
            filtros={filtros}
            onConfirm={onConfirm}
          />
        </Step>
      </Steps>
    </div>
  )
}
