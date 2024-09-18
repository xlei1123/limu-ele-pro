<template>
  <div class="preview">
    <el-dialog
      :modelValue="showPreview"
      width="600px"
      @closed="previewClose"
      :destroy-on-close="true"
    >
      <el-image :src="url" lazy />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showPreview: {
    required: true,
    type: Boolean,
    default: false
  },
  url: {
    required: true,
    type: String
  }
});

const emit = defineEmits(['close']);

const previewClose = async () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.preview {
  text-align: center;
}
</style>
