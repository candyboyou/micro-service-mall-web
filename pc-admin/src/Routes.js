import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout';
import Login from '@/pages/login/Login';
import ErrorPage from '@/pages/error/Error';
// Core
import TypographyPage from '@/pages/typography/Typography';

// Tables
import TablesBasicPage from '@/pages/tables/Basic';

// commodity
import commodityListPage from '@/pages/commodity/CommodityList';
import CommodityNewPage from '@/pages/commodity/CommodityNew';
import CommodityEditPage from '@/pages/commodity/CommodityEdit';

import categoryListPage from '@/pages/category/CategoryList'
import categoryNewPage from '@/pages/category/CategoryNew'
import categoryEditPage from '@/pages/category/CategoryEdit'

import attributeListPage from '@/pages/attribute/AttributeList'

// Main
import AnalyticsPage from '@/pages/dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/charts/Charts';

// Ui
import IconsPage from '@/pages/icons/Icons';
import NotificationsPage from '@/pages/notifications/Notifications';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'commodity/list',
          name: 'commodityListPage',
          component: commodityListPage,
        },
        {
          path: 'commodity/new',
          name: 'commodityNewPage',
          component: CommodityNewPage,
        },
        {
          path: 'commodity/edit',
          name: 'commodityEditPage',
          component: CommodityEditPage,
        },
        {
          path: 'category/list',
          name: 'categoryListPage',
          component: categoryListPage,
        },
        {
          path: 'category/new',
          name: 'categoryNewPage',
          component: categoryNewPage,
        },
        {
          path: 'category/edit',
          name: 'categoryEditPage',
          component: categoryEditPage,
        },
        {
          path: 'attribute/list',
          name: 'attributeListPage',
          component: attributeListPage,
        }
      ],
    },
  ],
});
