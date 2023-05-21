const authJwt = require('../middleware/authJwt')
const {validateCreateMovie, validateUpdateMovie, validateDetailDeleteMovie, validate} = require('../middleware/validasi')
const movieCtrl = require('../controllers/movieCtrl')

module.exports = function(app){
  /**
   * @swagger
   * /movies:
   *   post:
   *     tags: [Movie]
   *     summary: Create a new movie
   *     description: Create a new movie with the provided details.
   *     parameters:
   *       - in: body
   *         name: movie
   *         description: Movie details.
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               example: The Movie
   *             description:
   *               type: string
   *               example: This is a great movie.
   *             rating:
   *               type: number
   *               example: 4.5
   *             image:
   *               type: string
   *               example: movie.jpg
   *             userId:
   *               type: string
   *               example: 12345
   *     responses:
   *       201:
   *         description: Movie created successfully.
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               example: true
   *             status:
   *               type: number
   *               example: 201
   *             data:
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *                   example: 1
   *                 title:
   *                   type: string
   *                   example: The Movie
   *                 description:
   *                   type: string
   *                   example: This is a great movie.
   *                 rating:
   *                   type: number
   *                   example: 4.5
   *                 image:
   *                   type: string
   *                   example: movie.jpg
   *       404:
   *         description: User not found.
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
   *               example: User not found
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
  app.post('/movies', [authJwt.verifyToken, authJwt.isAdmin], validateCreateMovie, validate, movieCtrl.CreateMovie)
  

  /**
   * @swagger
   * /movies:
   *   put:
   *     tags: [Movie]
   *     summary: Update a movie
   *     description: Update a movie with the provided details.
   *     parameters:
   *       - in: body
   *         name: movie
   *         description: Updated movie details.
   *         schema:
   *           type: object
   *           properties:
   *             movieId:
   *               type: number
   *               example: 12345
   *             title:
   *               type: string
   *               example: Updated Movie
   *             description:
   *               type: string
   *               example: This is an updated movie.
   *             rating:
   *               type: float
   *               example: 4.8
   *             image:
   *               type: string
   *               example: updated-movie.jpg
   *             userId:
   *               type: string
   *               example: 12345
   *     responses:
   *       201:
   *         description: Movie updated successfully.
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               example: true
   *             status:
   *               type: number
   *               example: 201
   *             data:
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *                   example: 1
   *                 title:
   *                   type: string
   *                   example: Updated Movie
   *                 description:
   *                   type: string
   *                   example: This is an updated movie.
   *                 rating:
   *                   type: number
   *                   example: 4.8
   *                 image:
   *                   type: string
   *                   example: updated-movie.jpg
   *       404:
   *         description: User /Movie not found.
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
  app.patch('/movies', [authJwt.verifyToken, authJwt.isAdmin], validateUpdateMovie, validate, movieCtrl.UpdateMovie)
  

  /**
   * @swagger
   * /movies/{id}:
   *   get:
   *     tags: [Movie]
   *     summary: Get movie details
   *     description: Retrieve details of a movie by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the movie to retrieve.
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Movie details retrieved successfully.
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               example: true
   *             status:
   *               type: number
   *               example: 200
   *             data:
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *                   example: 1
   *                 title:
   *                   type: string
   *                   example: The Movie
   *                 description:
   *                   type: string
   *                   example: This is a great movie.
   *                 rating:
   *                   type: number
   *                   example: 4.5
   *                 image:
   *                   type: string
   *                   example: movie.jpg
   *       404:
   *         description: Movie not found.
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
  app.get('/movies/:id', [authJwt.verifyToken, authJwt.isAdmin], validateDetailDeleteMovie, validate, movieCtrl.DetailMovie)

  /**
   * @swagger
   * /movies/{id}:
   *   delete:
   *     tags: [Movie]
   *     summary: Delete a movie
   *     description: Delete a movie by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the movie to delete.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Movie deleted successfully.
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               example: true
   *             status:
   *               type: number
   *               example: 200
   *             message:
   *               type: string
   *               example: Data berhasil dihapus
   *       404:
   *         description: Movie not found.
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
   *       403:
   *         description: Superadmin role requirement.
   *         schema:
   *           type: object
   *           example: Require Super Admin Role
   */
  app.delete('/movies/:id', [authJwt.verifyToken, authJwt.isSuperAdmin], validateDetailDeleteMovie, validate, movieCtrl.DeleteMovie)

  /**
   * @swagger
   * /movies:
   *   get:
   *     tags: [Movie]
   *     summary: Get all movies
   *     description: Retrieve a list of all movies.
   *     responses:
   *       200:
   *         description: Movie deleted successfully.
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               example: true
   *             status:
   *               type: number
   *               example: 200
   *             data:
   *               type: object
   *               properties:
   *                 id:
   *                   type: number
   *                   example: 1
   *                 title:
   *                   type: string
   *                   example: The Movie
   *                 description:
   *                   type: string
   *                   example: This is a great movie.
   *                 rating:
   *                   type: number
   *                   example: 4.5
   *                 image:
   *                   type: string
   *                   example: movie.jpg
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
  app.get('/movies', [authJwt.verifyToken, authJwt.isAdmin], movieCtrl.ListMovie)
}