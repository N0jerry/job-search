const GAODE_API_KEY = "448f58deb70f4d46b1a40fb9bdadb13f";

export default function getMapPreview(lng: number, lat: number) {
  const imagePreviewUrl = `https://restapi.amap.com/v3/staticmap?location=${lng},${lat}&zoom=15&size=500*500&markers=mid,,A:${lng},${lat}&key=${GAODE_API_KEY}`;
  console.log("静态地图URL：", imagePreviewUrl, lng, lat);
  return imagePreviewUrl;
}

export async function getAddress(lng: number, lat: number) {
  const url = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lat},${lng}&key=${GAODE_API_KEY}&radius=1000&extensions=base`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("请求地图失败");
  }
  // console.log(response)
  const data = await response.json(); //解析JSON响应体为JavaScript对象
  // console.log(data);
  const address = data.regeocode.formatted_address;
  console.log('f:' , address)
  return address;
}
//高德API返回的JSON数据
// const gaodeData = {
//   info: "OK",
//   infocode: "10000",
//   regeocode: {
//     addressComponent: {
//       adcode: [Array],
//       city: [Array],
//       citycode: [Array],
//       country: [Array],
//       district: [Array],
//       province: [Array],
//       streetNumber: [Object],
//       towncode: [Array],
//       township: [Array],
//     },
//     aois: [],
//     formatted_address: [],
//     pois: [],
//     roadinters: [],
//     roads: [],
//   },
//   status: "1",
// };

