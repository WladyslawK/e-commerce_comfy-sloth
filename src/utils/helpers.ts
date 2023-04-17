export const formatPrice = (price: number) => {
  const newNumber = new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: 'PLN',
  }).format(price/100)
  return newNumber
}

export const getUniqueValues = (data: any[], type: string) => {
  let unique = data.map(item => item[type])

  if(type === 'colors'){
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]

}
