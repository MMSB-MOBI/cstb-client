export default interface Node {
    key:string,
    label:string,
    genome_uuid?:string,
    children?:Node[],
}