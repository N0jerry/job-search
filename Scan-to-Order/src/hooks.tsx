import { useCallback, useEffect, useMemo, useState } from "react";

export function useInput(init:string = '') {//=意为默认为空字符串
    var [value, setValue] = useState(init)
    var onChange = useCallback(function (e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)

    },[])
    return {
        value,
        onChange,
    }
}
//深色模式
export function useDarkMode() {
    var [isDark, setIsDark] = useState(localStorage.isDark ? true : false)
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
            document.documentElement.setAttribute('data-prefers-color-scheme', 'dark')
            localStorage.isDark = 'true'
        } else {
            // document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('dark');//删除dark
            document.documentElement.removeAttribute('data-prefers-color-scheme')
            localStorage.isDark = ''
        }
    }, [isDark])
    const toggle = useCallback(() => {
        setIsDark(it => !it)
    },[])
    const el = useMemo(() => {
        return <span>
            <input type="checkbox" checked={isDark} onChange={toggle} />
            深色模式
        </span>
    },[isDark])
    return [isDark, toggle, el] as const//元组：[string, number] 表示第一个元素必须是字符串，第二个必须是数字，且只能有两个元素

}