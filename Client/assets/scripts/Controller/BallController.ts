import BallData from "../Entity/BallData";

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
    public init() {
        this.generateNewData();
    }

    public generateNewData() {
        this._ballGroup = [];
    }

}
