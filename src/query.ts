export interface ISpecs {
	name?: String;
	type: any;
	description?: String;
	args?: any;
}
export function query(specs: ISpecs) {
	return function query(target, name, descriptor) {
		const modelName = target.constructor.name;
		const queryName = specs.name || `${modelName}__${name}`;
		const resolver = descriptor.value;
		delete specs['name'];
		descriptor.value = function () {
			return {
				queries: {
					[queryName.toString()]: {
						...specs,
						resolve: resolver
					}
				}
			}
		}
		return descriptor;
	}
}