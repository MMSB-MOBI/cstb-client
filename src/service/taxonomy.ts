import axios from 'axios';
import formatTree from '../utilities/primevue';
import formatTreeTest from '../utilities/primevue2';

export default class TaxonomyService {
    getTree() {
        return axios.get('dev/tree')
            .then((res) => {
                const treeIndex = {};
                const newTree = formatTree(res.data, "0", treeIndex);
                return { newTree, treeIndex }
            })
    }

    getTreeTest() {
        return axios.get('dev/tree')
            .then((res) => {
                const treeIndex = {};
                const newTree = formatTreeTest(res.data, treeIndex);
                return { newTree, treeIndex }
            })
    }
}