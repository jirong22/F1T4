document.addEventListener("DOMContentLoaded", function () {
  function updateCurrentTime() {
    const dateElement = document.getElementById("current-date");
    const today = new Date();

    dateElement.textContent = `📌 ${today.toLocaleDateString("ko-KR")}`;
  }

  updateCurrentTime();
});
