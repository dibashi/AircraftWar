var _generateType = cc.Enum({
    jinbi: 0,
    wudichongci: 1,
    xinjiaxue: 2,
    jisushesu: 3,
    huojianpao: 4
});

var _bulletType = cc.Enum({
    jipao:0,
    huopao:1,
});


//bullet type 0:机炮 1:火炮
//gid从1开始
var _enemyPlaneData = [
    {enemyID:0, planeImage: "enemyPlane0", blood: 3, shootingSpeed: 3, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:0.65,fallingObject:_generateType.jinbi },
    {enemyID:1, planeImage: "enemyPlane1", blood: 4, shootingSpeed: 3, flyingSpeed: 3, bulletType: _bulletType.huopao, damage: 1,dropProbability:0.5,fallingObject:_generateType.wudichongci },
    {enemyID:2, planeImage: "enemyPlane2", blood: 4, shootingSpeed: 3, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:0.10,fallingObject:_generateType.xinjiaxue },
    {enemyID:3, planeImage: "enemyPlane3", blood: 4, shootingSpeed: 2, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:0.10,fallingObject:_generateType.jisushesu },
    {enemyID:4, planeImage: "enemyPlane4", blood: 4, shootingSpeed: 2, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:0.10,fallingObject:_generateType.huojianpao },

];

var _stage = [
    [
        {enemyID:0},{enemyID:4}
    ],
    [
        {enemyID:2},{enemyID:3},{enemyID:1}
    ]
];

export const generateType = _generateType;
export const bulletType = _bulletType;
export const enemyPlaneData = _enemyPlaneData;
export const stageData = _stage;