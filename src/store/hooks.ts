
import { useSelector } from "react-redux";
import type { RootState } from "./index";

type StateKeys = keyof RootState;

const useAppSelector = <T extends StateKeys>(key: T): RootState[T] => {
	return useSelector((state: RootState) => state[key]);
};

export default useAppSelector;
