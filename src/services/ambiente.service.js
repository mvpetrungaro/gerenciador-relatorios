import { edata } from '../services/api.service'

export async function getArvore(codUsuario, codPesquisa) {
  const ambientes = await edata.get(
    `ambientes?codUsuario=${codUsuario}&codPesquisa=${codPesquisa}`
  )

  let arvore = null

  if (ambientes) {
    arvore = mapItem(ambientes[0].arvore)?.children
  }

  return arvore
}

function mapItem(item) {
  const node = {
    key: item.id,
    label: item.nome,
    ...mapAtributosEspecificosDeTipo(item.tipo),
    ...item,
  }

  if (item.filhos?.length) {
    node.children = item.filhos.map(mapItem)
    node.leaf = false
  } else {
    node.leaf = true
  }

  return node
}

function mapAtributosEspecificosDeTipo(tipo) {
  switch (tipo) {
    case 'USUARIO':
      return { icon: 'pi pi-user', selectable: false }

    case 'PROJETO':
      return { icon: 'pi pi-folder' }

    case 'TABELA':
      return { icon: 'pi pi-table' }

    default:
      return {}
  }
}
