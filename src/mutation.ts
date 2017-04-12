export interface ISpecs {
	name?: String;
	type: any;
	description?: String;
	args?: any;
}
export function mutation(specs: ISpecs) {
	return function mutation(target, name, descriptor) {
		const modelName = target.constructor.name;
		const mutationName = specs.name || `${modelName}__${name}`;
		const resolver = descriptor.value;
		delete specs['name'];
		descriptor.value = function () {
			return {
				mutations: {
					[mutationName.toString()]: {
						...specs,
						resolve: resolver
					}
				}
			}
		}
		return descriptor;
	}
}