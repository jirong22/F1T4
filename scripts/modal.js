import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// 응원 문구 등록 (create)
$(".postingbtn").click(async function () {
  let name = $("#name").val();
  let content = $("#content").val();
  let doc = {
    name: name,
    content: content,
    createdTime: Timestamp.fromDate(new Date()),
  };
  await addDoc(collection(db, "comments"), doc);
  alert("저장 완료!");
  window.location.reload();
});

// 응원 문구 리스트 조회 (read)
let q = query(collection(db, "comments"), orderBy("createdTime", "desc"));
let docs = await getDocs(q);
docs.forEach((doc) => {
  let row = doc.data();
  let docId = doc.id;

  let name = row["name"];
  let content = row["content"];
  let createdTime = row["createdTime"];

  const date = createdTime.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

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
  $(".comments-list").append(temp_html);
});

// 상세 응원 문구 조회 (read)
$('.comments-list').on('click', '.comment-item', async function () {
  const docId = $(this).data('id');

  const docSnap = await getDoc(doc(db, "comments", docId));

  if (docSnap.exists()) {
    const data = docSnap.data();
    showDetailPage(data, docId);
  }
})

// 상세 응원 문구 삭제 (delete)
$('.modal-content').on('click', '.deletebtn', async function () {
  const docId = $(this).data('id');

  const docRef = doc(db, "comments", docId);
  await deleteDoc(docRef);
  alert('삭제 완료!');
  closeModal();
  window.location.reload();
})

$('.openbtn').click(function () {
  openModal(".cheercomment");
});

$('.closebtn').click(closeModal);

// 상세 응원 문구 닫기
$(document).on('click', '.closebtn', function () {
  closeModal();
})

function openModal(modalSelector) {
  const scrollY = $(window).scrollTop();
  const windowHeight = $(window).height();

  const modalTop = scrollY + windowHeight / 2;

  $(".modal-bg").css("display", "block");
  $(modalSelector).css({
    display: "block",
    top: `${modalTop}px`,
    transform: "translate(-50%, -50%)",
    left: "50%",
  });
}

function closeModal() {
  $(".modal-bg").css("display", "none");
  $(".modal-content").css("display", "none");
  $(".sepa-bg").css("display", "none");
  $(".teamdt-bg").css("display", "none");
  $("#intj-img, #estj-img, #infp-img, #istj-img, #entp-img").css("transform", "");
}

function showDetailPage(data, docId) {
  const date = data.createdTime.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;

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

  $('.modal-content.detailmodal').html(detailHtml);
  openModal(".modal-content.detailmodal");
}