import express from 'express'
import {
    postHandler,
    getHandler,
    getByIdHandler,
    deleteHandler,
    putHandler
} from '../controllers/userController.js'

const router = express.Router()

router.route('/')
    .post(postHandler)
    .get(getHandler)
router.route('/:id')
    .get(getByIdHandler)
    .delete(deleteHandler)
    .put(putHandler)
    .patch(putHandler)

export default router