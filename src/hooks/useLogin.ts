import { userInfo } from '@/api/login';
import { getManagerResources } from '@/api/permission';

import { useAppDispatch } from '@/hooks';
import { setUserInfo, setUserResources } from '@/store/modules/user';

export default function useLogin() {
  const dispatch = useAppDispatch();
  // const setToken = useSetRecoilState(globalAtom.token);
  // const setUser = useSetRecoilState(globalAtom.user);
  // const setMenu = useSetRecoilState(globalAtom.menus);

  const logout = () => {
    window.location.reload();
  };

  // 登陆成功后获取 用户信息和菜单
  const initAfterLogin = async () => {
    const res = await Promise.all([userInfo(), getManagerResources()]);
    dispatch(setUserInfo(res[0]));
    dispatch(setUserResources(res[1]));
  };

  return {
    logout,
    initAfterLogin
  };
}
