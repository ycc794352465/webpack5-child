import { post, get } from './request.js'

export function getShopList(data) {
    return get('/static/data.json', data)
}