export const pricewithDiscount = (price, dis = 1) =>{
    const discontAmount = Math.ceil((Number(price) * (dis)) / 100);

    const actualPrice = Number(price) - Number(discontAmount)

    return actualPrice
}