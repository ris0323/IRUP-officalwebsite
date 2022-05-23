<template>
  <main>
    <div class="container">
      <!-- Modal -->
      <div
        class="modal fade"
        id="forgot-password"
        tabindex="-1"
        aria-labelledby="forgot-passwordLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header d-block">
              <h5 class="modal-title" id="forgot-passwordLabel">
                Reset Password
              </h5>

              <button
                type="button"
                class="btn-close position-absolute m-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <p>
                Enter your email below and we'll send you a link to reset it.
              </p>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3" v-if="!isEmailSend">
                <span class="input-group-text">Email</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Please enter your Email"
                  v-model="pswResetEmail"
                />
                <br />
              </div>
              <div class="text-center" v-if="isEmailSend">
                Password Reset Email is sent! Please check your mailbox!
              </div>
              <!-- <div class="error-message" v-if="error">
                {{ errMsg }}
              </div> -->
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="forgetPassword"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="loginBox">
          <h3 class="uppercase">Sign in</h3>

          <div class="inputBox">
            <div class="form-floating mb-3">
              <input
                class="type-in-box form-control"
                id="uname"
                type="text"
                name="Username"
                placeholder="Username"
                v-model="email"
              />
              <label for="floatingInput">Username</label>
            </div>

            <div class="form-floating mb-3">
              <input
                id="pass"
                class="type-in-box form-control"
                type="password"
                name="Password"
                placeholder="Password"
                v-model="password"
              />
              <label for="floatingInput">Password</label>
            </div>
          </div>
          <input
            type="submit"
            class="btn btn-success uppercase"
            value="Login"
            @click="login"
          />

          <router-link
            to="#"
            class="send btn rounded-pill text-center"
            data-bs-toggle="modal"
            data-bs-target="#forgot-password"
            >Forget Password?</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { auth } from "../firebase/firebaseinit";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      pswResetEmail: "",
      isEmailSend: null,
      // error: null,
      // errMsg: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((res) => {
          console.log(res.user.uid);
          onAuthStateChanged(auth, (user) => {
            if (user) {
              this.$store.commit("userStateChange", user);
            }
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    async forgetPassword() {
      sendPasswordResetEmail(auth, this.pswResetEmail)
        .then(() => {
          this.isEmailSend = true;
        })
        .catch((err) => {
          this.$snackbar.add({
            type: "error",
            text: `${err.message}`,
          });
          return;
          // this.error = true;
          // this.errMsg = err.message;
          // setTimeout(() => {
          //   this.error = false;
          // }, 3000);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 40vh;
}

.btn-close {
  top: 0;
  right: 0;
}

.loginBox {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  min-height: 200px;
  background: #e3f0e3;
  border-radius: 10px;
  padding: 40px;
  box-sizing: border-box;
}

@media (max-width: 850px) {
  .loginBox {
    top: 40%;
  }
}

h3 {
  margin: 0;
  padding: 0 0 20px;
  color: #66bb6a;
  text-align: center;
}

.loginBox input {
  width: 100%;
  margin-bottom: 20px;
}

.loginBox input[type="text"],
.loginBox input[type="password"] {
  border: none;
  outline: none;
  color: #333;
  background: #f9f9fa;
  font-size: 1rem;
  box-sizing: border-box;
}

.inputBox {
  position: relative;
}

.inputBox span {
  position: absolute;
  top: 10px;
  color: #333;
}

.loginBox input[type="submit"] {
  border: none;
  outline: none;
  height: 40px;
  font-size: 16px;
  background: #66bb6a;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #3a7e58;
  }
}

.loginBox a {
  color: #333;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  display: block;
}

a:hover {
  color: #3a7e58;
}
.error-message {
  color: red;
  font-weight: 500;
}

.modal-footer {
  .btn {
    width: 100%;
    background: #66bb6a;
    border: none;
    color: #fff;

    &:hover {
      background: #396e3c;
    }
  }
}
</style>
