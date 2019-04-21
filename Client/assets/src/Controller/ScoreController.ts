import { CLIENT_EVENT } from "../Utils/GameConfig";

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

    /**
     * 初始化分数
     */
    public init() {
        this.isUpdating = false;
        this.score = 0;
    }

    /**
     * 设置游戏分数，定时更新强制更新时请把isUpdating设为false
     */
    public set score(x:number) {
        this._score = x;
        if(!this.isUpdating){
            this.isUpdating = false;
            setTimeout(this.updateGameScore,0.3);
        }
    }

    public get score() {
        return this._score;
    }

    /**
     * 更新游戏分数的逻辑
     */
    private updateGameScore() {
        cc.director.emit(CLIENT_EVENT.SCORE_UPDATE);
    }

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
