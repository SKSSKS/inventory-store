'use client'
import { Provider } from "react-redux";
import { AppStore } from "@/components/AppStore";
import { configureStore } from "@reduxjs/toolkit";
import { storeReducer } from "@/reducer/storeReduce";

const makeStore = () => {
  return configureStore({
    reducer: {
      storeData: storeReducer,
    }
  })
}

export default function Home() {
  return (
    <Provider store={makeStore()}>
      <AppStore/>
    </Provider>
  );
}
