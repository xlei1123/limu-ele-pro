<template>
  <div class="block">
    <el-dialog
      :modelValue="editFlag"
      title="编辑数据"
      width="500px"
      @closed="blockDataClose">
      <el-form
        inline
        ref="ruleFormRef"
        label-position="top"
        :rules="rules"
        :model="blockData"
        class="formEdit">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="blockData.phone" maxlength="10" placeholder="请输入手机号" clearable />
        </el-form-item>
        <el-form-item label="所属机构" prop="org">
          <el-select v-model="blockData.org" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="代销者" prop="sales">
          <el-select v-model="blockData.org" placeholder="请选择">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="自定义函数校验" prop="funT">
          <el-input v-model="blockData.funT" maxlength="10" placeholder="请输入" clearable />
        </el-form-item>
      </el-form>
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
import { ref, reactive, watchEffect } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';

type Block = {
  phone: string;
  org: string;
  sales: string;
  funT?: string;
}

const props = defineProps({
  editFlag: {
    required: true,
    type: Boolean,
    default: false,
  },
  initBlockData: {
    required: true,
    type:  Object as () => Block,
  },
});
const emit = defineEmits(['close']);

const checkNumber = (rule: any, value: any, callback: any) => {
  if (!value || (/^[1-9]\d{0,9}$/.test(value))) {
    callback();
  } else {
    callback(new Error('只能输入最多10位正整数'));
  }
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号' },
    {pattern: /^1[0-9]{10}$/, message: '请输入11位手机号'}
  ],
  org: [
    { required: true, message: '请选择所属机构' }
  ],
  sales: [
    { required: true, message: '请选择代销者' }
  ],
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
