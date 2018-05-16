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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    update(dt) {
       

       var p = this.node.parent.getContentSize().height/2+this.node.height/2;
      // cc.log(p);
     // this.node.x += this.flyingSpeed;
      this.node.y -= this.flyingSpeed;
        if (this.node.getPosition().y > p) {
            this.node.destroy();
        }

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
