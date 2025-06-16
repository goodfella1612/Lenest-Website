
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('kickForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const start = document.getElementById('startTime').value;
    const end = document.getElementById('endTime').value;
    const movements = parseInt(document.getElementById('movements').value);

    if (!start || !end || isNaN(movements)) {
      resultDiv.innerHTML = "❗ Please fill in all fields correctly.";
      return;
    }

    const parseTime = t => {
      const [h, m] = t.split(":").map(Number);
      return new Date(1970, 0, 1, h, m);
    };

    const startTime = parseTime(start);
    let endTime = parseTime(end);

    if (endTime < startTime) endTime.setDate(endTime.getDate() + 1);

    const now = new Date();
    if (startTime > now || endTime > now) {
      resultDiv.innerHTML = "❗ Start or end time cannot be in the future.";
      return;
    }

    const duration = (endTime - startTime) / 60000;

    if (duration <= 0) {
      resultDiv.innerHTML = "❗ Invalid duration. Please check your start and end times.";
      return;
    }

    let assessment = "";

    if (movements >= 10) {
      if (duration <= 30) {
        assessment = "✅ Very Active Baby — Reassuring";
      } else if (duration <= 120) {
        assessment = "✅ Normal — Acceptable";
      } else {
        assessment = "⚠️ Borderline — Consider contacting your doctor";
      }
    } else {
      if (duration > 120) {
        assessment = "❗ Abnormal — Contact your doctor immediately";
      } else {
        assessment = "⚠️ Incomplete count — Continue monitoring for up to 2 hours";
      }
    }

    resultDiv.innerHTML = `
      <strong>Duration (minutes):</strong> ${Math.round(duration)}<br>
      <strong>Total Movements:</strong> ${movements}<br>
      <strong>Assessment:</strong> ${assessment}
    `;
  });
});
