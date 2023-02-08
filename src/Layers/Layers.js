//添加地图底图
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { map } from "../../main";
import { SECRET } from "../Config/Map_conffig";

//创建layer图层
function CreteTDTLayer(baseurl){
  var layer = new TileLayer({
    //设置图层透明度
    opacity:1, 
    source:new XYZ({
      url:baseurl
    })
  })
  return layer
}
/* 添加初始图层 */
function addBaseLayer() {
  //矢量图层
  var vecLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //影像图层
  var imgLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //地形图层
  var terLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //矢量注记图层
  var vecZjLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //影像注记图层
  var imgZjLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //地形注记图层
  var terZjLayer = CreteTDTLayer(`http://t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${SECRET}`);
  //图层组
  var LayerArr = [vecLayer, imgLayer, terLayer, vecZjLayer, imgZjLayer, terZjLayer];
  return LayerArr
}

/* 底图切换功能实现 */
function changeLayer(index,LayerArr){
  var layerIndex = parseFloat(index)  /* 解析字符串并返回浮点数  
  此函数确定指定字符串中的第一个字符是否为数字。如果是，它会解析字符串直到到达数字的末尾，并将数字作为数字而不是字符串返回。
  注意：只返回字符串中的第一个数字！ 如果第一个字符不能转换为数字，parseFloat() 返回 NaN。*/
  var group = map.getLayerGroup()
  group.values_.layers.array_[0] = LayerArr[layerIndex]
  group.values_.layers.array_[1] = LayerArr[layerIndex+3]

  /* 将图层重新设置到map */
  map.setLayerGroup(group)

  /* 刷新地图 (必要)*/
  map.renderSync()
}


export{
  addBaseLayer,
  changeLayer
}