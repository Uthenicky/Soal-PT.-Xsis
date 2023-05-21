const userCtrl = require('../controllers/userCtrl')
const {validateLogin, validate} = require('../middleware/validasi')

module.exports = function(app){
  /**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Login
 *     description: Authenticate user and get a token.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials.
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: admin
 *             password:
 *               type: string
 *               example: admin
 *     responses:
 *       200:
 *         description: Successful login.
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                  username:
 *                    type: string
 *                    example: admin
 *                  password:
 *                    type: string
 *                    example: admin
 *                  role:
 *                    type: string
 *                    example: admin
 *                  
 *             token:
 *               type: string
 *               example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  *       404:
  *         description: User not found or password incorect.
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *               example: false
  *             status:
  *               type: number
  *               example: 404
  *             message:
  *               type: string
  *               example: Data tidak ada
  *       400:
  *         description: Validation error.
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *               example: false
  *             status:
  *               type: number
  *               example: 400
  *             message:
  *               type: object
  *               properties:
  *                 type:
  *                   type: string
  *                   example: field
  *                 value:
  *                   type: string
  *                   example: request body value.
  *                 msg:
  *                   type: string
  *                   example: validation error field
  *                 path:
  *                   type: string
  *                   example: spesific field/value miss
  *                 location:
  *                   type: string
  *                   example: body
  *       500:
  *         description: Internal server error.
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *               example: false
  *             status:
  *               type: number
  *               example: 500
  *             message:
  *               type: string
  *               example: Message error
  */
  app.post('/login', validateLogin, validate, userCtrl.Login)
}