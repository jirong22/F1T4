document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1); // `#` 제거 (주소명 깔끔하게)

      if (targetId === "teams") {
        // 팀원 소개 클릭 시 페이지 최상단 이동
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetId === "guestbook") {
        // 방명록 클릭 시 페이지 최하단 이동
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else {
        // 목표 & 약속 클릭 시 해당 섹션으로 이동
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
