fetch('./assets/team_data.txt')
  .then(response => response.text())
  .then(data => {
    const teamData = data.split('\n'); // 줄 단위로 분리

    document.querySelectorAll('.team-member img').forEach((item, index) => {
      item.addEventListener('click', function () {
        // 클릭된 이미지의 alt 속성 값 (MBTI 타입)을 사용하여 데이터를 찾기
        const mbti = this.alt;


        // teamData 배열에서 해당 MBTI의 데이터 찾기
        const memberData = teamData.find(row => row.startsWith(mbti));

        if (memberData) {
          const [mbtiType, name, details, link1, link2, blog] = memberData.split('|');

          const teamMemberContent = document.querySelector('.image-box');
          teamMemberContent.style.backgroundImage = `url('../assets/${mbtiType.toLowerCase()}.png')`; // 상세표의 이미지는 다른폴더의 해당 mbti.png로 넣어두면 될듯
          const teamblog = document.querySelector('.btn-with-bg1');
          teamblog.style.backgroundImage = `url('../assets/${blog.trim()}.ico')`;

          document.getElementById('team-member-name').value = name;

          document.getElementById('team-member-details').value = details;

          // 링크 버튼에 URL 설정
          document.getElementById('team-link1').addEventListener('click', function() {
            window.open(link1, "_blank");
          });
          
          document.getElementById('team-link2').addEventListener('click', function() {
            window.open(link2, "_blank");
          });
          document.querySelector('.sepa-bg').style.display = 'flex';
          document.querySelector('.teamdt-bg').style.display = 'flex';
        }
      });
    });
  })
  .catch(err => console.error('팀원 데이터 로드 실패:', err));

// 모달 요소 및 모달 내용



$(window).scroll(function() {
  // 페이지 스크롤 위치가 300px 이상일 때 모달을 서서히 숨기기
  if ($(this).scrollTop() > 300) {
    $(".teamdt-bg").addClass("hidden");  // hidden 클래스를 추가하여 서서히 숨기기
    $(".sepa-bg").addClass("hidden");
    $("#intj-img, #estj-img, #infp-img, #istj-img, #entp-img").css("transform", ""); // 캐릭터도 제자리로
    setTimeout(function() { // 500ms 가 지나면
      $(".teamdt-bg").css("display", "none");
      $(".sepa-bg").css("display", "none");
      $(".teamdt-bg").removeClass("hidden");  // hidden 클래스삭제
    $(".sepa-bg").removeClass("hidden");
    }, 500);
  }
});

$(document).ready(function() {
  // 이미지 클릭 시 해당하는 MBTI에 맞는 변환 애니메이션 적용
  $(".team-member img").click(function() {
    const mbti = $(this).attr("alt"); // 클릭된 이미지의 alt 값으로 MBTI 가져오기
    
    // 각 MBTI에 맞는 translateX 값 적용
    switch (mbti) {
      case "INTJ":
        $("#intj-img").css("transform", "translateX(-400px)");
        break;
      case "ESTJ":
        $("#estj-img").css("transform", "translateX(-600px)");
        break;
      case "INFP":
        $("#infp-img").css("transform", "translateX(-750px)");
        break;
      case "ISTJ":
        $("#istj-img").css("transform", "translateX(-1100px)");
        break;
      case "ENTP":
        $("#entp-img").css("transform", "translateX(-900px)");
        break;
      default:
        break;
    }
  });

});

// 추가부분****************************************************************************
document.querySelectorAll('.team-member').forEach(member => {
  // nickname 속성에 저장된 이름을 가져옵니다.
  const memberName = member.getAttribute('nickname');

  member.addEventListener('mouseenter', (e) => {
    const nickname = document.getElementById('nickname');
    nickname.innerText = memberName;
    nickname.style.display = 'block';
    const bgColor = member.getAttribute('bg-color'); 
    nickname.style.backgroundColor = bgColor; // 이름뒤 백컬러는 개인취향
  });

  member.addEventListener('mousemove', (e) => {
    const nickname = document.getElementById('nickname');
    nickname.style.left = (e.pageX+10)+'px';
    nickname.style.top = (e.pageY+20)+'px';
  });

  member.addEventListener('mouseleave', (e) => {
    const nickname = document.getElementById('nickname');
    nickname.style.display = 'none';
  });
});