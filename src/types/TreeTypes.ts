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

interface NewTree {
    root: Node[],
}

interface Node {
    key: string,
    label: string,
    genome_uuid?: string,
    children?: Node[],
    checked?: boolean,
    selectable?: boolean,
    style?: string,
}

interface OldTree {

}

interface FinalSelection {
    [key: string]: {
        filterObj: Node[],
        labels: string[],
    }
}

export { SelectedKeys, ExpandedKeys, NewTree, OldTree, Node, DatabaseTree, FinalSelection }