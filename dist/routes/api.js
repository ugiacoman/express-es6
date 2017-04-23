'use strict';

var _express = require('express');

const apiRoutes = (0, _express.Router)();

/*
 * GET home page.
*/
apiRoutes.get('/', (req, res, next) => {
  res.render('apiIntroduction', { title: 'API' });
});

/*
 * GET users listing.
 */
// router.post('/protocolo', protocolo.init);

module.exports = apiRoutes;
//# sourceMappingURL=api.js.map