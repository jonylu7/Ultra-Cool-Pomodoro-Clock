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


function add(){
const newevent=document.querySelector('#newevent');
const statepanel=document.querySelector('#statepanel');

statepanel.innerHTML+=`<input type='button' value="${newevent.value}" onclick="change_stat(this.value)" class="btn_c">`

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


function change_stat(v){
    var btnon=document.querySelector(`[value="${v}"]`);
    btnon.classList.add('toggleon');

    var oldbtn=document.querySelector(`[value="${ori_status}"]`);
    oldbtn.classList.remove('toggleon');

    console.log(btnon);
    clearInterval(x);
    console.log(v);
    count_status=v;
    
    const mbg=document.getElementById('mbg');
    const bg=document.getElementById('bg');
    if(v!=ori_status){
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
    if(v=="work"){
        mbg.classList.add('workmode_content_area');
        bg.classList.add('workmode_bg');
        //countdmin=worktime;

    }else if(v=="short break"){
        mbg.classList.add('restmode_content_area');
        bg.classList.add('restmode_bg');
        //countdmin=shortbreak;

    }else if(v=="study"){
        mbg.classList.add('studymode_content_area');
        bg.classList.add('studymode_bg');
        //countdmin=studytime;
    }

    else if(v=="long break"){
        mbg.classList.add('restmode_content_area2');
        bg.classList.add('restmode_bg2');
        //countdmin=longbreak;
    }
    
    if(String(countdmin).length==1){countdmin="0"+String(countdmin);}
     //showmin.innerHTML=countdmin;
     countdsec=0;
     if(String(countdsec).length==1){countdsec="0"+String(countdsec);}
     //showsec.innerHTML=countdsec;
        ori_status=v;



}