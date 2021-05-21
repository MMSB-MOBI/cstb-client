import { ref, Ref } from 'vue'
import NewTree from '../types/NewTree'
import Node from '../types/Node'

export default class TreeWrapper {
    private _newTree: Ref<NewTree | undefined> = ref();
    private _newTreeIndex: Ref<{ [key: string]: Node } | undefined> = ref();
    private _finalSelection: Ref<Node[]> = ref([]);
    private _selectedKeys: Ref<any> = ref(); // interface à creer
    private _expandedKeys: Ref<any> = ref();
    // private _labels: Ref<any> = ref();
    private _listTree: Ref<any> = ref();

    // constructor() {
    // }

    public set newTree(_: NewTree | undefined) {
        this._newTree.value = _;
    }
    public get newTree(): undefined | NewTree {
        return this._newTree.value
    }
    public set newTreeIndex(_: { [key: string]: Node } | undefined) {
        this._newTreeIndex.value = _;
    }
    public get newTreeIndex(): { [key: string]: Node } | undefined {
        return this._newTreeIndex.value
    }
    public set finalSelection(_: Node[]) {
        this._finalSelection.value = _;
    }
    public get finalSelection(): Node[] {
        return this._finalSelection.value
    }
    public set selectedKeys(_: any) {
        this._selectedKeys.value = _;
    }
    public get selectedKeys(): any {
        return this._selectedKeys.value
    }
    public set expandedKeys(_: any) {
        this._expandedKeys.value = _;
    }
    public get expandedKeys(): any {
        return this._expandedKeys.value
    }
    // public set labels(_: any) {
    //     this._labels.value = _;
    // }
    // public get labels(): any {        
    //     return this._labels.value
    // }
    public set listTree(_: any) {
        this._listTree.value = _;
    }
    public get listTree(): any {
        return this._listTree.value
    }

    getBrowsableNode(node: Node, otherTreeIndex: { [key: string]: Node } | undefined) {
        if (otherTreeIndex) {
            const node2 = otherTreeIndex[node.key];
            return node2
        }
        return undefined
    }
}