import axios from 'axios';

const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

export default {
  _user: defaultUser,
  loggedIn() {
    return !!this._user;
  },

  async logIn(email, password) {
    try {
      // Send request
      console.log(email, password);
      this._user = { ...defaultUser, email };
      
      const response = await axios.post("/login", {
          username: email,
          password: password
      })
      
      
      // console.log(response);
      console.log("response token "+ response.data.token);
      console.log("encoded cookie " + btoa(response.data.token));
      // console.log("SESSION" + this.$cookies.get("SESSION"));
      // this.$cookies.set("SESSION", btoa(response.data.token));
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  },

  async logOut() {
    this._user = null;
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },

  async changePassword(email, recoveryCode) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
};
