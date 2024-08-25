<template>
  <el-card shadow="never" class="submitForm">
    <el-form label-width="80px" :rules="rules" ref="ruleFormRef" :model="submitParams" class="queryCard">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="submitParams.name" placeholder="请输入完整姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="submitParams.phone" placeholder="请输入完整手机号" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="submitParams.idCard" placeholder="请输入完整身份证号" />
      </el-form-item>
      
      <el-form-item label="函数校验" prop="funT">
        <el-input v-model="submitParams.funT" maxlength="10" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="开启时间">
        <el-date-picker
          v-model="submitParams.createTime"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
        />
      </el-form-item>
      <el-form-item label="公开">
        <el-radio-group v-model="submitParams.public">
          <el-radio :value="0">不公开</el-radio>
          <el-radio :value="1">部分公开</el-radio>
          <el-radio :value="2">公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属机构" v-if="submitParams.public == 2" prop="org">
        <el-select v-model="submitParams.org" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="submitParams.remark" type="textarea" maxlength="30" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus';

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
];

const rules = {
  name: [
    {
      required: true, message: '请输入姓名',
    },
    {
      pattern: /^(?=.{1,20}$)(?!.*([·])\1)[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5·]{0,}[\u4e00-\u9fa5]+$/, message: '最多20位,不能以·开头结尾,·不能连续'
    }
  ],
  phone: [
    {
      required: true, message: '请输入手机号',
    },
    {pattern: /^1[0-9]{10}$/, message: '请输入11位手机号'}
  ],
  idCard: [
    {
      required: true, message: '请输入身份证号',
    },
    {pattern: /^[0-9]{17}([0-9]|X)$/, message: '请输入正确的身份证号'},
  ],
  org: [
    {
      required: true, message: '请选择',
    },
  ]
};

const initsubmitParams = {
  name: '',
  phone: '',
  idCard: '',
  org: '',
  funT: '',
  createTime: '',
  public: 0, // 0-不公开 1-部分公开 2-公开
  remark: ''
}

const submitParams = ref({...initsubmitParams});

const ruleFormRef = ref<FormInstance>();
const handleSearch = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // TODO 提交请求数据
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
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