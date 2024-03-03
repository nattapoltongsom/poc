export const StaticImplements = <T>() => {
    return <U extends T>(constructor: U) => {
        constructor
    }
}
