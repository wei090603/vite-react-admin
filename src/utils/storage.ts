// const basePrefix = ENV.PROJECT_NAME;

/**
 * 获取当前 project 存储数据的 key
 * @param key
 * @returns {*}
 */
function getProjectKey(key: string, prefix: string = '') {
  return `${prefix}_${key}`;
}

/**
 * 获取cookie
 * @param key
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @returns {*}
 */
export function getStorage(key: string, common = false, prefix: string = '') {
  const realKey = common ? key : getProjectKey(key, prefix);
  let value: string | null | undefined = localStorage.getItem(realKey);
  if (value === 'null') {
    value = null;
  }
  if (value === 'undefined') {
    value = undefined;
  }
  return value;
}

/**
 * 删除cookie
 * @param key
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @returns {*}
 */
export function removeStorage(key: string, common = false) {
  const realKey = common ? key : getProjectKey(key);
  return localStorage.removeItem(realKey);
}

/**
 * 设置cookie
 * @param key
 * @param value
 * @param common 是否为全局共享的 key,如果为 true 则不会加上工程的前缀
 * @returns {*}
 */
export function setStorage(key: string, value: string, common = false): void {
  if (value === undefined) {
    return removeStorage(key, common);
  }
  const realKey = common ? key : getProjectKey(key);
  return localStorage.setItem(realKey, value);
}

const cache: any = {};

/**
 * 存储数据在内存里
 * @param {*} key
 * @param {*} value
 */
export const setCache = (key: string, value: string) => {
  cache[key] = value;
};

/**
 * 从内存里读取数据
 * @param {*} key
 * @param {*} value
 */
export const getCache = (key: string) => cache[key];

/**
 * @Description: 获取 cache 对象，仅用于调试，不要再代码中使用
 * @Author: Longfei.Song
 * @Date: 2021-05-12 16:41:37
 * @param {*}
 * @return {*}
 */
export const getCacheObj = () => cache;
