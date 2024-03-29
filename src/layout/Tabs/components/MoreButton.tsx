import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setTabsList } from '@/store/modules/app';

const MoreButton = (props: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { tabsList } = useAppSelector(state => state.app);

  // close multipleTab
  const closeMultipleTab = (tabPath?: string) => {
    const handleTabsList = tabsList.filter((item: Menu.MenuOptions) => {
      return item.path === tabPath || item.path === HOME_URL;
    });
    dispatch(setTabsList(handleTabsList));
    tabPath ?? navigate(HOME_URL);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <span>关闭当前</span>,
          onClick: () => props.delTabs(pathname)
        },
        {
          key: '2',
          label: <span>关闭其他</span>,
          onClick: () => closeMultipleTab(pathname)
        },
        {
          key: '3',
          label: <span>关闭所有</span>,
          onClick: () => closeMultipleTab()
        }
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }} trigger={['click']}>
      <Button className="more-button" type="primary" size="small">
        更多
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};
export default MoreButton;
