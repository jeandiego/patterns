/* eslint-disable @typescript-eslint/no-explicit-any */
type KeyValue = {
  key: string
  value: unknown
}

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Array<infer U>
    ?
        | `${K}.[${Extract<keyof U, string>}=${string}].${PathImpl<U, keyof U>}`
        | `${K}.[${Extract<keyof U, string>}=${string}]`
        | K
    : T[K] extends Record<string, unknown>
      ? `${K}.${PathImpl<T[K], keyof T[K]>}` | K
      : K
  : never

type Path<T> =
  T extends Array<infer U>
    ? `[${Extract<keyof U, string>}=${string}].${PathImpl<U, keyof U>}` | `[${Extract<keyof U, string>}=${string}]`
    : PathImpl<T, keyof T>

type ExtractArrayType<T> = T extends Array<infer U> ? U : never

type ResolvePath<T, P extends string> = P extends `[${infer _FilterKey}=${infer _FilterValue}].${infer Rest}`
  ? T extends Array<infer U>
    ? ResolvePath<U, Rest>
    : never
  : P extends `[${infer _FilterKey}=${infer _FilterValue}]`
    ? T extends Array<infer U>
      ? U
      : never
    : P extends `${infer K}.[${infer _FilterKey}=${infer _FilterValue}].${infer Rest}`
      ? K extends keyof T
        ? T[K] extends Array<infer U>
          ? ResolvePath<U, Rest>
          : never
        : never
      : P extends `${infer K}.[${infer _FilterKey}=${infer _FilterValue}]`
        ? K extends keyof T
          ? ExtractArrayType<T[K]>
          : never
        : P extends `${infer K}.${infer Rest}`
          ? K extends keyof T
            ? ResolvePath<T[K], Rest>
            : never
          : P extends keyof T
            ? T[P]
            : never

function pathToKeyValue(path: string): KeyValue | undefined {
  const matches = RegExp(/\[(.{1,100})=(.{1,100})\]/).exec(path)
  if (matches) return { key: matches[1]!, value: matches[2] }
  return undefined
}

export function resolvePathWithQuery<T, P extends Path<T>>(obj: T, path: P): ResolvePath<T, P> {
  return String(path)
    .split('.')
    .reduce((accumulator: any, key) => {
      const keyValuePath = pathToKeyValue(key)
      if (keyValuePath && Array.isArray(accumulator)) {
        return accumulator.find((p: any) => String(p[keyValuePath.key]) === keyValuePath.value)
      }
      return accumulator?.[key]
    }, obj) as ResolvePath<T, P>
}
