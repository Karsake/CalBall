import BallData from "./BallData";
import BallController from "../Controller/BallController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onCollisionEnter(other,self){
        if(!BallController.instance.isAimBallSet && other.node.ballData.score == 0) {
            BallController.instance.aimBall = other.node.ballData;
        }else{
            BallController.instance.isAimBallSet = true;
        }
    }
}
