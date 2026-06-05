const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxDJksg2aiyqMei3gGhZjE9zOuprbzJownZV0HTNAOhESlwCovPi6XW8w8_I3y3mR-x/exec";


function vote(answer) {
  fetch(WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ answer: answer })
  });

  document.getElementById("message").innerText = "응답이 완료되었습니다!";
  setTimeout(loadResult, 1000);
}

function loadResult() {
  const oldScript = document.getElementById("jsonpScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "jsonpScript";
  script.src = WEBAPP_URL + "?callback=showResult&t=" + new Date().getTime();
  document.body.appendChild(script);
}

function showResult(data) {
  document.getElementById("questionTitle").innerText = data.question;

  const buttons = document.getElementById("buttons");
  buttons.innerHTML = "";

  const resultArea = document.getElementById("resultArea");
  resultArea.innerHTML = "";

  let total = 0;

  data.options.forEach(option => {
    total += data.counts[option] || 0;
  });

  data.options.forEach(option => {
    const count = data.counts[option] || 0;
    const percent = total === 0 ? 0 : (count / total) * 100;

    buttons.innerHTML += `
      <button onclick="vote('${option}')">${option}</button>
    `;

    resultArea.innerHTML += `
      <div class="bar-item">
        <span>${option}</span>
        <div class="bar-bg">
          <div class="bar" style="width:${percent}%"></div>
        </div>
        <strong>${count}명</strong>
      </div>
    `;
  });

  document.getElementById("totalCount").innerText = total;
}

loadResult();
setInterval(loadResult, 2000);
