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
  const veryGood = data["매우 좋음"] || 0;
  const good = data["좋음"] || 0;
  const normal = data["보통"] || 0;
  const hard = data["어려움"] || 0;

  const total = veryGood + good + normal + hard;

  updateBar("bar1", "count1", veryGood, total);
  updateBar("bar2", "count2", good, total);
  updateBar("bar3", "count3", normal, total);
  updateBar("bar4", "count4", hard, total);

  document.getElementById("totalCount").innerText = total;
}

function updateBar(barId, countId, count, total) {
  const percent = total === 0 ? 0 : (count / total) * 100;
  document.getElementById(barId).style.width = percent + "%";
  document.getElementById(countId).innerText = count + "명";
}

loadResult();
setInterval(loadResult, 2000);
