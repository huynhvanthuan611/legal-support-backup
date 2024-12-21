import { historLocalFetch } from "contexts/history/historyActions";
import { useAppDispatch } from "contexts/hooks";
import { useEffect } from "react";

const useHistoryChatLocalFetch = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(historLocalFetch());
  }, []);
};

export default useHistoryChatLocalFetch;
