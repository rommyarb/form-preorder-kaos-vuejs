import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [{
			path: '/',
			name: 'main',
			component: () => import('./pages/Main.vue')
		},
		{
			path: '/success',
			name: 'success',
			component: () => import('./pages/Success.vue')
		},
		{
			path: '/data08312019',
			name: 'data',
			component: () => import('./pages/Data.vue')
		}
	]
})