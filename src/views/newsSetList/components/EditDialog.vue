<template>
  <div class="block">
    <el-dialog :modelValue="editFlag" title="编辑数据" width="500px" @closed="blockDataClose">
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :rules="rules"
        :model="blockData"
        class="formEdit"
      >
        <el-form-item label="注册成功" prop="isSend">
          <el-radio-group v-model="blockData.isSend">
            <!-- works when >=2.6.0, recommended ✔️ not work when <2.6.0 ❌ -->
            <el-radio :value="0">不发送</el-radio>
            <el-radio :value="1">发送</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="content">
          <template #label>
            通知模板
            <el-icon @click="getMore"><ChatRound /></el-icon>
          </template>
          <el-mention
            v-model="blockData.content"
            type="textarea"
            prefix="#"
            :options="options"
            placeholder="请输入"
            :rows="5"
            maxlength="100"
            show-word-limit
            @change="mentionChange"
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
import { ref, reactive, watchEffect } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import { ChatRound } from '@element-plus/icons-vue';

type Block = {
  isSend: number;
  content: string;
};

const props = defineProps({
  editFlag: {
    required: true,
    type: Boolean,
    default: false
  },
  initBlockData: {
    required: false,
    type: Object as () => Block,
    default: () => ({
      isSend: 0,
      content: ''
    })
  }
});
const emit = defineEmits(['close']);

const options = ref([
  {
    label: '名称',
    value: '名称#'
  },
  {
    label: '期号',
    value: '期号#'
  },
  {
    label: '金额',
    value: '金额#'
  },
  {
    label: '号码',
    value: '号码#'
  },
  {
    label: '初始密码',
    value: '初始密码#'
  },
  {
    label: '随机密码',
    value: '随机密码#'
  },
  {
    label: '失败原因',
    value: '失败原因#'
  }
]);
const mentionChange = (v: string) => {
  console.log(v);
};

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  phone: [{ required: true, message: '请输入手机号' }],
  content: [{ required: true, message: '请输入' }]
});

// 赋初始值
const blockData = ref({
  ...props.initBlockData
});

watchEffect(() => {
  if (props.initBlockData) {
    blockData.value = { ...props.initBlockData };
  }
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
      console.log('blockData.value==>', blockData.value);
      emit('close');
    }
  });
};
const blockDataClose = async () => {
  blockData.value = { ...props.initBlockData };
  emit('close');
};

const getMore = () => {};
</script>

<style scoped lang="scss">
.formEdit {
  .content {
    :deep(.el-form-item__label) {
      &::after {
        margin-left: 2px;
        content: '?';
        display: inline-block;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #fff;
        background-color: #bfbfbf;
        font-size: 12px;
      }
    }
  }
}
</style>
