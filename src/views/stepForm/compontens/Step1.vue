<template>
  <div class="submitForm">
    <el-form
      label-width="100px"
      :rules="rules"
      ref="ruleFormRef"
      :model="submitParams"
      class="queryCard"
    >
      <el-form-item label="付款人姓名" prop="name">
        <el-input v-model="submitParams.name" placeholder="请输入完整姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="submitParams.phone" placeholder="请输入完整手机号" />
      </el-form-item>
      <el-form-item label="收款账号" prop="idCard">
        <el-input v-model="submitParams.idCard" placeholder="请输入完整付款证号" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="submitParams.remark" type="textarea" maxlength="30" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch(ruleFormRef)">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FormInstance } from 'element-plus';

const emit = defineEmits(['submit']);

const rules = {
  name: [
    {
      required: true,
      message: '请输入付款账号'
    },
    {
      pattern: /^(?=.{1,20}$)(?!.*([·])\1)[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5·]{0,}[\u4e00-\u9fa5]+$/,
      message: '最多20位,不能以·开头结尾,·不能连续'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号'
    },
    { pattern: /^1[0-9]{10}$/, message: '请输入11位手机号' }
  ],
  idCard: [
    {
      required: true,
      message: '请输入收款账号'
    },
    { pattern: /^[0-9]{17}([0-9]|X)$/, message: '请输入正确的收款账号' }
  ]
};

const initsubmitParams = {
  name: '章三',
  phone: '13700000000',
  idCard: '622189878776787777',
  remark: ''
};

const submitParams = ref({ ...initsubmitParams });

const ruleFormRef = ref<FormInstance>();
const handleSearch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // TODO 提交请求数据
      console.log('submit!');
      emit('submit', submitParams.value);
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.submitForm {
  border: none;
  .el-input {
    --el-input-width: 460px;
  }
  .el-select {
    --el-select-width: 460px;
  }
  :deep(.el-date-editor) {
    box-sizing: border-box;
    flex: 0 0 460px;
    width: 460px;
  }
  :deep(.el-textarea__inner) {
    width: 460px;
  }
}
</style>
