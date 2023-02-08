import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {addBaseLayer,changeLayer} from'./src/Layers/Layers'
import { CENTER, PROJECTION } from './src/Config/Map_conffig';
import './src/Layers/boundary_Layer'
var LayerArr = addBaseLayer()
const map = new Map({
  target: 'map',
  layers: [LayerArr[0],LayerArr[3]],
  view: new View({
    projection: PROJECTION,
    center: CENTER,
    maxZoom: 16,
    minZoom: 2,
    zoom: 6
  })
});


//监听底图切换按钮点击事件
$(".baselayer").on("click",function(){
  var index= $(this).attr("id");
  //根据索引切换底图
  changeLayer(index,LayerArr);
})
export{
  map
}
