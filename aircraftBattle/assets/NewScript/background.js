// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        yun1: {
            default: null,
            type: cc.Node,
        },
        yun2: {
            default: null,
            type: cc.Node,
        },
        yun3: {
            default: null,
            type: cc.Node,
        },

        // y1:null,
        // y2:null,
        // y3:null,

        bg1: {
            default: null,
            type: cc.Node,
        },
        bg2: {
            default: null,
            type: cc.Node,
        },
        y:550,

        bgSpeed:2,

        speedFactor:1,//速度系数，添加需求，可以改变背景速度以及云的速度
        speedYUNFactor:1,

        yun1Speed:3.0,
        yun2Speed:4.0,
        yun3Speed:5.0,

        h:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        this.createYun1();
        this.createYun2();
        this.createYun3();

        this.h = this.node.getChildByName("bg1").getContentSize().height;
    },

    createYun:function(yun){
        let vx = cc.director.getVisibleSize().width*0.5;

        let origin = cc.director.getVisibleOrigin();
        let rx = origin.x + cc.randomMinus1To1()*vx;
     
        let vy = origin.y + cc.director.getVisibleSize().height*0.5 + 200;

        yun.setPosition(cc.v2(rx, vy));

        // let rt = 5+ Math.random()*3;

        // let callback = cc.callFunc(this.createYun1,this, this.y1);
        // let seq = cc.sequence(cc.moveTo(rt,cc.v2(rx, -vy)),callback);
       
        // yun.runAction(seq);
    },

    createYun1:function() {
        this.yun1Speed = 3.0+Math.random()*3.0;
        this.createYun(this.yun1);
    },

    createYun2:function() {
        this.yun2Speed = 3.0+Math.random()*3.0;
        this.createYun(this.yun2);
    },

    createYun3:function() {
        this.yun3Speed = 3.0+Math.random()*3.0;
        this.createYun(this.yun3);
    },

    

 

    start () {

    },

     update (dt) {
        

        let bg1Y = this.bg1.getPosition().y;
        let bg2Y = this.bg2.getPosition().y;

       

        if(bg1Y<=-this.h) {
          //  this.bg1.setPosition(this.bg1.getPosition().x,bg2Y+cc.director.getVisibleSize().height-this.bgSpeed*this.speedFactor);
            this.bg1.setPosition(this.bg1.getPosition().x,bg2Y+this.h-this.bgSpeed*this.speedFactor);
        }else {
            bg1Y -= this.bgSpeed*this.speedFactor*dt*60;
            this.bg1.setPosition(this.bg1.getPosition().x,bg1Y);
        }

        

        if(bg2Y<=-this.h) {
            this.bg2.setPosition(this.bg2.getPosition().x,bg1Y+this.h);
        }else {
            bg2Y -= this.bgSpeed*this.speedFactor*dt*60;
            this.bg2.setPosition(this.bg2.getPosition().x,bg2Y);
        }


        let yun1Y = this.yun1.getPosition().y;
        let yun2Y = this.yun2.getPosition().y;
        let yun3Y = this.yun3.getPosition().y;

        if(yun1Y<=-(cc.director.getVisibleSize().height*0.5 + 100)) {
            this.createYun1(this.yun1);
        }else {
            yun1Y -= this.yun1Speed*this.speedYUNFactor*dt*60;
            this.yun1.setPosition(this.yun1.getPosition().x,yun1Y);
        }

        if(yun2Y<=-(cc.director.getVisibleSize().height*0.5 + 100)) {
            this.createYun2(this.yun2);
        }else {
            yun2Y -= this.yun2Speed*this.speedYUNFactor*dt*60;
            this.yun2.setPosition(this.yun2.getPosition().x,yun2Y);
        }

        if(yun3Y<=-(cc.director.getVisibleSize().height*0.5 + 100)) {
            this.createYun3(this.yun3);
        }else {
            yun3Y -= this.yun1Speed*this.speedYUNFactor*dt*60;
            this.yun3.setPosition(this.yun3.getPosition().x,yun3Y);
        }

       
     },
});
