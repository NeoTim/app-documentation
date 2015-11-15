
export class Language {
  options = ['ES 2016', 'ES 2015', 'TypeScript'];
  current = undefined;
  constructor(api) {
    this.key = new.target.name.toLowerCase();
  }
}
