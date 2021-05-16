import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SignatureController from '../controllers/SignatureController';

const signRouter = Router();

const signatureController = new SignatureController();

signRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      minute_id: Joi.string().required(),
      participant_email: Joi.string().email().required(),
    },
  }),
  signatureController.create,
);

export default signRouter;
