
export class Culture {
  options = ['en-US', 'pt-BR'];
  current = undefined;

  constructor(api) {
    this.key = new.target.name.toLowerCase();
  }
}
