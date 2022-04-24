class Observable {
  constructor(value) {
    this._value = value;
  }
  subscribe(callback) {
    console.log("sub");
    this.callback = callback;
  }

  update(value) {
    console.log("update", value);
    this._value = value;
    this.callback();
  }

  set value(value) {
    this._value = value;
    console.log(this._value);
  }

  get value() {
    return this._value;
  }
}

export default Observable;
