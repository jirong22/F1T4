import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTq2hFNBSkqZwNQ4ZWzvM0vM8s5p9yMsQ",
  authDomain: "f1t4-6064d.firebaseapp.com",
  projectId: "f1t4-6064d",
  storageBucket: "f1t4-6064d.firebasestorage.app",
  messagingSenderId: "30705356137",
  appId: "1:30705356137:web:39025d623c71115287c1f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/** 
 * [응원 문구 등록 (create)]
 * 
 * - 모달창에서 '등록' 버튼 클릭 시 동작
 * - Firebase Firestore에 응원 내용 저장:
 *   1. 입력된 이름(name)과 내용(content)을 포함한 문서(doc) 생성
 *   2. Firebase에서 제공하는 Timestamp를 사용하여 날짜 자동 기록
 * - 저장 성공 시:
 *   1. '저장 완료!' 알림창 표시
 *   2. 화면 새로고침으로 변경 사항 즉시 반영
 **/
$(".postingbtn").click(async function () {
  let name = $("#name").val();
  let content = $("#content").val();
  let doc = {
    name: name,
    content: content,
    createdTime: Timestamp.fromDate(new Date()), // Firestore Timestamp 생성
  };
  await addDoc(collection(db, "comments"), doc);
  alert("저장 완료!"); // 저장 성공 알림
  window.location.reload(); // 새로고침 후 UI 반영
});

/** 
 * [응원 문구 리스트 조회 (read)]
 * 
 * - Firebase에서 'comments' 컬랙션의 데이터 조회:
 *   1. 'createdTime'을 기준으로 내림차순 정렬 (최근 날짜가 위로 오도록)
 *   2. 모든 데이터를 화면에 표시
 * - Timestamp를 'yyyy.mm.dd' 형식으로 변환하여 표시
 * - 각 문서의 'docId'는 Firestore에서 자동으로 생성됨:
 *   1. 'docId'는 댓글 상세 조회와 데이터 식별에 사용
 * - 데이터를 HTML 템플릿으로 출력 후 '.comments-list'에 추가
 **/
let q = query(collection(db, "comments"), orderBy("createdTime", "desc")); // 내림차순 정렬
let docs = await getDocs(q);
docs.forEach((doc) => {
  let row = doc.data();
  let docId = doc.id; // Firebase에서 자동으로 생성된 id

  let name = row["name"];
  let content = row["content"];
  let createdTime = row["createdTime"];

  // Timestamp를 원하는 날짜 형식으로 변환
  const date = createdTime.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`; // yyyy.mm.dd 형식

  // HTML 템플릿 생성
  let temp_html = `
  <div class="comment-item" data-id="${docId}">
    <div class="comment-header">
      <strong class="commenter-name">${name}</strong>
      <span class="comment-date">${formattedDate}</span>
    </div>
    <div class="comment-content">
      <p>${content}</p>
    </div>
  </div>
  `;

  // 화면에 데이터 추가
  $(".comments-list").append(temp_html);
});

/** 
 * [상세 응원 문구 조회 (read)]
 * 
 * - 사용자가 특정 댓글을 클릭했을 때 동작:
 *   1. 클릭된 댓글의 'docId'를 가져옴
 *   2. Firebase에서 해당 id에 맞는 문서를 조회
 * - 문서가 존재할 경우:
 *   1. Firebase에서 데이터를 가져옴
 *   2. 'showDetailPage()' 함수를 호출하여 데이터를 화면에 표시
 **/
$(".comments-list").on("click", ".comment-item", async function () {
  const docId = $(this).data("id"); // 클릭된 댓글의 docId

  // 해당 문서 조회
  const docSnap = await getDoc(doc(db, "comments", docId));

  if (docSnap.exists()) {
    const data = docSnap.data(); // 문서 데이터 가져오기
    showDetailPage(data, docId); // 상세 페이지 표시
  }
});

/** 
 * [상세 응원 문구 삭제 (delete)]
 * 
 * - 사용자가 특정 상세 댓글의 '삭제' 버튼을 클릭했을 때 동작:
 *   1. 클릭된 댓글의 'docId'를 가져옴
 *   2. Firebase에서 해당 id에 맞는 문서를 삭제
 * - 삭제 성공 시:
 *   1. '삭제 완료!' 알림창 표시
 *   2. 'closeModal()' 함수 호출로 모달창 닫기
 *   3. 화면 새로고침으로 변경 사항 즉시 반영
 **/
$(".modal-content").on("click", ".deletebtn", async function () {
  const docId = $(this).data("id"); // 삭제할 문서의 id 가져오기
// 상세 응원 문구 삭제 (delete)

  // Firebase 문서 삭제
  const docRef = doc(db, "comments", docId);
  await deleteDoc(docRef);

  alert('삭제 완료!');
  closeModal(); // 모달창 닫기
  alert("삭제 완료!");
  closeModal();
  window.location.reload();
});

/**
 * [응원 문구 등록 모달창 열기]
 * 
 * - 사용자가 '우리 팀을 응원해주세요!' 버튼을 클릭했을 때 동작:
 *   1. 'openModal()' 함수 호출로 '.cheercomment' 모달창 열기
 **/
$(".openbtn").click(function () {
  openModal(".cheercomment"); // 모달창 열기
});

/**
 * [응원 문구 등록 모달창 닫기]
 * 
 * - 사용자가 응원 문구 등록 모달창에서 '닫기' 버튼을 클릭했을 때 동작:
 *   1. 'closeModal()' 함수 호출로 응원 문구 등록 모달창 닫기
 **/
$(".closebtn").click(closeModal); // 모달창 닫기

/** 
 * [상세 응원 문구 모달창 닫기]
 * 
 * - 사용자가 특정 상세 댓글의 '닫기' 버튼을 클릭했을 때 동작:
 *   1. 'closeModal()' 함수 호출로 상세 응원 문구 모달창 닫기
 **/
$(document).on("click", ".closebtn", function () {
  closeModal(); // 모달창 닫기
})

/** 
 * [모달창 열기 함수]
 * 
 * - 'modalSelector'에 해당하는 모달창을 화면에 표시:
 *   1. 현재 스크롤의 위치와 창의 높이를 기반으로 모달창의 위치를 중앙으로 맞춤
 *   2. '.modal-bg' 배경을 표시
 *   3. 지정된 모달창(modalSelector)을 화면에 중앙 위치로 표시
 **/
function openModal(modalSelector) {
  const scrollY = $(window).scrollTop(); // 현재 페이지의 스크롤 위치
  const windowHeight = $(window).height(); // 브라우저 창의 높이

  // 모달창을 화면 중앙에 맞추기 위한 계산
  const modalTop = scrollY + windowHeight / 2;

  $(".modal-bg").css("display", "block"); // 모달창 배경 표시
  $(modalSelector).css({
    display: "block", // 모달창 표시
    // 모달창 화면 중앙 위치로 표시
    top: `${modalTop}px`,
    transform: "translate(-50%, -50%)",
    left: "50%",
  });
}

/** 
 * [모달창 닫기 함수]
 * 
 * - 모달창과 관련된 요소 숨김
 **/
function closeModal() {
  $(".modal-bg").css("display", "none");
  $(".modal-content").css("display", "none");
  $(".sepa-bg").css("display", "none");
  $(".teamdt-bg").css("display", "none");
  $("#intj-img, #estj-img, #infp-img, #istj-img, #entp-img").css(
    "transform",
    ""
  );
}

/** 
 * [상세 응원 문구 모달창 표시 함수]
 * 
 * - 주어진 'data'와 'docId'를 기반으로 상세 응원 문구를 모달창에 표시:
 *   1. 'data'에서 'createdTime'을 원하는 날짜 형식으로 변환
 *   2. 'data'에 포함된 이름, 날짜, 내용 등을 모달창에 표시할 HTML 구조 생성
 *   3. 생성된 HTML을 '.modal-content.detailmodal'에 삽입
 *   4. 'openModal()' 함수를 호출하여 생성된 모달창을 화면에 표시
 **/
function showDetailPage(data, docId) {
  const date = data.createdTime.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // 모달창에 표시할 상세 응원 문구 HTML 구조 생성
  let detailHtml = `
  <div class="comment-container">
    <div class="comment-details">
      <div class="comment-detail-header">
      <strong class="commenter-name">${data.name}</strong>
        <span class="comment-date">${formattedDate}</span>
      </div>
      <div class="comment-content detail-content">
        <p>${data.content}</p>
      </div>
      <div class="mb-3 button">
        <button type="button" class="btn btn-light deletebtn" data-id="${docId}">삭제</button>
        <button type="button" class="btn btn-dark closebtn">닫기</button>
      </div>
    </div>
  </div>
  `;

  $(".modal-content.detailmodal").html(detailHtml); // 생성된 HTML을 모달창에 삽입
  openModal(".modal-content.detailmodal"); // 모달창 열기
}
