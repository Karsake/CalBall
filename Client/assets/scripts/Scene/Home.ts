import ScoreController from "../Controller/ScoreController";
import { CLIENT_EVENT, SCENE_NAME } from "../Utils/Define";
import Util from "../Utils/Util";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    Btnstart:cc.Node;
    TextMax:cc.Label;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Util.loadSave();
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

    /**
     * start game button action
     */
    toGame() {
        cc.director.loadScene(SCENE_NAME.GAME)
    }
}
