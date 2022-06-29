const add = document.querySelector(".btn_add");
const text = document.querySelector(".input input");
const list = document.querySelector(".list");

let data = [];

//增加
function addData() {
  if (text.value === "") {
    alert("請輸入待辦事項");
    return;
  }
  let obj = {
    content: text.value,
    id: new Date().getTime(),
    checked: "",
  };

  data.push(obj);
  text.value = "";
  upDate();
}

add.addEventListener("click", function (e) {
  addData();
});
//網頁渲染

function randerData(data) {
  let str = "";
  data.forEach((value) => {
    str += `<li  data-id=${value.id}>
    <label class="checkbox" >
      <input type="checkbox" ${value.checked} />
      <span>${value.content}</span>
    </label>
    <a href="#" class="delete" ></a>
  </li>`;
  });
  list.innerHTML = str;
}

//設定li介面功能
list.addEventListener("click", (e) => {
  let id = e.target.closest("li").dataset.id;

  if (e.target.getAttribute("class") == "delete") {
    data = data.filter((item) => {
      return item.id != id;
    });
  } else {
    data.forEach((item) => {
      if (item.id == id) {
        if (item.checked == "") {
          item.checked = "checked";
        } else {
          item.checked = "";
        }
      }
    });
  }
  upDate();
});

//設定頁面
const nav = document.querySelector(".tab");
let state = "all";
nav.addEventListener("click", (e) => {
  state = e.target.dataset.state;
  upDate();
});

//更新畫面

const todonum = document.querySelector(".todoNum");
function upDate() {
  let newData = [];
  if (state == "all") {
    newData = data;
  } else if (state == "todo") {
    newData = data.filter((item) => item.checked == "");
  } else {
    newData = data.filter((item) => item.checked == "checked");
  }
  randerData(newData);
  //待完成項目數量
  let numData = [];
  numData = data.filter((item) => item.checked == "");
  let num = numData.length;
  todonum.textContent = num;
}

//刪除完成項目
const dele = document.querySelector(".delebtn");
dele.addEventListener("click", () => {
  data = data.filter((item) => item.checked == "");
  upDate();
});
//JQuery
$(".tab li").click(function (e) {
  $(this).siblings().removeClass("active");
  $(this).addClass("active");
});

//enter 輸入
text.addEventListener("keyup", (e) => {
  if (e.keyCode == "13") {
    addData();
  }
});
