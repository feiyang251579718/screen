# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

<script src="<%= context.config.publicPath %>js/demo.js" type="module"></script>
引入脚本的时候需要设置type，确保umi加载完成后，g_bus挂载到window对象上。

画布id:MapCancas

通过 /public/js/demo.js 知道如何通过eventbus接收数据

'ws:refresh:report' 对应ws数据 推送报告提交及报告审核通过
'update:basicInfo' 对应刷新基本信息的接口