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

/* 헤더 타이틀 설정 */
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".team-title"); // 타이틀 요소 선택

  title.addEventListener("click", () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth" // 부드럽게 스크롤
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section"); // 해당 위치의 섹션 선택

    // 클릭 이벤트 (이미 적용됨)
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // 기본 페이지 이동 방지

            // 모든 네비게이션 링크에서 'active' 클래스 제거
            navLinks.forEach(nav => nav.classList.remove("active"));

            // 클릭된 요소에 'active' 클래스 추가
            link.classList.add("active");

            // 해당 섹션 위치로 이동
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // 헤더 높이 고려
                    behavior: "smooth"
                });
            }
        });
    });

    // 스크롤 이벤트 추가 (현재 위치에 맞는 네비게이션 업데이트)
    window.addEventListener("scroll", () => {
        let scrollPosition = window.scrollY + 100; // 현재 스크롤 위치 (조금 여유 두기)

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                let currentId = section.getAttribute("id");

                // 모든 네비게이션 링크에서 'active' 제거 후, 현재 섹션만 활성화
                navLinks.forEach(nav => {
                    nav.classList.remove("active");
                    if (nav.getAttribute("href").substring(1) === currentId) {
                        nav.classList.add("active");
                    }
                });
            }
        });
    });
});
