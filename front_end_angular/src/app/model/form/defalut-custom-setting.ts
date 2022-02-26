export const customInputDefaultSetting = {
  fieldName: '',
  type: 'text',
  value: '',
  palceholder: '',
  require: {
    valid: false,
    errorMsg: 'this field is required'
  },
  regexs: {
    valid: false,
    pattern: undefined,
    errorMsg: 'the enter value is un-correct'
  },
  customRule: {
    valid: false,
    rule: undefined,
    errorMsg: 'this enter value is un-valid'
  }
}
