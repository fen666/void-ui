export interface DocConfig {
  name: string;
  path?: string;
  fileName?: string;
  children?: DocConfig[];
}

export const enUS: DocConfig[] = [
  {
    name: 'Documentation',
    path: '',
    fileName: 'documentation',
  },
  {
    name: 'Basic Controls',
    children: [
      {
        name: 'flexbox',
        path: 'flexbox',
        fileName: 'flexbox',
      },
    ],
  },
];

export const zhCN: DocConfig[] = [
  {
    name: '文档',
    path: '',
    fileName: 'documentation',
  },
  {
    name: '基本',
    children: [
      {
        name: 'typography 排版',
        path: 'typography',
        fileName: 'basic/typography',
      },
      {
        name: 'button 按钮',
        path: 'button',
        fileName: 'basic/button',
      },
    ],
  },
  {
    name: '布局',
    children: [
      {
        name: 'common layout 通用布局',
        path: 'common',
        fileName: 'layout/common',
      },
      {
        name: 'flexbox 弹性盒子',
        path: 'flexbox',
        fileName: 'layout/flexbox',
      },
    ],
  },
  {
    name: '表单',
    children: [
      {
        name: 'toggle 开关',
        path: 'radio',
        fileName: 'form/toggle',
      },
      {
        name: 'radio 单选框',
        path: 'toggle',
        fileName: 'form/radio',
      },
    ],
  },
  {
    name: 'Navigation 导航',
    children: [
      {
        name: 'Tabs 标签页',
        path: 'tabs',
        fileName: 'navigation/tabs',
      },
      {
        name: 'Subnav 导航',
        path: 'subnav',
        fileName: 'navigation/subnav',
      },
      {
        name: 'BreadCrumb 面包屑',
        path: 'breadCurmb',
        fileName: 'navigation/breadCrumb',
      },
    ],
  },
  {
    name: '其他',
    children: [
      {
        name: '分数',
        path: 'score',
        fileName: 'other/score',
      },
      {
        name: 'processBar 进度条',
        path: 'processBar',
        fileName: 'other/processBar',
      },
      {
        name: 'note 提示',
        path: 'note',
        fileName: 'other/note',
      },
      {
        name: 'card 卡片',
        path: 'card',
        fileName: 'other/card',
      },
      {
        name: 'linkList 链接',
        path: 'linkList',
        fileName: 'other/linkList',
      },
    ],
  },
];
