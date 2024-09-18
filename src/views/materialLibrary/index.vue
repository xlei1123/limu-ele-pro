<template>
  <div class="library">
    <div class="groupsBar">
      <ul class="groups">
        <li
          v-for="group in groups"
          @click="handleClickGroup(group.id)"
          :class="`group ${activeId === group.id ? 'active' : ''}`"
          :key="group.id"
        >
          {{ group.label }}({{ group.count }})
        </li>
      </ul>
      <div class="extra">
        <el-button type="primary" link @click="manage">
          <el-icon class="icon"><Setting /></el-icon> 管理
        </el-button>
        <el-button type="primary" link @click="newGroup">
          <el-icon class="icon"><Plus /></el-icon> 新建
        </el-button>
      </div>
    </div>
    <NewGroupDialog :showFlag="newGroupVisible" @close="handleNewGroupClose" />
    <ManageGroupDialog
      :showFlag="manageGroupVisible"
      :initBlockData="groups"
      @close="handleManageGroupClose"
    />
    <ImagList :group="activeId" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Setting, Plus } from '@element-plus/icons-vue';
import ImagList from './components/ImagList.vue';
import NewGroupDialog from './components/NewGroupDialog.vue';
import ManageGroupDialog, { Block } from './components/ManageGroupDialog.vue';

// 分组
const groups = ref<Block[]>([
  {
    id: '1',
    label: '未分组',
    count: 30
  },
  {
    id: '2',
    label: '狐狸',
    count: 50
  }
]);
const activeId = ref(groups.value[0]?.id);
const handleClickGroup = (id: string) => {
  activeId.value = id;
};

// 新建
const newGroupVisible = ref(false);
const newGroup = async (data: any) => {
  newGroupVisible.value = true;
};
const handleNewGroupClose = async () => {
  newGroupVisible.value = false;
};

// 管理
const manageGroupVisible = ref(false);
const manage = () => {
  manageGroupVisible.value = true;
};
const handleManageGroupClose = async () => {
  manageGroupVisible.value = false;
};
</script>

<style scoped lang="scss">
.library {
  .groupsBar {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .groups {
      display: flex;
      align-items: center;
      .group {
        margin-right: 30px;
        font-size: 16px;
        margin-right: 30px;
        font-family:
          PingFang SC,
          PingFang SC-Regular;
        border-bottom: 2px solid transparent;
        cursor: pointer;
      }
      .active {
        padding: 10px 0;
        color: #2077ff;
        border-bottom: 2px solid #2077ff;
      }
    }
    .extra {
      .icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
