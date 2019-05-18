import { BallScore, BallColor, CLIENT_EVENT } from "../Utils/Define";
import BallController from "../Controller/BallController";
import GameConfig from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShootingBall extends cc.Component {

    _score:BallScore;
    onCollisionEnter(other,self) {
        if(other.node.ballData.isTarget) {
            if(BallController.instance.aimBall && BallController.instance.isShooting) {
                let tempScore:number = BallController.instance.aimBall.score;
                BallController.instance.aimBall.node[`ballData`].isTarget = false;
                BallController.instance.aimBall.score = tempScore;
                BallController.instance.setAimBall();
            }
        }
    }

    reset() {
        BallController.instance.isShooting = false;
        BallController.instance.aimBall = null;
        this.node.setPosition(0,-380);
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        this._score = BallController.instance.scorePool[Math.floor(BallController.instance.scorePool.length * Math.random())];
        BallController.instance.shootingScore = this._score;
        this.node.getChildByName("score").getComponent(cc.Label).string = this._score + "";
        this.node.color = new cc.Color().fromHEX(BallColor[BallScore[this._score]]);
    }

    onLoad() {
        this.reset();
    }

    onEnable() {
        cc.director.on(CLIENT_EVENT.RESET_BALL,this.reset,this);
    }

    onDisable() {
        cc.director.off(CLIENT_EVENT.RESET_BALL,this.reset,this);
    }

    update(){
        if(this.node.y < - cc.view.getVisibleSize().height / 2) {
            this.reset();
        }
    }
}
