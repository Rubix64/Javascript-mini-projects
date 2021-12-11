//Clock
setInterval(() => {
  let timevar = document.getElementById("card");
  let datetime = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  timevar.innerHTML =
    datetime.toLocaleDateString(undefined, options) +
    "<br><br>" +
    ("0" + datetime.getHours()).slice(-2) +
    " : " +
    ("0" + datetime.getMinutes()).slice(-2) +
    " : " +
    ("0" + datetime.getSeconds()).slice(-2);
}, 1000);

//To- do list
function refresh() {
  if (localStorage.getItem("checklist") == null) {
    itemchecklist = [];
    localStorage.setItem("checklist", JSON.stringify(itemchecklist));
  } else {
    itemchecklist = JSON.parse(localStorage.getItem("checklist"));
  }
  let str = "";
  itemchecklist.forEach((element, index) => {
    str += `<li class="list-group-item d-flex justify-content-between align-items-center">
          <i class="fa fa-check-square-o" aria-hidden="true" ><span style="font-family:cursive;"> ${element}</span>
            </i>  
            <button type="submit" class="btn btn-primary btn-sm mb-3 border-0" style="background-color: rgb(224, 18, 52);" onclick="deleted(${index})">Delete</button>
            </li>`;
  });

  list = document.getElementById("list");
  list.innerHTML = str;
}
function update() {
  checklist = document.getElementById("checklist").value;
  if (localStorage.getItem("checklist") == null) {
    itemchecklist = [];
    itemchecklist.push(checklist);
    localStorage.setItem("checklist", JSON.stringify(itemchecklist));
  } else {
    itemchecklist = JSON.parse(localStorage.getItem("checklist"));
    itemchecklist.push(checklist);
    localStorage.setItem("checklist", JSON.stringify(itemchecklist));
  }
  let str = "";
  itemchecklist = JSON.parse(localStorage.getItem("checklist"));
  itemchecklist.forEach((element, index) => {
    str += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <i class="fa fa-check-square-o" aria-hidden="true" ><span style="font-family:cursive;"> ${element}</span>
              </i>  
              <button type="submit" class="btn btn-primary btn-sm mb-3 border-0" style="background-color: rgb(224, 18, 52);" onclick="deleted(${index})">Delete</button>
              </li>`;
  });

  list = document.getElementById("list");
  list.innerHTML = str;
  refresh();
}
function deleted(index) {
  itemchecklist = JSON.parse(localStorage.getItem("checklist"));
  itemchecklist.splice(index, 1);
  localStorage.setItem("checklist", JSON.stringify(itemchecklist));
  refresh();
}
function clearall() {
  if (confirm("Are you sure you want to delete?")) {
    //   console.log('bnm');
    localStorage.clear();
    refresh();
  }
}
Add = document.getElementById("Add");
Add.addEventListener("click", update);
refresh();

//girl-scary
girl = document.querySelector(".girl");
scary = document.querySelector(".scary");
girl.addEventListener("mouseover", () => {
  scary.classList.remove("not-visible");
  girl.classList.add("not-visible");
});
scary.addEventListener("mouseout", () => {
  girl.classList.remove("not-visible");
  scary.classList.add("not-visible");
});

//circles
circletext = [
  {
    num: 1,
    text: "Want",
  },
  {
    num: 2,
    text: "a",
  },
  {
    num: 3,
    text: "cake?",
  },
];
let circletexts = circletext.map((element) => {
  return `<div>` + element.num + `</div>`;
});
circle = document.querySelector("#circle");
circle.innerHTML = circletexts.join("");

circle_text = document.querySelectorAll("#circle div");
circle_text.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    let no = element.innerText;
    circletext.forEach((ele) => {
      if (ele.num == no) code = ele.text;
    });
    // [{num:no,text:code}]=circletext;
    element.innerText = code;
  });
  element.addEventListener("mouseleave", () => {
    let code = element.innerText;
    circletext.forEach((ele) => {
      if (ele.text == code) no = ele.num;
    });
    // [{num:no,text:code}]=circletext;
    element.innerText = no;
  });
});

// Color game:
color1= document.getElementById("color1");
rgb=document.getElementById("rgb");
reset= document.getElementById("reset");
message=document.getElementById("message");
easybtn=document.getElementById("easybtn");
hardbtn=document.getElementById("hardbtn");
square=document.getElementsByClassName("square");
function randomcolor(){
     let r=Math.floor(Math.random()*256);
     let g=Math.floor(Math.random()*256);
     let b=Math.floor(Math.random()*256);
     return "rgb("+r+", "+g+", "+b+")";
     // `rgb(${r}, ${g}, ${b})`
}
function generaterandomcolors(num){
     let arr=[];
     for(let i=0;i<num;i++){
       arr.push(randomcolor());
     }
     return arr;
}
function pickcolor(colors){
  let l=colors.length;
  let index=Math.floor(Math.random()*l);
  return colors[index];
}
function changecolor(color){
  for(let i=0;i<square.length;i++){
    square[i].style.background=color;
  }
}
let numsquares=3;
let colors=generaterandomcolors(numsquares);
let pickedcolor=pickcolor(colors);
rgb.innerText=pickedcolor;
for(let i=0;i<square.length;i++){
  if(colors[i]){
    square[i].style.background=colors[i];
  }
  else{
    square[i].style.display="none";
  }
  square[i].addEventListener("click",function(){
    // console.log("abc");
    let clickedcolor=this.style.background;
    if(clickedcolor===pickedcolor){
      // console.log('fgh');
      changecolor(pickedcolor);
      color1.style.background=pickedcolor;
      reset.innerText="Play again?";
      message.innerText="Correct!!";
    }
    else{
      square[i].style.background="white";
      message.innerText="Try again...";
    }
  })
}
reset.addEventListener('click', function(){
   colors=generaterandomcolors(numsquares);
   pickedcolor=pickcolor(colors);
   rgb.innerText=pickedcolor;
   for(let i=0;i<square.length;i++){
     square[i].style.background=colors[i];
   }
   reset.innerText="Reset";
   message.innerText="";
   color1.style.background="rgb(14, 3, 41)";
})
easybtn.addEventListener('click', function(){
  easybtn.classList.add("selected");
  hardbtn.classList.remove("selected");
  numsquares=3;
  colors=generaterandomcolors(numsquares);
  pickedcolor=pickcolor(colors);
  rgb.innerText=pickedcolor;
  for(let i=0;i<square.length;i++){
    if(colors[i]){
      square[i].style.background=colors[i];
    }
    else{
      square[i].style.display="none";
    }
  }
  reset.innerText="Reset";
  message.innerText="";
  color1.style.background="rgb(14, 3, 41)";
})
hardbtn.addEventListener("click",function(){
  easybtn.classList.remove("selected");
  hardbtn.classList.add("selected");
  numsquares=6;
  colors=generaterandomcolors(numsquares);
  pickedcolor=pickcolor(colors);
  rgb.innerText=pickedcolor;
  for(let i=0;i<square.length;i++){
      square[i].style.background=colors[i];
      square[i].style.display="block";
  }
  reset.innerText="Reset";
  message.innerText="";
  color1.style.background="rgb(14, 3, 41)";
})

//calci-simple
output= document.getElementById("output");
keys= document.querySelectorAll(".keys button");
let outputvalue="";
for(key of keys){
  key.addEventListener('click',(event)=>{
    let v= event.target.innerText;
    if(v=="x"){
      v="*";
      outputvalue+=v;
      output.value=outputvalue;
    }
    else if(v=="AC"){
      outputvalue="";
      output.value=outputvalue;
    }
    else if(v=="="){
      try{
      outputvalue=eval(outputvalue);
      output.value=outputvalue;}
      catch(err){
        output.value="Error!";
        outputvalue="";
      }
    }
    else{
      outputvalue+=v;
      output.value=outputvalue;
    }
  })
}

//simple-piano
let whitekeys=["z","x","c","v","b","n","m"];
let blackkeys=["s","d","g","h","j"];
let keypress= document.querySelectorAll(".keyboard button");
let keym=document.querySelectorAll(".keym");
let WhiteKeys=document.querySelectorAll(".keym.white");
let BlackKeys=document.querySelectorAll(".keym.black");
function playnote(key){
   key.classList.add("active");
   let audioid=key.dataset.note;
   let note=document.getElementById(audioid);
   note.currentTime=0;
   note.play();
   note.addEventListener("ended",()=>{
     key.classList.remove("active");
   })
}
keym.forEach(key =>{
  key.addEventListener("click",()=> playnote(key));
})
keypress[0].addEventListener("click",()=>{
  keypress[0].classList.add("key-press");
  keypress[1].classList.remove("key-press");
  WhiteKeys.forEach((key,index) =>{
    key.innerHTML =`<span>${whitekeys[index]}</span>`
})
   BlackKeys.forEach((key,index)=>{
   key.innerHTML =`<span>${blackkeys[index]}</span>`
})
  document.addEventListener("keydown",e=>{
    if(keypress[0].classList.contains("key-press")){
      if(e.repeat) return;
    let kvalue=e.key;
    let whiteindex=whitekeys.indexOf(kvalue);
    let blackindex=blackkeys.indexOf(kvalue);
    if(whiteindex!= -1)playnote(WhiteKeys[whiteindex]);
    if(blackindex!= -1)playnote(BlackKeys[blackindex]);}
  })  
  
})
keypress[1].addEventListener("click",()=>{
  keypress[1].classList.add("key-press");
  keypress[0].classList.remove("key-press");
  WhiteKeys.forEach((key) =>{
    key.innerHTML ="";
})
  BlackKeys.forEach((key)=>{
  key.innerHTML ="";
})  
})

//compound calci
calculate=document.querySelector(".sip button");
calculate.addEventListener("click",()=>{
  principle= document.getElementById("principle").value;
interest=document.getElementById("interest").value;
periods=document.getElementById("periods").value;
resultsip=document.getElementById("resultsip");
let i= interest/100/12;
let total=0;
total= principle * ((Math.pow(1+i, periods)-1)/i)*(1+i);
resultsip.innerText=total;
})

