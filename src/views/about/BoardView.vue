<template>
  <main>
    <div class="">
      <LoadingComponent v-show="loading" />
      <div class="container">
        <!-- Add New Member Modal -->
        <div class="modal" tabindex="-1" id="addNewMember">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add New Member</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="upload-photo">
                  <img :src="profilePhotoURL" alt="" class="photo-preview" />

                  <label class="text-center">
                    <i class="fa-solid fa-user-plus photo-preview"></i>
                    <input
                      type="file"
                      ref="profilePhoto"
                      id="profile-photo"
                      @change="fileChange"
                      accept=".png, .jpg, ,.jpeg"
                    />
                  </label>
                </div>

                <div class="inputs">
                  <div class="name form-floating mx-3 mb-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      name="memberName"
                      placeholder="memberName"
                      v-model="profileName"
                    />
                    <label for="floatingInput memberName">Member's Name</label>
                  </div>

                  <div class="phone form-floating mx-3 my-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      name="profilePhone"
                      placeholder="Phone"
                      v-model="profilePhone"
                    />
                    <label for="floatingInput profilePhone">Phone</label>
                  </div>

                  <div class="email form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      name="profileEmail"
                      placeholder="Email"
                      v-model="profileEmail"
                    />
                    <label for="floatingInput profileEmail">Email</label>
                  </div>

                  <br />
                  <VueEditor
                    class="ql-editor"
                    v-model="profileContent"
                    placeholder="Description"
                  />
                </div>
              </div>
              <!-- <div
                class="err-message d-flex justify-content-center mt-3 mx-3"
                v-if="error"
              >
                <p>{{ this.errorMsg }}</p>
              </div> -->

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addNewMember"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row justify-content-center align-items-center">
        <div class="title position-relative">
          <h1 class="text-center uppercase d-flex justify-content-center">
            Executive Board
          </h1>

          <!-- add content button -->
          <div class="plus-btn" v-if="user">
            <span
              class="d-flex justify-content-center add-btn align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#addNewMember"
            >
              <i class="fa-solid fa-plus"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="conatainer business-card row d-flex justify-content-center">
        <BusinessCard
          :member="member"
          v-for="member in boardMembers"
          :key="member"
        >
        </BusinessCard>
      </div>
    </div>
  </main>
</template>

<script>
import BusinessCard from "@/components/BusinessCard .vue";
import { storage, db } from "@/firebase/firebaseinit";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { VueEditor } from "vue3-editor";

export default {
  setup() {},
  components: {
    BusinessCard,
    VueEditor,
  },
  data() {
    return {
      loading: null,
      // error: null,
      // errorMsg: "",
      uploadProgress: 0,
      //modalActive:null
    };
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    boardMembers() {
      return this.$store.state.boardMembers;
    },
    profilePhotoURL: {
      get() {
        return this.$store.state.profilePhotoURL;
      },
      set(payload) {
        this.$store.commit("updateprofilePhotoURL", payload);
      },
    },
    profileName: {
      get() {
        return this.$store.state.profileName;
      },
      set(payload) {
        this.$store.commit("updateProfileName", payload);
      },
    },
    profilePhone: {
      get() {
        return this.$store.state.profilePhone;
      },
      set(payload) {
        this.$store.commit("updateprofilePhone", payload);
      },
    },
    profileEmail: {
      get() {
        return this.$store.state.profileEmail;
      },
      set(payload) {
        this.$store.commit("updateprofileEmail", payload);
      },
    },
    profileContent: {
      get() {
        return this.$store.state.profileContent;
      },
      set(payload) {
        this.$store.commit("updateprofileContent", payload);
      },
    },
  },
  methods: {
    fileChange(event) {
      this.file = event.target.files[0];
      const fileName = this.file.name;
      console.log(fileName);
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit(
        "updateprofilePhotoURL",
        URL.createObjectURL(this.file)
      );
    },
    addNewMember() {
      // console.log(this.profileName);
      // console.log(this.profileContent);
      console.log(this.$store.state.profilePhotoName);
      if (this.profileName !== "" && this.profileContent !== "") {
        if (this.file) {
          this.loading = true;
          const storageRef = ref(
            storage,
            `/BoardMemberProfile/${this.$store.state.profilePhotoName}`
          );
          const uploadTask = uploadBytesResumable(storageRef, this.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const colRef = collection(db, "executiveBoard");
              await addDoc(colRef, {
                profileName: this.profileName,
                contactEmail: this.profileEmail,
                contactPhone: this.profilePhone,
                profilePhoto: downloadURL,
                profileContent: this.profileContent,
              });
              await this.$store.dispatch("getBoardMembers");
              this.loading = false;
              this.$store.dispatch("getBoardMembers");
              this.$router.go();
            }
          );
        } else {
          this.$snackbar.add({
            type: "error",
            text: "Please ensure Profile Photo has been uploaded!",
          });
          // this.error = true;
          // this.errorMsg = "Please ensure Profile Photo has been uploaded!";
          // setTimeout(() => {
          //   this.error = false;
          // }, 3000);
          return;
        }
      } else {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure Member Name and Member Description has been filled!",
        });
        // this.error = true;
        // this.errorMsg =
        //   "Please ensure Member Name and Member Description has been filled!";
        // setTimeout(() => {
        //   this.error = false;
        // }, 3000);
        return;
      }
    },
    // toggleModal(){
    //   this.modalActive = !this.modalActive
    // }
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  .upload-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: #eee;
    overflow: hidden;
    position: relative;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 130px;

    img {
      position: relative;
      z-index: 10;
    }

    svg {
      color: #fff;
      height: 100px;
    }

    label {
      color: #333;
      position: absolute;
      top: 25%;
      bottom: 0;
      left: 0;
      right: 0;
      cursor: pointer;

      input {
        display: none;
      }
    }
  }

  .inputs {
    position: relative;
    top: -80px;
  }
}

.modal-footer {
  .btn {
    width: 100%;
    background: #66bb6a;
    border: none;

    &:hover {
      background: #396e3c;
    }
  }
}

.bg {
  position: absolute;
  z-index: -98;
  bottom: 40vh;
}

.photo-preview {
  max-width: 100%;
}

.err-message {
  color: red;
}

// plus icon
.title {
  .plus-btn {
    position: fixed;
    right: 4vw;
    bottom: 40px;
    z-index: 2;
    opacity: 0.8;

    .add-btn {
      height: 55px;
      width: 55px;
      color: #fff;
      background-color: #66bb6a;
      border-radius: 50%;

      &:hover {
        background-color: #396e3c;
        scale: 1.2;
        transition: 0.2s;
      }

      svg {
        height: 30px;
        width: 30px;
      }
    }
  }
}
</style>