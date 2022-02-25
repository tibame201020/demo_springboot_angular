export interface CustomInput {
  fieldName:string,
  required:boolean,
  requiredMsg:string,
  pattern:boolean,
  regex:any,
  patternMsg:string,
  custom:boolean,
  custoumRule:any,
  customMsg:string
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
