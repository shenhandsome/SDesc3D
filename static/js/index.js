function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  const button = document.querySelector(".scroll-to-top");
  if (!button) return;
  button.classList.toggle("visible", window.scrollY > 400);
});

function playLoopVideos() {
  document.querySelectorAll("video[data-loop-video]").forEach(function (video) {
    video.muted = true;
    const playRequest = video.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(function () {});
    }
  });
}

window.addEventListener("DOMContentLoaded", playLoopVideos);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) playLoopVideos();
});

function copyBibTeX() {
  const bibtex = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  if (!bibtex || !button) return;

  const label = button.querySelector(".copy-text");
  const showSuccess = function () {
    button.classList.add("copied");
    if (label) label.textContent = "Copied";
    window.setTimeout(function () {
      button.classList.remove("copied");
      if (label) label.textContent = "Copy";
    }, 1800);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(bibtex.textContent).then(showSuccess);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = bibtex.textContent;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  showSuccess();
}
