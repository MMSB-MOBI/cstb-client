/* To refactor */

export default function formatTree(elem: any, key: string, acc: any) {

    // find the tree
    if (elem.tree) {
        formatTree(elem.tree, key, acc);
    }

    // format the tree, create a root
    else if (elem.text === 'root') {
        elem['root'] = elem.children
        delete elem.text;
        delete elem.children;
        elem.root.forEach(
            (child: any, index: number) => { formatTree(child, `${index}`, acc); }
        )
    }

    // format the tree
    else {
        acc[key] = elem
        elem['key'] = key;
        elem['label'] = elem.text;
        delete elem.text;
        if (elem.children) {
            elem.children.forEach(
                (child: any, index: number) => { formatTree(child, `${key}-${index}`, acc); }
            )
        }
    }
    return elem.tree;
}