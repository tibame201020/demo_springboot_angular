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
