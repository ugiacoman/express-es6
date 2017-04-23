import { Router } from 'express'

const apiRoutes = Router()

/*
 * GET home page.
*/
apiRoutes.get('/', (req, res, next) => {
  res.render('apiIntroduction', { title: 'API' })
})

/*
 * GET users listing.
 */
// router.post('/protocolo', protocolo.init);

module.exports = apiRoutes
