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

  export type ReqCreateCategoryParams = {
    grade: number;
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

export namespace IRoles {
  export interface ResRolesList {
    id: number;
    mark: string;
    remark: string;
    roleName: string;
    createdAt: string;
    updatedAt: string;
  }
  export type ReqGetRolesParams = ReqPage;
}

export namespace IUser {
  export type ResUserList = {
    id: number;
    account: string;
    nickName: string;
    mobile: string;
    email: string;
    sign: string;
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
}

export namespace INavgation {
  export type ResNavgationList = {
    id: string;
    title: string;
    link: string;
    sort: number;
    createdAt: string;
    updatedAt: string;
  };

  export type ReqGetNavgationParams = ReqPage;
}
