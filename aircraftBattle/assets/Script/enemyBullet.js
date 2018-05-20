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
       
        flyingSpeed :0,//一帧飞行像素 目前只是Y轴的移动速度
        damage:0,

        //targetPosition:{x:0,y:0},
        targetPositionX:0,
        targetPositionY:0,
        bjX:0,
        bjY:0,

        ax:0,
        by:0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        

        this.bjX = this.node.parent.getContentSize().width/2+50;
        this.bjY = this.node.parent.getContentSize().height/2+50;


       // this.node.rotation;
        //设置好 子弹的旋转方向！！！！ 根据 targetPosition
        
        let positionX = this.node.getPosition().x;
        let positionY = this.node.getPosition().y;
        
        let vecX = this.targetPositionX - positionX;
        let vecY = this.targetPositionY - positionY;

cc.log("1rr--> " +cc.pToAngle(cc.v2(-20,-20) )/ Math.PI * 180);//-135
cc.log("2rr--> " +cc.pToAngle(cc.v2(0,20) )/ Math.PI * 180);//90
        //cc.log("positionX--> " + positionX + "  positionY---> " + positionY);
        //cc.log("vecX--> " + vecX + "  vecY---> " + vecY);
        //this.node.rotation -=45;
        //cc.log("this.node.rotation---> " +this.node.rotation);
        //cc.log("rrrrr---> " +cc.pToAngle(cc.v2(vecX,vecY)) / Math.PI * 180);
        //R =(R-90)+(-A)//r-90归位 旋转是顺时针 与角度 相反 ===》R = R-90-A=R-(A+90);
        let A = cc.pToAngle(cc.v2(vecX,vecY));
        this.node.rotation -=((A / Math.PI * 180)+90);
        this.ax = Math.cos(A)*this.flyingSpeed;
        this.by = Math.sin(A)*this.flyingSpeed;
        //   var s = Math.sqrt(vecX*vecX + vecY *vecY);
        //   var t = s/this.flyingSpeed;
        //     this.ax = vecX/t;
        //     this.by = vecY/t;
     },

    start() {

    },

    update(dt) {
        if (this.node.getPosition().y > this.bjY || this.node.getPosition().y<-this.bjY ||this.node.getPosition().x>this.bjX || this.node.getPosition().x<-this.bjX) {
            this.node.destroy();
        }

        //
        this.node.x += this.ax;
        this.node.y += this.by;
       
      // cc.log(p);
     // this.node.x += this.flyingSpeed;
      //this.node.y -= this.flyingSpeed;
        

        // for(var i = 0; i<D.enemys.length;i++) {
            
        //     if(this.getEnemyDistance(D.enemys[i]) < this.Radius) {
        //         this.node.destroy();
             
               
        //         var e = D.enemys[i].name;
              
        //         cc.log(e);
        //         D.enemys[i].getComponent(e).bleed();
        //     }
        // }
    },

    getEnemyDistance: function (enemy) {
      
        var enemy = enemy.getPosition();
      
        var dist = cc.pDistance(this.node.position, enemy);
        return dist;
    },

    onCollisionEnter: function (other, self) {

        this.node.destroy();
    },
});
