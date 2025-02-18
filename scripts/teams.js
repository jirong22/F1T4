document.addEventListener("DOMContentLoaded", () => {
  const teamTitle = document.querySelector(".team-title");
  const teamMembers = document.querySelectorAll(".team-member");

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", () => {
      const mbti = member.dataset.mbti;
      const letterToHighlight = mbti.includes("F") ? "F" : "T";
      highlightLetter(teamTitle, letterToHighlight);
    });

    member.addEventListener("mouseleave", () => {
      resetHighlight(teamTitle);
    });
  });
});

function highlightLetter(element, letter) {
  const spans = element.querySelectorAll(".highlight");

  spans.forEach((span) => {
    if (span.textContent.toUpperCase() === letter) {
      span.classList.add("active");
    }
  });
}

function resetHighlight(element) {
  const spans = element.querySelectorAll(".highlight");

  spans.forEach((span) => {
    span.classList.remove("active");
  });
}
