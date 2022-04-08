showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
  addtaskinputval = addtaskinput.value;
  if (addtaskinputval.trim() != 0) {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(addtaskinputval);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = "";
  }
  showtask();
});

// SHOWTASK========>>>>>
function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  let addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach((item, index) => {
    if (item.completeStatus == true) {
      taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
    } else {
      taskCompleteValue = `<td>${item.task_name}</td>`;
    }
    html += `<tr>
              <th scope="row" class="no">${index + 1}.</th>
              <td class="text">${item}</td>
              
              <td>
                <button type="button" class="edit" onclick="edittask(${index})">
                  <i class="bx bx-edit-alt"></i>Edit
                </button>
              </td>

              <td>
                <button type="button" class="delete" onclick="deleteitem(${index})">
                  <i class="bx bx-trash"></i>Delete
                </button>
              </td>
            </tr>`;
  });
  addedtasklist.innerHTML = html;
}

// EDITTASK=========>>>>>>
function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let savetaskbtn = document.getElementById("savetaskbtn");
  saveindex.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  addtaskinput.value = taskObj[index];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "block";
}

// SAVETASK========>>>>

let savetaskbtn = document.getElementById("savetaskbtn");

savetaskbtn.addEventListener("click", () => {
  let addtaskbtn = document.getElementById("addtaskbtn");

  let webTask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webTask);
  let saveindex = document.getElementById("saveindex");
  taskObj[saveindex.value] = addtaskinput.value;
  addtaskbtn.style.display = "block";
  savetaskbtn.style.display = "none";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addtaskinput.value = "";
  showTask();
});

// DELETEINDIVIDUAL========>>>>
function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

// DELETEALL======>>>>
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
  let savetaskbtn = document.getElementById("savetaskbtn");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  if (webtask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
    taskObj = [];
  }
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
});

// SEARCH====>>>
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
  let trlist = document.querySelectorAll("tr");
  Array.from(trlist).forEach(function (item) {
    let searchedtext = item.getElementsByTagName("td")[0].innerText;
    let searchtextboxval = searchtextbox.value;
    let re = new RegExp(searchtextboxval, "gi");
    if (searchedtext.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});

