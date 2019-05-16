import BallData from "../Entity/BallData";
import GameConfig from "../Utils/GameConfig";
import { BallScore } from "../Utils/Define";

export default class BallController{

    private static _instance:BallController;
    public static get instance():BallController{
        if(!this._instance){
            this._instance = new BallController();
        }
        return this._instance;
    }

    /**
     * 用来存泡泡信息的二维数组
     */
    private _ballGroup:Array<Array<BallData>>;
    public get ballGroup():Array<Array<BallData>> {
        return this._ballGroup;
    }

    public isStart:boolean = false;
    public isShooting:boolean = false;
    public maxBallScore:number = 0;
    public minBallScore:number = 0;
    private _scorePool:Array<BallScore> = [];
    public gameRound:number = 0;
    public roundTime:number = 0;
    public aimBall:BallData = null;
    public isAimBallSet:boolean = false;

    public resetGame() {
        this._ballGroup = [];
        this.gameRound = 0;
        this.aimBall = null;
        this.isAimBallSet = false;
        this.roundTime = GameConfig.initRoundTime;
        this.maxBallScore = GameConfig.initMax;
        this.minBallScore = GameConfig.initMin;
        for(let i = 0; i < GameConfig.row; i++) {
            this._ballGroup[i] = [];
            for(let j = 0; j < GameConfig.collumn; j++) {
                this._ballGroup[i][j] = new BallData();
            }
        }
    }

    public get scorePool():Array<BallScore> {
        if(!this._scorePool || !this._scorePool.length) {
            this._scorePool = [];
            let x:number = BallScore.lv1;
            while(x <= this.maxBallScore) {
                this._scorePool.push(x);
                x = x * 2;
            }
        }
        return this._scorePool
    }

    public ballBounce(data:BallData) {

    }

    /**
     * 递归获取某个球周围的若干层泡泡
     * @param data 传入的参数
     * @param isSameScore 默认为false，设为true则只取相同分数的泡泡
     * @param layer 层数，若为-1则获取全部相连
     */
    getSurroundedBalls(data:BallData,isSameScore:boolean = false,layer:number = 1):Array<BallData> {
        let a:Array<BallData> = [];

        return a
    }

    getUnattachedBalls() {
        this._ballGroup
    }
}
