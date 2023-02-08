/* 将WGS-84坐标系转换到Web墨卡托坐标  主要用于将坐标单位为度的值转为单位为米的值 */
// lon 经度   lat 纬度
function lonLat2Mercator(lon, lat) {
  var x = lon * 20037508.34 / 180
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / Math.PI * 20037508.34
  y = Math.max(-20037508.34, Math.min(y, 20037508.34))
  return { 'x': x, 'y': y }
}

export {
  lonLat2Mercator
}