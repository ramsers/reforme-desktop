export type AsyncResource<T = any> = {
    hasFetched: boolean
    fetching: boolean
    data: T
}
