// 数据统计：fetch加载data/data.json，渲染人气榜单表格与柱状图

const statusEl = document.querySelector('#status');
let loadedData = null; // 已加载的数据，供筛选使用

// ── 人气榜单表格（课堂五筛选模式：下拉选择即过滤）──
const renderSpots = (data) => {
  const category = document.querySelector('#category-filter').value;
  const visitors = document.querySelector('#visitors-filter').value;
  const shown = data.spots.filter(s =>
    (category === 'all' || s.category === category) &&
    (visitors === 'all' || (visitors === 'high' ? s.visitors >= 1 : s.visitors < 1))
  );
  const list = document.querySelector('#spot-list');
  list.innerHTML = '';
  if (shown.length === 0) {
    list.innerHTML = '<tr><td colspan="4" class="text-muted">没有符合条件的景点</td></tr>';
    return;
  }
  shown.forEach(s => {
    list.insertAdjacentHTML('beforeend', `
      <tr>
        <td>No.${s.rank}</td>
        <td>${s.name}</td>
        <td>${s.category}</td>
        <td>${s.visitors}${s.unit}</td>
      </tr>
    `);
  });
};

// ── 游客量柱状图 ──
let chart = null;

const renderChart = (data) => {
  if (chart === null) {
    chart = echarts.init(document.querySelector('#usage-chart'));
  }
  chart.setOption({
    title: { text: data.title, left: 'center' },
    tooltip: { trigger: 'axis' },
    grid: { left: 56, right: 24, bottom: 90 },
    xAxis: {
      type: 'category',
      data: data.spots.map(s => s.name),
      axisLabel: { rotate: 38, interval: 0, fontSize: 11 }
    },
    yAxis: { type: 'value', name: data.summary.unit },
    series: [{
      name: '接待游客',
      type: 'bar',
      data: data.spots.map(s => s.visitors),
      itemStyle: { color: '#4bbce9' }
    }]
  });
};

const loadData = async () => {
  statusEl.textContent = '加载中...';
  statusEl.style.display = 'block';
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    if (data.spots.length === 0) {
      statusEl.textContent = '暂无数据';
      return;
    }
    statusEl.style.display = 'none';
    loadedData = data;
    renderSpots(data);
    renderChart(data);
  } catch (error) {
    statusEl.textContent = '加载失败：' + error.message;
  }
};

window.addEventListener('resize', () => {
  if (chart) chart.resize();
});

// 筛选下拉：选择即过滤榜单
document.querySelector('#category-filter').addEventListener('change', () => {
  if (loadedData) renderSpots(loadedData);
});
document.querySelector('#visitors-filter').addEventListener('change', () => {
  if (loadedData) renderSpots(loadedData);
});

loadData();
