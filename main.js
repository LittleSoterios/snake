const SPEED = 125;


// app's state (variables) //



//cached element references //
const snakeBoard = document.getElementById('board');
const snakeBoardCtx = snakeBoard.getContext('2d');
const msgEl = document.getElementById('msg');

// classes //
class Board{
    constructor(boardEl, msgEl){
        this.boardEl = boardEl;
        this.msgEl = msgEl;
        this.snake = new Snake(200,200);
        this.fruit = new Fruit();
        this.score = 0;
        
        
    }

    render(){
        const onTick =()=>{
            //document.onkeydown = this.snake.updateOrientation;
            this.clear();
            this.update();
            this.snake.checkAlive();
            this.checkEaten();
            if (!this.snake.alive) {
                this.endGame();
                return;
            }
            this.draw();
            this.render();
            //console.log(this.snake.direction)
            
        };
        
        setTimeout(onTick,SPEED);  
        //while(this.snake.alive);


        
        
    }
    checkEaten(){
        if (this.fruit.xPos === this.snake.xPos && this.fruit.yPos === this.snake.yPos){
            this.fruit.newPos();
            this.snake.grow();
            this.score++;
            
        }
    }

    endGame(){
        document.getElementById('msg').innerText = "Wow, you are shit at snake";
    }

    update(){
        //console.log(this.snake.xPos, this.snake.yPos)
        document.onkeydown = this.updateOrientation;
        this.snake.move(this.score);

    }

    draw(){
        
        this.boardEl.fillStyle = 'green';
        this.boardEl.fillRect(this.snake.xPos,this.snake.yPos,20,20);
        this.boardEl.fillStyle = 'red';
        this.boardEl.fillRect(this.fruit.xPos, this.fruit.yPos,10,10);
        if (this.score>0){
           for (let i = 0; i< this.snake.tailX.length; i++){
            this.boardEl.fillStyle = 'green';
            this.boardEl.fillRect(this.snake.tailX[i],this.snake.tailY[i],20,20);
            } 
        }
        


    }

    clear(){
        this.boardEl.clearRect(0,0,400,400);
    }

    updateOrientation(e) {
        e = e || window.event;
        let newDirection;
        if (e.keyCode == '38') {
        
        newDirection = board.snake.direction !== 90? 270: 90; //up arrow
        }
        else if (e.keyCode == '40') {
        newDirection = board.snake.direction !== 270? 90: 270; //down arrow
        }
        else if (e.keyCode == '37') {
        newDirection = board.snake.direction !== 0 ? 180: 0; //left arrow
        }
        else if (e.keyCode == '39') {
        // right arrow
        newDirection = board.snake.direction !== 180? 0: 180;
        }
        //console.log(this.snake.direction)
        
        setTimeout(()=>{
            
            board.snake.direction = newDirection;
        },125);

    }
}

class Snake{
    constructor(x,y){
        this.xPos = x;
        this.yPos = y;
        this.alive = true;
        this.direction = 90;
        this.tailX = [];
        this.tailY  = [];
    
        
    
    }

    

    move(score){
        //console.log("get's here move x")
        
        this.tailX[0] = this.xPos;
        this.tailY[0] = this.yPos;
        let previousX = this.tailX;
        let previousY = this.tailY;
        let previous2Y, previous2X;
        //console.log(this.tailX[0],this.tailY[0]);
        for (let i = 0; i< this.tailX.length; i++){
            previous2X = this.tailX[i];
            previous2Y = this.tailY[i];
            this.tailX[i] = previousX;
            this.tailY[i] = previousY;
            previousX = previous2X;
            previousY = previous2Y;

        }  
        
        

        switch(this.direction){
            case 0:
                
                this.xPos+=20;
                break;
            case 90:
                //console.log(this.direction)
                this.yPos+=20;
                break;
            case 180:
                this.xPos-=20;
                break;
            case 270:
                this.yPos-=20;
                break;
        }
    }

    checkAlive(){
        
        if (this.xPos < 0 || this.xPos > 389 || this.yPos < 0|| this.yPos > 389){
            this.alive = false;
        }
    }

    grow(){
        
        this.tailX.push(this.xPos);
        this.tailY.push(this.yPos);

    }


}

class Fruit{
    constructor(){
        this.xPos = Math.floor(Math.random() * 20) *20;
        this.yPos = Math.floor(Math.random() * 20) *20;
        this.eaten = false;

    }

    newPos(){
        this.xPos = Math.floor(Math.random() * 20) * 20;
        this.yPos = Math.floor(Math.random() * 20) * 20 ;
    }


}


// functions //

function init(){
    board = new Board(snakeBoardCtx, msgEl);
    board.render()
    
}
init();

