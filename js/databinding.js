
class DataBinding {
  bindValue(input, observable) {
    const initialValue = observable.value;
    input.value = initialValue;
    observable.subscribe(() => input.value = observable.value);
    let converter = value => value;
    input.onkeyup = () => {
      observable.value = converter(input.value);
    };
  }

  bindObservables(elem, context) {
    const dataBindings = elem.querySelectorAll("[data-bind]");
    dataBindings.forEach(elem => {
      this.bindValue(elem,
	context[elem.getAttribute("data-bind")]);
    });
  }
}

export default new DataBinding();
