import BallData from "../Entity/BallData";
import GameConfig from "../Utils/GameConfig";

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
    public init() {
        this.generateNewData();
    }

    public generateNewData() {
        this._ballGroup = [];
        for(let i = 0; i < GameConfig.collumn; i++) {
            this._ballGroup[i] = [];
            for(let j = 0; j < GameConfig.row; j++) {
                this._ballGroup[i][j] = new BallData();
            }
        }
    }

}
