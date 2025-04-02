export const DisplayPriceInRupees = (price) => {
  // Convert the price to Indian Rupees
  return new Intl.NumberFormat('en-IN',{
    style : "currency",
    currency : 'INR'
  }).format(price)
}