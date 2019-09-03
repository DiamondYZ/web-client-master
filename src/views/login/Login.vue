<template>
  <div class="login">
    <el-form :model="loginForm" status-icon :rules="formRules" ref="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name" type="text" placeholder="请输入用户名" autoComplete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.pass" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入密码" auto-complete="on"></el-input>
      </el-form-item>
      <!--<el-form-item label="租户" prop="owner">-->
        <!--<el-input v-model="loginForm.owner" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入租户" auto-complete="on"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item v-if="hasVerifyKey" prop="verifyKey">
        <img class="login__verifyImage" :src="verifyImage" @click="loadVerifyImage"/>
        <el-input v-model="loginForm.verifyValue" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入验证码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login__btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {genVerifyImage, uuidv4, loginByToken} from '@/api/member'
  import storage from '@/utils/storage'
  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        tryLoginCount: parseInt(storage.get('tryLoginCount') || 0, 10),
        verifyImage: '',
        loginForm: {
          name: '',
          pass: '',
          owner: 'isesol',
          verifyKey: '',
          verifyValue: ''
        },
        loginFormRules: {
          name: [{ required: true, trigger: 'blur', message: this.$t('login.nameRequired') }],
          pass: [{ required: true, trigger: 'blur', message: this.$t('login.passRequired') }],
          owner: [{ required: true, trigger: 'blur', message: this.$t('login.ownerRequired') }]
        },
        verifyFormRules: {
          verifyValue: [{ required: true, trigger: 'blur', message: this.$t('login.verifyKeyRequired') }]
        }
      }
    },
    computed: {
      hasVerifyKey () {
        return !!this.verifyImage
      },
      formRules () {
        if (this.hasVerifyKey) {
          return Object.assign({}, this.loginRormRules, this.verifyFormRules)
        } else {
          return this.loginFormRules
        }
      }
    },
    methods: {
      loadVerifyImage () {
        this.loading = true
        let verifyKey = uuidv4()
        genVerifyImage(verifyKey).then((resp) => {
          this.loginForm.verifyKey = verifyKey
          this.verifyImage = 'data:image/png;base64,' + resp
          this.loading = false
        }).catch((err) => {
          this.verifyImage = 'data:image/png;base64,' + err
          this.loading = false
        })
      },
      submitForm (formName) {
        if (this.loading) {
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm)
              .then(() => {
                loginByToken().then(() => {
                  this.loading = false
                  storage.set('tryLoginCount', 0)
                  this.$router.push('/')
                })
              }).catch(() => {
                this.loading = false
                let count = storage.get('tryLoginCount') || 0
                if (count > 3) {
                  this.loadVerifyImage()
                }
                storage.set('tryLoginCount', count + 1)
              })
          }
        })
      }
    }
  }
</script>

<style>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login__btn {
    width: 100%;
  }
  .login__verifyImage {
    width: 200px;
    height: 50px;
  }
  .login > .el-form {
    width: 300px;
  }
</style>
