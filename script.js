var submit = document.getElementById("form");
var id,object;
var show = document.getElementById("show");
var obj,ansobj;
setdata();
showQuestion();
var qqid=0;

function setdata(){
    if(localStorage.getItem("object")===null)
         object = {data:[],comments:[]};
    else
         object = JSON.parse(localStorage.getItem("object"));

    if(localStorage.getItem("id")===null)
         id=0;
    else
         id=JSON.parse(localStorage.getItem("id"));
}

submit.addEventListener("submit",function(){
    setdata();
    var subject = document.getElementById("subject").value;
    var question  = document.getElementById("question").value;
    var index = id;
     obj = {Subject:subject,Question:question,"QId":"q"+id};
    localStorage.setItem("id",id+1);
    object.data.push(obj);
    localStorage.setItem("object",JSON.stringify(object)); 
});

function showQuestion()
{
    object.data.forEach(function(event){
        var div1 = document.createElement("div");
        var h1 = document.createElement("h1");
        var p = document.createElement("p");
        h1.innerHTML=event.Subject;
        p.innerHTML=event.Question;
        h1.style.marginLeft=20;
        p.style.marginLeft="25px";
        div1.classList.add("ques");
        div1.setAttribute("id",event.QId);
        div1.setAttribute("onClick","showresponse(this.id)");
        div1.appendChild(h1);
        div1.appendChild(p);
        show.appendChild(div1);
    });
}

function showresponse(qid)
{
    qqid=qid;
    document.getElementById("d22").style.display="block";
    document.getElementById("d21").style.display="none";
    document.getElementById("response").innerHTML="";
    var showQuestion =  document.getElementById("showQuestion");
    showQuestion.innerHTML="";
    var h1 = document.createElement("h4");
    var p = document.createElement("p");
    var quesObj = searchquestionfromdata(qid);
    h1.innerHTML = quesObj[0].Subject;
    p.innerHTML = quesObj[0].Question;
    showQuestion.appendChild(h1);
    showQuestion.appendChild(p);

    showcomment(qid);
}
var asubmit = document.getElementById("asubmit");
asubmit.addEventListener("click",function(){
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;
    if(name===""&&comment===""){alert("enter value");}
    else
    {
        ansobj = {Name:name,Comment:comment,"QId":qqid};
        object.comments.push(ansobj); 
        localStorage.setItem("object",JSON.stringify(object));
        addcomment(qqid);
    }
    document.getElementById("name").value='';
    document.getElementById("comment").value='';
    });

function showcomment(qid){
    
    console.log("showcomment  = "+qid);
    var response = document.getElementById("response");
    // response.innerHTML="";
    object.comments.forEach(function(event){
        if(event.QId===qid){
            console.log(qid);
            var div1 = document.createElement("div");
            var h1 = document.createElement("h4");
            var p = document.createElement("p");
            h1.innerHTML=event.Name;
            p.innerHTML=event.Comment;
            h1.style.marginLeft=20;
            p.style.marginLeft="25px";
            div1.classList.add("res");
            div1.appendChild(h1);
            div1.appendChild(p);
            response.appendChild(div1);
        }
    });
}

function addcomment(qid)
{
    console.log("addcomment  = "+qid);
    var response = document.getElementById("response");
    var div1 = document.createElement("div");
    var h1 = document.createElement("h4");
    var p = document.createElement("p");
    h1.innerHTML=ansobj.Name;
    p.innerHTML=ansobj.Comment;
    h1.style.marginLeft=20;
    p.style.marginLeft="25px";
    div1.classList.add("res");
    div1.appendChild(h1);
    div1.appendChild(p);
    response.appendChild(div1);
}

function searchquestionfromdata(qid)
{ 
   var arr= object.data.filter(function(event){
                if(event.QId===qid)
                return true;
            });
            console.log(arr);
    return arr;
}

document.getElementById("n1").addEventListener("click",function(){
    document.getElementById("d21").style.display="block";
    document.getElementById("d22").style.display="none";    
});

document.getElementById("resolve").addEventListener("click",function(){
       resolve(qqid);
});
function resolve(qid){
    object.data.forEach(function(event,index){
        if(event.QId===qid)
            object.data.splice(index,1);
    });
    object.comments.forEach(function(event,index){
        if(event.QId===qid)
            object.comments.splice(index,1);
    });
    localStorage.setItem("object",JSON.stringify(object));
    window.location.reload();
}

var search = document.getElementById("searchBox");
search.addEventListener("keyup",function(){
    var s = this.value;
    var filter = s.toUpperCase();
    var child = document.getElementById("show").childNodes;
    var flag = 0;
    child.forEach(function(event){
        var q = event.childNodes[0].innerHTML;
        var p = event.childNodes[1].innerHTML;
        if(p.toUpperCase().indexOf(filter)>-1||q.toUpperCase().indexOf(filter)>-1)
            {
                event.style.display="";
                flag = 1;
            }
        else{
            event.style.display="none";
        }    
    });
    if(flag==0){
        document.getElementById("nomatch").style.display="block";
        document.getElementById("show").style.display="none";
    }
    else{
        document.getElementById("show").style.display="block";
        document.getElementById("nomatch").style.display="none";
    }
});

document.getElementById("res").addEventListener("click",function(){
    document.getElementById("response").classList.toggle("#response");
    document.getElementById("response").classList.toggle("#response::-webkit-scrollbar");
     document.getElementById("response").classList.toggle("incheight");
});
