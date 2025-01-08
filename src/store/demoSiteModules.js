const psarray = ['teamwork', 'excellence', 'openminded', 'trustworthy', 'innovative']
const demoPs = () => {
  const month = new Date().getMonth() + 1
  const find = month % 5
  const arrayReset = psarray.map((item) => {
    return `${new Date().getFullYear()}` + item
  })
  if (find === 0) {
    return arrayReset[4]
  } else {
    return arrayReset[find - 1]
  }
}

import { defineStore } from 'pinia'
export const demoStore = defineStore('demoStore', {
  state: () => ({
    // * demo
    demoUsername: 'demo@inefi.com',
    // eg:2023trustworthy
    demoPassword: demoPs(),
    demoMode: true,
    demoWelcome: true,
    demoContactDialog: false,
    today: '2024-11-15 22:00',
    // * sessionStorage key name defined
    dataBaseNameArray: {
      profileDevice: 'demo_proifle_device',
      profileAMT: 'demo_profile_amt',
    },
    //demo
    // packageList
    packageList: [],
    // scheduleList
    scheduleList: [],
    // profileList
    profileList: [],
  }),
  actions: {
    demoRedirectToContact() {
      window.open('https://www.inefi.com/contact-us', '_blank')
    },
    updateDemoWelcome(payload) {
      this.demoWelcome = payload
    },
    updateDemoContactDialog(payload) {
      console.log('updateDemoContactDialog')
      this.demoContactDialog = payload
    },
    updatePackageList(payload) {
      this.packageList = payload
    },
    updateScheduleList(payload) {
      this.scheduleList = payload
    },
    updateProfileList(payload) {
      this.profileList = payload
    },
    updateDemoMode(payload) {
      console.log('payload', payload)
      this.demoMode = payload
    },
  },
})
