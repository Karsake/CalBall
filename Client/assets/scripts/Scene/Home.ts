import ScoreController from "../Controller/ScoreController";
import { CLIENT_EVENT } from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    Btnstart:cc.Node;
    TextMax:cc.Label;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Btnstart = cc.find("btn_start",this.node);
        this.TextMax = cc.find("text_max",this.node).getComponent(cc.Label);
    }

    start () {
        this.showScore();
    }

    showScore() {
        this.TextMax.string = "High Record: " + ScoreController.instance.maxScore;
    }

    onEnable() {
        cc.director.on(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
    }

    onDisable() {
        cc.director.off(CLIENT_EVENT.SCORE_UPDATE,this.showScore);
    }
    // update (dt) {}
}
