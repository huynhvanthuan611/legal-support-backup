import { createSlice } from "@reduxjs/toolkit";
import { HistoryState, History } from "./historyType";
import {
  HISTOR_DRAFT_RESET,
  HISTORY_FETCH_BY_UID,
  HISTORY_FETCH_BY_UID_SUSSESS,
  HISTORY_FETCH_ERROR,
  HISTORY_LOCAL_ADD,
  HISTORY_LOCAL_FETCH,
  HISTORY_LOCAL_REMOVE,
  HISTORY_POST,
  HISTORY_POST_SUCCESS,
  HISTORY_REMOVE_DRAFT_ID,
  LOCAL_STORAGE_KEY,
} from "./historyConstants";
import {
  HistoryError,
  HistoryFetch,
  HistoryFetchSussess,
  HistoryLocalAdd,
  HistoryLocalRemove,
  HistoryPost,
  HistoryPostSussess,
  HistoryRemoveDarftId,
} from "./historyActions";
import { getLocalStorageItem, setLocalStorageItem } from "utils/localStorageUtils";

const initialState: HistoryState = {
  data: [],
  local: [],
  loading: false,
  error: undefined,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HISTORY_FETCH_BY_UID, (state, action: HistoryFetch) => {
      state.loading = true;
    });
    builder.addCase(
      HISTORY_FETCH_BY_UID_SUSSESS,
      (state, action: HistoryFetchSussess) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(HISTORY_FETCH_ERROR, (state, action: HistoryError) => {
      state.loading = false;
    });
    builder.addCase(HISTORY_POST, (state, action: HistoryPost) => {
      state.loading = true;
    });
    builder.addCase(
      HISTORY_POST_SUCCESS,
      (state, action: HistoryPostSussess) => {
        state.draftId = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      HISTORY_REMOVE_DRAFT_ID,
      (state, action: HistoryRemoveDarftId) => {
        state.draftId = undefined;
        state.loading = false;
      }
    );
    builder.addCase(HISTOR_DRAFT_RESET, (state) => {
      state.draftId = undefined;
    });
    builder.addCase(HISTORY_LOCAL_FETCH, (state) => {
      const localData = getLocalStorageItem(LOCAL_STORAGE_KEY) as History[] | null;
      if (localData) {
        state.local = localData.map((item) => ({ ...item }));
      }
    });
    builder.addCase(HISTORY_LOCAL_ADD, (state, action: HistoryLocalAdd) => {
      const newlocal = [...state.local, action.payload];
      state.local = newlocal;
      setLocalStorageItem(LOCAL_STORAGE_KEY, newlocal);
    });
    builder.addCase(HISTORY_LOCAL_REMOVE, (state, action: HistoryLocalRemove) => {
      const newLocal = state.local.filter(
        (item) => item.question !== action.payload.question || item.answer !== action.payload.answer
      );
      state.local = newLocal;
      setLocalStorageItem(LOCAL_STORAGE_KEY, newLocal);
    });
  
  },
});

export const historyReducer = historySlice.reducer;
