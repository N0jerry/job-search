import { atom } from 'jotai';
import type { DeskInfo, UserInfo } from './type';
var cookie = document.cookie

export var isLoginAtom = atom(cookie.includes('userid'))//原子化的状态单元,所有模块共享这个状态
//只要cookie.includes('userid')不为空就一直保持登录状态
export var userInfoAtom = atom <null | UserInfo>(null) 
export var deskInfoAtom = atom<DeskInfo | null>(null)