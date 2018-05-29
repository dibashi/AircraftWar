var globalBulletType = require("enemyPlaneDatas").bulletType;


var _heroBulletType = cc.Enum({
    ordinary:0,
    upgrade:1,
    //guangshu:2,
});

var _wingmanBulletType = cc.Enum({
    ordinary:0,
   // upgrade:1,
    //guangshu:2,
});

//bullet type 0:机炮 1daodan 2:光束
//gid从1开始
//shootingSpeed 最快为1吧 目前 由于一个间隔要发三发
var _heroPlaneData = [
    { planeImage: "heroPlane0", blood: 1, shootingSpeed: 1, flyingSpeed: 20, bulletType: _heroBulletType.ordinary, damage: 1,wingmanBulletType:0,onceBulletCount:2 },//wingmanBulletType 决定加载哪个子弹预制体目前只实现了一个
    { planeImage: "heroPlane1", blood: 1, shootingSpeed: 1, flyingSpeed: 20, bulletType: _heroBulletType.ordinary, damage: 1,wingmanBulletType:0,onceBulletCount:3 },//onceBulletCount 决定一次发射多少个子弹
    { planeImage: "heroPlane2", blood: 1, shootingSpeed: 1, flyingSpeed: 20, bulletType: _heroBulletType.ordinary, damage: 1,wingmanBulletType:0,onceBulletCount:4 },
    { planeImage: "heroPlane3", blood: 4, shootingSpeed: 1, flyingSpeed: 6, bulletType: _heroBulletType.ordinary, damage: 2,wingmanBulletType:0,onceBulletCount:3 },
    { planeImage: "heroPlane4", blood: 7, shootingSpeed: 1, flyingSpeed: 4, bulletType: _heroBulletType.ordinary, damage: 2,wingmanBulletType:0,onceBulletCount:3},
    { planeImage: "heroPlane5", blood: 7, shootingSpeed: 1, flyingSpeed: 3, bulletType: _heroBulletType.ordinary, damage: 3,wingmanBulletType:0,onceBulletCount:3 },

    { planeImage: "heroPlane0", blood: 1000, shootingSpeed: 2, flyingSpeed: 7, bulletType: globalBulletType.huopao, damage: 3 },
];

var _maxShootingSpeed = 2.5;//飞机的最大攻速  

var _onceAddSpeed = 0.1;//一次加多少速度，在所有管道都布满的情况下飞机开始+攻速。
export const heroPlaneData = _heroPlaneData;

export const heroBulletType = _heroBulletType;

export const wingmanBulletType = _wingmanBulletType;

export const maxShootingSpeed = _maxShootingSpeed;

export const onceAddSpeed = _onceAddSpeed;