import Papa from "papaparse"

export async function fetchProduct() {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEtPhbKiD8v9FQfsV_KPEXmTi4zsAhvpKgqCEER2IoFxUVhNRwN_jHkNpRGoqzC9n9iXNQiq3OBSOM/pub?output=csv"
  )
  const text = await response.text()

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  })

  const cleaned = result.data
    .map((item) => ({
      ...item,
      name: item.name?.trim(),
      image: item.image?.trim(),
      price: parseInt(item.price?.trim())
    }))
    .filter((item) => item.name && item.price && !isNaN(item.price))

  return cleaned
}
