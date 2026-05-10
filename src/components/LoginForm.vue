<template>
   <el-form 
    ref="formRef" 
    :model="form"
    :rules="rules"
  >
    <!-- 用户名 -->
    <el-form-item required prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名"
        size="default"
        clearable
      >
        <template #prefix><User class="input-icon" /></template>
      </el-input>
    </el-form-item>

    <!-- 昵称 -->
    <el-form-item required prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="昵称"
        size="default"
        clearable
      >
        <template #prefix><User class="input-icon" /></template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item required prop="password">
      <el-input
        v-model="form.password"
        placeholder="••••••••"
        size="default"
      />
    </el-form-item>

    <!-- 记住我 + 忘记密码 -->
    <div class="form-row">
      <el-checkbox v-model="rememberMe" class="checkbox-row">
        记住我
      </el-checkbox>
      <a href="#" class="link">忘记密码？</a>
    </div>

    <!-- 登录按钮 -->
    <el-button 
      type="primary" 
      class="login-btn" 
      @click="handleLogin"
    >
      登录
      <ArrowRight class="ml-1" />
    </el-button>

    <!-- 注册 -->
    <p class="register-tip">
      还没有账号？
      <a href="#" class="link">立即注册</a>
    </p>
  </el-form>
</template>

<script setup lang="ts">
import {
 ArrowRight
} from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const formRef = ref<FormInstance>()
const form = ref({
  username: '',
  nickname: '',
  password: ''
})

const passwordValidator = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } 
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('密码必须至少8位，包含大小写字母和数字'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof form>>({
  password:[
    {
      validator: passwordValidator,
      trigger: 'blur'
    }
  ]
})

const rememberMe = ref(false)
const emit = defineEmits(['login'])

const handleLogin = () => {
  if(!formRef.value) return
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('login', form.value)
    }
  })
}
</script>

<style scoped>
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--login-text-foreground);
}

/* 行 */
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.link {
  font-size: 14px;
  color: var(--login-primary);
  text-decoration: none;
}

/* 按钮 */
.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: var(--login-primary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 16px;
}

/* 注册 */
.register-tip {
  text-align: center;
  font-size: 14px;
  color: var(--login-text-foreground);
}
</style>