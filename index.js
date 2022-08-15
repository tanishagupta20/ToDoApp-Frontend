var taskArr = [];
var input = document.getElementById("typeItem");
var listEle = document.getElementById("list");
var taskId = 1;
if(localStorage.getItem("item")){
  taskArr = JSON.parse(localStorage.getItem("item"));
  renderList();
}
input.addEventListener("keydown",function(event){
  if(event.key == "Enter"){
    addItem();
    input.value = "";
  }
})

function addItem(){
  let newItem = document.getElementById("typeItem").value;
  let obj = {};
  obj.name = newItem;
  obj.status = "incomplete";
  taskArr.push(obj);
  localStorage.setItem("item", JSON.stringify(taskArr));
  renderList();
}

function renderList(){
  listEle.innerHTML = "";
  taskArr.forEach(function(item, index){
    listEle.innerHTML += `
    <div id = "del">
    <span id ="edit" onclick = "editItem(${index})">Edit &nbsp; &nbsp;</span>
      <div>
        <span id = "delItem" onclick = "delTask(${index})"> x</span>
        <input id = "check" type = "checkbox" onchange = "taskDone(${index})"/>
      </div>
      <div>
        <li id = "liItem-${index}">
          ${item.name}
        </li>
      </div>
    </div>
    `;
  })
}

function taskDone(index){
  if(taskArr[index].status == "incomplete"){
    taskArr[index].status = "complete";
   // console.log(taskArr[index].status);
    document.getElementById(`liItem-${index}`).style.textDecoration = "line-through";
  }
  else{
    taskArr[index].status = "incomplete";
    document.getElementById(`liItem-${index}`).style.textDecoration = "none";
  }
  localStorage.setItem("item", JSON.stringify(taskArr));
}

function delTask(index){
  taskArr.splice(index, 1);
  renderList();
  localStorage.setItem("item", JSON.stringify(taskArr));
}

function editItem(index){
  let newIt = document.getElementById(`liItem-${index}`);
  newIt.innerHTML = `
  <input id = "ip-${index}" type = "text" />
  `
  let ipEle = document.getElementById(`ip-${index}`);
  ipEle.addEventListener("keydown",function(event){
  if(event.key == "Enter"){
    taskArr[index].name = event.target.value;
    renderList()
    localStorage.setItem("item", JSON.stringify(taskArr));
   }
  })

}