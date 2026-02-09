import * as SQLite from "expo-sqlite";
import Place from "models/place";
import { PlaceDBRecord } from "type";

// 1. 同步打开/创建数据库（新版核心写法）
const database = SQLite.openDatabaseSync("places.db");

// 2. 初始化数据库（创建 places 表）
export const init = async () => {
  try {
    // 新版无需 transaction，直接用 execAsync 执行建表 SQL
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL -- 注意：这里删掉了多余的逗号，否则 SQL 会报错
      );
    `);
    console.log("数据库初始化成功，places 表创建完成");
  } catch (error) {
    console.error("数据库初始化失败：", error);
    throw error; // 抛出错误，方便上层组件捕获处理
  }
};

// 调用示例（在组件中使用）
// useEffect(() => {
//   init();
// }, []);

//插入新增数据
export const insertPlace = async (place: Place) => {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ],
    );
    console.log("数据插入成功");
    return result;
  } catch (error) {
    console.error("插入数据失败：", error);
    throw error; // 抛出异常，让外部捕获
  }
};
//查询

export const fetchPlaces = async () => {
  try {
    // 关键修改：runAsync → getAllAsync（查询多条数据）
    const rows =
      await database.getAllAsync<PlaceDBRecord>(`SELECT * FROM places`);

    // 转换为 Place 实例数组
    const places: Place[] = [];
    for (const dp of rows) {
      places.push(
        new Place(
          dp.title,
          dp.imageUri,
          {
            address: dp.address,
            lat: dp.lat,
            lng: dp.lng,
          },
          dp.id, // 注意：数据库返回的 id 是数字类型，需匹配 Place 类的 id 类型
        ),
      );
    }

    console.log("查询到地点数据：", places);
    return places; // 必须返回结果，外部才能接收
  } catch (error) {
    console.error("查询地点失败：", error);
    throw error; // 抛出异常，让外部捕获
  }
};

//查询特定id

export const fetchPlaceDetails = async (id: number) => { // 关键：id 改为 number 类型
  try {
    // 关键：getAllAsync → getFirstAsync（查询单条数据）
    const placeRecord = await database.getFirstAsync<PlaceDBRecord>(
      `SELECT * FROM places WHERE id = ?`,
      [id] // 此时 id 是数字，和数据库 INTEGER 类型匹配
    );


    // 处理“未找到数据”的情况
    if (!placeRecord) {
      console.warn(`未找到 ID 为 ${id} 的地点`);
      return null;
    }
    const place = new Place(
        placeRecord.title,
        placeRecord.imageUri,
        {lat: placeRecord.lat, lng: placeRecord.lng, address: placeRecord.address},
        placeRecord.id//数据类型
    )

    console.log('查询到地点详情：', placeRecord);
    return place;
  } catch (error) {
    console.error('查询地点详情失败：', error);
    throw error; // 抛出异常，让外部捕获处理
  }
};