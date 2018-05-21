var globalBulletType = require("enemyPlaneDatas").bulletType;

//bullet type 0:机炮 1daodan 2:光束
//gid从1开始
//shootingSpeed 最快为1吧 目前 由于一个间隔要发三发
var _heroPlaneData = [
    { planeImage: "heroPlane0", blood: 4, shootingSpeed: 1, flyingSpeed: 5, bulletType: globalBulletType.jipao, damage: 1 },
    { planeImage: "heroPlane1", blood: 6, shootingSpeed: 1, flyingSpeed: 4, bulletType: globalBulletType.jipao, damage: 1 },
    { planeImage: "heroPlane2", blood: 3, shootingSpeed: 0.5, flyingSpeed: 7, bulletType: globalBulletType.jipao, damage: 1 },
    { planeImage: "heroPlane3", blood: 4, shootingSpeed: 1, flyingSpeed: 6, bulletType: globalBulletType.guangshu, damage: 2 },
    { planeImage: "heroPlane4", blood: 7, shootingSpeed: 1, flyingSpeed: 4, bulletType: globalBulletType.guangshu, damage: 2 },
    { planeImage: "heroPlane5", blood: 7, shootingSpeed: 1, flyingSpeed: 3, bulletType: globalBulletType.guangshu, damage: 3 },

    { planeImage: "heroPlane0", blood: 1000, shootingSpeed: 2, flyingSpeed: 7, bulletType: globalBulletType.huopao, damage: 3 },
];

export const heroPlaneData = _heroPlaneData;