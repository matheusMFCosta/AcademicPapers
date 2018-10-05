export abstract class Operation {
	type: string = formatActionName(this.constructor.name);
}

export function assign<T>(state: T, patch: Partial<T>): T {
	return Object.assign({}, state, patch);
}

const formatActionName = (inputString: string) => {
	let formatedActionName: string = "";
	for (var i = 0; i < inputString.length; i++) {
		if (inputString[i].match(/[A-Z]/) != null) {
			formatedActionName = formatedActionName + "_";
		}
		formatedActionName = formatedActionName + inputString[i];
	}
	return formatedActionName.toUpperCase();
};
