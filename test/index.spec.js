beforeEach(() => {
	jest.resetModules();
});

const fakeResponse = {
	ok: true,
	headers: {
		get: () => 'text/javascript',
	},
	text: async () => '',
};

test('should resolve module to UNPKG', async () => {
	const {System} = require('systemjs');
	const fakeFetch = jest.fn(async () => fakeResponse);
	System.constructor.prototype.fetch = fakeFetch;

	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await System.import('lodash');
	expect(fakeFetch.mock.calls[0][0]).toBe('https://unpkg.com/lodash');
}, 10000);

test('should resolve versioned module to UNPKG', async () => {
	const {System} = require('systemjs');
	const fakeFetch = jest.fn(async () => fakeResponse);
	System.constructor.prototype.fetch = fakeFetch;

	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await System.import('lodash@4.17.0');

	expect(fakeFetch.mock.calls[0][0]).toBe('https://unpkg.com/lodash@4.17.0');
}, 10000);

test('should not try to resolve paths', async () => {
	const {System} = require('systemjs');
	const fakeFetch = jest.fn(async () => fakeResponse);
	System.constructor.prototype.fetch = fakeFetch;

	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	await System.import('./some-dir/../relative.js');
	await System.import('/absolute.js');

	expect(fakeFetch.mock.calls[0][0]).toBe('http://localhost/relative.js');
	expect(fakeFetch.mock.calls[1][0]).toBe('http://localhost/absolute.js');
}, 10000);

test('should use importmap to resolve package', async () => {
	const {System, applyImportMap} = require('systemjs');
	const fakeFetch = jest.fn(async () => fakeResponse);
	System.constructor.prototype.fetch = fakeFetch;

	require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

	const nonExistentPkg = 'pkg-not-on-npm-' + Math.random();

	applyImportMap(System, {
		imports: {
			[nonExistentPkg]: 'https://unpkg.com/some-pkg',
			lodash: 'https://unpkg.com/lodash-es',
		},
	});

	await System.import(nonExistentPkg);
	await System.import('lodash');

	expect(fakeFetch.mock.calls[0][0]).toBe('https://unpkg.com/some-pkg');
	expect(fakeFetch.mock.calls[1][0]).toBe('https://unpkg.com/lodash-es');
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
