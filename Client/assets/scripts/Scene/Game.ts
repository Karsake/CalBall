import ScoreController from "../Controller/ScoreController";
import Config from "../Utils/GameConfig";
import { CLIENT_EVENT } from "../Utils/Define";
import BallController from "../Controller/BallController";
import BallData from "../Entity/BallData";
import GameConfig from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property(cc.Node)
    shootingBallNode:cc.Node = null;

    @property(cc.Node)
    ballPanelNode:cc.Node = null;

    @property(cc.Prefab)
    dotPrefab:cc.Prefab = null;
    
    @property(cc.Node)
    shootingPanel:cc.Node = null;

    @property(cc.Node)
    dotNode:cc.Node = null;

    @property(cc.Node)
    fallenNode:cc.Node = null;

    @property(cc.Prefab)
    fallenBall:cc.Prefab = null;

    @property(cc.Node)
    pauseBtn:cc.Node = null;

    @property(cc.Node)
    resumeBtn:cc.Node = null;

    @property(cc.Node)
    pausePanel:cc.Node = null;

    @property(cc.ProgressBar)
    processBar:cc.ProgressBar = null;
    
    _lastRoundTime = 0;
    _lineDots:cc.NodePool = null;
    _fallenBalls:cc.NodePool = null;
    _xVelocity:number;
    _yVelocity:number;
    start () {
        
    }

    onLoad () {
        this.initNewGame();
    }

    onEnable() {
        cc.director.on(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
        this.shootingPanel.on(cc.Node.EventType.TOUCH_START,this.getAimLine,this);
        this.shootingPanel.on(cc.Node.EventType.TOUCH_MOVE,this.getAimLine,this);
        this.shootingPanel.on(cc.Node.EventType.TOUCH_CANCEL,this.clearAimLine,this);
        this.shootingPanel.on(cc.Node.EventType.TOUCH_END,this.shootBall,this);
        this.pauseBtn.on(cc.Node.EventType.TOUCH_END,this.pauseGame,this);
        this.resumeBtn.on(cc.Node.EventType.TOUCH_END,this.resumeGame,this);

        
    }

    onDisable() {
        cc.director.off(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
        this.shootingPanel.off(cc.Node.EventType.TOUCH_START,this.getAimLine);
        this.shootingPanel.off(cc.Node.EventType.TOUCH_MOVE,this.getAimLine);
        this.shootingPanel.off(cc.Node.EventType.TOUCH_END,this.shootBall);
        this.shootingPanel.off(cc.Node.EventType.TOUCH_CANCEL,this.clearAimLine);
        this.pauseBtn.off(cc.Node.EventType.TOUCH_END,this.pauseGame,this);
        this.resumeBtn.off(cc.Node.EventType.TOUCH_END,this.resumeGame,this);

    }
    

    initNewGame() {
        ScoreController.instance.resetGame();
        BallController.instance.resetGame();
        this._lastRoundTime = BallController.instance.roundTime;
        for(let i:number = 0;i < BallController.instance.ballGroup.length; i ++) {
            for(let j:number = 0; j < BallController.instance.ballGroup[i].length; j ++) {
                var x:cc.Node = cc.instantiate(this.ballPrefab);
                x.parent = this.ballPanelNode;
                BallController.instance.ballGroup[i][j].init(i,j,x);
                x.attr({ballData:BallController.instance.ballGroup[i][j]})
                if(i >= GameConfig.row - GameConfig.initLine - 1 && i != GameConfig.row - 1) {
                    BallController.instance.ballGroup[i][j].setRandomScore();
                }
            }
        }
        if(!this._lineDots) {
            this._lineDots = new cc.NodePool();
        }
        while(this._lineDots.size() < 25){
            this._lineDots.put(cc.instantiate(this.dotPrefab))
        }
        if(!this._fallenBalls) {
            this._fallenBalls = new cc.NodePool();
        }
        while(this._fallenBalls.size() < 25){
            this._fallenBalls.put(cc.instantiate(this.fallenBall))
        }
        BallController.instance.isStart = true;
    }

    pauseGame() {
        BallController.instance.isStart = false;
        this.pausePanel.active = true;
    }

    resumeGame() {
        BallController.instance.isStart = true;
        this.pausePanel.active = false;
    }

    getAimLine(info:cc.Event.EventTouch) {
        this.clearAimLine();
        let deltaX = info.getLocationX() - 375;
        let deltaY = info.getLocationY() - 287;
        if(deltaY < 0) {
            deltaX = - deltaX;
            deltaY = - deltaY;
        }
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let unitX = deltaX / distance * 50;
        let unitY = deltaY / distance * 50;
        while(this._lineDots.size() > 0) {
            let x = this._lineDots.get();
            this.dotNode.addChild(x);
            let posX = this._lineDots.size() * unitX;
            if(posX > 300) {
                posX = 600 - posX;
            }else if(posX < - 300) {
                posX = - 600 - posX;
            }
            x.setPosition(posX,this._lineDots.size() * unitY - 380);

        }
        this._xVelocity = deltaX *  80;
        this._yVelocity = deltaY * 80;
    }

    shootBall() {
        this.shootingBallNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._xVelocity,this._yVelocity);
        this.clearAimLine();
    }
    clearAimLine() {
        while(this.dotNode.children.length) {
            this._lineDots.put(this.dotNode.children[0])
        }
        this._xVelocity = 0;
        this._yVelocity = 0;
    }

    showScore() {
        ScoreController.instance.score;
    }

    ballPush() {
        for(let i of BallController.instance.ballGroup) {
            for(let j of i) {
                j.ballPush();
            }
        }
    }

    dropBall(node:cc.Node) {
        node.opacity = 0;
        let ballNode = this._fallenBalls.get();
        ballNode.parent = this.fallenNode;
        ballNode.setPosition(node.x,node.y);
        let randX = Math.random();
        let randY = Math.sqrt(1 - randX * randX);
        ballNode.getComponent(cc.RigidBody).linearVelocity = cc.v2(randX * 20,randY * 20);
    }

    update(dt) {
        // console.log(BallController.instance.roundTime)
        if(BallController.instance.isStart) {
            BallController.instance.roundTime -= dt;
            if(BallController.instance.roundTime <= 0) {
                this.ballPush();
                BallController.instance.gameRound += 1;
                this._lastRoundTime = Math.max(GameConfig.minRoundTime,this._lastRoundTime * GameConfig.timeRatial);
                BallController.instance.roundTime += this._lastRoundTime;
            }
        }
        if(this.fallenNode.children.length) {
            for(let i of this.fallenNode.children) {
                if(i.y < 700) {
                    this._fallenBalls.put(i);
                }
            }
        }
    }
}
