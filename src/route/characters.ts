/**
 * Module Dependencies
 */
import express from 'express';

import CharacterController from 'controller/CharacterController';

const router = express.Router();

router.get('/', CharacterController.index);
router.get('/:id', CharacterController.show);

export default router;
