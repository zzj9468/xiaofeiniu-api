SET NAMES UTF8;
DROP DATABASE IF EXISTS xiaofeiniu ;
CREATE DATABASE xiaofeiniu CHARSET=UTF8;
USE xiaofeiniu;
CREATE TABLE xfn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(32),
    apwd VARCHAR(64)
);
INSERT INTO xfn_admin VALUES
(NULL, 'lala', '123456'),
(NULL, 'jing', '123456'),
(NULL, 'ran', '123456'),
(NULL, 'dingding', '123456'),
(NULL, 'dangdang', '123456'),
(NULL, 'doudou', '123456'),
(NULL, 'yaya', '123456');


CREATE TABLE xfn_settings(
    sid INT PRIMARY KEY  AUTO_INCREMENT,
    appname VARCHAR(32),
    apiUrl VARCHAR(64),
    adminUrl VARCHAR(64),
    appUrl VARCHAR(64),
    icp VARCHAR(64),
    copyright VARCHAR(128)
);
INSERT INTO xfn_settings VALUES(
    NULL,'小肥牛','http://127.0.0.1:8090','http://127.0.0.1:8091','http://127.0.0.1:8092','京ICP备12003709号-3','Copyright © 2002-2019 北京达内金桥科技有限公司版权所有'
)
CREATE TABLE xfn_table(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    tname VARCHAR(32),
    type VARCHAR(16),
    status INT
);


CREATE TABLE xfn_reservation(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    contactName VARCHAR(64),
    phone VARCHAR(16),
    contactTime BIGINT,
    dinnertime BIGINT
);
CREATE TABLE xfn_category(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(32)
);
CREATE TABLE xfn_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    titile VARCHAR(32),
    imgUrl VARCHAR(128),
    price DECIMAL(6,2),
    detail VARCHAR(128),
    category INT
);
CREATE TABLE xfn_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    startTime BIGINT,
    endTime BIGINT,
    customerCount INT,
    tableId INT
);
CREATE TABLE xfn_order_detail(
    did INT PRIMARY KEY AUTO_INCREMENT,
    dishId INT,
    dishCount INT,
    customerName VARCHAR(64),
    orderId INT
)