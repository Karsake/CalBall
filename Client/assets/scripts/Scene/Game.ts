import ScoreController from "../Controller/ScoreController";
import Config from "../Utils/GameConfig";
import { CLIENT_EVENT } from "../Utils/Define";
import BallController from "../Controller/BallController";
import BallData from "../Entity/BallData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property(cc.Node)
    shootingBallNode:cc.Node = null;

    @property(cc.Node)
    ballPanelNode:cc.Node = null;
    start () {
        
    }

    onLoad () {
        this.initNewGame();
    }

    onEnable() {
        cc.director.on(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
    }

    onDisable() {
        cc.director.off(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
    }

    update () {

    }
    
    private initNewGame() {
        ScoreController.instance.init();
        BallController.instance.init();
        for(let i in BallController.instance.ballGroup) {
            for(let j in BallController.instance.ballGroup[i]) {
                var x:cc.Node = cc.instantiate(this.ballPrefab);
                x.parent = this.ballPanelNode;
                BallController.instance.ballGroup[i][j].init(i,j,x)
            }
        }
    }

    private setBalls() {
        
    }

    private showScore() {
        ScoreController.instance.score;
    }

    private ballPush() {

    }
}
