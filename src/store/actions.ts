import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as accountActions from "./account.slice";
import * as uiActions from "./ui.slice";
import * as initActions from "./init.slice";

const useActions = () => {
	const dispatch = useDispatch();

	return {
		account: bindActionCreators(accountActions, dispatch),
		ui: bindActionCreators(uiActions, dispatch),
		init: bindActionCreators(initActions, dispatch),
	};
};

export default useActions;
