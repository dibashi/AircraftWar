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

var _dropJinBiCount = 1;//默认一个金币加1数值
var _jinBiCount = 100;//默认金币数
//激素提速多少速度 不在提速 而是数值上直接加上去 以前的实现到最后会逼近无穷
var _jiSuTiSu = 0.2;

//激素与无敌的持续时间
var _jiSuTime = 8;
var _wuDiTime = 8;

//bullet type 0:机炮 1:火炮
//gid从1开始
var _enemyPlaneData = [
    {enemyID:0, planeImage: "enemyPlane0", blood: 3, shootingSpeed: 1, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:0.65,fallingObject:_generateType.jinbi },
    {enemyID:1, planeImage: "enemyPlane1", blood: 4, shootingSpeed: 1, flyingSpeed: 3, bulletType: _bulletType.huopao, damage: 1,dropProbability:0.5,fallingObject:_generateType.wudichongci },
    {enemyID:2, planeImage: "enemyPlane2", blood: 4, shootingSpeed: 1, flyingSpeed: 4, bulletType: _bulletType.jipao, damage: 1,dropProbability:0.10,fallingObject:_generateType.xinjiaxue },
    {enemyID:3, planeImage: "enemyPlane3", blood: 4, shootingSpeed: 2, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:0.9,fallingObject:_generateType.jisushesu },
    {enemyID:4, planeImage: "enemyPlane4", blood: 4, shootingSpeed: 2, flyingSpeed: 4, bulletType: _bulletType.huopao, damage: 2,dropProbability:0.10,fallingObject:_generateType.huojianpao },

];

var _stage = [
    [
        {enemyID:1},{enemyID:1}
    ],
    [
        {enemyID:1},{enemyID:1},{enemyID:1}
    ],
    [
        {enemyID:1},{enemyID:1}
    ],
    [
        {enemyID:1},{enemyID:1},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:4},{enemyID:4},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:2},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:3},{enemyID:3}
    ],
    [
        {enemyID:4},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:3},{enemyID:1}
    ],
    [
        {enemyID:2},{enemyID:0},{enemyID:1}
    ],
    [
        {enemyID:0},{enemyID:3},{enemyID:1}
    ]
];

export const generateType = _generateType;
export const bulletType = _bulletType;
export const enemyPlaneData = _enemyPlaneData;
export const stageData = _stage;

export const dropJinBiCount = _dropJinBiCount;
export const jinBiCount = _jinBiCount;

export const jiSuTiSu = _jiSuTiSu;

export const jiSuTime = _jiSuTime;
export const wuDiTime = _wuDiTime;