import { FC, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { HOME_URL } from '@/config/config';
import { useAppSelector } from '@/hooks';
import { Link } from 'react-router-dom';
const BreadcrumbNav: FC = () => {
  useEffect(() => {}, []);
  const { breadcrumbList } = useAppSelector(state => state.app);
  const BreadcrumbItem = breadcrumbList.map((item: any) => {
    return (
      <Breadcrumb.Item key={item}>
        <Link to={item.path}>{item.title}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Breadcrumb>
      {breadcrumbList.length > 0 ? BreadcrumbItem : <Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
