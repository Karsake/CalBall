import { BallScore } from "../Utils/Define";
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
        this.node.setPosition(375,200);
        this.node.getComponent(cc.RigidBody).active = false;
        this._score = BallController.instance.scorePool[Math.floor(BallController.instance.scorePool.length * Math.random())];
    }

    update(){
        if(this.node.y < - GameConfig.ballSize / 2) {
            this.reset();
        }
    }
}
