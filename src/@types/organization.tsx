import { Address } from "./address";
import { Donation } from "./donation";
import { ProjectListProps } from "./project";
import { Responsibles } from "./user";

export type OrganizationProps = {
  id?: string;
  name: string;
  description: string;
  status: number;
  email: string;
  cnpj: string;
  avatar: string;
  organization_type: organizationType;
  address: Address;
  images_url: string[];
  projects: ProjectListProps[];
  donations: Donation[];
  responsibles: Responsibles[];
};

export type Organization = {
  id?: string;
  name: string;
  description: string;
  email: string;
  cnpj: string;
  avatar: string;
  organization_type: organizationType;
  address: Address;
  images_url: string[];
};

export type CreateOrganizationFormData = {
  name: string;
  email: string;
  password: string;
  avatarUser: string;
  passwordConfirmation: string;
  nameOrganization: string;
  cnpj: string;
  emailOrganization: string;
  avatarOrganization: string;
  cep: string;
  stateId: number;
  cityId: string;
  district: string;
  street: string;
  number: string;
  complement: string;
  organizationTypeId: string;
  description: string;
};

export type EditOrganizationFormData = {
  name?: string;
  cnpj?: string;
  email?: string;
  avatar?: string;
  address?: {
    cep?: string;
    district?: string;
    street?: string;
    number?: string;
    complement?: string;
    city_id?: number;
  };
  organizationTypeId?: string;
  description?: string;
};
