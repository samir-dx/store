import { useState } from "react";

const initialTree = {
  id: "root",
  name: "root",
  type: "folder",
  children: []
};

function TreeNode({ node, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const addNode = (type) => {
    const newNode = {
      id: Date.now().toString(),
      name: type === "file" ? "New File" : "New Folder",
      type,
      children: type === "folder" ? [] : undefined
    };
    onUpdate({
      ...node,
      children: [...(node.children || []), newNode]
    });
  };

  const rename = () => {
    onUpdate({ ...node, name });
    setEditing(false);
  };

  return (
    <li style={{textAlign:'left'}}>
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={rename}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>
          {node.type === "folder" ? "📁 " : "📄 "}
          {node.name}
        </span>
      )}

      {node.type === "folder" && (
        <>
          <button onClick={() => addNode("file")}>+File</button>
          <button onClick={() => addNode("folder")}>+Folder</button>
          {node.children?.length > 0 && (
            <ul>
              {node.children.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  onUpdate={(updatedChild) =>
                    onUpdate({
                      ...node,
                      children: node.children.map((c) =>
                        c.id === updatedChild.id ? updatedChild : c
                      )
                    })
                  }
                />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
}

export default function Tree() {
  const [tree, setTree] = useState(initialTree);
  console.log(tree)

  return (
    <div>
      <h3>Folder Explorer</h3>
      <ul>
        <TreeNode node={tree} onUpdate={setTree} />
      </ul>
    </div>
  );
}
