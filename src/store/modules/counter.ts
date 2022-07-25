import { createSlice } from '@reduxjs/toolkit';

// initial state interface
// export interface InitialStateTypes {
//   loading: boolean;
//   visible: boolean;
//   isEditMode: boolean;
//   formValue: CustomerTypes;
//   customerList: CustomerTypes[];
//   fetchParams: ParamsTypes;
// }

// // initial state
// const initialState: InitialStateTypes = {
//   loading: false,
//   visible: false,
//   isEditMode: false,
//   formValue: {},
//   customerList: [],
//   fetchParams: {},
// };

// 创建一个slice
const customerSlice = createSlice({
  name: 'counter', // 命名空间
  initialState: {}, // 初始值
  // reducers中每一个方法都是action和reducer的结合，并集成了immer
  reducers: {
    // changeLoading: (state: InitialStateTypes, action: PayloadAction<boolean>) => {
    //   state.loading = action.payload;
    // },
    // changeCustomerModel: (state: InitialStateTypes, action: PayloadAction<IndexProps>) => {
    //   const { isOpen, value } = action.payload;
    //   state.visible = isOpen;
    //   if (value) {
    //     state.isEditMode = true;
    //     state.formValue = value;
    //   } else {
    //     state.isEditMode = false;
    //   }
    // },
  }
});

export default customerSlice.reducer;
