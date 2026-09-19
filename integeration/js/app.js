// 数据统计：fetch加载data/data.json，渲染人气榜单表格与柱状图

const statusEl = document.querySelector('#status');

// ── 人气榜单表格 ──
const renderSpots = (data) => {
  const list = document.querySelector('#spot-list');
  list.innerHTML = '';
  data.spots.forEach(s => {
    list.insertAdjacentHTML('beforeend', `
      <tr>
        <td>No.${s.rank}</td>
        <td>${s.name}</td>
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
    renderSpots(data);
    renderChart(data);
  } catch (error) {
    statusEl.textContent = '加载失败：' + error.message;
  }
};

window.addEventListener('resize', () => {
  if (chart) chart.resize();
});

loadData();
