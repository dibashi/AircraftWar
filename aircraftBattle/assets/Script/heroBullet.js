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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // enemys : [],
        //Radius:33,
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
      this.node.y += this.flyingSpeed;
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
        //console.log('on collision enter');
    
        // // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        // var world = self.world;
    
        // // 碰撞组件的 aabb 碰撞框
        // var aabb = world.aabb;
    
        // // 上一次计算的碰撞组件的 aabb 碰撞框
        // var preAabb = world.preAabb;
    
        // // 碰撞框的世界矩阵
        // var t = world.transform;
    
        // // 以下属性为圆形碰撞组件特有属性
        // var r = world.radius;
        // var p = world.position;
    
        // // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        // var ps = world.points;

        // cc.log("self");
        // cc.log(self);
        // cc.log("other");
        // cc.log(other);
        this.node.destroy();
    },
});
