export const URL = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";
export const tableHeaderList = ["Name", "Category", "Price", "Quantity", "Value", "Action"];

export interface Product {
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  id?: number;
  isDisabled?: boolean;
}

export const getProductsData = (storeData: Product[]) => {
  let totalProductCount = 0;
  let totalStoreValue = 0;
  let outOfStockProduct = 0;
  const categories: string[] = [];

  storeData?.forEach((data: any) => {
    totalProductCount += data?.quantity;
    const totalPriceWithSignArr = data?.value?.split("$");
    if(totalPriceWithSignArr?.length > 1) {
      totalStoreValue += (+totalPriceWithSignArr[1]);
    } else {
      totalStoreValue += (+totalPriceWithSignArr[0]);
    }

    if(data?.quantity === 0) {
      outOfStockProduct += 1;
    }

    if(categories?.indexOf(data?.category) === -1) {
      categories.push(data?.category)
    }
  })

  return {
    totalStoreValue,
    totalProductCount,
    outOfStockProduct,
    categories,
  }
}