import ScoreController from "../Controller/ScoreController";
import { GameSave } from "./Define";

class Util{
    loadSave() {
        var x:GameSave = JSON.parse(localStorage.getItem("game_save"));
        ScoreController.instance.lastScore = x && isFinite(x.lastScore) && x.lastScore > 0 ? x.lastScore:0;
        ScoreController.instance.maxScore = x && isFinite(x.maxScore) && x.maxScore > 0 ? x.maxScore:0;
        this.setSave();
    }

    setSave() {
        var x = new GameSave();
        x.maxScore = ScoreController.instance.maxScore;
        x.lastScore = ScoreController.instance.lastScore;
        localStorage.setItem("game_save",JSON.stringify(x));
    }
}
export default new Util();


