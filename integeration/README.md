项目根目录/
├── index.html              # 首页，统一入口
├── data/
│   └── data.json            # 景点数据（名称、类型、游客量、评分等）
├── css/
│   └── style.css            # 自定义样式
├── js/
│   └── main.js              # 筛选交互+ECharts 图表渲染
├── libs/                    # 第三方库文件
│   ├── bootstrap/           # Bootstrap CSS & JS
│   ├── echarts/             # ECharts 图表库
│   └── three/               # Three.js + OrbitControls
├── images/                  # 景点图片资源
├── three-d/
│   └── scene.html           # 三维家乡导览场景
└── README.md

首页说明展示家乡概览卡片，导航栏连通各模块
景点查询是按景点名称搜索、按类型（亲子/自然/悠闲时光）筛选，实时过滤结果
数据统计使用ECharts渲染各景点游客量、评分对比图表
家乡三维使用Three.js三维场景，展示家乡地标，支持旋转缩放交互

Bootstrap来自https://getbootstrap.com/  运用于响应式栅格、导航栏、卡片等UI组件

ECharts来自https://echarts.apache.org/  用于柱状图、折线图渲染

Three.js来自https://threejs.org/  用于3D场景搭建与渲染

OrbitControls来自https://threejs.org/examples/jsm/controls/OrbitControls.js  用于鼠标拖拽旋转、滚轮缩放交互

Three.js官方examples目录

景点数据来自锡都个旧文旅公众号真实数据（data.json）

景点名称、类型、游客量、景点图片来自自摄照片 

页面卡片展示

地标模型使用Three.js简单基础几何体构建三维场景中的家乡地标

1.下载或克隆项目到本地：
   git clone https://github.com/KDXiii/self8.git
   ```
2. 进入项目根目录，用浏览器打开index.html
3. 三维导览页面：点击导航栏"家乡三维"入口，或直接打开three-d/scene.html
4. 建议使用 Chrome 或 Edge 浏览器
