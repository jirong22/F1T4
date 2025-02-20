document.addEventListener("DOMContentLoaded", function () {
  function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function getSchedule() {
    return [
      { start: 540, end: 570, status: "데일리 스크럼 진행 중" }, // 09:00 ~ 09:30
      { start: 570, end: 630, status: "알고리즘 학습 중" }, // 09:30 ~ 10:30
      { start: 810, end: 840, status: "개인 학습 중" }, // 13:30 ~ 14:00
      { start: 840, end: 1080, status: "집중 코딩 중" }, // 14:00 ~ 18:00
      { start: 1200, end: 1230, status: "TIL 작성 중" }, // 20:00 ~ 20:30
      { start: 1230, end: 1260, status: "하루 회고 진행 중" }, // 20:30 ~ 21:00
    ];
  }

  function getCurrentStatus(schedule, currentTime) {
    return schedule.find(
      ({ start, end }) => currentTime >= start && currentTime < end
    );
  }

  function updateTeamStatus() {
    const teamStatus = document.querySelector(".team-status");
    const scheduleItems = document.querySelectorAll("#schedule-container li");
    const currentTime = getCurrentTimeInMinutes();
    const schedule = getSchedule();
    const currentStatus = getCurrentStatus(schedule, currentTime);

    teamStatus.textContent = `📌 지금 우리 팀원들은? : ${
      currentStatus ? currentStatus.status : "휴식 또는 개인 시간"
    }`;

    scheduleItems.forEach((item) => {
      item.classList.remove("active-schedule");
      if (currentStatus && item.textContent.includes(currentStatus.status)) {
        item.classList.add("active-schedule");
      } else if (
        !currentStatus &&
        item.textContent.includes("휴식 또는 개인 시간")
      ) {
        item.classList.add("active-schedule");
      }
    });
  }

  function toggleScheduleVisibility() {
    const scheduleContainer = document.getElementById("schedule-container");
    scheduleContainer.classList.toggle("hidden");
  }

  function init() {
    updateTeamStatus(); // 페이지 로드 시 업데이트
    setInterval(updateTeamStatus, 600000);

    const teamStatusSchedule = document.getElementById("team-status");
    teamStatusSchedule.addEventListener("click", toggleScheduleVisibility);
  }

  init();
});
