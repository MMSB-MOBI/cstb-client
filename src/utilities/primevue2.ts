import { isOldNode, isOldTree, NewTree, OldNode, OldTree } from "../types/TreeTypes2";
import { ref } from 'vue'

export default function formatTree(elem: OldTree | OldNode, acc: any, key?: string, newElem?: any) {
    // find the tree
    if (isOldTree(elem) && elem.tree) {
        const newElem = ref(elem);
        formatTree(elem.tree, acc, undefined, newElem);
    }
    // format the tree, create a root
    else if (isOldNode(elem) && elem.text === 'root') {
        newElem.value.root = elem.children
        delete newElem.value.text;
        delete newElem.value.children;
        delete newElem.value.tree;
        newElem.value.root.forEach(
            (child: any, index: number) => { formatTree(child, acc, `${index}`, newElem); }
        )
    }
    // format the tree
    else if (isOldNode(elem)) {
        if (key) acc[key] = elem;
        newElem.value.key = key;
        newElem.value.label = elem.text;
        if (elem.children) {
            elem.children.forEach(
                (child: any, index: number) => { formatTree(child, acc, `${key}-${index}`, newElem); }
            )
        }
        return newElem.value.tree;
    }
}



// import { OldTree, OldNode, NewTree, NewNode, isOldTree, isOldNode, getChildren, } from '../types/TreeTypes2'
// import { ref, Ref } from 'vue'

// export default function formatTree(elem: OldTree | OldNode, treeIndex?: any, newElem?: Ref<any>, key?: string) {
//     if (!newElem) {
//         const newElem = ref(elem);
//         if (isOldTree(elem)) {
//             // newElem.value._id = elem._id;
//             // newElem.value._rev = elem._rev;
//             // newElem.value.date = elem.date;
//             console.log("new elem", newElem.value);

//             formatTree(elem.tree, treeIndex, newElem);
//         }
//     }

//     else if (isOldNode(elem)) {
//         if (elem.children) {
//             const _children = getChildren(elem);
//             // newElem.value['children'] = _children;
//             // children.forEach((child: OldNode, index: number) => {
//             //     const _label = child.text;
//             //     if (elem.text === 'root') {
//             //         const _key = `${index}`;
//             //     } else {
//             //         const _key = `${key}-${index}`
//             //     }
//             //     formatTree(child, treeIndex, newElem)
//             // })
//             return newElem.value.tree;
//         }
//     }
// }