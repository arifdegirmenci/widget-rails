(function () {
  const script = document.currentScript;
  const projectUUID = script.dataset.project;

  if (!projectUUID) {
    console.error("project uuid missing");
    return;
  }

  /* Button */
  const btn = document.createElement("button");
  btn.innerText = "💬 Feedback";
  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "9999";
  document.body.appendChild(btn);

  /* Modal */
  const modal = document.createElement("div");
  modal.style.display = "none";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background = "rgba(0,0,0,.4)";
  modal.innerHTML = `
    <div style="background:#fff;width:300px;margin:10% auto;padding:20px">
      <h3>Feedback</h3>
      <textarea id="fb-content" style="width:100%"></textarea>
      <br/><br/>
      <button id="fb-send">Gönder</button>
    </div>
  `;
  document.body.appendChild(modal);

  btn.onclick = () => modal.style.display = "block";
  modal.onclick = e => e.target === modal && (modal.style.display = "none");

  document.getElementById("fb-send").onclick = function () {
    fetch("http://localhost:3001/api/v1/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_uuid: projectUUID,
        content: document.getElementById("fb-content").value,
        rating: 5,
        sender_info: {
          url: location.href,
          ua: navigator.userAgent
        }
      })
    })
    .then(r => r.json())
    .then(() => {
      alert("Teşekkürler 🙌");
      modal.style.display = "none";
    });
  };
})();
