import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
/* 首页 */
import HomePage from '../components/HomePage.vue'
/* 左侧导航栏 */
import ShowLeft from '../components/ShowLeft.vue'
/* 头部导航栏 */
import ShowTop from '../components/ShowTop.vue'
/* 首页内容 */
import ShowPanel from '../components/ShowPanel.vue'
/* 业主管理->owner */
import Owner from '../components/owner/Owner.vue'
import Inspection from '../components/owner/Inspection.vue'
import Decorate from '../components/owner/Decorate.vue'
import Occupancy from '../components/owner/Occupancy.vue'
import Maintain from '../components/owner/Maintain.vue'

const routes = [{
		path: '/',
		redirect: '/HomePage'
	},
	{
		path: '/HomePage',
		name: 'HomePage',
		components: {
			homepage: HomePage,
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: ShowPanel
		}
	},
	{
		path: '/Owner',
		name: 'Owner',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Owner
		}
	},
	{
		path: '/Inspection',
		name: 'Inspection',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Inspection
		}
	},
	{
		path: '/Decorate',
		name: 'Decorate',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Decorate
		}
	},
	{
		path: '/Occupancy',
		name: 'Occupancy',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Occupancy
		}
	},
	{
		path: '/Maintain',
		name: 'Maintain',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Maintain
		}
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
