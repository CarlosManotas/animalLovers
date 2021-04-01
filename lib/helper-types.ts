export type Animals =
  | 'bear'
  | 'cat'
  | 'dog'
  | 'elephant'
  | 'gorilla'
  | 'horse'
  | 'jaguar'
  | 'kangaroo'
  | 'koala'
  | 'lion'
  | 'monkey'
  | 'panda'
  | 'penguin'
  | 'tiger'
  | 'zebra'
  | string;

export interface UserInfo {
  id?: string;
  name: {
    given: string;
    surname: string;
  };
  points: number;
  animals: Animals[];
  isActive: boolean;
  age: number;
}
