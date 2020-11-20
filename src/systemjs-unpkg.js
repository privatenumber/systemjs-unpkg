(function (global) {
	'use strict';

	var systemPrototype = global.System.constructor.prototype;
	var resolve = systemPrototype.resolve;
	systemPrototype.resolve = function (id, parentUrl) {
		try {
			return resolve.apply(this, arguments);
		} catch (error) {
			id = 'https://unpkg.com/' + id;
			try {
				return resolve.call(this, id, parentUrl);
			} catch (_) {
				throw error;
			}
		}
	};
})(typeof self !== 'undefined' ? self : global);
