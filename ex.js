let listElem = '';
let taskArray = []
const ITEM_LIMIT_PAGE = 8;
let currentPage = 1;
let indexEditingTask = null;
const taskInput=document.querySelector('.addtask input');
taskInput.focus();
var tasklist = document.getElementById('tasklist');
taskInput.addEventListener('keyup', e=>{  //keyup ==> enter
    var addTask = document.getElementsByClassName('addtask')[0];
    if (e.key=='Enter' && addTask.contains(addButton) && taskInput.value) { 
        let valueInput = document.getElementsByClassName('nhap')[0].value;
        valueInput.length > 50 ? (valueInput = valueInput.slice(0, 50) + "...") : valueInput;
        taskInput.value = ''; //làm mới thanh nhập
        // console.log(valueInput)-->trả về array có kiểu dữ liệu HTML collection 
        let listElem = '<div id="taskcontainer">'
        +  `<div class="task"> `
        +  `<p class="value"> ${valueInput} </p>`
        +  `<div class="icons"> <img class="tick" src="./PIC/done.png"  alt=""> `
        +  `<img class="setting" src="./PIC/setting icon.png" alt=""> `
        +  `<img class="delete" src="./PIC/delete-icon-png-2.jpg" alt=""></div> </div> </div>`;
        taskArray.push(listElem);
        displayPages(currentPage);
        if((taskArray.length % ITEM_LIMIT_PAGE == 1) && taskArray.length > ITEM_LIMIT_PAGE){
            increasePageIndex();
        }
    }
});

document.getElementById('addbut').addEventListener('click', function plusTasks(){
    var addTask = document.getElementsByClassName('addtask')[0];
    if (addTask.contains(addButton) && taskInput.value) {
        let valueInput = document.getElementsByClassName('nhap')[0].value;
        valueInput.length > 50 ? (valueInput = valueInput.slice(0, 50) + "...") : valueInput;
        taskInput.value = '';
        // console.log(valueInput)-->trả về array có kiểu dữ liệu HTML collection 
        let listElem = '<div id="taskcontainer">'
        +  `<div class="task"> `
        +  `<p class="value"> ${valueInput} </p>`
        +  `<div class="icons"> <img class="tick" src="./PIC/done.png"  alt=""> `
        +  `<img class="setting" src="./PIC/setting icon.png" alt=""> `
        +  `<img class="delete" src="./PIC/delete-icon-png-2.jpg" alt=""></div> </div> </div>`;
        taskArray.push(listElem);
        displayPages(currentPage);
        if((taskArray.length % ITEM_LIMIT_PAGE == 1) && taskArray.length > ITEM_LIMIT_PAGE){
            increasePageIndex();
        }
    }
});

//done task
tasklist.addEventListener('click', (e) => {
    if(e.target.classList.contains('tick')){
        e.target.classList.toggle('taskFinished'); //toggle: thêm nếu chưa có và xóa nếu đã có
        e.target.parentElement.previousElementSibling.classList.toggle('taskFinished');
    }
    if(e.target.classList.contains('value') && e.target.classList.contains('taskFinished')){
        e.target.classList.toggle('taskFinished');
        e.target.nextElementSibling.firstElementChild.classList.toggle('taskFinished');
    }
});
//delete task
tasklist.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        let taskDel = e.target.parentElement.parentElement.parentElement;
        let taskDelIndex = Array.prototype.indexOf.call(taskDel.parentElement.children, taskDel) 
        +(currentPage - 1)*ITEM_LIMIT_PAGE;
        taskArray.splice(taskDelIndex, 1);
        e.target.parentElement.parentElement.parentElement.remove();
        decreasePageIndex();
        displayPages(currentPage);
    }
})

//editing task
var okeIcon= document.createElement(`img`);
var editText = document.createElement('p');
editText.innerText = 'Editing...';
okeIcon.src='./PIC/oke icon.png';
okeIcon.className = 'okIcon';
var addButton = document.getElementById('addbut');
var inputField = document.getElementsByClassName('nhap')[0];
var wrapper = document.getElementsByClassName('wraper')[0];
tasklist.addEventListener('click', (e) => {
    if (e.target.classList.contains('setting')){
        var icons = e.target.parentElement;
        var value = icons.previousElementSibling;
        icons.replaceWith(editText);
        addButton.replaceWith(okeIcon);
        taskInput.value = value.innerText;
        inputField.focus();
        wrapper.onclick = (e) => {
            if(e.target.classList.contains('okIcon') && taskInput.value){
                let valueInput = document.getElementsByClassName('nhap')[0].value;
                valueInput.length > 50 ? (valueInput = valueInput.slice(0, 50) + "...") : valueInput;
                value.innerText = valueInput;
                okeIcon.replaceWith(addButton);
                editText.replaceWith(icons);
                let taskEdit = icons.parentElement.parentElement;
                let taskEditIndex = Array.prototype.indexOf.call(taskEdit.parentElement.children, taskEdit) + (currentPage - 1) * ITEM_LIMIT_PAGE;
                taskArray[taskEditIndex] = '<div id="taskcontainer">' + taskEdit.innerHTML + '</div>';
                taskInput.value = '';
            }
        };
    };
});
// Pagination
const pageNav = document.getElementById('pagination')
generateNavPage();
increasePageIndex();
function increasePageIndex(){
    const indexPageLength = Math.round(taskArray.length/ITEM_LIMIT_PAGE + 1);
    var newPage = document.createElement('button');
    newPage.className = 'pageNumber';
    newPage.innerText = indexPageLength;
    //console.log(indexPageLength)
    pageNav.children[1].appendChild(newPage);
}
function decreasePageIndex(){
    var lastPage = pageNav.children[1].lastElementChild; // số trang hiển thị
    const indexPageLength = Math.floor((taskArray.length-1)/ITEM_LIMIT_PAGE) + 1; // số trang thực sự còn lại
    if(indexPageLength != lastPage.innerText && taskArray.length != 0)
    {
        if(currentPage == lastPage.innerText) currentPage--;
        pageNav.children[1].removeChild(lastPage);
    }
}
function generateNavPage(){
    let htmlText ='<button class="prev" href="#"> < </button>'
    + '<span class="nums"> </span>'
    + '<button class="after" href="#"> > </button>';
    
    document.getElementById('pagination').innerHTML+=htmlText
}

function displayPages(pageIndex){
    const startIndex = (pageIndex - 1) * ITEM_LIMIT_PAGE; //0
    const endIndex = pageIndex * ITEM_LIMIT_PAGE; //8
    document.getElementById('tasklist').innerHTML="";
    for(let i=startIndex;i<endIndex;i++){
        if(taskArray[i])
            document.getElementById('tasklist').innerHTML+=taskArray[i]
    }
}

pageNav.addEventListener('click', (e) => {
    if(e.target.classList.contains('prev')){
        if(currentPage > 1){
            currentPage--
            displayPages(currentPage)
        }
    }
    if(e.target.classList.contains('pageNumber')){
       currentPage = Number(e.target.innerText)
       displayPages(currentPage)
    }
    if(e.target.classList.contains('after')){
        // console.log(currentPage + "  "+ pageNav.children[1].lastElementChild.innerText)
        if(currentPage < pageNav.children[1].lastElementChild.innerText){
            currentPage++
            displayPages(currentPage)
        }
        
    }
});
// let firstPage=document.getElementById('pageNumber').innerHTML
// function pagiNation() {

// }



