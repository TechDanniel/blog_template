<template>
   <el-form 
    :ref="formRef" 
    :model="form"
  >
    <!-- 邮箱 -->
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        placeholder="your@email.com"
        size="default"
        clearable
      >
        <template #prefix><Mail class="input-icon" /></template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
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
import { ref } from 'vue'

const formRef = ref(null)
const form = ref({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const emit = defineEmits(['login'])

const handleLogin = () => {
  // 这里可以添加表单验证逻辑
  emit('login')
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