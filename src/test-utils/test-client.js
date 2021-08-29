const rp = require('request-promise');

class TestClient {
  url;
  options;

  constructor(url) {
    this.url = url;
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    };
  }

  async signup(email, password) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            signup(email: "${email}", password: "${password}") {
              path
              message
            }
          }
        `,
      },
    });
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          logout
        }
        `,
      },
    });
  }

  async forgotPasswordChange(newPassword, key) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
              path
              message
            }
          }
        `,
      },
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              id
              email
            }
          }
        `,
      },
    });
  }

  async login(email, password) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            path
            message
          }
        }
        `,
      },
    });
  }
}

module.exports = {
  TestClient,
};
