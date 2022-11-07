export interface AbilityInterface {
  name: string;
  text: string;
  type: string;
}

export interface AttackInterface {
  convertedEnergyCost: number;
  cost: string[];
  damage: string;
  name: string;
  text: string;
}

export interface CardImageInterface {
  small: string;
  large: string;
}

export interface CardInterface {
  id: string;
  name: string;
  hp?: string;
  subtypes: string[];
  abilities?: AbilityInterface[];
  attacks?: AttackInterface[];
  images: CardImageInterface;
}

export interface CardsApiResponse {
  count: number,
  data: CardInterface[],
  page: number,
  pageSize: number,
  totalCount: number,
}