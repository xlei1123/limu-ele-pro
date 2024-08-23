declare interface Window {
  preloadApi: {
    bridgeAction: (packageName: string, action?: string, v?: string | object) => any;
  };
}

declare module 'vue-codemirror';

declare module '@xterm/xterm';

declare module '@xterm/addon-fit';
