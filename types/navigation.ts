import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
// import type { StackNavigationProp } from '@react-navigation/stack';

// 1. 定义所有屏幕的名称和参数（如果有参数的话）
export type Category = {
  id: string;    // 对应 'c1'/'c2' 等字符串 ID
  title: string; // 对应 'Italian'/'Quick & Easy' 等分类名称
  color: string; // 对应 '#f5428d' 等十六进制颜色值
};

export type RootStackParamList = {
  MealsCategories: undefined; // 该页面无参数，用undefined
  MealsOverview: {
    categoryId?: Pick<Category,'id'>['id']
  }; // 示例：MealsOverview需要接收分类ID参数
  // 可以继续添加其他页面，比如 MealDetail: { mealId: string }
  MealDetail: {
    mealId?: Pick<Category,'id'>['id']
  }
};
// 定义当前组件的导航类型（指定要跳转到的页面）
// export type NavigationProp = StackNavigationProp<RootStackParamList, 'MealDetail'>;

// 2. 为每个页面导出对应的navigation类型
export type MealsCategoriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MealsCategories' // 指定当前页面的路由名称
>;

// 其他页面的类型（示例）
export type MealsOverviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MealsOverview'
>;
export type MealDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MealDetail'
>;
// 3. 定义导航器的类型（关键：专门给useNavigation用）
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

 
//Meal
export class Meal {
  id: string;
  categoryIds: string[];
  title: string;
  affordability: 'affordable' | 'pricey' | 'luxurious';
  complexity: 'simple' | 'challenging' | 'hard';
  imageUrl: string;
  duration: number;
  ingredients: string[];
  steps: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;

  constructor(
    id: string,
    categoryIds: string[],
    title: string,
    affordability: 'affordable' | 'pricey' | 'luxurious',
    complexity: 'simple' | 'challenging' | 'hard',
    imageUrl: string,
    duration: number,
    ingredients: string[],
    steps: string[],
    isGlutenFree: boolean,
    isVegan: boolean,
    isVegetarian: boolean,
    isLactoseFree: boolean
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.affordability = affordability;
    this.complexity = complexity;
    this.imageUrl = imageUrl;
    this.duration = duration;
    this.ingredients = ingredients;
    this.steps = steps;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}