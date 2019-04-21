import ScoreController from "../Controller/ScoreController";
import Config, { BallScore, CLIENT_EVENT } from "../Utils/GameConfig";
import Util from "../Utils/Util";
import BallController from "../Controller/BallController";
import BallData from "../Entity/BallData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

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
    }

    private setBalls() {
        
    }

    private showScore() {
        ScoreController.instance.score = 123;
    }

    private ballPush() {

    }
}
