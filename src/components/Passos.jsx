import { Steps } from 'primereact/steps'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Passos({ indice, idPesquisa, idProjeto }) {
  const navigate = useNavigate()

  const items = [
    {
      label: 'Pesquisas',
      command: () => {
        navigate('/')
      },
    },
    {
      label: 'Projetos',
      command: () => {
        navigate(`/pesquisas/${idPesquisa}`)
      },
    },
    { label: 'Tabelas' },
    { label: 'Confirmação' },
  ]

  //Desabilitando seleção de passos seguintes
  items.forEach((item, i) => {
    if (i >= indice) {
      item.disabled = true
    }
  })

  return (
    <Steps
      model={items}
      className="m-4"
      activeIndex={indice}
      readOnly={false}
    />
  )
}
