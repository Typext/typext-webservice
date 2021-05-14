import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateReviewService from '@modules/minutes/services/CreateReviewService';
import { addHours } from 'date-fns';

export default class ReviewsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createReview = container.resolve(CreateReviewService);
    const reviewDTO = request.body;

    const createdDate = new Date();
    reviewDTO.created_at = addHours(createdDate, -3);

    const minute_id = Number(request.body.id);

    const createdReview = await createReview.execute(request.body);

    return response.json(createdReview);
  }
}
