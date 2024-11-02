import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Component } from '../../const.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CommentService } from './index.js';
import { OfferService } from '../offer/index.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { ParamOfferId } from '../offer/types/param-offerid.type.js';
import { BaseController, DocumentExistsMiddleware, HttpError, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController');

    this.addRoute({
      path: '/',
      method: 'post',
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: 'get',
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, comment));
    const allComments = await this.commentService.findByOfferId(body.offerId);
    const commentCount = allComments.length;
    const totalRating = allComments.reduce((sum, current) => sum + current.rating, 0);
    const rating = parseFloat((totalRating / commentCount).toFixed(1));
    await this.offerService.updateById(body.offerId, { rating, commentCount });
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    if (!await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
