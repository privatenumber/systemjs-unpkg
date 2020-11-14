module.exports = {
	env: ['browser'],
	rules: {
		'comma-dangle': [
			'error',
			'always-multiline',
		],
		'no-var': 'off',
		'unicorn/prefer-reflect-apply': 'off',
		'unicorn/prefer-optional-catch-binding': 'off',
		'no-negated-condition': 'off',
	},
	overrides: [
		{
			files: 'test/*',
			env: 'jest',
		},
	],
};
