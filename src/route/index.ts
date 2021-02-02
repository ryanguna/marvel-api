/**
 * Module Dependencies
 */
import express from 'express';

const router = express.Router();

router.get('/', (request, response) => response.json('Welcome!'));

export default router;
