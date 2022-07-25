import { FC } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from './utils/history';
import AuthRouter from '@/router/config/authRouter';
import Router from '@/router';

import 'antd/dist/antd.less';
import './App.less';

const App: FC = () => {
  return (
    <HistoryRouter history={history}>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HistoryRouter>
  );
};

export default App;
