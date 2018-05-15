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
        Radius: 15,
        speed : 100,
        aX : 0.0,
        bY: 0.0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        //  var positionX = this.node.getPosition().x;
        //  var positionY = this.node.getPosition().y;
        //  cc.log(positionX + ' positionX000   ' + positionY);
        // // var position = this.node.parent.convertToNodeSpaceAR(this.node.getPosition());
        // // var positionX = position.x;
        //  //var positionY = position.y;
        //  cc.log(positionX + ' positionX111   ' + positionY);
        //  //cc.log(this.node.parent.getPosition().x + ' positionXx   ' + this.node.parent.getPosition().y);
        //  var playerPosition = this.node.parent.getComponent('Game').player.getPosition();
        //  cc.log(playerPosition.x + ' playerPosition.x   ' + playerPosition.y);
        //  //速度方向
        //  var vecX = playerPosition.x - positionX;
        //  var vecY = playerPosition.y - positionY;
        //  //cc.log(vecX + '    ' + vecY);
        //  var s = Math.sqrt(vecX*vecX + vecY *vecY);
        //  var t = s/this.speed;
        //  this.aX = vecX/t;
        //  this.bY = vecY/t;
     },

    start() {

    },

    update(dt) {

        // if (this.node.getPosition().y < -500) {
        //     this.node.destroy();
        // }
        if (this.node.getPosition().y < -500 || this.node.getPosition().y > 500 || this.node.getPosition().x > 400 || this.node.getPosition().x < -400) {
            this.node.destroy();
        }


        


        this.node.x += this.aX*dt;
       this.node.y += this.bY*dt;

        if (this.getPlayerDistance() < this.Radius) {
            this.node.parent.getComponent('Game').gameOver();
            this.node.destroy();
            //cc.log('游戏结束');

        }

    },

    getPlayerDistance: function () {

        var player = this.node.parent.getComponent('Game').player.getPosition();

        var dist = cc.pDistance(this.node.position, player);
        return dist;
    },
});
