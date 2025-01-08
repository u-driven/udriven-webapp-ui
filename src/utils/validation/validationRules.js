import { reactive } from 'vue'
export default function () {
  const rules = reactive({
    required: { required: true, message: 'Required', trigger: [ 'change', 'blur' ] },
    limitLength30: { min: 1, max: 30, message: 'Length should be 1 to 30', trigger: [ 'change', 'blur' ] },
    limitLength150: { min: 1, max: 150, message: 'Length should be 1 to 150', trigger: [ 'change', 'blur' ] },
    limitLength300: { min: 1, max: 300, message: 'Length should be 1 to 300', trigger: [ 'change', 'blur' ] },
    limitText: {
      pattern: '^[a-zA-Z0-9\\s\\_\\.\u4e00-\u9fa5]{1,30}$',
      message: 'Length should be 1-30 and A-Z, 0-9, _ , . ',
      trigger: [ 'change', 'blur' ]
    },
    pplManufacturer: {
      pattern: '^[A-Z0-9]+([\\- &.]?[A-Z0-9]+)*$',
      message: 'Only allow A-Z, 0-9, space , & . - ',
      trigger: [ 'change', 'blur' ]
    },
    pplCombineManufacturer: {
      pattern: '^[A-Z0-9]+([&\\-. ][A-Z0-9]*)*(\\([A-Z0-9]{4}\\))$',
      message: 'Wrong format. ex. XXXXXXX(XXXX)',
      trigger: [ 'change', 'blur' ]
    },
    pplDesc: {
      pattern: '^[\u4e00-\u9fa5a-zA-Z0-9!@#$%^&*()_+{}\\[\\]:;,.?~\\\\/\\s]+$',
      message: 'Include illegal symbol.'
    },
    pplVid: {
      pattern: '^[A-F0-9]{4}$',
      message: 'Length should be 4 and A-F, 0-9',
      trigger: [ 'change', 'blur' ]
    },
    pplPid: {
      pattern: '^[A-F0-9]{4}$',
      message: 'Length should be 4 and A-F, 0-9',
      trigger: [ 'change', 'blur' ]
    },
    pplModelName: {
      pattern: '^[A-Z0-9\u4E00-\u9FA5](?:[A-Z0-9\u4E00-\u9FA5 -]*[A-Z0-9\u4E00-\u9FA5])?$',
      message: 'Only allow A-Z, 0-9 , Space , - and not allow symbol at the beginning and end',
      trigger: [ 'change', 'blur' ]
    }
  })
  return {
    rules
  }
}
