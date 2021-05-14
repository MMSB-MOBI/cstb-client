const tree = {
    "_id": "maxi_tree",
    "_rev": "11-e789e70e3a96a0f6c5bf8e400ac18074",
    "date": "21/04/2021 12:53:20",
    "tree": {
        "text": "root",
        "children": [
            {
                "text": "Bacteria",
                "children": [
                    {
                        "text": "Terrabacteria group",
                        "children": [
                            {
                                "text": "Actinobacteria",
                                "children": [
                                    {
                                        "text": "Actinobacteria",
                                        "children": [
                                            {
                                                "text": "Micrococcales",
                                                "children": [
                                                    {
                                                        "text": "Micrococcaceae",
                                                        "children": [
                                                            {
                                                                "text": "Rothia",
                                                                "children": [
                                                                    {
                                                                        "text": "Rothia aeria",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002eac4da"
                                                                    },
                                                                    {
                                                                        "text": "Rothia mucilaginosa DY-18",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002c343c3"
                                                                    },
                                                                    {
                                                                        "text": "Rothia dentocariosa ATCC 17931",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002ae1ba7"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "text": "Glutamicibacter",
                                                                "children": [
                                                                    {
                                                                        "text": "Glutamicibacter halophytocola",
                                                                        "genome_uuid": "55a07ba5d424074a686fdc6a023660b9"
                                                                    },
                                                                    {
                                                                        "text": "Glutamicibacter nicotianae",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002bfa518"
                                                                    },
                                                                    {
                                                                        "text": "Glutamicibacter creatinolyticus",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002e8e330"
                                                                    },
                                                                    {
                                                                        "text": "Glutamicibacter arilaitensis Re117",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002f6b392"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "text": "Arthrobacter",
                                                                "children": [
                                                                    {
                                                                        "text": "Arthrobacter alpinus",
                                                                        "genome_uuid": "55a07ba5d424074a686fdc6a02124d03"
                                                                    },
                                                                    {
                                                                        "text": "Arthrobacter crystallopoietes",
                                                                        "genome_uuid": "dd6cfb980c8a3659acffa4f002bf8c93"
                                                                    },
                                                                    {
                                                                        "text": "Arthrobacter dokdonellae",
                                                                        "genome_uuid": "55a07ba5d424074a686fdc6a023caa55"
                                                                    }
                                                                ]
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    },
};

function formatTree(elem: any, key: string) {

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
            (child: any) => { formatTree(child, `${key}`); }
        )
        // comment retourner l'arbre { root : [] }  pour y accéder ? ajout d'une promesse ?
        // console.log(elem);        
        return elem;
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
    console.log("debut\n", elem, "\nfin\n");
}

// comment faire exécuter formatTree dans Home.vue ? dans le setup par exemple
formatTree(tree, '0')