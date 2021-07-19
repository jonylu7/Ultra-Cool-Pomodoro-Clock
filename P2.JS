var worktime=50;

var studytime=25;

var shortbreak=5;

var longbreak=25


var longbreakcounter=0;

var countdmin=worktime;
var countdsec=0;
var count_status="work";
var ori_status="work";


var timemin=0;
var timehr=0;
var timesec=0;

var showhr=document.querySelector(".hr");
var showmin=document.querySelector(".min");
var showsec=document.querySelector(".sec");
showhr.innerHTML="00";
showmin.innerHTML="00";
showsec.innerHTML="00";
var x;
var alltime=0;


const stbtn=document.getElementById("stbtn");
const psbtn=document.getElementById("psbtn");


//palymode:wait palying pause 
var playmode="wait";

function start(){
    clearInterval(alltime);
    const body=document.getElementById("bg");
    const mbg=document.getElementById("mbg");
    const wbg=document.getElementById("wbg");
    body.classList.remove("waitmode_bg");
    body.classList.add("workmode_bg");
    mbg.classList.remove("disapear");
    wbg.classList.add("disapear");
    alltime=setInterval(alltik,1000);
}


function alltik(){
    timesec+=1;

    if(timesec==60){
        timesec=0;
        timemin+=1;
    }
    if(timemin==60){
        timemin=0;
        timehr+=1;
    }
   if(timehr==24){
       alert('Jesus Just Take a Break');
       clearInterval(alltime);
   }

    if(String(timemin).length==1){showmin.innerHTML="0"+String(timemin);}else{showmin.innerHTML=timemin;}
    if(String(timesec).length==1){showsec.innerHTML="0"+String(timesec);}else{showsec.innerHTML=timesec;}
    if(String(timehr).length==1){timehr.innerHTML="0"+String(timehr);}else{showhr.innerHTML=timehr;}
return(timehr,timemin,timesec);
}

function start_timer(){
    psbtn.classList.remove("disapear");
    stbtn.classList.add("disapear");
    alltime=setInterval(alltik,1000);
}
function pause_timer(){
    psbtn.classList.add("disapear");
    stbtn.classList.remove("disapear");
    playmode="pause";
    clearInterval(x);
    clearInterval(alltime);
}





function END(){
    var ENDpanel=document.getElementById("Endpanel");
    pause_timer();
    ENDpanel.innerHTML=`<div class="addpanel">
    <div>
    `;
    mbg.classList.add("hidden");
}

var storagelist={};
function StoreThings(id,thr,tmin,tsec){
    storagelist[id]={thr,tmin,tsec};
    localStorage.setItem("main",JSON.stringify(storagelist));

}

function add(){
const newevent=document.querySelector('#newevent');
const statepanel=document.querySelector('#statepanel');

statepanel.innerHTML+=`<input type='button' value="${newevent.value}" onclick="change_stat(this)" class="btn_c" id="${newevent.value}">`

}


function addstuff(){
    var panel=document.getElementById("addpanel");
    pause_timer();
    panel.innerHTML=`<div class="addpanel">
    <input type="button" value="x" onclick="shutpanel()" id="x">
    <input type="input box" value="Put in your Event" id="newevent">
    <input type="button" value="Add" onclick="add()" id="x">
    <div>
    `;
    mbg.classList.add("hidden");

}

function shutpanel(){
    var panel=document.getElementById("addpanel");
    panel.innerHTML="";
    mbg.classList.remove("hidden");
}
function clear_timer(){
    
    
    if(count_status=="work"){
        countdmin=worktime;
    }else if(count_status=="rest"){
        countdmin=resttime;

    }else if(count_status=="study"){
        countdmin=studytime;
    }
    countdsec=0;
     if(String(countdmin).length==1){countdmin="0"+String(countdmin);}
     showmin.innerHTML=countdmin;
     if(String(countdsec).length==1){countdsec="0"+String(countdsec);}
     showsec.innerHTML=countdsec;
     clearInterval(x);
     pause_timer();
}

var localhr=0;
var localmin=0;
var localsec=0;
var w;
function startlocaltimer(v){
    console.log(storagelist.hasOwnProperty(v.id));
if (localhr==0&&localmin==0&&localsec==0){
    if(storagelist.hasOwnProperty(v.id)){
            localhr=storagelist[v.id].thr;
            localmin=storagelist[v.id].tmin;
            localsec=storagelist[v.id].tsec;
            console.log(storagelist[v.id]);
        };
    w=setInterval(function tiktok(){

        if(localsec>=60){
            localsec=0;
            localmin+=1;
        }
        if(localmin>=60){
            localhr+=1;
            localmin=0;
        }
        if(localhr>=24){
            alert("Give Me A Break");
        }
        localsec+=1;
        var showt=" ";
        if(String(localmin).length==1){showt+="0"+String(localmin);}else{showt+=localmin;}
        //showmin.innerHTML=countdmin;
        showt+=":"
        if(String(localsec).length==1){showt+="0"+String(localsec);}else{showt+=localsec;}
        //showsec.innerHTML=countdsec;
v.value=v.id+showt;
    },1000);

}else{
    StoreThings(v.id,localhr,localmin,localsec);
    clearInterval(w);
    localhr,localmin,localsec=0;
    console.log(localhr,localmin,localsec);
    startlocaltimer(v);

}

}



function change_stat(v){

    console.log(v);
    v.classList.add('toggleon');
    startlocaltimer(v);
    var oldbtn=document.getElementById(ori_status);
    oldbtn.classList.remove('toggleon');

   
    clearInterval(x);
    console.log(v);
    count_status=v;
    
    const mbg=document.getElementById('mbg');
    const bg=document.getElementById('bg');
    if(v.id!=ori_status){
    if(ori_status=="work"){
        mbg.classList.remove('workmode_content_area');
        bg.classList.remove('workmode_bg');
    }else if(ori_status=="short break"){
        mbg.classList.remove('restmode_content_area');
        bg.classList.remove('restmode_bg');
    }else if(ori_status=="long break"){
        mbg.classList.remove('restmode_content_area2');
        bg.classList.remove('restmode_bg2');
    }else if(ori_status=="study"){
        mbg.classList.remove('studymode_content_area');
        bg.classList.remove('studymode_bg');
    }
}
    if(v.id=="work"){
        mbg.classList.add('workmode_content_area');
        bg.classList.add('workmode_bg');
        //countdmin=worktime;

    }else if(v.id=="short break"){
        mbg.classList.add('restmode_content_area');
        bg.classList.add('restmode_bg');
        //countdmin=shortbreak;

    }else if(v.id=="study"){
        mbg.classList.add('studymode_content_area');
        bg.classList.add('studymode_bg');
        //countdmin=studytime;
    }

    else if(v.id=="long break"){
        mbg.classList.add('restmode_content_area2');
        bg.classList.add('restmode_bg2');
        //countdmin=longbreak;
    }

    
        ori_status=v.id;
        
}