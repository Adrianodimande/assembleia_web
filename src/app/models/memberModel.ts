import { GenderEnum } from '../constants/enums/genderEnum';
import { MaritalStatusEnum } from '../constants/enums/maritalStatusEnum';

export interface MemberModel {
  id: number;
  firstName?: string;
  lastName?: string;

  dateOfBirth?: Date;
  gender?: number;
  maritalStatus?: number;

  address?: string;

  phone?: string;
  email?: string;

  congregation?: string;
  baptized: boolean;
}
