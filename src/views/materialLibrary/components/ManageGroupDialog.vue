<template>
  <div class="block">
    <el-dialog :modelValue="showFlag" title="编辑数据" width="500px" @closed="blockDataClose">
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
import { ref, reactive, watchEffect, PropType } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';

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

const checkNumber = (rule: any, value: any, callback: any) => {
  if (!value || /^[1-9]\d{0,9}$/.test(value)) {
    callback();
  } else {
    callback(new Error('只能输入最多10位正整数'));
  }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[0-9]{10}$/, message: '请输入11位手机号' }
  ],
  org: [{ required: true, message: '请选择所属机构' }],
  sales: [{ required: true, message: '请选择代销者' }],
  funT: [
    { required: true, message: '请输入' },
    { validator: checkNumber, trigger: 'change' }
  ]
});

// 赋初始值
const blockData = ref({
  ...props.initBlockData
});
watchEffect(() => {
  blockData.value = { ...(props.initBlockData || {}) };
});

const handleCancel = () => {
  blockData.value = { ...props.initBlockData };
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
  blockData.value = { ...props.initBlockData };
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
