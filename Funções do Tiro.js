var direcaoX, direcaoY, player, playerspeed, playerXposition, playerYposition;
var tirospeed, guardadirecao;
var telaaltura, telalargura;
var jogo;
var frames;
//Função que muda o valor da Direção, caso uma tecla esteja acionada(on)
function TeclaON(){
var tecla = event.keyCode;

if(tecla == 38){//cima
    if(direcaoY==0){
	    direcaoY = -1;
	    setTimeout(()=>{
		    direcaoY=1;
	    },800)
    }
}
if(tecla == 37){//Esquerda
    player.style.transform = 'scaleX(1)';
    direcaoX = -1;
    guardadirecao = direcaoX;
}
else if(tecla == 39){//Direita
    player.style.transform = 'scaleX(-1)';
    direcaoX = 1
    guardadirecao = direcaoX;
}
if (tecla == 32){//Espaço - Atirar
    //pow pow
    Atira(playerXposition+80, playerYposition)
}

}

//Função que muda o valor da Direção, caso uma tecla esteja desacionada(off)
function TeclaOFF(){
    var tecla = event.keyCode;
//Esquerda e Direita
if((tecla == 37)||(tecla == 39)){
    direcaoX = 0;
}
}

function GameLoop(){
    if(jogo){
        //Funções de controle
        ControlaJogador();
        ControleTiros();
    }
    frames = requestAnimationFrame(GameLoop);
}

function ControlaJogador(){
    playerYposition += direcaoY*playerspeed;
    playerXposition += direcaoX*playerspeed;
    player.style.top = playerYposition+"px";
    player.style.left = playerXposition+"px";
    if(playerYposition > telaaltura/5*3){	
	direcaoY = 0
    }
}
function Atira(x,y){
    var tiro = document.createElement("div");
    var atributo1 = document.createAttribute("class");
    var atributo2 = document.createAttribute("style");
    var atributo3 = document.createAttribute("src");
    if (guardadirecao == -1){    
    atributo1.value = "MandiocaSimplesEsquerda";
    atributo2.value = "top:"+y+"px;left:"+(x-100)+"px";
    tiro.setAttributeNode(atributo1);
    tiro.setAttributeNode(atributo2);
    document.body.appendChild(tiro);
    }else{
    atributo1.value = "MandiocaSimplesDireita";
    atributo2.value = "top:"+y+"px;left:"+x+"px";
    tiro.setAttributeNode(atributo1);
    tiro.setAttributeNode(atributo2);
    document.body.appendChild(tiro);
    }
}

function ControleTiros(){
    var tirosEsq = document.getElementsByClassName("MandiocaSimplesEsquerda");
    var quantidade = tirosEsq.length
    for(var i = 0; i<quantidade;i++){
        if(tirosEsq[i]){
            var posicaotiro = tirosEsq[i].offsetLeft;
                posicaotiro -= tirospeed;
                tirosEsq[i].style.left = posicaotiro+"px";
           
            if(posicaotiro < 0){
                tirosEsq[i].remove();
            }
            
        }   
    }
    var tirosDir = document.getElementsByClassName("MandiocaSimplesDireita");
    quantidade = tirosDir.length
    for(var i = 0; i<quantidade;i++){
        if(tirosDir[i]){
            var posicaotiro = tirosDir[i].offsetLeft;
                posicaotiro += tirospeed;
                tirosDir[i].style.left = posicaotiro+"px";
           
            if(posicaotiro > telalargura){
                tirosDir[i].remove();
            }
            
        }   
    }
}


function iniciar(){
    jogo = true;
    //Inicializações Tela
    telaaltura = window.innerHeight;
    telalargura = window.innerWidth;
    //Inicializações Jogador
    direcaoX = 0
    direcaoY = 1;
    playerXposition = telalargura/6
    playerYposition = telaaltura/5*3
    playerspeed = 5;
    tirospeed = 7;
    player = document.getElementById("PrincipalPlayer");
    player.style.top = playerYposition+"px";
    player.style.left = playerXposition+"px";
    
    GameLoop()
}
window.addEventListener("load",iniciar);
document.addEventListener("keydown",TeclaON);
document.addEventListener("keyup",TeclaOFF);