import { CustomInput } from "./customInput";

export interface CustomForm {
  formTitle:string,
  customInputArray:CustomInput[],
  formBtn:{
    valid:string,
    unvalid:string
  },
  submitFunction:any
}

// customForm:CustomForm = {
//   formTitle: 'formTitle',
//   customInputArray: [
//     {
//       fieldName: 's',  // the fieldName can't be the same!
//       required: true,
//       pattern: true,
//       regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
//       custom: false,
//       custoumRule: function (value: string) {
//         //can doSomething here
//       },
//       requiredMsg: '',
//       patternMsg: '',
//       customMsg: ''
//     },
//     {
//       fieldName: '2s',  // the fieldName can't be the same!
//       required: true,
//       pattern: true,
//       regex: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
//       custom: false,
//       custoumRule: function (value: string) {
//         if (value.length == 2) {
//           return false;
//         } else {
//           return true;
//         }
//       },
//       requiredMsg: 'custom requiredMsg',
//       patternMsg: 'custom patternMsg',
//       customMsg: 'custom customMsg'
//     }
//   ],
//   formBtn: {
//     valid: 'send the form',
//     unvalid: 'Plz Enter The Necessary Info'
//   },
//    submitFunction:function () {}
// }
