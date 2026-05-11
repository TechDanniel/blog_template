import { getUserInfo } from '@/http/modules/login';
import { ElMessage } from 'element-plus';
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/components/layout/Container.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path:'/aiChat',
        name:'AIChat',
        component: () => import('@/views/AIChat.vue')
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式
  routes,
})

router.beforeEach(async (to, _from) => {
  const whiteList = ['/login']

  if (whiteList.includes(to.path)) {
    return true;
  }

  try{
    const res = await getUserInfo();
    if (res.code !== 200) {
      ElMessage.warning('请先登录');
      return '/login';
    }
  } catch (error) {
    const status = (error as any)?.response?.status;
    const message = (error as any)?.message as string | undefined;

    if (status === 401 || message?.includes('未授权')) {
      ElMessage.warning('请先登录');
    } else {
      ElMessage.error('获取用户信息失败');
    }
    return '/login';
  }

  return true;
})