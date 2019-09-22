import {BallScore} from "../Utils/Define";
class GameConfig{
    initRoundTime:number = 100;
    minRoundTime:number = 1;
    timeRatial:number = 0.9;//与上一轮对比的时间比例
    initLine:number = 4;
    row:number = 10;
    collumn:number = 8;
    ballSize:number = 80;
    initMin:number = BallScore.lv1;
    initMax:number = BallScore.lv11;
    minCombine:number = 2;

    heightShift:number = 0.866;//3^0.5 / 2
}
export default new GameConfig()

