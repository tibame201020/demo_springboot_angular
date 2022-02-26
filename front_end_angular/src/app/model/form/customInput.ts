import { customInputDefaultSetting } from "./defalut-custom-setting";

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


export class CustomInputBulider implements CustomInput {
  constructor() {
  }
  fieldName: string = '';
  type: string = 'text';
  value: string = '';
  palceholder: string = '';
  require: { valid: boolean; errorMsg: string; } = { valid: false, errorMsg: 'this field is required' };
  regexs: { valid: boolean; pattern: any; errorMsg: string; } = { valid: false, pattern: undefined, errorMsg: 'the enter value is un-correct' };
  customRule: { valid: boolean; rule: any; errorMsg: string; } = { valid: false, rule: undefined, errorMsg: 'this enter value is un-valid' };

  setFieldName(fieldName: string): CustomInputBulider {
    this.fieldName = fieldName;
    return this;
  }

  setType(type: string): CustomInputBulider {
    this.type = type;
    return this;
  }
  setValue(value: string): CustomInputBulider {
    this.value = value;
    return this;
  }
  setPlaceholder(palceholder: string): CustomInputBulider {
    this.palceholder = palceholder;
    return this;
  }
  setRequire(valid: boolean): CustomInputBulider {
    this.require.valid = valid;
    return this;
  }
  setRequireErrMsg(msg: string): CustomInputBulider {
    this.require.valid = true;
    this.require.errorMsg = msg;
    return this;
  }
  setRegex(pattern:any): CustomInputBulider {
    this.regexs.valid = true;
    this.regexs.pattern = pattern;
    return this;
  }
  setRegexErrMsg(msg: string): CustomInputBulider {
    this.regexs.errorMsg = msg;
    return this;
  }
  setCustom(rule: any): CustomInputBulider {
    this.customRule.valid = true;
    this.customRule.rule = rule;
    console.log(this.customRule.rule('test'));
    return this;
  }
  setCustomErrMsg(msg: string): CustomInputBulider {
    this.customRule.errorMsg = msg;
    return this;
  }

  bulid():CustomInput {
    return this;
  }




}
