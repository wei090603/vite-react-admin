import { FC, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { useAppSelector } from '@/hooks';
interface IRoute {
  meta: object;
  path: string;
  children: [];
}
const BreadcrumbNav: FC = () => {
  const { resources } = useAppSelector(state => state.user);
  let arr: any = [];

  const initResources = (resources: IRoute[]) => {
    console.log('111');
    resources.forEach((item: IRoute) => {
      arr.push({
        meta: item.meta,
        path: item.path
      });
    });
    resources.forEach((item: IRoute) => {
      if (item.children) {
        item.children.forEach((childItem: IRoute) => {
          console.log('333');
          arr.push({
            meta: childItem.meta,
            path: childItem.path
          });
          initResources(item.children);
        });
      }
    });
  };

  useEffect(() => {
    initResources(resources);
    console.log('arr', arr);
    // const initResources = resources.map(item => {
    //   // if (item.path === '/' && item.children) return item.children[0];
    //   // return item;
    // });
    // console.log('initResources', initResources);
  }, []);
  const { pathname } = useLocation();
  const { breadcrumbList } = useAppSelector(state => state.app);
  const currentBreadcrumbList = breadcrumbList[pathname] || [];
  console.log(currentBreadcrumbList, 'currentBreadcrumbList');
  return (
    <Breadcrumb>
      <Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
      {currentBreadcrumbList.map((item: string) => {
        return <Breadcrumb.Item key={item}>{item !== '首页' ? item : null}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
