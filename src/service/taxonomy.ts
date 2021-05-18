import axios from 'axios';

export default class TaxonomyService {
    getTree() {
        return axios.get('tree')
            .then(res => res.data);
    }
}