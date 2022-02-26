import { CustomForm } from "./customFrom";
export const customFromDefaultSetting: CustomForm = {
  formTitle: "defalut title",
  customInputArray: [],
  formBtn: {
    valid: "send the form",
    unvalid: "Plz Enter The Necessary Info"
  },
  submitFunction: function (formValue: any) {
    console.log(formValue);
  }
}
