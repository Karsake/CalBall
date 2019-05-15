import { BallScore, BallColor } from "../Utils/Define";
import BallController from "../Controller/BallController";
import GameConfig from "../Utils/GameConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShootingBall extends cc.Component {

    _score:BallScore;
    onCollisionEnter(other,self) {
        console.log(other.node.ballData);
        this.reset();
    }

    reset() {
        this.node.setPosition(0,-380);
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        this._score = BallController.instance.scorePool[Math.floor(BallController.instance.scorePool.length * Math.random())];
        this.node.getChildByName("score").getComponent(cc.Label).string = this._score + "";
        this.node.color = new cc.Color().fromHEX(BallColor[BallScore[this._score]]);

    }

    onLoad() {
        this.reset();
    }

    update(){
        if(this.node.y < - cc.view.getVisibleSize().height / 2) {
            this.reset();
        }
    }
}
