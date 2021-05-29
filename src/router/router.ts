import {createRouter, createWebHistory} from 'vue-router'
import AllGenomes from '../pages/AllGenomes.vue'
import Home from '../pages/Home.vue'
import SpecificGene from '../pages/SpecificGene.vue'
import testSocket from '../pages/testSocket.vue'
const routes = [
    {path: "/socket", component:testSocket},
    {path: "/", component:Home},
    {path:'/all-genomes', component:AllGenomes},
    {path:'/specific-gene', component:SpecificGene},
];
const router = createRouter({
    routes,
    history: createWebHistory()
});
export default router;