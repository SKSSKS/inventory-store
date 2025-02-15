import { Product } from "@/utils/utilsFunctionAndConst";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DISABLE_PRODUCT = "DISABLE_PRODUCT";
export const INITIALIZE_STORE = "INITIALIZE_STORE";

export const storeReducer = (state=[], action: any) => {
  switch (action.type) {
    case INITIALIZE_STORE:
      return action?.initialStoreData;
    case DELETE_PRODUCT:
      return state?.filter((_: Product, idx: number) => idx !== action?.id);
    case DISABLE_PRODUCT:
      const updatedStoreData = state?.map((productData: Product, idx: number) => {
        if (idx === action?.id) {
          return {...productData, isDisabled: !productData?.isDisabled}
        }
        return productData;
      })
      return updatedStoreData;
    case UPDATE_PRODUCT:
      const newStoreData = state?.map((data: Product, idx: number) => {
        if (idx === action?.product?.id) {
          return action?.product
        }
        return data;
      })
      return newStoreData;
    default:
      return state
  }
}
