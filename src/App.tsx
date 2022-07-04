import { FC, Suspense, lazy } from 'react'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes
} from 'react-router-dom'

// import Login from '@/pages/login'
// import LayoutAppz  from '@/pages/layout'
// const Dashboard = lazy(() => import('@/pages/dashboard'))
// const Article = lazy(() => import('@/pages/article'))
// const Navigation = lazy(() => import('@/pages/navigation'))
// const Permission = lazy(() => import('@/pages/permission'))
// const Category = lazy(() => import('@/pages/category'))
// const Tag = lazy(() => import('@/pages/tag'))

// const NotFound = lazy(() => import('@/pages/notFound'))
import history from './utils/history'
import AuthRouter from '@/router/config/authRouter'
import Router from '@/router'

import 'antd/dist/antd.less'
import './App.less'

const App: FC = () => {
  return (
    <HistoryRouter history={history}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HistoryRouter>
  )
}

export default App
