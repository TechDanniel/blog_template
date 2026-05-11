<template>
  <div class="p-4">
    <div class="main-header">
      <div>
        <h2>我的知识库</h2>
        <p class="desc">共 {{ knowledgeBases.length }} 个知识库</p>
      </div>
      <div class="action-buttons">
        <el-button type="primary">
          <el-icon><Filter /></el-icon>
        </el-button>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="card-list">
      <a
        v-for="kb in knowledgeBases"
        :key="kb.id"
        :href="kb.docLink"
        target="_blank"
        rel="noreferrer"
      >
        <Card v-bind="kb" />
      </a>
    </div>
  </div>
</template>

<script setup>
import {
  Plus, Filter
} from '@element-plus/icons-vue'
import Card from '@/components/Card.vue'
import FloatingParticles from '@/components/FloatingParticles.vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { knowledgeBases } from '@/config/knowledgeBaseCard'

</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.desc {
  color: var(--desc);
  margin: 4px 0 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>