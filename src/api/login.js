import http from '@/api/index'

// 手机登录接口
export function phoneLogin (data) {
  return http.post(`login/cellphone?phone=${data.phoneNumber}&password=${data.password}`)
}

// 发送验证码
export function sentCaptcha (phone) {
  return http.get(`captcha/sent?phone=${phone}`)
}

// 验证验证码
export function testCaptcha (phone, captcha) {
  return http.get(`captcha/verify?phone=${phone}&captcha=${captcha}`)
}

// 注册 || 修改密码
export function registerUser (data) {
  return http.get(`register/cellphone?phone=${data.phone}&password=${data.password}&captcha=${data.code}&nickname=${data.nickname}`)
}

// 验证昵称是否重复
export function nicknameTest (nickname) {
  return http.get(`nickname/check?nickname=${nickname}`)
}
