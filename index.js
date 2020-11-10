
//Classe jogo
class Game extends ex.Engine {
    constructor (){
        super({width:800,height:800})

    }
    start(){
        return super.start()
    }
    add(any){
        return super.add(any)
    }
}
//classe jogador
class Player extends ex.Actor{
    movimentos = 127;
    
    constructor(){
        super({width:100,height:100,color:ex.Color.Yellow, engine: ex.Engine,}),
        this.vel.x = 1;
        this.vel.y = 1;
        this.pos.x = 150;
        this.pos.y = 150;
        this.body.collider.type = ex.CollisionType.Active;
        
    }
    
    update(engine,delta){
        if(this.movimentos>0){
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.S)){
            
            this.move_back();
        }
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.W)){
            
            this.move_foward();
        }
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.D)){
            
            this.move_right();
        }
        if(engine.input.keyboard.wasPressed(ex.Input.Keys.A)){
            
            this.move_left();
        }
        }
    }
    move_back(){
        if((this.pos.y+100)<800){
        this.pos.y = this.pos.y + 100;
        this.movimentos = this.movimentos -1;
        }
    }
    move_foward(){
        if((this.pos.y-100)>0){
        this.pos.y = this.pos.y - 100;
        this.movimentos = this.movimentos -1;
        }
    }
    move_right(){
        if((this.pos.x+100)<800){
            this.pos.x = this.pos.x + 100;
            this.movimentos = this.movimentos -1;

        }
    }
    move_left(){
        if((this.pos.x -100)>0){
            this.pos.x = this.pos.x - 100;
            this.movimentos = this.movimentos -1;
        }
    }
}

class Cerca extends ex.Actor{

    constructor(){
    super({width:100,height:100,x:350,y:50,color:ex.Color.Chartreuse});
    this.body.collider.type = ex.CollisionType.Active;
}
}

var game = new Game();
var jogador = new Player();
var cerca = new Cerca();



game.input.keyboard.on("hold",(evt)=>{})


game.add(jogador);
game.add(cerca);

game.start().then(()=>{
    jogador.update(game)
});
