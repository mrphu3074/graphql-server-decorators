declare module 'graphql-server-decorators' {
	export function controller(target: any): any;
	export function query(target: any): any;
	export function mutation(target: any): any;
}