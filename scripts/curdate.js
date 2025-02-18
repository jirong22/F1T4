document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    const today = new Date();
    dateElement.textContent = `📌 ${today.toLocaleDateString("ko-KR")}`;
  }
});
/* 네비게이션 바 설정 */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
          e.preventDefault(); // 기본 페이지 이동 방지
          
          // 모든 네비게이션 링크에서 'active' 클래스 제거
          navLinks.forEach(nav => nav.classList.remove("active"));
          
          // 클릭된 요소에 'active' 클래스 추가
          link.classList.add("active");
      });
  });
});

