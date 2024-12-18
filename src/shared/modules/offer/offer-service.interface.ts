import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../types/document-exists.interface.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[] | null>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByIds(offerIds: string[]): Promise<DocumentType<OfferEntity>[] | null>;
  findPremiumByCity(cityName: string): Promise<DocumentType<OfferEntity>[] | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  checkOwnership(offerId: string, userId: string): Promise<boolean>;
}
