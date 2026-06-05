const WEBAPP_URL = "https://script.google.com/a/macros/h.jne.go.kr/s/AKfycby6zzDZFpY-6bCMBY1CaqspkzZxbzb11lJ8LSmRYCLaTbXdEkKBFt1wvYxcECvhC3bV/exec";

function vote(answer) {
  fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify({ answer: answer })
  });

  document.getElementById("message").innerText = "응답이 완료되었습니다!";
}

function loadResult() {
  fetch(WEBAPP_URL)
    .then(response => response.json())
    .then(data => {
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
    });
}

function updateBar(barId, countId, count, total) {
  const percent = total === 0 ? 0 : (count / total) * 100;

  document.getElementById(barId).style.width = percent + "%";
  document.getElementById(countId).innerText = count + "명";
}

loadResult();
setInterval(loadResult, 2000);
