export default class evEmmiter {
  constructor(){
    this.events = {};
  }
  on (event, clb) {
    if(this.events[event]){
      return this.events[event].push(clb);
    }
    this.events[event] = [];
    this.events[event].push(clb)
  }

  emmit (event, args) {
    if(Object.keys(this.events).length == 0) return;
    if(!this.events[event]) return;
    this.events[event].forEach((fn) => {
      fn.apply(null, [args]);
    })
  }
}