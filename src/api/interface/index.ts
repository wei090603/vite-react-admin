// * 分页响应参数
export interface ResPage<T> {
  list: T[];
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  page: number;
  limit: number;
}

export interface ResDate {
  createdAt: string;
  updatedAt: string;
}

// * 登录
export namespace Login {
  export interface ReqLoginForm {
    account: string;
    password: string;
  }
  export interface ResLogin {
    token: string;
  }
}

// * 用户管理
export namespace User {
  export interface ResUserInfo {
    account: string;
    avatar: string;
    createdAt: string;
    email: string;
    id: number | string;
    name: string;
    phone: string;
    remark: string;
  }
  // export interface ReqGetUserParams extends ReqPage {
  // 	username: string;
  // 	gender: number;
  // 	idCard: string;
  // 	email: string;
  // 	address: string;
  // 	createTime: string[];
  // 	status: number;
  // }
  // export interface ResUserList {
  // 	id: string;
  // 	username: string;
  // 	gender: string;
  // 	age: number;
  // 	idCard: string;
  // 	email: string;
  // 	address: string;
  // 	createTime: string;
  // 	status: number;
  // }
}

export namespace IArticle {
  interface Categor {
    id: number;
    title: string;
  }
  interface Author {
    id: number;
    nickName: string;
    avatar: string;
  }
  interface Tag {
    id: number;
    name: string;
  }
  export interface ResArticleList {
    author: Author;
    category: Categor;
    comments: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    image: string[];
    isTop: boolean;
    likes: number;
    reading: number;
    sort: number;
    status: number;
    title: string;
    tag: Tag[];
  }
  export type ReqArticleParams = {
    id?: number;
    image: string[];
    isTop?: boolean;
    status: number;
    title: string;
    tag: Tag[];
    category: number;
    content: string;
  };
  export type ReqGetArticleParams = ReqPage;
}

export namespace ICategory {
  export interface ResCategory {
    id: number;
    title: string;
  }
  export interface ResCategoryList extends ResCategory {
    createdAt: string;
    updatedAt: string;
  }
  export type ReqGetCategoryParams = ReqPage;

  export type CreateCategory = {
    parentId: number;
    title: string;
  };
}

export namespace ITag {
  export interface ResTag {
    id: number;
    name: string;
  }
  export interface ResTagList {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  export type ReqGetTagParams = ReqPage;

  export type ReqCreateTagParams = {
    name: string;
  };
}

export namespace IManager {
  interface Roles {
    id: number;
    mark: string;
    remark: string;
    roleName: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ResManagerList {
    account: string;
    avatar: string;
    createdAt: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    remark: string;
    roles: Roles[];
    status: boolean;
    updatedAt: string;
  }

  export type ReqGetManagerParams = ReqPage;
}

export namespace IRole {
  export type Role = {
    mark: string;
    remark: string;
    roleName: string;
  };
  export type ResRoleList = Role &
    ResDate & {
      id: number;
    };

  export type RoleUpdate = Role & {
    id: number;
  };
  export type ResourcesPatch = {
    resourcesId: React.Key[];
  };
  export type NoPageItem = {
    roleName: string;
    id: number;
  };
  export type ReqGetRoleParams = ReqPage;
}

export namespace IResource {
  export type Resource = {
    status: boolean;
    component: string;
    path: string;
    icon: string;
    type: string;
    parentId: number;
    title: string;
  };
  export type ResResourceList = Resource & {
    id: number;
    children: ResResourceList[];
    createdAt: string;
  };
}

export namespace IUser {
  export type ResUserList = {
    id: number;
    account: string;
    nickName: string;
    phoneNum: string;
    email: string;
    favs: number;
    signInCount: number;
    age: number;
    sex: boolean;
    dateBirth: number;
    position: boolean;
    location: string;
    sign: string;
    vip: boolean;
    avatar: string;
    openId: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };

  export type ReqGetUserParams = ReqPage;
}

export namespace IManager {
  export type ManagerItem = {
    id: string;
    name: string;
    account: string;
    email: string;
    phone: string;
    remark: string;
    createdAt: string;
    updatedAt: string;
  };
  export type Manager = {
    name: string;
    account: string;
    email: string;
    phone: string;
    remark: [];
  };
  export type UpManager = Manager & {
    id: number;
  };
}

export namespace INavgation {
  export type Navgation = {
    title: string;
    link: string;
    sort: number;
  };

  export type ResNavgationList = ResDate &
    Navgation & {
      id: number;
    };

  export type ReqUpdateNavationParams = Navgation & {
    id: number;
  };

  // export type ReqPostNavgationList = Omit<Navgation, "id">;

  export type ReqGetNavgationParams = ReqPage;
}

export namespace ILoginLogger {
  type Manager = {
    account: string;
  };
  export type ResLoginLogger = {
    id: number;
    manager: Manager;
    loginAddress: string;
    loginIp: string;
    createdAt: string;
    updatedAt: string;
  };

  export type ReqGetLoginLoggerParams = ReqPage;
}

export namespace INotice {
  type NoticeItem = {
    title: string;
    type: number;
    status: boolean;
  };
  export type NoticeListReq = {
    limit: number;
    page: number;
    title: string;
  };
  export type INoticeList = ResDate &
    NoticeItem & {
      id: string;
      content: string;
    };

  export type NoticeFormItem = NoticeItem & {
    content: string;
  };
  export type Id = {
    id: string;
  };
}

export namespace IAdvertise {
  export enum Type {
    HOME = 'home'
  }
  export type Advertise = {
    title: string;
    picture: string;
    position: Type;
    status: boolean;
    describe: string;
    link: string;
    sort: number;
  };
  export type ResAdvertiseList = ResDate &
    Advertise & {
      id: number;
    };

  export type ReqGetAdvertiseParams = ReqPage;
}
