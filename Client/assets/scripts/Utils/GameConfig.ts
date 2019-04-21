import {BallScore} from "../Utils/Util";
class GameConfig{
    row:number = 10;
    collumn:number = 8;
    ballSize:number = 80;
    initMin:number = BallScore.lv1;
    initMax:number = BallScore.lv6;
    heightShift:number = 0.866;//3^0.5 / 2
}
export default new GameConfig()

