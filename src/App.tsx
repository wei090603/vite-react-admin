import { FC } from 'react'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes
} from 'react-router-dom'
import Login from '@/pages/login'
import LayoutApp from '@/pages/layout'
import Dashboard from '@/pages/dashboard'
import Article from '@/pages/article'
import NotFound from '@/pages/notFound'
import Navigation from '@/pages/navigation'
import Permission from '@/pages/permission'
import history from './utils/history'
import { Auth } from './components/Auth'

import 'antd/dist/antd.less'
import './App.less'

const App: FC = () => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <LayoutApp />
            </Auth>
          }
        >
          <Route index element={<Dashboard />}></Route>
          <Route path="article" element={<Article />}></Route>
          <Route path="navigation" element={<Navigation />}></Route>
          <Route path="permission" element={<Permission />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  )
}

export default App
