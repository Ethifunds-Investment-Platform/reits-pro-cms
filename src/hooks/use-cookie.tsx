
import React from "react";
import Cookies from "js-cookie";
import CookieAttributes from "js-cookie";

type SetValue<T> = (value: T | ((val: T) => T)) => void;
type Options = typeof CookieAttributes.attributes;

type ReturnType<T> = {
	cookie: T;
	setCookie: SetValue<T>;
	deleteCookie: () => void;
};

function useCookie<T>(key: string, defaultValue?: T, options: Options = {}): ReturnType<T> {
	const [value, setStoredValue] = React.useState<T>(() => {
		let currentValue: T | undefined;

		try {
			const cookieValue = Cookies.get(key);
			currentValue = cookieValue ? JSON.parse(cookieValue) : defaultValue;
		} catch (error) {
			currentValue = defaultValue;
			throw error;
		}

		return currentValue as T;
	});

	const setValue: SetValue<T> = (newValue) => {
		const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
		setStoredValue(valueToStore);
		Cookies.set(key, JSON.stringify(valueToStore), options);
	};

	const deleteCookie = React.useCallback(() => {
		Cookies.remove(key);
		if (defaultValue) setStoredValue(defaultValue);
	}, [key, defaultValue]);

	const cookieValue = Cookies.get(key);
	React.useMemo(() => {
		if (cookieValue) {
			setStoredValue(JSON.parse(cookieValue));
		}
	}, [cookieValue]);

	React.useEffect(() => {
		Cookies.set(key, JSON.stringify(value), options);
	}, [value, key, options]);

	return {
		cookie: value,
		setCookie: setValue,
		deleteCookie,
	};
}

export default useCookie;
