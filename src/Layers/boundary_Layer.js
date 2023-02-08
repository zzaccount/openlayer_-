import Stroke from "ol/style/Stroke"
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/vector";
import Style from "ol/style/Style";
import { map } from "../../main";
import { lonLat2Mercator } from "../utils/Tf_coordinate"

//定义坐标数组
var finaldots = new Array()
$.getJSON("./src/Config/data.json", function (data) {
  var boundary = data[0].boundary
  var result = boundary.split(",")
  for (var i = 0; i < result.length; i++) {
    var dot = result[i].split(" ")
    var mktdot = lonLat2Mercator(parseFloat(dot[0]), parseFloat(dot[1]))

    //将坐标存入结果数组
    finaldots.push([mktdot.x, mktdot.y])
  }


  var styles = [
    new Style({
      //边界线颜色
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      })
    })
  ]

  var geojsonObject = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [finaldots]
      }
    }]
  }

  /* 实例化一个矢量图层Vector作为绘制图层 */

  var source = new VectorSource({
    features: (new GeoJSON()).readFeatures(geojsonObject)
  })

  /* 创建一个图层 */
  var boundaryVectorLayer = new VectorLayer({
    source: source,
    style: styles
  })
  map.addLayer(boundaryVectorLayer)

})
