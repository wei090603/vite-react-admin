import { FC } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from './utils/history';
import AuthRouter from '@/router/config/authRouter';
import Router from '@/router';

import 'antd/dist/antd.less';
import './App.less';

const App: FC = () => {
  const { userInfo } = useAppSelector(state => state.user);
  //获取路由表映射出来的 动态路由
  const dynamicRoutes = func.getDynamicRouters();
  // 静态路由，合动态路由合并。
  const routes = mergeRoutes(dynamicRoutes);
  return (
    <HistoryRouter history={history}>
      <AuthRouter>
        <Router rootRouter="rootRouter" />
      </AuthRouter>
    </HistoryRouter>
  );
};

export default App;
