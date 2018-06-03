//Initial declarations and initialisations
var user;
var obst = [];
var mouseX = 0;
var mouseY = 0;
var score=0;

//Start game
function startGame() {
    user = new component(30, 30, "#F7DC6F",mouseX, mouseY);
    canvarea.start();
}

//The canvas 
var canvarea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.addEventListener("mousemove", setMousePosition);
        this.frame_num = 0;
        this.interval = setInterval(updatecanvarea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
        var info=document.getElementById("info");
        info.textContent="* GAME OVER *";
        var button= document.getElementById("but");
        button.textContent="PLAY AGAIN";
        button.setAttribute("style","position: absolute;top: 300px; left:100px;font-size:25px;padding:5px;border-style:solid;border-color:orange");
        button.addEventListener("click",function(){
            window.location.reload();
        });
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// The component - the obstacles and the user piece
function component(width, height, color, x, y) 
{
    this.width = width;
    this.height = height;  
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = canvarea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
// Checks hitting of user piece and obstacles
    this.hitting = function(otherobj) 
    {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

//Update the canvas
function updatecanvarea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    for (i = 0; i < obst.length; i += 1) {
        if (user.hitting(obst[i])) {
            canvarea.stop();
            return;
        } 
        
    }
    canvarea.clear();
    canvarea.frame_num += 1;
    if (canvarea.frame_num == 1 || everyinterval(80))
    {   
        score+=10;
        x = canvarea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        obst.push(new component(10, height, "#1A5276", x, 0));
        obst.push(new component(10, x - height - gap, "#1A5276", x, height + gap));
    }
    for (i = 0; i < obst.length; i += 1) {
        obst[i].x -= 2;
        obst[i].update();
    }
     user = new component(30, 30, "#F7DC6F",mouseX, mouseY);
    user.update();
    cn=canvarea.context;
    
    cn.font="30px Century Gothic";
    cn.fillStyle="black";
    cn.fillText("Score: "+score,20,50);
   
}

function everyinterval(n) 
{
    if ((canvarea.frame_num / n) % 1 == 0) {return true;}
    return false;
}
//Getting mouse pointer's position 
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}       
 
function setMousePosition(e) {
    var canvasPos = getPosition(canvarea.canvas);
  mouseX = e.clientX-canvasPos.x;
  mouseY = e.clientY-canvasPos.y;

}       
