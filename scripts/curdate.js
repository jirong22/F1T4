document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    const today = new Date();
    dateElement.textContent = `📌 ${today.toLocaleDateString("ko-KR")}`;
  }
});
