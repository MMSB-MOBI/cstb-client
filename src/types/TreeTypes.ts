interface SelectedKeys {
    [key: string]: {
        checked?: boolean,
        partialChecked?: boolean
    }
}

interface ExpandedKeys {
    [key: string] : boolean
}

// old version of tree to convert, from database
interface OldTree {
    _id: string,
    _rev: string,
    date: string,
    tree: OldNode,
}

// old version of node to convert, from database
interface OldNode {
    text: string,
    children?: OldNode[],
    genome_uuid?: string,
}

// new version of tree, converted
interface NewTree {
    _id: string,
    _rev: string,
    date: string,
    tree: {
        root: NewNode[]
    },
}

// new version of node, converted
interface NewNode {
    key: string,
    label: string,
    genome_uuid?: string,
    children?: NewNode[],
    checked?: boolean,
    selectable?: boolean,
    style?: string,
}

type key = string | number;

interface FinalSelection {
    (key: key): {
        filterObj: NewNode[],
        labels: string[],
    }
}

function isOldTree(tree: OldTree | OldNode): tree is OldTree {
    return (tree as OldTree).tree !== undefined
}

// returns children to convert
function getChildren(tree: OldNode): any { // OldNode | undefined
    if (tree.children) { return tree.children }
}

function isOldNode(tree: OldTree | OldNode): tree is OldNode {
    return (tree as OldNode).text !== undefined
}

export {
    SelectedKeys, ExpandedKeys, NewTree, OldNode, NewNode, OldTree, FinalSelection,
    isOldTree, isOldNode, getChildren
}