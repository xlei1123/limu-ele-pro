<template>
  <div class="block">
    <el-dialog :modelValue="showFlag" title="新建" width="500px" @closed="blockDataClose">
      <el-form
        inline
        ref="ruleFormRef"
        label-position="top"
        :rules="rules"
        :model="blockData"
        class="formEdit"
      >
        <el-form-item label="分组名称" prop="group">
          <el-input
            v-model="blockData.group"
            maxlength="6"
            placeholder="请输入"
            show-word-limit
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSave"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';

defineProps({
  showFlag: {
    required: true,
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  group: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[0-9]{10}$/, message: '请输入11位手机号' }
  ]
});

const initData = {
  group: ''
};
// 赋初始值
const blockData = ref({
  ...initData
});

const handleCancel = () => {
  blockData.value = { ...initData };
  emit('close');
};
const handleSave = async () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // TODO 请求保存数据
      emit('close');
    }
  });
};
const blockDataClose = async () => {
  blockData.value = { ...initData };
  emit('close');
};
</script>

<style scoped lang="scss">
.block {
  :deep(.el-form) {
    width: 100%;
  }
}
</style>
