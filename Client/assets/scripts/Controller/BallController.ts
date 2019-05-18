import BallData from "../Entity/BallData";
import GameConfig from "../Utils/GameConfig";
import { BallScore, CLIENT_EVENT } from "../Utils/Define";

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
    public shootingScore:BallScore = BallScore.lv0;

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

    checkAimBall(dotNode:cc.Node):void {
        for(let i of this._ballGroup) {
            for(let j of i) {
                if(j.row < GameConfig.row - 1 && Math.sqrt(Math.pow(dotNode.x - j.node.x,2) + Math.pow(dotNode.y - j.node.y,2)) < 40) {
                    if(j.score) {
                        this.isAimBallSet = true;
                        return
                    }
                    // console.log(`${dotNode.x},${dotNode.y},${j.node.x},${j.node.y}`)
                    if(!this.aimBall || this.aimBall.score == 0) {
                        this.aimBall = j;
                    }
                    
                    // console.log(this.aimBall.row)
                }
            }
        }
    }

    setAimBall() {
        BallController.instance.aimBall.setNew();
        cc.director.emit(CLIENT_EVENT.RESET_BALL);
    }

    isNext(data1:BallData,data2:BallData):Boolean {
        return data1 != data2 &&
        Math.abs(data1.column - data2.column) < 1 &&
        Math.abs(data1.row - data2.row) < 1 &&
        (data1.row % 2 ? data1.column <= data2.column : data2.column <= data1.column)
    }
        
    getSurroundedBalls(data:BallData,isSameScore:Boolean = false):Array<BallData> {
        let a:Array<BallData> = []
        for(let i of this._ballGroup) {
            a.concat(i.filter((x)=>{return this.isNext(data,x) && (!isSameScore || data.score == x.score)}))
        }
        return a
    }

    /**
     * @param layer -1 means infinity
     */
    getBallsByLayer(data:Array<BallData>,isSameScore:Boolean = false,layer:number = 1):Array<BallData> {
        if(layer == 0) {
            return data
        }
        let a:Array<BallData> = [];
        let temp:Array<BallData>;
        for(let i of data) {
            temp = this.getSurroundedBalls(i,isSameScore);
            for(let j of temp){
                if(a.indexOf(j) == -1) {
                    a.push(j);
                }
            }
        }
        layer -= 1;
        if(data == a) {
            return a;
        }else {
            return this.getBallsByLayer(a,isSameScore,layer)
        }
    }

    isAttached(data:BallData):Boolean {
        let a:Array<BallData> = this.getBallsByLayer([data]);
        for(let i of a) {
            if(i.row == GameConfig.row - 1) {
                return true
            }
        }
        return false
    }

    getUnattachedBalls() {
        this._ballGroup
    }

}
