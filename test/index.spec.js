beforeEach(() => {
	jest.resetModules();
});

test('should resolve module on UNPKG', async () => {
	const {System} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await System.import('lodash');
	expect(spy).toHaveBeenNthCalledWith(2, 'https://unpkg.com/lodash', undefined);

	spy.mockRestore();
}, 10000);

test('should resolve versioned module on UNPKG', async () => {
	const {System} = require('systemjs');
	require('systemjs/dist/extras/amd'); // eslint-disable-line import/no-unassigned-import
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	const _ = await System.import('lodash@4.17.0');
	expect(spy).toHaveBeenNthCalledWith(2, 'https://unpkg.com/lodash@4.17.0', undefined);
	expect(_.VERSION).toBe('4.17.0');
	spy.mockRestore();
}, 10000);

test('should fail when resolving non-existing module', async () => {
	const {System} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	const nonExistentPkg = 'non-existent-package-for-testing-purposes-' + Math.random();
	await expect(() =>
		System.import(nonExistentPkg),
	).rejects.toThrow('404 Not Found');

	expect(spy).toHaveBeenNthCalledWith(2, 'https://unpkg.com/' + nonExistentPkg, undefined);

	spy.mockRestore();
}, 10000);

test('should not try to resolve relative paths', async () => {
	const {System} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await expect(() =>
		System.import('./index.js'),
	).rejects.toThrow('ECONNREFUSED');

	expect(spy).toHaveBeenCalledTimes(1);

	spy.mockRestore();
}, 10000);

test('should not try to resolve absolute paths', async () => {
	const {System} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await expect(() =>
		System.import('/index.js'),
	).rejects.toThrow('ECONNREFUSED');

	expect(spy).toHaveBeenCalledTimes(1);

	spy.mockRestore();
}, 10000);

test('should use importmap to resolve non-existing package', async () => {
	const {System, applyImportMap} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	const nonExistentPkg = 'pkg-not-on-npm-' + Math.random();

	applyImportMap(System, {
		imports: {
			[nonExistentPkg]: 'https://unpkg.com/lodash',
		},
	});

	await System.import(nonExistentPkg);
	expect(spy).toHaveBeenCalledTimes(1);

	spy.mockRestore();
}, 10000);

test('should use importmap to resolve underscore to lodash', async () => {
	const {System, applyImportMap} = require('systemjs');
	const spy = jest.spyOn(System.constructor.prototype, 'resolve');
	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	applyImportMap(System, {
		imports: {
			underscore: 'https://unpkg.com/lodash',
		},
	});

	await System.import('underscore');
	expect(spy).toHaveBeenCalledTimes(1);

	spy.mockRestore();
}, 10000);
