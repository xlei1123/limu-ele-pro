<template>
  <div class="block">
    <el-dialog :modelValue="showFlag" title="管理分组" width="500px" @closed="blockDataClose">
      <ul class="groups">
        <li class="group" v-for="group in initBlockData" :key="group.id">
          <div>
            <el-input
              v-if="editGroupId === group.id"
              ref="inputRef"
              v-model="group.label"
              @change="changeValue"
              @blur="handleBlur"
              :autofocus="true"
              maxlength="6"
              show-word-limit
              clearable
            />
            <span v-else>{{ group.label }}</span>
          </div>
          <div>
            <el-button link type="primary" @click="edit(group.id)">编辑</el-button>
            <el-button link type="primary" @click="handleDel(group.id)">删除</el-button>
          </div>
        </li>
      </ul>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, PropType, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export type Block = {
  id: string;
  label: string;
  count: number;
};

const props = defineProps({
  showFlag: {
    required: true,
    type: Boolean,
    default: false
  },
  initBlockData: {
    required: true,
    type: Array as PropType<Block[]>
  }
});

const emit = defineEmits(['close']);

// 赋初始值
const groups = ref({
  ...props.initBlockData
});
watchEffect(() => {
  groups.value = { ...(props.initBlockData || {}) };
});

const handleCancel = () => {
  groups.value = { ...props.initBlockData };
  emit('close');
};

const editGroupId = ref();
const inputRef = ref();
const edit = (id: string) => {
  editGroupId.value = id;
  nextTick(() => {
    inputRef.value[0]?.focus();
  });
};

const handleBlur = () => {
  editGroupId.value = undefined;
};
const changeValue = (v: string) => {
  // TODO 请求数据
  if (!v) return;
  editGroupId.value = undefined;
};

// 删除
const handleDel = (id: string) => {
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
const handleSave = async () => {
  // TODO
  emit('close');
};
const blockDataClose = async () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
}
</style>
