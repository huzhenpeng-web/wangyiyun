/*
 * @Author: hzp
 * @Date: 2022-06-15 15:43:54
 * @Last Modified by: hzp
 * @Last Modified time: 2022-06-15 21:38:27
 */
<template>
  <div class="login-container">
    <!-- 头部返回按钮 -->
    <div class="login-top" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span>返回</span>
    </div>
    <!-- logo -->
    <div class="logo">
      Vue音乐
    </div>
    <!-- 账户和密码 -->
    <div class="userInfo">
      <van-form @submit="onSubmit">
        <van-field :rules="userRules.phoneNumber" v-focus v-model.trim="userInfo.phoneNumber" type="tel" left-icon="user-o" placeholder="请填写手机号" clearable />
        <van-field :rules="userRules.password" v-model="userInfo.password" type="password" left-icon="closed-eye" placeholder="请填写密码" autocomplete clearable />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <!-- 记住我 -->
    <div class="checked-me">
      <van-checkbox v-model="checked" shape="square">记住我</van-checkbox>
    </div>
    <!-- 忘记密码和注册 -->
    <div class="user-forget-register">
      <span style="margin-left:0.6rem;" @click="forgetPopUp = true">忘记密码?</span>
      <span style="margin-right:0.6rem;" @click="registerPopUp = true">注册</span>
    </div>
    <!-- 短信登录弹出层 -->
    <van-popup v-model="forgetPopUp" :style="{ width:'100%',height: '50%'}" closeable>
      <span class="title">短信登录</span>
      <div class="forgetPopUp">
        <van-form>
          <van-field v-model="messageInfo.phone" type="tel" left-icon="user-o" placeholder="请填写手机号" clearable :rules="userRules.phoneNumber" />
          <van-field v-model="messageInfo.code" type="number" placeholder="请输入短信验证码" label="短信验证码">
            <template #button>
              <van-button size="small" type="primary" @click="sendCode">发送验证码</van-button>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="messageLogin">登录</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <!-- 注册弹出层 -->
    <van-popup v-model="registerPopUp" :style="{ width:'100%',height: '50%'}" closeable @close="closeRegisterPopUp">
      <span class="register-title">用户注册</span>
      <div class="registerPopUp" v-show="registerShow">
        <van-form>
          <van-field v-model="registerInfo.phone" type="tel" left-icon="user-o" placeholder="请填写手机号" clearable :rules="userRules.phoneNumber" />
          <van-field v-model.trim="registerInfo.password" type="password" left-icon="closed-eye" placeholder="请填写密码" autocomplete clearable :rules="registerRules.password" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="nextTo">下一步</van-button>
          </div>
        </van-form>
      </div>
      <van-notice-bar v-show="registerShow" left-icon="volume-o" text="密码不能包含空格 | 包含字母、数字、符号中至少两种 | 密码长度为8-20位" />
      <!-- 验证码 -->
      <div class="codeIpt" v-show="codeShow">
        <van-field v-model="registerInfo.code" type="number" label="验证码:" label-width="1rem" />
        <div style="margin: 16px;">
          <van-button round block type="info" @click="nextToTest">下一步</van-button>
        </div>
      </div>
      <!-- 昵称 -->
      <div class="nickname" v-show="nicknameShow">
        <van-field v-model="registerInfo.nickname" label="昵称:" label-width="0.7rem" />
        <div style="margin: 16px;">
          <van-button round block type="info" @click="registerSuccess">完成</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { phoneLogin, sentCaptcha, testCaptcha, nicknameTest, registerUser } from '@/api/login.js'
import { Toast } from 'vant'
export default {
  data () {
    // 验证手机号的规则
    const checkPhone = (value, rule) => {
      const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (phoneReg.test(value)) {
        return true
      }
      return false
    }
    // 注册密码规则
    const checkPassword = (value, rule) => {
      if (value.length < 8 || value.length > 20) {
        return false
      }
      return true
    }
    // 字符 数字 字母规则
    const checkCount = (value, key) => {
      const reg1 = /[a-zA-Z]/
      const reg2 = /[0-9]/
      const reg3 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/
      if ((reg1.test(value) && reg2.test(value)) || (reg1.test(value) && reg3.test(value)) || (reg2.test(value) && reg3.test(value))) {
        return true
      }
      return false
    }
    return {
      // 手机登录信息
      userInfo: {
        phoneNumber: '',
        password: ''
      },
      // 手机登录验证规则
      userRules: {
        phoneNumber: [
          { required: 'true', message: '请输入手机号', trigger: 'onBlur' },
          { validator: checkPhone, message: '请输入正确的手机号', trigger: 'onBlur' }
        ],
        password: [{ required: 'true', message: '请输入密码', trigger: 'onBlur' }]
      },
      messageInfo: {
        phone: '',
        code: ''
      },
      // 忘记密码弹出层
      forgetPopUp: false,
      registerPopUp: false,
      // 复选框状态
      checked: true,
      registerInfo: {
        phone: '',
        password: '',
        code: '',
        nickname: ''
      },
      // 注册规则
      registerRules: {
        password: [
          { required: 'true', message: '请输入密码', trigger: 'onBlur' },
          { validator: checkPassword, message: '密码长度为8-20位', trigger: 'onBlur' },
          { validator: checkCount, message: '包含字母、数字、符号中至少两种', trigger: 'onBlur' }
        ]
      },
      // 注册信息的展示
      registerShow: true,
      codeShow: false,
      // 昵称的展示
      nicknameShow: false
    }
  },
  methods: {
    // 提交手机号和密码表单
    async onSubmit () {
      const { data: res } = await phoneLogin(this.userInfo)
      console.log(res)
      if (res.code !== 200) {
        return Toast.fail(`${res.message}`)
      }
      this.$router.push('/myPage')
      Toast.success('登录成功!')
      // 保留当前登录成功的用户信息
      this.preserveUser()
    },
    // 发送验证码
    async sendCode () {
      const { data: res } = await sentCaptcha(this.messageInfo.phone)
      if (res.code !== 200) {
        return Toast.fail(res.message)
      }
      Toast.success('验证码发送成功')
    },
    // 校验验证码 成功则登录
    async messageLogin () {
      try {
        const { data: res } = await testCaptcha(this.messageInfo.phone, this.messageInfo.code)
        if (res.code === 200) {
          Toast.success('登录成功!')
          this.$router.push('/myPage')
        }
      } catch (e) {
        Toast.fail('验证码错误!')
      }
    },
    // 存储账户和密码到本地用户
    preserveUser () {
      if (this.checked === true) {
        window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      } else {
        window.localStorage.removeItem('userInfo')
      }
    },
    // 读取本地保留的账户
    readUser () {
      if (window.localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      }
    },
    // 注册用户输入信息后下一步
    async nextTo () {
      // 发送验证码给用户
      const { data: res } = await sentCaptcha(this.registerInfo.phone)
      // 发送成功显示验证码输入框隐藏其他内容
      if (res.code === 200) {
        this.registerShow = false
        this.codeShow = true
      }
    },
    // 验证验证码是否正确
    async nextToTest () {
      try {
        const { data: res } = await testCaptcha(this.registerInfo.phone, this.registerInfo.code)
        if (res.code === 200) {
          this.codeShow = false
          this.nicknameShow = true
        }
      } catch (e) {
        Toast.fail('验证码错误')
      }
    },
    // 关闭弹出层
    closeRegisterPopUp () {
      this.registerShow = true
    },
    // 注册完成按钮
    async registerSuccess () {
      const { data: res } = await nicknameTest(this.registerInfo.nickname)
      console.log(res)
      // 没有重复用户名
      if (res.code === 200 && res.duplicated === false) {
        const { data: res } = await registerUser(this.registerInfo)
        console.log(res)
        if (res.code === 200) {
          Toast.success('注册成功')
        }
      } else if (res.code === 200 && res.duplicated === true) {
        return Toast.fail('用户名重复')
      }
      // 窗口恢复初始化
      this.registerPopUp = false
      this.registerShow = true
      this.nicknameShow = false
      this.codeShow = false
      // 清空注册用户
      this.registerInfo = ''
    }
  },
  mounted () {
    this.readUser()
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: url('../../assets/imgs/login.png');
  background-size: 100% 100%;
  background-position: fixed;
  background-repeat: no-repeat;
  .login-top {
    font-size: 0.5rem;
  }
  .logo {
    width: 100%;
    position: relative;
    top: 15%;
    text-align: center;
    font-size: 0.8rem;
  }
  .userInfo {
    position: relative;
    top: 25%;
    .van-field {
      background: none;
      caret-color: #fff; //改变光标颜色
      ::v-deep .van-field__control {
        color: #fff;
      }
    }
    ::v-deep .van-icon {
      font-size: 0.6rem;
      color: #fff;
    }
  }
  .user-forget-register {
    position: relative;
    top: 35%;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .forgetPopUp {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .title {
    color: black;
    font-size: 0.6rem;
    position: relative;
    top: 10%;
    left: 35%;
  }
  .checked-me {
    position: relative;
    top: 27%;
    ::v-deep .van-checkbox__label {
      height: 0.6rem;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
  .register-title {
    color: black;
    font-size: 0.6rem;
    position: relative;
    top: 10%;
    left: 35%;
  }
  .codeIpt {
    position: relative;
    top: 30%;
    .van-field {
      background-color: gray;
      ::v-deep .van-field__control {
        border-bottom: 1px solid black;
      }
    }
  }
  .nickname {
    position: relative;
    top: 30%;
    ::v-deep .van-field__control {
      border-bottom: 1px solid black;
    }
  }
}
</style>
