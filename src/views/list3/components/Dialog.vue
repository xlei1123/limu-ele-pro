<template>
  <div class="block">
    <el-dialog
      :modelValue="visibleFlag"
      title="编辑数据"
      width="500px"
      @closed="blockDataClose">
      这里写你自己的内容，如果需要数据还需要传入数据(参考编辑弹窗)
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  visibleFlag: {
    required: true,
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close']);




const handleCancel = () => {
  emit('close');
};
const handleSave = async () => {
  emit('close');
};
const blockDataClose = async () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.formEdit {
  .el-input {
  --el-input-width: 200px;
  }

  .el-select {
    --el-select-width: 200px;
  }
}
</style>
