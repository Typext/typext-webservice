import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SignMinuteService from '@modules/minutes/services/SignMinuteService';

export default class SignatureController {
  public async create(request: Request, response: Response): Promise<Response> {
    const serviceRequest = request.body;

    const signMinuteService = container.resolve(SignMinuteService);

    const signedParticipant = await signMinuteService.execute(serviceRequest);

    return response.json(signedParticipant);
  }
}
