import { CLIENT_EVENT } from "../Utils/Define";
import BallData from "../Entity/BallData";

export default class ScoreController{

    
    private static _instance:ScoreController;
    public static get instance():ScoreController{
        if(!this._instance){
            this._instance = new ScoreController();
        }
        return this._instance;
    }
   
    private _score:number  = 0;
    public isUpdating:Boolean = false;
    private _maxScore:number = 0;
    public lastScore:number = 0;
    /**
     * 初始化分数
     */
    public resetGame() {
        this.isUpdating = false;
        this.score = 0;
    }

    /**
     * 设置游戏分数，定时更新强制更新时请把isUpdating设为false
     */
    public set score(x:number) {
        this._score = x;
        this.maxScore = x;
        if(!this.isUpdating){
            this.isUpdating = false;
            setTimeout(this.updateGameScore,0.3);
        }
    }

    public addScore(x:number) {
        this.score = this._score + x;
    }
    public get score() {
        return this._score;
    }

    public set maxScore(score) {
        if(this._maxScore && this._maxScore > score) {
            return
        }
        this._maxScore = score;
    }

    public get maxScore() {
        return this._maxScore;
    }

    /**
     * 更新游戏分数的逻辑
     */
    private updateGameScore() {
        cc.director.emit(CLIENT_EVENT.SCORE_UPDATE);
    }
 
}
