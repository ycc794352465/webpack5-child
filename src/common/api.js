import { post, get } from './request.js'

export function getShopList(data) {
    return get('/static/data.json', data)
}

export function recommendCommodity(data) {
    return post('/api/individualization/recommend/recommendCommodity', data)
}