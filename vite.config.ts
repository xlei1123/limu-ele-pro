import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server';

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue(), mockDevServerPlugin()],
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT),
      open: true // 运行自动打开浏览器
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve(__dirname, './src') // @代替src
      }
    }
  };
};
