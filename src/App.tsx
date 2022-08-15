import { FC } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from './utils/history';
import AuthRouter from '@/router/config/authRouter';
import { rootRouter, Router } from '@/router';
import { useAppSelector } from './hooks';
import { RouteObject } from './router/interface';

import 'antd/dist/antd.less';
import './App.less';

const App: FC = () => {
  const { resources } = useAppSelector(state => state.user);
  const routes: RouteObject[] = rootRouter(resources);

  return (
    <HistoryRouter history={history}>
      <AuthRouter>
        <Router routes={routes} />
      </AuthRouter>
    </HistoryRouter>
  );
};

export default App;
