<template>
  <div class="newsSet">
    <el-descriptions title="注册信息" :border="true" class="newItem" direction="vertical">
      <el-descriptions-item label="注册成功" class-name="send" label-class-name="setLabel">
        发送
      </el-descriptions-item>
      <el-descriptions-item label="通知" width="80%" label-class-name="setLabel">
        {{ blockData.content }}
      </el-descriptions-item>
      <el-descriptions-item label="操作" aligin="center">
        <el-button type="primary" link @click="handleEdit(blockData)">编辑</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <EditDialog :editFlag="editFlagHandle" :initBlockData="blockData" @close="handleClose" />
    <el-descriptions title="重置密码消息" :border="true" class="newItem" direction="vertical">
      <el-descriptions-item label="注册成功" class-name="send" label-class-name="setLabel">
        发送
      </el-descriptions-item>
      <el-descriptions-item label="通知" width="80%" label-class-name="setLabel">
        {{ blockData.content }}
      </el-descriptions-item>
      <el-descriptions-item label="操作" aligin="center">
        <el-button type="primary" link @click="handleEdit(blockData)">编辑</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <EditDialog :editFlag="editFlagHandle" :initBlockData="blockData" @close="handleClose" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EditDialog from './components/EditDialog.vue';

// 编辑
const editFlagHandle = ref(false);
const blockData = ref<any>({
  isSend: 0,
  content: '您的用户密码已重置成功！新密码为：#交易密码#，请及时登录销售查询系统修改密码。【上海】'
});
const handleEdit = async (data: any) => {
  editFlagHandle.value = true;
  blockData.value = data;
};

const handleClose = async () => {
  blockData.value = {};
  editFlagHandle.value = false;
};
</script>

<style lang="scss" scoped>
.newsSet {
  .newItem {
    margin-bottom: 24px;
  }
  :deep(.send) {
    color: #00d097;
  }
  .setLabel {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #464646;
  }
}
</style>
