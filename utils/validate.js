// 验证邮箱
export function validateEmail(s) {
  return /^([a-z0-9A-Z]+[-_|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/.test(s);
}

// 验证密码
export function validatepwd(d) {
  return /[0-9a-zA-Z]{6,20}$/.test(d);
}