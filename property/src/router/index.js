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
import addOwer from '../components/owner/OwnerInfo/addOwer.vue'
import updateOwer from '../components/owner/OwnerInfo/updateOwer.vue'
import Family from '../components/owner/OwnerInfo/Family.vue'
import House from '../components/owner/OwnerInfo/House.vue'

import Inspection from '../components/owner/Inspection.vue'
import addInspection from '../components/owner/InspectionInfo/addInspection.vue'

import Decorate from '../components/owner/Decorate.vue'
import Occupancy from '../components/owner/Occupancy.vue'
import Maintain from '../components/owner/Maintain.vue'

/*收费管理*/
import charge from '../components/charge/charge.vue'
import standingBook from '../components/charge/standingBook.vue'
import bookUpdate from '../components/charge/bookUpdate.vue'
import billList from '../components/charge/billList.vue'

/*商铺管理*/
import Tenant from '../components/shopstore/Tenant.vue'
import Lease from '../components/shopstore/Lease.vue'
import Market from '../components/shopstore/Market.vue'
import Shop from '../components/shopstore/Shop.vue'
import Statistics from '../components/shopstore/Statistics.vue'

/*费项管理*/
import Costitem from '../components/costitem/Costitem.vue'
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
		path: '/addOwer',
		name: 'addOwer',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: addOwer
		}
	},
	{
		path: '/updateOwer',
		name: 'updateOwer',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: updateOwer
		}
	},
	{
		path: '/Family',
		name: 'Family',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Family
		}
	},
	{
		path: '/House',
		name: 'House',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: House
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
		path: '/addInspection',
		name: 'addInspection',
		components: {
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: addInspection
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
	{
		path: '/charge',
		name: 'charge',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: charge

		}
	},
	{
		path: '/standingBook',
		name: 'standingBook',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: standingBook
	
		}
	},
	{
		path: '/Tenant',
		name: 'Tenant',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Tenant
	
		}
	},
	{
		path: '/Lease',
		name: 'Lease',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Lease
	
		}
	},
	{
		path: '/Market',
		name: 'Market',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Market
	
		}
	},
	{
		path: '/Shop',
		name: 'Shop',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Shop
	
		}
	},
	{
		path: '/Statistics',
		name: 'Statistics',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Statistics
	
		}
	},
	{
		path: '/Costitem',
		name: 'Costitem',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: Costitem
	
		}
	},
	{
		path: '/bookUpdate',
		name: 'bookUpdate',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: bookUpdate
	
		}
	},
	{
		path: '/billList',
		name: 'billList',
		components: {
			
			showleft: ShowLeft,
			showtop: ShowTop,
			showpanel: billList
	
		}
	}
	
	
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

export default router
