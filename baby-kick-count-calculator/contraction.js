let contractions = [];
let currentStart = null;

const ctx = document.getElementById('contractionChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Contraction Duration (sec)',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        yAxisID: 'y1'
      },
      {
        label: 'Interval (min)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        yAxisID: 'y2'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Duration (sec)' },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Interval (min)' },
        grid: { drawOnChartArea: false }
      }
    }
  }
});

function formatTime(date) {
  return date.toLocaleTimeString();
}

function startContraction() {
  if (currentStart !== null) return;
  currentStart = new Date();
  document.getElementById('status').textContent = "Contraction started at " + formatTime(currentStart);
}

function stopContraction() {
  if (currentStart === null) return;

  const end = new Date();
  const duration = (end - currentStart) / 1000;
  const start = currentStart;
  currentStart = null;

  let interval = null;
  if (contractions.length > 0) {
    const prevEnd = new Date(contractions[contractions.length - 1].end);
    interval = (start - prevEnd) / 60000;
  }

  contractions.push({ start, end, duration, interval });

  updateTable();
  updateChart();
  checkIfLaborLikely();

  document.getElementById('status').textContent = "Contraction ended at " + formatTime(end);
}

function updateTable() {
  const tbody = document.getElementById('contractionTable');
  tbody.innerHTML = "";
  contractions.forEach((c, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${formatTime(c.start)}</td>
        <td>${formatTime(c.end)}</td>
        <td>${c.duration.toFixed(1)}</td>
        <td>${c.interval ? c.interval.toFixed(1) : '-'}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function updateChart() {
  const labels = contractions.map((_, i) => `C${i + 1}`);
  const durations = contractions.map(c => c.duration);
  const intervals = contractions.map(c => c.interval ?? null);

  chart.data.labels = labels;
  chart.data.datasets[0].data = durations;
  chart.data.datasets[1].data = intervals;
  chart.update();
}

function checkIfLaborLikely() {
  const recent = contractions.slice(-3);
  if (recent.length < 3) return;

  const frequent = recent.every(c => c.interval && c.interval <= 5);
  const longEnough = recent.every(c => c.duration >= 60);

  const msg = document.getElementById('message');
  if (frequent && longEnough) {
    msg.textContent = "Labor is likely starting. Please contact your doctor or go to the hospital.";
    msg.style.color = "red";
  } else {
    msg.textContent = "";
  }
}
