import { createRouter, createWebHistory } from 'vue-router'
import AllGenomes from '../pages/AllGenomes.vue'
import Home from '../pages/Home.vue'
import SpecificGene from '../pages/SpecificGene.vue'
import Results from '../pages/Results.vue'

const routes = [
    { path: "/", component: Home },
    { path: '/all-genomes', component: AllGenomes },
    { path: '/specific-gene', component: SpecificGene },
    { path: '/results', component: Results },
    { path : '/results/:id', component: Results}
];
const router = createRouter({
    routes,
    history: createWebHistory()
});
export default router;