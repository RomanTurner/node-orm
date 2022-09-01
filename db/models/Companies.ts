import {DataModel} from './DataModel';

export class Companies extends DataModel {
  title?: string;
  description?: string;

  constructor(table_name?: string) {
    super(table_name);
  }
}

export interface CompaniesSchema {
  id: number;
  title: string;
  description: string;
}
