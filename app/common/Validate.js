/**
 * Created by InspireUI on 02/03/2017.
 *
 * @format
 */

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//const mobileRegex = /^[0]?[789]\d{10}$/;
//const mobileRegex = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
class Validate {
  constructor() {
    this.emailRegex = emailRegex;
    // this.mobileRegex = mobileRegex;
  }

  isEmpty(...data) {
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) return true;
    }
    return false;
  }

  isEmail(email) {
    return this.emailRegex.test(email);
  }  
}

export default new Validate();