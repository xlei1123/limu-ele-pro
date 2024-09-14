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
    <NewGroupDialog :showFlag="showFlagHandle" @close="handleClose" />
    <ManageGroupDialog :showFlag="showFlagHandle" :initBlockData="groups" @close="handleClose" />
    <ImagList :group="activeId" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
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

// 删除
const handleDel = (id: number) => {
  console.log(id);
  ElMessageBox.confirm('你确定要删除嘛？', '确认提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    // type: 'warning',
    draggable: true
  })
    .then(() => {
      // TODO 确认删除 请求删除接口
      ElMessage({
        type: 'success',
        message: '删除成功'
      });
    })
    .catch(() => {
      // 取消
      ElMessage({
        type: 'info',
        message: '已取消删除'
      });
    });
};

// 编辑
const showFlagHandle = ref(false);
const blockData = ref<any>({});
const newGroup = async (data: any) => {
  showFlagHandle.value = true;
  blockData.value = data;
};

const handleClose = async () => {
  blockData.value = {};
  showFlagHandle.value = false;
};

const manage = () => {};
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
