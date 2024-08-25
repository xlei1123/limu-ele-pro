<template>
  <div class="success">
    <el-result
      icon="success"
      title="操作成功"
      sub-title="预计两小时内到账"
    >
      <template #extra>
        <el-button type="primary">再转一笔</el-button>
        <el-button>查看账单</el-button>
      </template>
    </el-result>
    <div class="description">
      <el-descriptions :column="1">
        <el-descriptions-item label="姓名:" label-class-name="descripLabel" >limu</el-descriptions-item>
        <el-descriptions-item label="付款人账户:" label-class-name="descripLabel">limu-paste.quchafen.com</el-descriptions-item>
        <el-descriptions-item label="收款姓名:" label-class-name="descripLabel">limu-paste</el-descriptions-item>
        <el-descriptions-item label="转账金额:" label-class-name="descripLabel" class-name="descrip">500.00元</el-descriptions-item>
      </el-descriptions>
    </div>
    
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['submit']);



</script>

<style lang="scss" scoped>
.success {
  border: none;
  .description {
    margin-top: 24px;
    padding: 24px 40px;
    background-color: rgba(0, 0, 0, 0.02);
    :deep(.el-descriptions__cell) {
      background-color: rgba(0, 0, 0, 0.02);
      .descripLabel {
        color: rgba(0, 0, 0, 0.45);
      }
      .descrip {
        font-weight: bold;
        font-size: 16px;
      }
    }
    
  } 
}
</style>
