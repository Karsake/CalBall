import GameConfig, { BallScore, BallColor } from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BallData extends cc.Component {

    private _row:number = -1;
    private _column:number = -1

    private _score:BallScore;
    private _color:BallColor;
    private _isNew:Boolean;

    init(row,column,ballNode:cc.Node) {
        // console.log(row,column,ballNode)
        if(ballNode instanceof cc.Node) {
            this._row = row;
            this._column = column
            this.node = ballNode;
        }else{
            throw("bubble init failure")
        }
        this.setBall()
    }

    setBall() {
        this.node.setPosition((this._row  * 1  + (this._column % 2) / 2) * GameConfig.ballSize , this._column * GameConfig.heightShift* GameConfig.ballSize);//todo 这玩意需要排版一下
    }
    /**
     * 设置求的分数，顺便改变球的颜色
     */
    public set score(x:BallScore) {
        this._score = x;
        this._color = BallColor[BallScore[x]];
        this._isNew = true;
        this.node.opacity = this._score == BallScore.lv0 ? 0 : 255;
    }

    public clearNew() {
        this._isNew = false;
    }

    public ballPush() {
        this._row += 1;
        //TODO
    }
}
