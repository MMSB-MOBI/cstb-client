import OldTree from './OldTree'

export default interface databaseTree {
    _id: string,
    _rev: string,
    date: string,
    tree: OldTree
}