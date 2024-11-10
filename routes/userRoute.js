import express from 'express'
import {
    postHandler,
    getHandler,
    getByIdHandler,
    deleteHandler,
    putHandler,
    loginHandler
} from '../controllers/userController.js'

const router = express.Router()

router.route('/')
    .post(postHandler)
    .get(getHandler)

router.route('/:id')
    .get(getByIdHandler)
    .delete(verifyToken, deleteHandler)
    .put(verifyToken, putHandler)
    .patch(verifyToken,putHandler)

router.route('/login')
.post(loginHandler)

export default router