export function operators() {
  window.maxArgs = 4;
  class Operator extends Function {
    constructor(signature, argNames, code, description) {
      super(...argNames, code.toString().slice(0, -1).replace("() => {", ""));
      this.signature = signature;
      this.description = description;
      this.argNames = argNames;
    }
  }

  class BooleanAndOperator extends Operator {
    constructor() {
      super(["Boolean", "Boolean", "Boolean"], ["booleanAndBool1", "booleanAndBool2"], "return booleanAndBool1 && booleanAndBool2;");
    }
  }

  class BooleanOrOperator extends Operator {
    constructor() {
      super(["Boolean", "Boolean", "Boolean"], ["booleanOrBool1", "booleanOrBool2"], (() => {
        if (typeof this.booleanOrBool1 !== 'boolean') throw new Error(`Expected boolean at position 1, got ${typeof (this.booleanOrBool1)}`);
        if (typeof this.booleanOrBool2 !== 'boolean') throw new Error(`Expected boolean at position 2, got ${typeof (this.booleanOrBool2)}`);
        return this.booleanOrBool1 || this.booleanOrBool2;
      }));
    }
  }

  class BooleanNotOperator extends Operator {
    constructor() {
      super(["Boolean", "Boolean"], ["booleanNotBool"], () => {
        if (typeof this.booleanNotBool !== 'boolean') throw new Error(`Expected boolean at position 1, got ${typeof (this.booleanNotBool)}`);
        return !this.booleanNotBool;
      });
    }
  }

  class BooleanNandOperator extends Operator {
    constructor() {
      super(["Boolean", "Boolean", "Boolean"], ["booleanNandBool1", "booleanNandBool2"], (() => {
        if (typeof this.booleanNandBool1 !== 'boolean') throw new Error(`Expected boolean at position 1, got ${typeof (this.booleanNandBool1)}`);
        if (typeof this.booleanNandBool2 !== 'boolean') throw new Error(`Expected boolean at position 2, got ${typeof (this.booleanNandBool2)}`);
        return !(this.booleanNandBool1 && this.booleanNandBool2);
      }));
    }
  }

  class BooleanNorOperator extends Operator {
    constructor() {
      super(["Boolean", "Boolean", "Boolean"], ["booleanNorBool1", "booleanNorBool2"], () => {
        if (typeof this.booleanNorBool1 !== 'boolean') throw new Error(`Expected boolean at position 1, got ${typeof (this.booleanNorBool1)}`);
        if (typeof this.booleanNorBool2 !== 'boolean') throw new Error(`Expected boolean at position 2, got ${typeof (this.booleanNorBool2)}`);
        return !(this.booleanNorBool1 || this.booleanNorBool2);
      });
    }
  }

  class NumberAdditionOperator extends Operator {
    constructor() {
      super(["Number", "Number", "Number"], ["numberAdditionNum1", "numberAdditionNum2"], () => {
        if (isNaN(new Number(this.numberAdditionNum1))) throw new Error(`Expected number at position 1, got ${typeof (this.numberAdditionNum1)}`);
        if (isNaN(new Number(this.numberAdditionNum2))) throw new Error(`Expected number at position 2, got ${typeof (this.numberAdditionNum2)}`);
        return this.numberAdditionNum1 + this.numberAdditionNum2;
      });
    }
  }

  class NumberSubtractionOperator extends Operator {
    constructor() {
      super(["Number", "Number", "Number"], ["numberSubtractionNum1", "numberSubtractionNum2"], () => {
        if (isNaN(new Number(this.numberSubtractionNum1))) throw new Error(`Expected number at position 1, got ${typeof (this.numberSubtractionNum1)}`);
        if (isNaN(new Number(this.numberSubtractionNum2))) throw new Error(`Expected number at position 2, got ${typeof (this.numberSubtractionNum2)}`);
        return this.numberSubtractionNum1 - this.numberSubtractionNum2;
      });
    }
  }

  class NumberMultiplicationOperator extends Operator {
    constructor() {
      super(["Number", "Number", "Number"], ["numberMultiplicationNum1", "numberMultiplicationNum2"], () => {
        if (isNaN(new Number(this.numberMultiplicationNum1))) throw new Error(`Expected number at position 1, got ${typeof (this.numberMultiplicationNum1)}`);
        if (isNaN(new Number(this.numberMultiplicationNum2))) throw new Error(`Expected number at position 2, got ${typeof (this.numberMultiplicationNum2)}`);
        return this.numberMultiplicationNum1 * this.numberMultiplicationNum2;
      });
    }
  }

  class NumberDivisionOperator extends Operator {
    constructor() {
      super(["Number", "Number", "Number"], ["numberMultiplicationNum1", "numberMultiplicationNum2"], () => {
        if (isNaN(new Number(this.numberMultiplicationNum1))) throw new Error(`Expected number at position 1, got ${typeof (this.numberMultiplicationNum1)}`);
        if (isNaN(new Number(this.numberMultiplicationNum2))) throw new Error(`Expected number at position 2, got ${typeof (this.numberMultiplicationNum2)}`);
        return this.numberMultiplicationNum1 / this.numberMultiplicationNum2;
        // TODO: throw error/cast if nessicary
      });
    }
  }

  class NumberMaximumOperator extends Operator {
    constructor() {
      super(["Number", "Number", "Number"], ["numberMaximumnNum1", "numberMaximumnNum2"], () => {
        if (isNaN(new Number(this.numberMaximumnNum1))) throw new Error(`Expected number at position 1, got ${typeof (this.numberMaximumnNum1)}`);
        if (isNaN(new Number(this.numberMaximumnNum2))) throw new Error(`Expected number at position 2, got ${typeof (this.numberMaximumnNum2)}`);
        return Math.max(this.numberMaximumnNum1, this.numberMaximumnNum2);
      });
    }
  }

  class OperatorPipe extends Operator {
    constructor() {
      super(
        ["Operator", "Operator", "Operator"],
        ["operatorPipeOp1", "operatorPipeOp2"],
        () => {
          if (!(operatorPipeOp1 instanceof Operator)) {
            throw new Error(
              `Expected operator at position 1, got ${typeof operatorPipeOp1}`
            );
          }
          if (!(operatorPipeOp2 instanceof Operator)) {
            throw new Error(
              `Expected operator at position 2, got ${typeof operatorPipeOp2}`
            );
          }

          // remake operator 2 with higher values
          operatorPipeOp2.argNames = operatorPipeOp2.argNames.map((str) =>
            str.replace(/(?<=[a-zA-Z])\d+/g, (match) => Number(match) + 3)
          );

          let code2 = operatorPipeOp2
            .toString()
            .replace(/(?<=[a-zA-Z])\d+/g, (match) => Number(match) + 3);
          code2 = code2.substring(code2.indexOf("\n") + 1).substring(3).slice(0, -1);

          let code1 = operatorPipeOp1.toString();
          code1 = code1.substring(code1.indexOf("\n") + 1).substring(3).slice(0, -1);

          let code = code1.replace(
            "return",
            `${operatorPipeOp2.argNames[0]} = `
          ) + "\n" + code2;

          let returnOp = new Operator(
            operatorPipeOp1.signature.slice(0, -1).concat(operatorPipeOp2.signature.slice(1)),
            operatorPipeOp1.argNames.concat(operatorPipeOp2.argNames.slice(1)),
            code
          );
          return returnOp;
        }
      );
    }
  }
  let list = {
    Operator,
    BooleanAndOperator,
    BooleanNandOperator,
    BooleanNorOperator,
    BooleanNotOperator,
    BooleanOrOperator,
    NumberAdditionOperator,
    NumberSubtractionOperator,
    NumberMultiplicationOperator,
    NumberDivisionOperator,
    NumberMaximumOperator,
    OperatorPipe
  }
  // Assuming all your classes are defined in this file
  // Loop through all properties of the module object
  for (let prop in list) {
    // Check if the property is not a built-in property of the module object
    if (list.hasOwnProperty(prop)) {
      // Add the property to the window object
      window[prop] = list[prop];
    }
  }
}