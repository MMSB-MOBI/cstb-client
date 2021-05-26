interface SelectedKeys {
    [key: string]: {
        checked?: boolean,
        partialChecked?: boolean
    }
}

interface ExpandedKeys {
    checked?: boolean,
    partialChecked?: boolean
}

interface DatabaseTree {
    _id: string,
    _rev: string,
    date: string,
    tree: OldTree
}

interface OldTree {
    text: string,
    children?: OldTree[],
    genome_uuid?: string,
}

interface NewTree {
    root: Node[],
}

interface Node {
    key: key,
    label: string,
    genome_uuid?: string,
    children?: Node[],
    checked?: boolean,
    selectable?: boolean,
    style?: string,
}

type key = string | number;

interface FinalSelection {
    (key: key): {
        filterObj: Node[],
        labels: string[],
    }
}

export { SelectedKeys, ExpandedKeys, NewTree, OldTree, Node, DatabaseTree, FinalSelection }