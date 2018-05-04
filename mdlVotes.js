var events = require ('events');
    express = require('express'),
    app = express();
    config = require ('./config').events;

    module.exports= Arr = Array();
    const max =4;
class Votes extends events.EventEmitter{

    constructor(name){
        super();
        this.count=0;
        this.name=name;

        this.on(config.Vote,()=> {
            if(this.count<max){
                console.log(`Vote in ${this.name}`);
                Arr.push(`Vote in ${this.name}`);
                this.count++;
                }
            else{
                console.log(`Cannot Vote in ${this.name}`);
                Arr.push(`Cannot Vote in ${this.name}`)
            }
        });
        this.on(config.Reset,()=> {
            this.count=0;
            console.log(`Reset in ${this.name}`);
            Arr.push(`Reset in ${this.name}`)
        }); 
        this.on(config.Data,()=>{
            console.log(`Data ${this.name}:`);
            console.log(this.getAllData());
            Arr.push(this.getAllData());
        });
    }
    getAllData(){
        return{
            name:this.name,
            count:this.count
       };
    }
    reset(){
        this.emit("Reset");
    }
    addCount(){
        this.emit("Vote");
    }
    Data(){
        this.emit("Data");
    }
}

module.exports = Votes;
