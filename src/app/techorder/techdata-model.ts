interface Techdata {
  _id: string;
uid: string;
name: string;
facets?: Facets[];
}

interface Facets {
  _id: string;
  distinctCount: number;
  totalCount: number;

}

interface TechorderModel extends Techdata {
  description: string;
  publicationDate: string;
  changeDate: string;
  parts?: PartsModel[];
}

interface PartsModel extends Techdata {
  cage?: string;
  nsn?: string;
  description?: string;
}

interface FiguresModel extends Techdata {
  figureNumber: string;
}
export { Techdata, Facets, TechorderModel, PartsModel, FiguresModel };
