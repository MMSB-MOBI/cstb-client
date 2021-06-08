import { OldTree, OldNode, NewTree, NewNode } from '../types/TreeTypes2'
import { isOldTree, isOldNode, getChildren } from '../types/TreeTypes2'
import { ref, Ref } from 'vue'

export default function formatTree(elem: OldTree | OldNode, key: string, acc: any) {
    // create a new empty tree
    const newElem: Ref<NewTree> = ref({
        _id: '',
        _rev: '',
        date: '',
        tree: {
            root: {
                key: '',
                label: '',
                children: undefined
            }
        },
    })

    // find the tree
    if (isOldTree(elem)) {
        newElem.value._id = elem._id;
        newElem.value._rev = elem._rev;
        newElem.value.date = elem.date;
        formatTree(elem.tree, key, acc);
    }

    // format the tree, create a root
    else if (isOldNode(elem) && elem.text === 'root') {
        if (elem.children) {
            const children = getChildren(elem)
            console.log(children);
            newElem.value.tree.root.key = 'hello'
            newElem.value.tree.root.children = children
            // newElem.value.tree.root.children = getChildren(elem)
        }
        // newElem.value.tree.root.children = elem.children
        // delete elem.text;
        // delete elem.children;
        // elem.root.forEach(
        //     (child: any, index: number) => { formatTree(child, `${index}`, acc); }
        // )
    }

    // format the tree
    // else {
    //     acc[key] = elem
    //     elem['key'] = key;
    //     elem['label'] = elem.text;
    //     delete elem.text;
    //     if (elem.children) {
    //         elem.children.forEach(
    //             (child: any, index: number) => { formatTree(child, `${key}-${index}`, acc); }
    //         )
    //     }
    return newElem.value.tree;
}