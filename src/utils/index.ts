/**
 * 是否时网址
 * @param str
 * @returns
 */
export function isHttp(str: string) {
  const isHttpExpression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  const httpExp = new RegExp(isHttpExpression);
  return httpExp.test(str);
}
