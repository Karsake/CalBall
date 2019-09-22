import GameConfig from "../Utils/GameConfig";
import { BallScore, BallColor, CLIENT_EVENT } from "../Utils/Define";
import BallController from "../Controller/BallController";
import Util from "../Utils/Util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallData extends cc.Component {

    private _row:number = -1;
    private _column:number = -1

    private _score:BallScore;
    private _isTarget:Boolean;

    init(row,column,ballNode:cc.Node) {
        // console.log(row,column)//,ballNode)
        if(ballNode instanceof cc.Node) {
            this._row = row;
            this._column = column
            this.node = ballNode;
            this.score = BallScore.lv0;
        }else{
            throw("ball init failure")
        }
        this.setBall()
    }

    setBall() {
        this.node.setPosition((this._column  * 1  + (this._row % 2) / 2) * GameConfig.ballSize - 300, this._row * GameConfig.heightShift * GameConfig.ballSize - 270);
    }

    /**
     * 设置求的分数，顺便改变球的颜色
     */
    public set score(x:BallScore) {
        this._score = x;
        if(BallController.instance.maxBallScore < x) {
            BallController.instance.maxBallScore = x;
        }
        this.node.opacity = this._score == BallScore.lv0 ? 0 : 255;
        this.node.color = new cc.Color().fromHEX(BallColor[BallScore[x]]);
        this.node.getChildByName("score").getComponent(cc.Label).string = this._score + ""//this._row + "_" +this._column//;
    }

    public get score():BallScore {
        return this._score
    }

    public set isTarget(x:Boolean) {
        this._isTarget = x;
        if(this._isTarget){
            this.node.opacity = 123;
        }else{
            this.score = BallScore.lv0;
        }
    }

    public get isTarget():Boolean {
        return this._isTarget
    }
    
    public ballPush() {
        var notZero:boolean = this._score != BallScore.lv0;
        if(this._row == GameConfig.row - 1) {
            this._isTarget = false;
            this.setRandomScore();
        }
        this.node.runAction(cc.moveBy(0.3,cc.v2(0 , - GameConfig.heightShift * GameConfig.ballSize)))

        setTimeout(() => {
            this._row -= 1;
            if(this._row == -1) {
                if(notZero && !this._isTarget) {
                    // console.warn("GameOver")
                    BallController.instance.isStart = false;
                    cc.director.emit(CLIENT_EVENT.GAME_OVER);
                    Util.setSave();
                }
                this._row += GameConfig.row;
                this.node.y += GameConfig.row * GameConfig.heightShift * GameConfig.ballSize;
            }
        }, 300);

    }

    public setRandomScore() {
        this.score = BallController.instance.scorePool[Math.floor(BallController.instance.scorePool.length * Math.random())];
    }

    public get row():number{
        return this._row
    }

    public get column():number{
        return this._column
    }
}
