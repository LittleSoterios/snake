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
        
        
    }

    render(){
        const onTick =()=>{
            //document.onkeydown = this.snake.updateOrientation;
            this.clear();
            this.update();
            this.draw();
            this.render();
            console.log(this.snake.direction)
            
        };
        
        setTimeout(onTick,20);  
        
        
        
    }

    update(){
        //console.log(this.snake.xPos, this.snake.yPos)
        document.onkeydown = this.updateOrientation;
        this.snake.move();

    }

    draw(){
        
        this.boardEl.fillStyle = 'green';
        this.boardEl.fillRect(this.snake.xPos,this.snake.yPos,20,20);

    }

    clear(){
        this.boardEl.clearRect(0,0,400,400);
    }

    updateOrientation(e) {
        e = e || window.event;
        console.log('get here')
        console.log(e.keyCode);
        console.log(this);
        if (e.keyCode == '38') {
            
        board.snake.direction = 270; //up arrow
        }
        else if (e.keyCode == '40') {
        board.snake.direction = 90; //down arrow
        }
        else if (e.keyCode == '37') {
        board.snake.direction = 180; //left arrow
        }
        else if (e.keyCode == '39') {
        // right arrow
        board.snake.direction = 0;
        }
        //console.log(this.snake.direction)


    }
}

class Snake{
    constructor(x,y){
        this.xPos = x;
        this.yPos = y;
        this.alive = true;
        this.direction = 90;
    
        
    
    }

    

    move(){
        //console.log("get's here move x")

        switch(this.direction){
            case 0:
                
                this.xPos+=1;
                break;
            case 90:
                //console.log(this.direction)
                this.yPos+=1;
                break;
            case 180:
                this.xPos-=1;
                break;
            case 270:
                this.yPos-=1;
                break;
        }
    }


}


// functions //

function init(){
    board = new Board(snakeBoardCtx, msgEl);
    board.render()
}
init();

