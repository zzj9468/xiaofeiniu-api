SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;
/*管理员*/
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT, 
    aname VARCHAR(32),              
    apwd VARCHAR(64)                
);
INSERT INTO xfn_admin VALUES
(NULL, 'admin', PASSWORD('123456')),
(NULL, 'boss', PASSWORD('123456'));
/*设置表*/
CREATE TABLE xfn_settings(
    sid INT PRIMARY KEY  AUTO_INCREMENT,
    appname VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(128)
);
INSERT INTO xfn_settings VALUES
    (NULL,'小肥牛','http://127.0.0.1:8090','http://127.0.0.1:8091','http://127.0.0.1:8092','京ICP备12003709号-3','Copyright © 2002-2019 北京达内金桥科技有限公司版权所有');

/*桌台表*/
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(32),
    type VARCHAR(16),
    status INT
);
INSERT into xfn_table VALUES
    (NULL,'福满堂','4-6人桌',0),
    (NULL,'金镶玉','4人桌',0),
    (NULL,'寿天齐','10人桌',0),
    (NULL,'全家福','2人桌',0);
/*预定信息表*/
CREATE TABLE xfn_reservation(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    contactName VARCHAR(64),
    phone VARCHAR(16),
    contactTime BIGINT,
    dinnertime BIGINT,
    tableId INT,
    FOREIGN key(tableId) REFERENCES xfn_table(tid)
);
INSERT INTO xfn_reservation VALUES
    (NULL,'丁丁','13563259862',1548404864104,154841040000,1),
    (NULL,'丫丫','13501234560',1548404864104,154841040000,2),
    (NULL,'铛铛','13501234568',1548404864104,154841040000,3);

/*菜品类别表*/
CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);
INSERT INTO xfn_category VALUES
    (NULL,'蔬菜豆制品'),
    (NULL,'海鲜河鲜'),
    (NULL,'丸滑类'),
    (NULL,'肉类'),
    (NULL,'菌菇类');

/*菜品详情*/
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    titile VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    categoryId INT,
    FOREIGN KEY(categoryId) REFERENCES xfn_category(cid)
);
INSERT INTO xfn_dish VALUES
    (100000,'包心生菜','c1.jpg',12,'经过挑选、清洗、装盘而成。口感清香，锅开后再煮1分钟左右即可食用',1),
    (NULL,'蒿子秆（皇帝菜）','c2.jpg',12,'经过挑选、清洗、切配、装盘而成，锅开后再煮1分钟左右即可食用',1),
    (NULL,'竹笋','c3.jpg',12,'竹笋清洗后对剖切开，装盘，口感脆爽，锅开后再煮4分钟左右即可食用',1),
    (NULL,'土豆','c4.jpg',12,'经过去泥、挑选、去皮、清洗、切配、装盘而成。锅开后再煮4分钟左右即可食用',1),
    (NULL,'山药','c5.jpg',12,'经过去泥、挑选、去皮、清洗、切配、装盘而成。锅开后再煮3分钟左右即可食用',1),
    (NULL,'冬瓜','c6.jpg',12,'经过去泥、挑选、去皮、清洗、切配、装盘而成。锅开后再煮1分钟即可食用，不宜久煮，否则会煮溶',1),
    (NULL,'白萝卜','c7.jpg',12,'经过去泥、挑选、去皮、清洗、切配、装盘而成。锅开后再煮3分钟左右即可食用',1),
    (NULL,'红薯','c8.jpg',12,'经过去泥、挑选、去皮、清洗、切配、装盘而成。口感香甜，锅开后再煮4分钟左右即可食用',1),
    (NULL,'海带','c9.jpg',12,'经过浸泡、挑选、清洗、切配、装盘而成。锅开后再煮3分钟左右即可食用',1),
    (NULL,'白菜','c10.jpg',12,'经过挑选、清洗、切配、装盘而成，锅开后再煮2分钟左右即可食用',1),
    (NULL,'大白菜','c11.jpg',12,'经过挑选、清洗、切配、装盘而成，锅开后再煮2分钟左右即可食用',1),
    (NULL,'小白菜','c12.jpg',12,'经过挑选、清洗、切配、装盘而成。锅开后再煮2分钟左右即可食用',1),
    (NULL,'香菜','c13.jpg',12,'是云南特色产品，装盘上桌即可。锅开后再煮2-3分钟左右即可食用',1),
    (NULL,'茼蒿/蓬蒿菜','c14.jpg',12,'经过挑选、清洗、装盘而成。锅开后再煮1分钟左右即可食用 ',1),
    (NULL,'薄荷','c15.jpg',12,'薄荷，土名叫“银丹草”，为唇形科植物，门店经过清洗后装盘上桌。锅开后再煮1-2分钟左右即可食用',1),
    (NULL,'丝瓜','c16.jpg',12,'丝瓜清洗、去外皮后，切段摆盘而成。锅开后再煮3分钟左右即可使用',1),
    (NULL,'娃娃菜','c17.jpg',12,'通过挑选、清洗、切配、装盘而成，易吸收锅底汤汁，锅开后再煮2分钟左右即可食用',1),
    (NULL,'菠菜','c18.jpg',12,'经过挑选、清洗、切配、装盘而成。锅开后再煮1分钟左右即可食用',1),
    (NULL,'豆苗','c19.jpg',12,'经过挑选、清洗、装盘而成。口感较脆，锅开后再煮1分钟左右即可食用',1),
    (NULL,'油麦菜','c20.jpg',12,'经过挑选、清洗、切配、装盘而成。叶嫩杆脆，锅开后再煮1分钟左右即可食用',1),
    (NULL,'芦笋','c21.jpg',12,'芦笋清新爽口、味道独特，锅开后煮4分钟即可食用',1),
    (NULL,'豌豆尖','c22.jpg',12,'经过挑选、清洗、装盘而成。茎叶柔嫩，味美可口，锅开后再煮30秒左右即可食用',1),
    (NULL,'散叶生菜','c23.jpg',12,'经过挑选、清洗、装盘而成。口感鲜嫩，锅开后再煮1分钟左右即可食用',1),
    (NULL,'莴笋尖/凤尾','c24.jpg',12,'经过挑选、清洗、切配、装盘而成。锅开后再煮2分钟即可食用。',1),
    (NULL,'油豆腐皮','c25.jpg',12,'切段、装盘，锅开后涮30秒左右即可食用',1),
    (NULL,'炸豆衣','c26.jpg',12,'鲜豆皮酿制，豆香味浓郁，锅开后涮30秒左右即可食用。',1),
    (NULL,'青笋','c27.jpg',12,'经过挑选、清洗、切配、装盘而成。锅开后涮30秒即可食用',1),
    (NULL,'手切笋','c28.jpg',12,'来自福建、安徽、湖北等地大山深处的毛竹笋，具有质嫩、色白、清脆、味甜的特性，竹林都在海拔 300-500 米以上的高山上，没有工业化污染。',1),
    (NULL,'捞派豆花','c29.jpg',12,'采用优质大豆磨浆，经传统手工工艺压制而成。锅开后再煮5分钟左右即可食用。配上豆花蘸碟，口味更突出',1),
    (NULL,'蒿子秆（皇帝菜）','c30.jpg',23,'经过挑选、清洗、切配、装盘而成，锅开后再煮1分钟左右即可食用',1),


    (NULL,'冻虾','s1.jpg',23,'将活虾冷冻而成。肉质脆嫩，锅开后再煮4分钟左右即可食用。',2),
    (NULL,'鱼豆腐','s2.jpg',23,'选用优质鱼肉，配以佐料，搅打、蒸制而成。细嫩鲜滑，鱼香味浓。锅开后再煮2分钟左右即可食用。',2),
    (NULL,'活虾','s3.jpg',23,'选自广东湛江、北海区域南美白虾，清洗干净装盘，锅开后再煮2分钟左右即可食用。',2),
    (NULL,'青斑','s4.jpg',23,'经过宰杀、去内脏、清洗、装盘而成。锅开后鱼片煮1分钟左右，鱼头、鱼排煮4分钟即可食用。',2),
    (NULL,'花鲢鱼头','s5.jpg',23,'选鲜活花鲢鱼，取头冷鲜保存。锅开后再煮5分钟左右即可食用。',2),
    (NULL,'鱿鱼须','s6.jpg',23,'选用鱿鱼触角，速冻保鲜。锅开后再煮5分钟左右即可食用',2),
    (NULL,'大闸蟹','s7.jpg',23,'大闸蟹是一种经济蟹类，又称河蟹、毛蟹、清水蟹、大闸蟹或螃蟹，顾客可根据情况选择生、熟两种大闸蟹，生的大闸蟹，锅开后再煮8分钟左右即可食用',2),
    (NULL,'蛎蝗','s8.jpg',23,'经过宰杀、去内脏、清洗、装盘后上桌。锅开后再煮4-5分钟左右即可食用。',2),
    (NULL,'大淡菜','s9.jpg',23,'经过宰杀、去内脏、清洗、装盘而成。锅开后再煮4分钟左右即可食用。',2),
    (NULL,'北极贝','s10.jpg',23,'北极贝是源自北大西洋冰冷深海的一种贝类，肉质肥美，锅开后再煮4分钟左右即可食用',2),
    (NULL,'带鱼','s11.jpg',23,'带鱼又叫刀鱼、牙带鱼，其肉厚刺少，锅开后再煮5分钟左右即可食用',2),
    (NULL,'油蛤','s12.jpg',23,'经过宰杀、去内脏、清洗、装盘而成。锅开后再煮4分钟左右即可食用。',2),
    (NULL,'黑头鱼','s13.jpg',23,'锅开后再煮2分钟左右即可食用。',2),
    (NULL,'油条虾','s14.jpg',23,'油条炸制后，裹入虾滑而成。将油条的香味和虾滑的脆嫩结合在一起，锅开后再煮3分钟左右即可食用',2),
    (NULL,'深水虾','s15.jpg',23,'经过挑选、装盘而成。口感鲜嫩、食用方便，锅开后再煮2分钟左右即可食用。',2),
    (NULL,'蟹味棒','s16.jpg',23,'锅开后再煮2分钟左右即可食用。',2),
    (NULL,'美国红鱼(时价)','s17.jpg',23,'经过宰杀、去内脏、清洗、装盘后上桌。锅开后再煮4-5分钟左右即可食用。',2),
    (NULL,'鱿鱼','s18.jpg',23,'选自资质合格的厂家，经过速冻保鲜配送。锅开后再煮5分钟左右即可食用',2),
    (NULL,'生蚝','s19.jpg',23,'经过宰杀、去内脏、清洗、装盘而成。海鲜味浓郁，锅开后再煮1分钟左右即可食用。',2),
    (NULL,'扇贝','s20.jpg',23,'鲜活扇贝，餐前宰杀后上桌。锅开后再煮4分钟左右即可食用。',2),
    (NULL,'象拔蚌','s21.jpg',23,'产自广西北海的象拔蚌，宰杀后上桌。锅开后再煮4分钟左右即可食用。',2),
    (NULL,'捞派无刺巴沙鱼','s22.jpg',23,'巴沙鱼是东南亚淡水鱼品种。越南音译为"卡巴沙"(CABaSa)，意思是"三块脂肪鱼"，因为该鱼在生长过程中，腹腔积累有三块较大的油脂，约占体重的58%。 海底捞选用越南湄公河流域养殖的巴沙鱼。经工厂低温车间宰杀、快速去皮等工艺加工成鱼柳，包装速冻，再通过海底捞中央厨房加工腌制而成。巴沙鱼口味鲜嫩，且无刺无腥味，特别适合老人、小孩食用。',2),
    (NULL,'罗非鱼','s23.jpg',23,'来自海拔1500米的云南高原深水罗非鱼，沐浴北回归线上的阳光，肉质鲜美嫩滑，余味悠长',2),
    (NULL,'捞派鱼饼','s24.jpg',23,'采用鱼肉制作，适合老人、孩子、女士，配上海鲜汁，鲜味浓郁，煮4分钟左右即可食用。',2),
    (NULL,'草鱼头','s25.jpg',23,'精选鲜活草鱼，取头后冷鲜保存，锅开后再煮5分钟左右即可食用。',2),
    (NULL,'黑鱼片','s26.jpg',23,'鲜活黑鱼取鱼片，调味后摆盘上桌。锅开后再煮1分钟左右即可食用。',2),
    (NULL,'海鲜组合','s27.jpg',23,'由多种海鲜组合而成。下入锅中，开锅后再煮3分钟即可食用。',2),
    (NULL,'明虾','s28.jpg',23,'经过清洗、装盘而成。锅开后再煮2分钟左右即可食用。',2),

    (NULL,'明虾','s28.jpg',23,'经过清洗、装盘而成。锅开后再煮2分钟左右即可食用。',3);

/*订单*/
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT
);
INSERT INTO xfn_order VALUES
    (1,1548404864104,154841040000,3,1);

/*订单详情*/
CREATE TABLE xfn_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT, 
    dishId INT,                          /*菜品编号*/
    dishCount INT,                      /*份数*/
    customerName VARCHAR(64),           /*顾客名*/
    orderId INT,                        /*订单编号*/
    FOREIGN KEY(dishId) REFERENCES xfn_dish(did),
    FOREIGN KEY(orderId) REFERENCES xfn_order(oid)
);
INSERT INTO xfn_order_detail VALUES
    (NULL,100001,1,'丁丁',1)