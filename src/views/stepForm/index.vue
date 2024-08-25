‘<template>
  <el-card shadow="never" class="stepForm">
    <el-steps :align-center="true" :active="active" finish-status="success">
      <el-step title="填写表单一" />
      <el-step title="确认表单二"/>
      <el-step title="完成" />
    </el-steps>
    <div class="form">
      <Step1 v-show="active == 0" @submit="submit"/>
      <Step2 v-show="active == 1" @submit="submit"/>
      <Step3 v-show="active == 2" @submit="submit"/>
    </div>
    <el-divider />
    <div class="tip">
      <b class="explainText">说明</b><br/>
      <b>转账到支付宝账户</b><br/>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。<br/><br/>

      <b>转账到银行卡</b><br/>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Step1 from './compontens/Step1.vue';
import Step2 from './compontens/Step2.vue';
import Step3 from './compontens/Step3.vue';

const active = ref(0);

const submit = (value) => {
  console.log('步骤'+active+'的结果：', value);
  active.value = active.value + 1;
  // TODO 这里写请求之类的其他逻辑
}
</script>

<style lang="scss" scoped>
.stepForm {
  border: none;
  .form {
    margin: 20px auto;
    width: 540px;
  }
  .tip {
    font-size: 14px;
    .explainText {
      font-size: 16px;
    }
  }
}
</style>