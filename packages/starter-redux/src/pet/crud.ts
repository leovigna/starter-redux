import { name } from './common.js';
import { PetId, Pet } from './model/index.js';
import { validateId, validate } from './model/validate.js';
import createCRUDModel from '../createCRUDModel.js';

export const PetCRUD = createCRUDModel<'Pet', PetId, Pet>(name, validateId, validate);
export default PetCRUD;
