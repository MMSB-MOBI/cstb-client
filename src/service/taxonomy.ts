import axios from 'axios';
import formatTree from '../utilities/primevue'

export default class TaxonomyService {
    getTree() {
        return axios.get('tree')
            .then((res) => {
                const treeIndex = {};
                const newTree = formatTree(res.data, "0", treeIndex);
                return {newTree, treeIndex}
            })
    }
}