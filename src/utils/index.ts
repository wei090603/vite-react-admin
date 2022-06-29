import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // 每次value 变化后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    // 每次在上一个effect处理完后执行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
