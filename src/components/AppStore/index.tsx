import { Card } from "@/components/Card";
import styles from "./style.module.css";
import { Actions } from "@/components/Actions";
import { EditProductModal } from "@/components/EditProduct";
import { ProductTableRow } from "@/components/ProductTableRow";
import { SwitchUser } from "@/components/SwitchUser";
import { useEffect, useRef, useState } from "react";
import { getProductsData, Product, tableHeaderList, URL } from "@/utils/utilsFunctionAndConst";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PRODUCT, DISABLE_PRODUCT, INITIALIZE_STORE, UPDATE_PRODUCT } from "@/reducer/storeReduce";

export const AppStore = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(true);
  const productDataRef = useRef<any>(null);

  const dispatch = useDispatch();
  const storeData = useSelector((state: any) => state?.storeData);

  useEffect(() => {
    fetch(URL).then(res => res.json()).then(resData => {
      dispatch({
        type: INITIALIZE_STORE,
        initialStoreData: resData
      })
    })
  }, [])

  const handleEditProduct = (productData: any) => {
    productDataRef.current = productData;
    setIsEditModal( isEnabled => !isEnabled);
  }

  const handleRemoveProduct = (productId: number) => { 
    dispatch({
      type: DELETE_PRODUCT,
      id: productId
    })
  }

  const handleDisableProduct = (productId: number) => {
    dispatch({
      type: DISABLE_PRODUCT,
      id: productId
    });
  }

  const handleUpdateStore = (product: Product) => {
    dispatch({
      product,
      type: UPDATE_PRODUCT,
    })
    setIsEditModal(false)
  }


  const productData = getProductsData(storeData);
  const cardDetails = [
    {
      title: "Total Product",
      iconPath: "/cart-24.png",
      value: productData?.totalProductCount,
    },
    {
      title: "Total store value",
      value: productData?.totalStoreValue,
      iconPath: "/dollar-sign-50.png"
    },
    {
      title: "Out of stocks",
      iconPath: "/cart-24.png",
      value: productData?.outOfStockProduct,
    },
    {
      title: "Number of Category",
      iconPath: "/categories-50.png",
      value: productData?.categories?.length,
    }
  ]

  return (
    <div className = {styles.page} >
      <header className={styles.header}>
        <SwitchUser isAdminUser={isAdminUser} setIsAdminUser={setIsAdminUser}/>
      </header>
      <h2 className={styles.title}>Inventory stats</h2>
      <div className={styles.cardWrp}>
        {
          cardDetails?.map(card => (
            <Card
              key={card?.title}
              title={card?.title}
              value={card?.value}
              iconPath={card.iconPath}
            />
          ))
        }
      </div>
      <div>
        <ul className={styles.table}>
          <li className={styles.tableRow}>
            {
              tableHeaderList?.map((tableHeaderName: string) => (
                <span className={styles.tableColumn} key={tableHeaderName}>
                  <span key={tableHeaderName} className={styles.tableHeaderValue}>{tableHeaderName}</span>
                </span>
              ))
            }
          </li>
          {
            storeData?.length === 0 && (
              <li className={`${styles.tableRow} ${styles.noProduct}`}>
                There is no product in the store. 
              </li>
            )
          }
          {
            storeData?.map((productData: Product, idx: number) => (
              <li key={idx} className={`${styles.tableRow} ${productData?.isDisabled ? styles.disabled : ""}`}>
                <ProductTableRow {...productData}/>
                <span className={styles.tableColumn}>
                  <Actions
                    isAdminUser={isAdminUser}
                    isDisabledProduct={!!productData?.isDisabled}
                    onEdit={() => handleEditProduct({...productData, id: idx})}
                    onDelete={() => handleRemoveProduct(idx)}
                    onDisable={() => handleDisableProduct(idx)}
                  />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
      {
        isEditModal && (
          <EditProductModal
            onSave={handleUpdateStore}
            onCancel={() => setIsEditModal(false)}
            {...productDataRef.current}
          />
        )
      }
    </div >
  )
}
