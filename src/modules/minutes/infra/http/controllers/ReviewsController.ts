import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateReviewService from '@modules/minutes/services/CreateReviewService';

export default class ReviewsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createReview = container.resolve(CreateReviewService);
    const reviewDTO = request.body;
    reviewDTO.user_id = request.user;

    const createdReview = await createReview.execute(reviewDTO);

    return response.json(createdReview);
  }
}
