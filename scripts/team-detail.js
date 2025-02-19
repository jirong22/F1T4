
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
          const [mbtiType, name, details, link1, link2] = memberData.split('|');

          const teamMemberContent = document.querySelector('.image-box');
          teamMemberContent.style.backgroundImage = `url('../assets/${mbtiType.toLowerCase()}.png')`; // 상세표의 이미지는 다른폴더의 해당 mbti.png로 넣어두면 될듯

          document.getElementById('team-member-name').value = name;

          document.getElementById('team-member-details').value = details;

          // 링크 버튼에 URL 설정
          document.getElementById('team-link1').addEventListener('click', function() {
            window.open(link1, "_blank");
          });
          
          document.getElementById('team-link2').addEventListener('click', function() {
            window.open(link2, "_blank");
          });
          
          document.querySelector('.teamdt-bg').style.display = 'flex';
          
        }
      });
    });
  })
  .catch(err => console.error('팀원 데이터 로드 실패:', err));
