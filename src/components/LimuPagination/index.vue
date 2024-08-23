<template>
  <div>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 50];
    },
  },
  layout: {
    type: String,
    default: '->, total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
  hideSinglePage: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update']);

const handleSizeChange = (pageSize: number) => {
  emit('update', {
    pageSize,
    currentPage: 1
  });
}
const handleCurrentChange = (currentPage: number) => {
  emit('update', {
    pageSize: props.pageSize,
    currentPage,
  });
}



</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>