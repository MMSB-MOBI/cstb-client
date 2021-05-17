interface databaseTree {
    _id:string,
    _rev:string,
    date:string,
    tree:oldTree
}

export interface newTree {
    root:Node[],
}

interface Node {
    key:string,
    label:string,
    genome_uuid?:string,
    children?:Node[]
}

interface oldTree {
    
}