const {System, applyImportMap} = require('systemjs');
require('systemjs/dist/extras/amd'); // eslint-disable-line import/no-unassigned-import
require('../src/systemjs-unpkg'); // eslint-disable-line import/no-unassigned-import

const nonExistentPkg = 'pkg-not-on-npm-' + Math.random();
applyImportMap(System, {
	imports: {
		[nonExistentPkg]: 'https://unpkg.com/lodash',
		underscore: 'https://unpkg.com/lodash',
	},
});

test('should resolve module on UNPKG', async () => {
	const _ = await System.import('lodash');
	expect(_).toBeTruthy();
});

test('should fail when resolving non-existing module', async () => {
	await expect(() =>
		System.import('non-existent-package-for-testing-purposes-' + Math.random()),
	).rejects.toThrow('404 Not Found');
});

test('should use importmap to resolve non-existing package', async () => {
	const _ = await System.import(nonExistentPkg);
	expect(_).toBeTruthy();
});

test('should use importmap to resolve underscore to lodash', async () => {
	const _ = await System.import('underscore');
	expect(_.default.name).toBe('lodash');
});
