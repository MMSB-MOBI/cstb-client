import {newTree} from '../types/types'

export default function formatTree(elem: any, key: string):newTree {
    // find the tree
    if (elem.tree) {
        formatTree(elem.tree, key);
    }
    // format the tree, create a root
    else if (elem.text === 'root') {
        elem['root'] = elem.children
        delete elem.text;
        delete elem.children;
        elem.root.forEach(
            (child: any, index:number) => { formatTree(child, `${index}`); }
        )
    }
    // format the tree
    else {
        elem['key'] = key;
        elem['label'] = elem.text;
        delete elem.text;
        if (elem.children) {
            elem.children.forEach(
                (child: any, index: number) => { formatTree(child, `${key}-${index}`); }
            )
        }
    }
    return elem.tree;
}