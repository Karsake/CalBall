import GameConfig from "../Utils/GameConfig";
import { BallScore, BallColor } from "../Utils/Define";
import BallController from "../Controller/BallController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallData extends cc.Component {

    private _row:number = -1;
    private _column:number = -1

    private _score:BallScore;
    private _isNew:Boolean;

    init(row,column,ballNode:cc.Node) {
        // console.log(row,column)//,ballNode)
        if(ballNode instanceof cc.Node) {
            this._row = row;
            this._column = column
            this.node = ballNode;
            this.score = BallScore.lv0;
        }else{
            throw("bubble init failure")
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
        this._isNew = true;
        if(BallController.instance.maxBallScore < x) {
            BallController.instance.maxBallScore = x;
        }
        this.node.opacity = this._score == BallScore.lv0 ? 123 : 255;
        this.node.color = new cc.Color().fromHEX(BallColor[BallScore[x]]);
        this.node.getChildByName("score").getComponent(cc.Label).string = this._score + "";
    }

    public clearNew() {
        this._isNew = false;
    }

    public ballPush() {
        var notZero:boolean = this._score != BallScore.lv0;
        if(this._row == GameConfig.row - 1) {
            this.setRandomScore();
        }
        this._row -= 1;
        this.node.runAction(cc.moveBy(0.3,cc.v2(0 , - GameConfig.heightShift * GameConfig.ballSize)))

        setTimeout(() => {
            if(this._row == -1) {
                //TODO 这里需要加入游戏失败逻辑
                if(notZero) {
                    console.warn("游戏失败")
                    BallController.instance.isStart = false;
                }
                this._row += GameConfig.row;
                this.node.y += GameConfig.row * GameConfig.heightShift * GameConfig.ballSize;
            }
        }, 300);

    }

    public setRandomScore() {
        this.score = BallController.instance.scorePool[Math.floor(BallController.instance.scorePool.length * Math.random())];
    }
}
