import { LocationType,LocationTypeAddress } from "type";

export default class Place {
  // 类属性类型声明,public、private（私有）、protected（受保护）
  public title: string;
  public imageUri: string; // 明确指定为字符串类型
  public address: string;
  public location: LocationTypeAddress; // 示例：位置坐标类型
  public id: number;

  constructor(
    title: string,
    imageUri: string,
    location: LocationTypeAddress,
    id?: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address!;
    this.location = {lat:location.lat, lng: location.lng,address:this.address};
    this.id = id!;
  }
}
