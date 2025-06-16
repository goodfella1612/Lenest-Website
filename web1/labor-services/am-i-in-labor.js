
function checkLabor() {
  const preq1 = document.querySelector('input[name="preq1"]:checked')?.value;
  const preq2 = document.querySelector('input[name="preq2"]:checked')?.value;

  if (!preq1 || !preq2) {
    document.getElementById("result").textContent = "❗ Please answer all preliminary questions.";
    return;
  }

  if (preq1 === "yes" || preq2 === "yes") {
    document.getElementById("result").textContent = "🚨 You are likely in labor. Please contact your healthcare provider or go to the hospital immediately.";
    return;
  }

  const q1 = document.querySelector('input[name="q1"]:checked')?.value;
  const q2 = document.querySelector('input[name="q2"]:checked')?.value;
  const q3 = document.querySelector('input[name="q3"]:checked')?.value;
  const q4 = document.querySelector('input[name="q4"]:checked')?.value;
  const q5 = document.querySelector('input[name="q5"]:checked')?.value;

  if (!q1 || !q2 || !q3 || !q4 || !q5) {
    document.getElementById("result").textContent = "❗ Please answer all remaining questions.";
    return;
  }

  let score = 0;
  if (q1 === "yes") score++;
  if (q2 === "yes") score++;
  if (q3 === "yes") score++;
  if (q4 === "yes") score++;
  if (q5 === "yes") score++;

  let resultText = "";
  if (score >= 4) {
    resultText = "🚨 You are likely in labor. Please contact your healthcare provider or go to the hospital immediately.";
  } else if (score >= 2) {
    resultText = "⚠️ You may be showing signs of early labor. Monitor your symptoms and contact your doctor if they intensify.";
  } else {
    resultText = "✅ You're likely not in labor yet. Keep monitoring your symptoms and reach out if anything changes.";
  }

  document.getElementById("result").textContent = resultText;
}
