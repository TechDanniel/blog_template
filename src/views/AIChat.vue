<template>
  <div class="body-layout">
    <!-- 对话历史 -->
    <aside class="chat-sidebar">
      <div class="chat-sidebar-header">
        <Button type="primary" class="new-chat-btn" @click="handleNewChat">
          <el-icon><Plus /></el-icon>
          新建对话
        </Button>
      </div>

      <div class="chat-list-container">
        <!-- 空状态 -->
        <div v-if="sessions.length === 0" class="empty-sessions">
          <p class="empty-text">还没有对话记录</p>
          <p class="empty-desc">点击"新建对话"开始探索吧</p>
        </div>

        <!-- 会话列表 -->
        <div
          v-for="(session) in sessions"
          :key="session.id"
          class="session-item"
          :class="{ active: currentSessionId === session.id }"
          @click="currentSessionId = session.id"
        >
          <div class="session-content">
            <h4 class="session-title">{{ session.title }}</h4>
            <p class="session-last-message">{{ session.lastMessage }}</p>
            <p class="session-time">{{ formatRelativeTime(session.timestamp) }}</p>
          </div>
          <button
            class="delete-btn"
            @click.stop="handleDeleteSession(session.id)"
          >
            <Trash2 class="icon" />
          </button>
        </div>
      </div>
    </aside>

    <!-- 聊天主区域 -->
    <main class="chat-main">
      <div class="messages-container">
        <!-- 空消息 -->
        <div v-if="messages.length === 0 && !isTyping" class="empty-chat">
          <h3 class="empty-chat-title">你好！我是 AI 助手</h3>
          <p class="empty-chat-desc">
            我可以帮你回答问题、整理知识，或者协助你管理知识库。
            <span v-if="useKnowledgeBase" class="kb-tip">📚 当前已启用本地知识库</span>
          </p>
          <p class="empty-chat-hint">👇 在下方输入框开始对话</p>
        </div>

        <!-- 消息列表 -->
        <el-scrollbar v-else height="100%">
          <div class="message-list">
            <div
              v-for="(message) in messages"
              :key="message.id"
              class="message-row"
              :class="{ user: message.role === 'user' }"
            >
              <!-- AI 头像 -->
              <div v-if="message.role === 'assistant'" class="avatar ai-avatar">
                <ChatDotRound class="avatar-icon" />
              </div>

              <!-- 消息气泡 -->
              <div class="message-bubble" :class="{ user: message.role === 'user' }">
                <p class="message-content">{{ message.content }}</p>
                <p class="message-time">
                  {{ new Date(message.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }}
                </p>
              </div>

              <!-- 用户头像 -->
              <div v-if="message.role === 'user'" class="avatar user-avatar">
                <User class="avatar-icon" />
              </div>
            </div>

            <!-- 打字中 -->
            <div v-if="isTyping" class="typing-indicator">
              <div class="avatar ai-avatar">
                <ChatDotRound class="avatar-icon" />
              </div>
              <div class="message-bubble">
                <TypingIndicator />
              </div>
            </div>

            <div ref="messagesEndRef" />
          </div>
        </el-scrollbar>
      </div>
      

      <!-- 输入框区域 -->
      <div class="input-wrapper">
        <div class="kb-toggle">
          <label class="kb-toggle-label">
            <button
              class="kb-checkbox"
              :class="{ checked: useKnowledgeBase }"
              @click="useKnowledgeBase = !useKnowledgeBase"
            >
              <svg
                v-if="useKnowledgeBase"
                class="check-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <Document class="kb-icon" />
            <span>引用本地知识库</span>
          </label>
        </div>

        <div class="input-box-container">
          <textarea
            v-model="inputMessage"
            @keydown="handleKeyDown"
            placeholder="输入你的问题... (Shift+Enter 换行)"
            class="message-input"
          />
          <button
            class="send-btn"
            @click="handleSendMessage"
            :disabled="!inputMessage.trim() || isTyping"
          >
            <Promotion class="send-icon" />
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import {
  Plus,User,ChatDotRound,
  Document,
  Promotion
} from '@element-plus/icons-vue';
import TypingIndicator from '@/components/TypingIndicator.vue';

const props = defineProps({
  onNavigate: Function
});

// 状态
const darkMode = ref(false);
const useKnowledgeBase = ref(true);
const inputMessage = ref('');
const currentSessionId = ref('1');
const isTyping = ref(false);
const messagesEndRef = ref(null);

// 会话列表
const sessions = ref([
  { id: '1', title: '如何使用知识库系统？', lastMessage: '你好！我想了解如何使用这个知识库系统...', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', title: '前端开发最佳实践', lastMessage: '请告诉我React开发的最佳实践...', timestamp: new Date(Date.now() - 86400000) }
]);

// 消息列表
const messages = ref([]);

// 滚动到底部
const scrollToBottom = () => nextTick(() => messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' }));
watch(messages, scrollToBottom, { deep: true });

// 发送消息
const handleSendMessage = () => {
  console.log('发送消息')
};

// 新建对话
const handleNewChat = () => {
  console.log('新建对话')
};

// 删除会话
const handleDeleteSession = (id) => {
  sessions.value = sessions.value.filter(s => s.id !== id);
  if (currentSessionId.value === id && sessions.value.length) {
    currentSessionId.value = sessions.value[0].id;
  }
};

// 回车发送
const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};

// 时间格式化
const formatRelativeTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const min = ~~(diff / 60000);
  const hour = ~~(diff / 3600000);
  const day = ~~(diff / 86400000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min}分钟前`;
  if (hour < 24) return `${hour}小时前`;
  if (day < 7) return `${day}天前`;
  return date.toLocaleDateString('zh-CN');
};
</script>

<style scoped>
/* 主体布局 */
.body-layout {
  display: flex;
  height: calc(100vh - 73px);
}

/* 聊天侧边栏 */
.chat-sidebar {
  width: 288px;
  border-right: 1px solid var(--border-light);
  backdrop-filter: blur(20px);
  background: var(--bg-page);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.chat-sidebar-header {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
}

.new-chat-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(to bottom right, #3b82f6, #22d3ee);;
  border-radius: var(--radius-lg);
}

.chat-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 空会话 */
.empty-sessions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 32px;
}

.empty-icon-box {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xl);
  background: linear-gradient(to bottom right, var(--color-primary-start), var(--color-primary-end));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: var(--shadow-md);
}

.empty-icon {
  width: 32px;
  height: 32px;
  color: white;
}

.empty-text {
  color: var(--text-normal);
  margin-bottom: 8px;
  font-size: 14px;
}

.empty-desc {
  font-size: 12px;
  color: var(--text-desc);
}

/* 会话项 */
.session-item {
  position: relative;
  padding: 16px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--bg-card);
}

.session-item:hover {
  background: var(--bg-card-hover);
}

.session-item.active {
  background: linear-gradient(to right, var(--color-primary-start), var(--color-primary-end));
  color: white;
  box-shadow: var(--shadow-md);
}

.session-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.session-content {
  flex: 1;
  min-width: 0;
}

.session-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.session-last-message {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-desc);
}

.session-item.active .session-last-message,
.session-item.active .session-time {
  color: rgba(255, 255, 255, 0.8);
}

.session-time {
  font-size: 12px;
  margin-top: 4px;
  color: var(--text-desc);
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
  background: transparent;
  border: none;
  cursor: pointer;
  color: currentColor;
}

.session-item:hover .delete-btn {
  opacity: 1;
}

/* 聊天主区域 */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;

  flex-direction: column;
  gap: 16px;
}

/* 空聊天 */
.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.empty-chat-icon-box {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-xl);
  background: linear-gradient(to bottom right, var(--color-primary-start), var(--color-primary-end));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  box-shadow: var(--shadow-lg);
}

.empty-chat-icon {
  width: 48px;
  height: 48px;
  color: white;
}

.empty-chat-title {
  font-size: 20px;
  color: var(--text-title);
  margin-bottom: 12px;
}

.empty-chat-desc {
  color: var(--text-desc);
  max-width: 450px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.kb-tip {
  display: block;
  margin-top: 8px;
  color: var(--color-primary-start);
}

.empty-chat-hint {
  font-size: 14px;
  color: var(--text-desc);
}

/* 消息列表 */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-row {
  display: flex;
  gap: 16px;
}

.message-row.user {
  justify-content: flex-end;
}

/* 头像 */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
}

.ai-avatar {
  background: linear-gradient(to bottom right, var(--color-primary-start), var(--color-primary-end));
}

.user-avatar {
  background: linear-gradient(to bottom right, var(--color-user-start), var(--color-user-end));
}

.avatar-icon {
  width: 24px;
  height: 24px;
  color: white;
}

/* 消息气泡 */
.message-bubble {
  max-width: 600px;
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: 16px;
  box-shadow: var(--shadow-md);
  background: var(--bg-message-bot);
  border: 1px solid var(--border-color);
}

.message-bubble.user {
  background: var(--bg-message-user);
  color: white;
  border: none;
}

.message-content {
  white-space: pre-wrap;
  line-height: 1.6;
  margin: 0;
}

.message-time {
  font-size: 12px;
  margin-top: 8px;
  color: var(--text-desc);
}

.message-bubble.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

/* 打字指示器 */
.typing-indicator {
  display: flex;
  gap: 16px;
}

/* 输入区域 */
.input-wrapper {
  border-top: 1px solid var(--border-light);
  backdrop-filter: blur(20px);
  background: var(--bg-page);
  padding: 24px;
}

/* 知识库开关 */
.kb-toggle {
  margin-bottom: 16px;
}

.kb-toggle-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.kb-checkbox {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  border: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  background: transparent;
  cursor: pointer;
}

.dark .kb-checkbox {
  border-color: #475569;
}

.kb-checkbox.checked {
  background: linear-gradient(to right, var(--color-primary-start), var(--color-primary-end));
  border-color: var(--color-primary-start);
}

.check-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.kb-icon {
  width: 16px;
  height: 16px;
  color: var(--color-primary-start);
}

.kb-toggle-label span {
  font-size: 14px;
  color: var(--text-normal);
}

/* 输入框 */
.input-box-container {
  position: relative;
}

.message-input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  outline: none;
  resize: none;
  min-height: 60px;
  max-height: 200px;
  transition: var(--transition);
  color: var(--text-normal);
}

.message-input:focus {
  background: white;
  border-color: var(--color-primary-start);
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1), 0 4px 16px rgba(168, 85, 247, 0.2);
}

.dark .message-input:focus {
  background: #1e293b;
}

.send-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 10px;
  border-radius: var(--radius-lg);
  background: linear-gradient(to right, var(--color-primary-start), var(--color-primary-end));
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.send-btn:hover {
  background: linear-gradient(to right, #9333ea, #db2777);
  box-shadow: var(--shadow-lg);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-icon {
  width: 20px;
  height: 20px;
}
</style>