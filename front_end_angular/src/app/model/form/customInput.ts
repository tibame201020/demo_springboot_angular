export interface CustomInput {
  fieldName: string;
    type: string;
    value: string;
    palceholder: string;
    require: {
        valid: boolean;
        errorMsg: string;
    };
    regexs: {
        valid: boolean;
        pattern: any;
        errorMsg: string;
    };
    customRule: {
      valid: boolean;
      rule: any;
      errorMsg: string;
  }
}

// customInput:CustomInput = {
//   fieldName: 's',
//   required: true,
//   pattern: true,
//   regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
//   custom: true,
//   custoumRule: function (value: string) {
//     if (value.length == 2) {
//       return false;
//     } else {
//       return true;
//     }
//   },
//   requiredMsg: '',
//   patternMsg: '',
//   customMsg: ''
// }
