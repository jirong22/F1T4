
  document.querySelectorAll('.team-member img').forEach(item => {
    item.addEventListener('click', function() {
    
          console.log("클릭됨:", this.alt); // 뜬다. 여기에 직접 추가하니깐. 
    
          const mbti = this.alt;  // 이미지의 alt 속성 값 (MBTI 타입)을 가져옵니다.
    
          // 모달 표시
          document.querySelector('.teamdt-bg').style.display = 'flex';
      });
    });
