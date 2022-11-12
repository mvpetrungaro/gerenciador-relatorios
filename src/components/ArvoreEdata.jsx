import { Tree } from "primereact/tree";
import { useState } from "react";

export default function ArvoreEdata({ raiz, onNodeSelect }) {
  const [nodeSelecionado, setNodeSelecionado] = useState(null);

  return (
    <Tree
      value={raiz}
      selectionMode="single"
      selectionKeys={nodeSelecionado}
      onSelectionChange={(e) => setNodeSelecionado(e.value)}
      onSelect={(e) => onNodeSelect(e.node)}
    />
  );
}
