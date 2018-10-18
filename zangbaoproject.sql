/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : zangbaoproject

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-10-18 11:16:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `marketPrice` float DEFAULT NULL,
  `price` float NOT NULL,
  `shopCount` int(11) NOT NULL,
  `imgs` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '白唇鹿露酒 配制酒 藏酒 500ml', '298', '288', '100', 'imgs/shop/224_05317023035375426_1280.jpg,imgs/shop/224_05317030536841903_1280.jpg,imgs/shop/224_05317030715519015_1280.jpg');
INSERT INTO `shop` VALUES ('2', '藏家糖奇可安达袋装', '72', '55', '100', 'imgs/shop/225_05317050211236206_1280.jpg,imgs/shop/225_05317050211236206_1280.jpg');
INSERT INTO `shop` VALUES ('3', '风干牦牛肉', '125', '100', '100', 'imgs/shop/384_05836063971400283_1280.jpg,imgs/shop/384_05372994323787984_1280.jpg,imgs/shop/384_05372996733798322_1280.jpg');
INSERT INTO `shop` VALUES ('4', '风干牦牛肉', '55', '35', '100', 'imgs/shop/68_05581831309527025_1280.jpg,imgs/shop/68_05581832428908120_1280.jpg,imgs/shop/68_05581832497344769_1280.jpg,imgs/shop/68_05581832468434849_1280.jpg,imgs/shop/68_05581832532025829_1280.jpg');
INSERT INTO `shop` VALUES ('5', '黑木耳', '88', '60', '100', 'imgs/shop/1_05203815746471773_1280.jpg,imgs/shop/1_05203815959307662_1280.jpg,imgs/shop/1_05203815981278796_1280.jpg,imgs/shop/1_05203816000083257_1280.jpg');
INSERT INTO `shop` VALUES ('6', '山野菜（蕨菜）', '32', '25', '100', 'imgs/shop-list-img6.jpg,imgs/shop/1_05203829973801477_1280.jpg,imgs/shop/1_05203829991895823_1280.jpg,imgs/shop/1_05203830008412257_1280.jpg');
INSERT INTO `shop` VALUES ('7', '六字真言礼品小（未包装）', '55', '15', '100', 'imgs/shop/358_05351163362297069_240.jpg');
INSERT INTO `shop` VALUES ('8', '藏传祛痘面膜', '230', '168', '100', 'imgs/shop/506_05533632499259332_240.jpg');
INSERT INTO `shop` VALUES ('9', '藏文字帖', '25', '15', '100', 'imgs/shop/1_05360886263560707_240.jpg');
INSERT INTO `shop` VALUES ('10', '安多手撕牦牛100g', '59', '46', '100', 'imgs/shop/1_05127408204964274_240.jpg');
INSERT INTO `shop` VALUES ('11', '安多牦牛杂割旅行装肉100g', '45', '18', '100', 'imgs/shop/1_05248284347410259_240.jpg');
INSERT INTO `shop` VALUES ('12', '安多牦牛杂割家庭装100g', '39', '22', '100', 'imgs/shop/1_05248283704621534_240.jpg');
INSERT INTO `shop` VALUES ('13', '绿松石手链', '52', '38', '100', 'imgs/shop/306_05343358555857071_240.jpg');
INSERT INTO `shop` VALUES ('14', '编绳12小合金诃子吊坠', '288', '198', '100', 'imgs/shop/488_05513156587845790_240.jpg');
INSERT INTO `shop` VALUES ('15', '多宝手链/只 98', '120', '98', '100', 'imgs/shop/306_05424731490923502_240.jpg');
INSERT INTO `shop` VALUES ('16', '美国STETSON 牛仔帽子.ཨ་མི་རི་ཁའི་༼   སི་ཊི་ཞོན་༽  ཞྭ་མོ', '1000', '900', '100', 'imgs/shop/1_05203816465432926_240.jpg');
INSERT INTO `shop` VALUES ('17', '歌杰毡帽  女款 礼帽 红色 11x17x38cm 女款', '699', '499', '100', 'imgs/shop/1_05203831293650056_240.jpg');
INSERT INTO `shop` VALUES ('18', '美国STETSON 牛仔帽子.ཨ་མི་རི་ཁའི་༼   སི་ཊི་ཞོན་༽  ཞྭ་མོ', '1100', '990', '100', 'imgs/shop/1_05203842039476467_240.jpg');
INSERT INTO `shop` VALUES ('19', '转经筒', '380', '320', '100', 'imgs/shop/397_05423917885227390_240.jpg');
INSERT INTO `shop` VALUES ('20', '蕨麻（250g）', '55', '35', '100', 'imgs/shop/397_05423908573181477_240.jpg');
INSERT INTO `shop` VALUES ('21', '香菇 2袋', '35', '20', '100', 'imgs/shop/395_05410124372367630_240.jpg');
INSERT INTO `shop` VALUES ('22', '六字真言（车内挂件）', '159', '90', '100', 'imgs/shop/410_05410916396742838_240.jpg');
INSERT INTO `shop` VALUES ('23', '松茸50g', '108', '90', '100', 'imgs/shop/306_05343395083279725_240.jpg');
INSERT INTO `shop` VALUES ('24', '觉乃小杂粮/（玉米面) 3斤', '38', '27', '100', 'imgs/shop/395_05410129535267323_240.jpg');

-- ----------------------------
-- Table structure for shop2
-- ----------------------------
DROP TABLE IF EXISTS `shop2`;
CREATE TABLE `shop2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(255) NOT NULL,
  `marketPrice` float NOT NULL,
  `price` float NOT NULL,
  `count` int(11) NOT NULL,
  `imgs` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shop2
-- ----------------------------
INSERT INTO `shop2` VALUES ('2', '?????????', '72', '55', '100', 'imgs/shop-list-img2.jpg');
INSERT INTO `shop2` VALUES ('3', '?????', '125', '100', '100', 'imgs/shop-list-img3.jpg');
INSERT INTO `shop2` VALUES ('4', '?????', '55', '35', '100', 'imgs/shop-list-img4.jpg');
INSERT INTO `shop2` VALUES ('5', '???', '88', '60', '100', 'imgs/shop-list-img5.jpg');
INSERT INTO `shop2` VALUES ('6', '???????', '32', '25', '100', 'imgs/shop-list-img6.jpg');
INSERT INTO `shop2` VALUES ('7', '????????????', '55', '15', '100', 'imgs/shop/358_05351163362297069_240.jpg');
INSERT INTO `shop2` VALUES ('8', '??????', '230', '168', '100', 'imgs/shop/506_05533632499259332_240.jpg');
INSERT INTO `shop2` VALUES ('9', '????', '25', '15', '100', 'imgs/shop/1_05360886263560707_240.jpg');
INSERT INTO `shop2` VALUES ('10', '??????100g', '59', '46', '100', 'imgs/shop/1_05127408204964274_240.jpg');
INSERT INTO `shop2` VALUES ('11', '??????????100g', '45', '18', '100', 'imgs/shop/1_05248284347410259_240.jpg');
INSERT INTO `shop2` VALUES ('12', '?????????100g', '39', '22', '100', 'imgs/shop/1_05248283704621534_240.jpg');
INSERT INTO `shop2` VALUES ('13', '?????', '52', '38', '100', 'imgs/shop/306_05343358555857071_240.jpg');
INSERT INTO `shop2` VALUES ('14', '??12???????', '288', '198', '100', 'imgs/shop/488_05513156587845790_240.jpg');
INSERT INTO `shop2` VALUES ('15', '????/? 98', '120', '98', '100', 'imgs/shop/306_05424731490923502_240.jpg');
INSERT INTO `shop2` VALUES ('16', '??STETSON ????.?????????????   ???????????  ?????', '1000', '900', '100', 'imgs/shop/1_05203816465432926_240.jpg');
INSERT INTO `shop2` VALUES ('17', '????  ?? ?? ?? 11x17x38cm ??', '699', '499', '100', 'imgs/shop/1_05203831293650056_240.jpg');
INSERT INTO `shop2` VALUES ('18', '??STETSON ????.?????????????   ???????????  ?????', '1100', '990', '100', 'imgs/shop/1_05203842039476467_240.jpg');
INSERT INTO `shop2` VALUES ('19', '???', '380', '320', '100', 'imgs/shop/397_05423917885227390_240.jpg');
INSERT INTO `shop2` VALUES ('20', '???250g?', '55', '35', '100', 'imgs/shop/397_05423908573181477_240.jpg');
INSERT INTO `shop2` VALUES ('21', '?? 2?', '35', '20', '100', 'imgs/shop/395_05410124372367630_240.jpg');
INSERT INTO `shop2` VALUES ('22', '??????????', '159', '90', '100', 'imgs/shop/410_05410916396742838_240.jpg');
INSERT INTO `shop2` VALUES ('23', '??50g', '108', '90', '100', 'imgs/shop/306_05343395083279725_240.jpg');
INSERT INTO `shop2` VALUES ('24', '?????/????) 3?', '38', '27', '100', 'imgs/shop/395_05410129535267323_240.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `shopCar` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('9', 'nihao', 'e10adc3949ba59abbe56e057f20f883e', 'bi9j4saup85a3fwfr2iu', '');
INSERT INTO `user` VALUES ('10', 'hello', '4297f44b13955235245b2497399d7a93', '', '[{\"id\":\"1\",\"count\":3}]');
INSERT INTO `user` VALUES ('11', '1234567', 'd54d1702ad0f8326224b817c796763c9', 'lza42nc72eiy7efp041g', '');
INSERT INTO `user` VALUES ('12', 'kkkkkk', 'e10adc3949ba59abbe56e057f20f883e', 'hlcs3tct5fgsw4mj3aj2', '');
INSERT INTO `user` VALUES ('13', 'woshishui', '4297f44b13955235245b2497399d7a93', '', '');
INSERT INTO `user` VALUES ('14', 'nishishui', '4297f44b13955235245b2497399d7a93', '', '');
INSERT INTO `user` VALUES ('15', 'jquery', 'e10adc3949ba59abbe56e057f20f883e', '', '');
INSERT INTO `user` VALUES ('16', 'pagege', 'e10adc3949ba59abbe56e057f20f883e', 'nse9sb0uq1aidov569aa', '[{\"id\":1,\"count\":16},{\"id\":\"5\",\"count\":2},{\"id\":\"4\",\"count\":4}]');
INSERT INTO `user` VALUES ('17', '123456', 'e10adc3949ba59abbe56e057f20f883e', 'ctcd7xygkgb6fqitoyuh', '');
INSERT INTO `user` VALUES ('18', 'renlei', 'e10adc3949ba59abbe56e057f20f883e', 'v29or7ahfg1tzv4mrh0j', '');
INSERT INTO `user` VALUES ('19', '你好啊', 'e10adc3949ba59abbe56e057f20f883e', '', '[{\"id\":\"1\",\"count\":1},{\"id\":\"5\",\"count\":1},{\"id\":\"3\",\"count\":1},{\"id\":\"2\",\"count\":1}]');
INSERT INTO `user` VALUES ('20', '磁通量', 'c9c808c5d4597f0386ef3df7eaf13e04', '', '[{\"id\":\"1\",\"count\":1},{\"id\":\"4\",\"count\":1}]');
INSERT INTO `user` VALUES ('21', '撒大帝', 'f30aa7a662c728b7407c54ae6bfd27d1', '', '[{\"id\":\"1\",\"count\":2},{\"id\":\"6\",\"count\":1}]');
