<template>
  <div class="home">
    <header class="logo">
      <img alt="logoIcon" class="logoIcon" src="/favicon.ico" />
      <p class="welcome">欢迎</p>
      <p class="slogan">LIMU - 页面复制开发,覆盖90%的后台管理系统页面，删删改改就完成了</p>
    </header>
    <div class="steps">
      <h4>使用步骤：</h4>
      <el-steps space="25%" :active="active" align-center finish-status="success">
        <el-step title="打开limu-paste网站" />
        <el-step title="安装vscode插件：limu-paste" />
        <el-step title="在网站复制页面" />
        <el-step title="vscode项目目录右键limu-paste" />
      </el-steps>
    </div>
    <div class="video">
      <h4>演示：</h4>
      <video controls width="1000">
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);
</script>

<style lang="scss" scoped>
.home {
  padding: 10px;
  .steps {
    margin: 60px auto;
  }
}
.logo {
  margin-top: 10px;
  .welcome {
    margin: 10px 0;
    text-align: center;
    font-size: 24px;
  }
  .slogan {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
  }
}
.logoIcon {
  display: block;
  width: 60px;
  margin: 0 auto;
}
.video {
  video {
    display: block;
    margin: 0 auto;
  }
}
</style>
