import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
$(".postingbtn").click(async function () {
  let image = $("#image").val();
  let name = $("#name").val();
  let content = $("#content").val();
  let doc = {
    image: image,
    name: name,
    content: content,
    createdTime: Timestamp.fromDate(new Date()),
  };
  await addDoc(collection(db, "comments"), doc);
  alert("저장 완료!");
  window.location.reload();
});

let docs = await getDocs(collection(db, "comments"));
docs.forEach((doc) => {
  let row = doc.data();

  let image = row["image"];
  let name = row["name"];
  let content = row["content"];
  let createdTime = row["createdTime"];

  const date = createdTime.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  let temp_html = `
  <div class="comment-item">
    <div class="comment-header">
      <img src="${image}">
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

$(".openbtn").click(openModal);
$(".closebtn").click(closeModal);


function openModal() {
  const scrollY = $(window).scrollTop();
  const windowHeight = $(window).height();

  const modalTop = scrollY + windowHeight / 2;

  $(".modal-bg").css("display", "block");
  $(".modal-content").css({
    display: "block",
    top: `${modalTop}px`,
    transform: "translate(-50%, -50%)",
    left: "50%",
  });
}

function closeModal() {
  $(".modal-bg").css("display", "none");
  $(".modal-content").css("display", "none");
  $(".teamdt-bg").css("display", "none");
}
