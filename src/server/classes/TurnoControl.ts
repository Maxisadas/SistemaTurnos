

export default class TurnoControl{

    private static _instance: TurnoControl;

    constructor(){

    }



    public static get getInstance(){
        return this._instance || (this._instance = new this());

    }




}