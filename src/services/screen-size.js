
export class ScreenSize {

  queries = [
    {name: 'xs', min: '0px', max: '33em'},
    {name: 'sm', min: '34em', max: '47em'},
    {name: 'md', min: '48em', max: '61em'},
    {name: 'lg', min: '62em', max: '74em'},
    {name: 'xl', min: '75em', max: '1000em'}
  ];
  indexOF = {xs: 0, sm: 1, md: 2, lg: 3, xl: 4};
  screen = {};
  constructor(channel) {
    this.currentScreen = this.checkSize();
  }

  checkSize() {
    let current = this.currentScreen;
    for (let q in this.queries) {
      if (this.queries[q + 1]) {
        this.screen[q] = this.fromTo(this.queries[q].name, this.queries[q + 1].name);
      } else {
        this.screen[q] = this.from(this.queries[q].name);
      }
      if (this.screen[q]) {
        current = q;
      }
    }

    if (current !== this.currentScreen) {
      this.currentScreen = current;
      return this.currentScreen;
    }
    return false;
  }

  createQuery(min, max) {
    let query = '';
    if (min) {
      let minIndex = this.indexOF[min];
      min = this.queries[minIndex].min;
      query += `(min-width: ${min})`;
    }
    query = max ? (query + ' and ') : query;

    if (max) {
      let maxIndex = this.indexOF[max];
      maxIndex = maxIndex - 1;
      max = this.queries[maxIndex].max;
      query += `(max-width: ${max})`;
    }
    return query;
  }

  from(min) {
    let match = window.matchMedia(this.createQuery(min));
    return match && match.matches;
  }

  to(max) {
    let match = window.matchMedia(this.createQuery(null, max));
    return match && match.matches;
  }

  fromTo(min, max) {
    let match = window.matchMedia(this.createQuery(min, max));
    return match && match.matches;
  }
}
