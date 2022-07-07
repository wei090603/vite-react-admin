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
    account: string
    avatar: string
    createdAt: string
    email: string
    id: number | string
    name: string
    phone: string
    remark: string
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

export namespace Navgation { 
  export interface ResMenuList {
    createdAt: string
    id: number
    link: string
    sort: number
    title: string
    updatedAt: string
  }
}

export namespace IArticle {
  interface Categor {
    id: number,
    title: string
  }
  interface Author {
    id: number
    nickName: string
    avatar: string
  }
  interface Tag {
    id: number
    name: string
  }
  export interface ResArticleList {
    author: Author
    category: Categor
    comments: number
    content: string
    createdAt: string
    updatedAt: string
    id: number
    image: string[]
    isTop: boolean
    likes: number
    reading: number
    sort: number
    status: number
    title: string
    tag: Tag[]
  }
  export interface ReqGetArticleParams extends ReqPage {
    
  }
}