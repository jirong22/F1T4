fetch('./assets/team_data.txt')
  .then(response => response.text()) // data.txt의 내용을 텍스트로 읽어오겠다.
  .then(data => {
    const teamData = data.split('\n'); // 줄 단위 묶어서 teamData 의 원소로 보겠다

    document.querySelectorAll('.team-member img').forEach((item) => { //team-member의 img태그마다 확인한다
      item.addEventListener('click', function () { // 클릭이 발생했다면
        
        // 클릭된 이미지의 alt 속성 값 (MBTI 타입)을 사용하여 데이터를 찾기
        const mbti = this.alt; 
        const memberData = teamData.find(row => row.startsWith(mbti));

        if (memberData) {
          // 해당 member의 각 속성을 |로 구분하여 별명짓고
          const [mbtiType, name, details, link1, link2, blog] = memberData.split('|');

          // 상세창의 왼쪽 이미지를 수정합니다. 이미지파일은 **일단** asets의 맞는mbti.png로 해뒀습니다.
          const teamMemberContent = document.querySelector('.image-box');
          teamMemberContent.style.backgroundImage = `url('../assets/${mbtiType.toLowerCase()}.png')`;
          
          // 해당 멤버의 블로그와 깃헙 주소에 맞게 버튼 이미지를 변경합니다
          const teamblog = document.querySelector('.btn-with-bg1');
          teamblog.style.backgroundImage = `url('../assets/${blog.trim()}.ico')`;

          // 해당 멤버의 이름을 모달창에 표기합니다
          document.getElementById('team-member-name').value = name;

          // 해당 멤버의 상세정보를 모달창에 표기합니다
          document.getElementById('team-member-details').value = details;

          // 링크 버튼에 URL 설정 왼쪽은 블로그, 오른쪽은 깃헙주소입니다
          document.getElementById('team-link1').addEventListener('click', function() {
            window.open(link1, "_blank");
          });
          document.getElementById('team-link2').addEventListener('click', function() {
            window.open(link2, "_blank");
          });

          // 클릭이 들어갔기 때문에 모달창을 보여줌으로 바꿉니다
          document.querySelector('.sepa-bg').style.display = 'flex';
          document.querySelector('.teamdt-bg').style.display = 'flex';
        }
      });
    });
  })
  // 에러뜨면 확인차
  .catch(err => console.error('팀원 데이터 로드 실패:', err));

// 모달을 닫을 때 스크롤에 의해서도 닫히게 하고 싶었다
$(window).scroll(function() {
  // 페이지 스크롤이 300px 이상 내려갈 때 모달을 서서히 숨기기
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

// 캐릭터 이미지 클릭 시 해당하는 MBTI에 맞게 모달창 왼쪽에 보이게끔 유도
$(document).ready(function() {
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