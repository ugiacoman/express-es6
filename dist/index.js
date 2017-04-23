'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('dev');

const app = (0, _express2.default)();
app.disable('x-powered-by');
app.use((0, _compression2.default)());
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use((0, _morgan2.default)('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/', _api2.default);

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Alertness Pro Server' });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message
  });
});

const { PORT = 8080 } = process.env;
app.listen(PORT, () => debug(`Listening on port ${PORT}`));
//# sourceMappingURL=index.js.map