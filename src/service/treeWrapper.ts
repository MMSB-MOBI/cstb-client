import { ref, Ref } from 'vue'
import { ExpandedKeys, NewTree, NewNode, SelectedKeys } from '../types/TreeTypes'

export default class TreeWrapper {
    private _newTree: Ref<NewTree | undefined> = ref();
    private _newTreeIndex: Ref<{ [key: string]: NewNode } | undefined> = ref();
    private _finalSelection: Ref<NewNode[] | undefined[]> = ref([]);
    private _selectedKeys: Ref<SelectedKeys | undefined> = ref();
    private _expandedKeys: Ref<ExpandedKeys | undefined> = ref();
    private _listTree: Ref<NewNode[] | undefined> = ref();

    public set newTree(_: NewTree | undefined) {
        this._newTree.value = _;
    }
    public get newTree(): NewTree | undefined {
        return this._newTree.value
    }
    public set newTreeIndex(_: { [key: string]: NewNode } | undefined) {
        this._newTreeIndex.value = _;
    }
    public get newTreeIndex(): { [key: string]: NewNode } | undefined {
        return this._newTreeIndex.value
    }
    public set finalSelection(_: NewNode[] | undefined[]) {
        this._finalSelection.value = _;
    }
    public get finalSelection(): NewNode[] | undefined[] {
        return this._finalSelection.value
    }
    public set selectedKeys(_: SelectedKeys | undefined) {
        this._selectedKeys.value = _;
    }
    public get selectedKeys(): SelectedKeys | undefined {
        return this._selectedKeys.value
    }
    public set expandedKeys(_: ExpandedKeys | undefined) {
        this._expandedKeys.value = _;
    }
    public get expandedKeys(): ExpandedKeys | undefined {
        return this._expandedKeys.value
    }
    public set listTree(_: any) {
        this._listTree.value = _;
    }
    public get listTree(): any {
        return this._listTree.value
    }

    getBrowsableNode(node: NewNode, otherTreeIndex: { [key: string]: NewNode } | undefined) {
        if (otherTreeIndex) {
            const node2 = otherTreeIndex[node.key];
            return node2
        }
        return undefined
    }
}