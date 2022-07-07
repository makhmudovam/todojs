// let obj={
//     ism:'Isroil',
//     familya:'Ayubxanov',
//     yosh:45,
//     manzil:'Namangan shahar Turaqorgon kucha 48-uy',
//     kasb:'Buxgalter'
// }
// console.log(obj);
// // Objdan jsonga otkazish uchun stringify()
// let newjson=JSON.stringify(obj);
// console.log(newjson);

// let jsonInfo=`{
//     "name":"robert",
//     "age":25,
//     "address":{
//         "st":"Navoi"
//     }
// }`;
// console.log(jsonInfo);
// console.log(JSON.parse(jsonInfo));








let addtaskinput=document.getElementById('addtaskinput');
let addtaskbtn=document.getElementById('addtaskbtn');

window.addEventListener('DOMContentLoaded',()=>{
    showTask();
})
addtaskbtn.addEventListener('click',()=>{
    let addtaskinputVal=addtaskinput.value;
    let webtask=localStorage.getItem('localtask');
    if(addtaskinputVal.trim()!=0){
        if(webtask==null){
            taskObj=[];
        }else{
            taskObj=JSON.parse(webtask);
        }
        taskObj.push(addtaskinputVal);
        localStorage.setItem('localtask',JSON.stringify(taskObj));
        addtaskinput.value='';
        showTask();
    }else{
        alert('Iltimos task kiriting!');
    }
    
})

function showTask(){
    let webtask=localStorage.getItem('localtask');
    if(webtask==null){
        taskObj=[];
    }else{
        taskObj=JSON.parse(webtask);
    }
    let data='';
    let addedtasklist=document.getElementById('addedtasklist');
    Array.from(taskObj).forEach((item,index)=>{
        data+=`
            <tr>
            <th>${index+1}</th>
            <th class="w-50">${item}</th>
            <th>
                <button class="btn btn-info" 
                onclick="editTask(${index})">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit</button>
                <button class="btn btn-warning" 
                onclick="deleteItem(${index})">
                    <i class="fa-solid fa-trash-can"></i> 
                    Delete
                </button>
            </th>
            </tr>
        `
    });
    addedtasklist.innerHTML=data;
}
function editTask(index){
    let addtaskbtn=document.getElementById('addtaskbtn');
    let savetaskbtn=document.getElementById('savetaskbtn');
    let saveindex=document.getElementById('saveindex');
    saveindex.value=index;
    let webtask=localStorage.getItem('localtask');
    let taskObj=JSON.parse(webtask);
    addtaskinput.value=taskObj[index];
    addtaskbtn.style.display='none';
    savetaskbtn.style.display='block';
}
let savetaskbtn=document.getElementById('savetaskbtn');
savetaskbtn.addEventListener('click',()=>{
    let webtask=localStorage.getItem('localtask');
    let taskObj=JSON.parse(webtask);
    let saveindex=document.getElementById('saveindex').value;
    taskObj[saveindex]=addtaskinput.value;
    console.log(taskObj);
    addtaskbtn.style.display='block';
    savetaskbtn.style.display='none';
    localStorage.setItem('localtask',JSON.stringify(taskObj));
    addtaskinput.value='';
    showTask();
})

function deleteItem(index){
    let addtaskbtn=document.getElementById('addtaskbtn');
    let savetaskbtn=document.getElementById('savetaskbtn');
    let webtask=localStorage.getItem('localtask');
    let taskObj=JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem('localtask',JSON.stringify(taskObj));
    addtaskbtn.style.display='block';
    savetaskbtn.style.display='none';
    addtaskinput.value='';
    showTask();
}
let deleteallbtn=document.getElementById('deleteallbtn');
deleteallbtn.addEventListener('click',()=>{
    let webtask=localStorage.getItem('localtask');
    if(webtask==null){
        taskObj=[];
    }else{
        taskObj=JSON.parse(webtask);
        taskObj=[];
    }
    if(confirm('Siz xaqiqatdan o`chirmoqchimisz? ')){
        localStorage.setItem('localtask',JSON.stringify(taskObj));
        showTask();
    }
})

let searchtextbox=document.getElementById('searchtextbox');
searchtextbox.addEventListener('input',(e)=>{
    let trList=document.querySelectorAll('tr');
    trList.forEach(item=>{
        searchtext=item.getElementsByTagName('th')[1].innerHTML;
        let searchtextboxVal=searchtextbox.value;
        let re=new RegExp(searchtextboxVal,'gi');
        if(searchtext.match(re)){
            item.style.display='block';
        }else{
            item.style.display='none';
        }
    })
})