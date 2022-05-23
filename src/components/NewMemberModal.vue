<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <LoadingComponent v-show="loading" />
      <!-- <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div> -->
      <img :src="profilePhotoURL" alt="" />
      <div class="inputs">
        <label for="profile-photo">Upload Member Photo</label>
        <br />
        <input
          type="file"
          ref="profilePhoto"
          id="profile-photo"
          @change="fileChange"
          accept=".png, .jpg, ,jpeg"
        />
        <div>
          <label for="memberName">Member Name</label>
          <br />
          <input type="text" v-model="profileName" />
        </div>
        <div>
          <label for="profilePhone">Phone</label>
          <br />
          <input type="text" v-model="profilePhone" />
        </div>
        <div>
          <label for="profileEmail">Email</label>
          <br />
          <input type="text" v-model="profileEmail" />
        </div>
        <div>
          <label for="profileContent">Description</label>
          <br />
          <QuillEditor
            theme="snow"
            toolbar="minimal"
            class="ql-editor"
            v-model:content="profileContent"
            contentType="html"
          />
        </div>
      </div>
      <div class="buttons">
        <div class="btn save-btn" @click="addNewMember">
          <i class="fa-solid fa-floppy-disk"></i> SAVE
        </div>
        <div class="btn save-btn" @click="toggleModal">CANCEL</div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from "./LoadingComponent.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { storage, db } from "../firebase/firebaseinit";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  components: {
    QuillEditor,
    LoadingComponent,
  },
  data() {
    return {
      loading: null,
      // error: null,
      // errorMsg: "",
      uploadProgress: 0,
    };
  },
  computed: {
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
    toggleModal() {
      this.$emit("toggle-modal");
    },
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
          return;
          // this.error = true;
          // this.errorMsg = "Please ensure Profile Photo has been uploaded!";
          // setTimeout(() => {
          //   this.error = false;
          // }, 5000);
          // return;
        }
      } else {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure Member Name and Member Description has been filled!",
        });
        return;
        // this.error = true;
        // this.errorMsg =
        //   "Please ensure Member Name and Member Description has been filled!";
        // setTimeout(() => {
        //   this.error = false;
        // }, 5000);
        // return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .invisible {
      opacity: 0 !important;
    }

    .err-message {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #303030;
      opacity: 1;
      transition: 0.5s ease all;

      p {
        font-size: 14px;
      }

      span {
        font-weight: 600;
      }
    }

    img {
      background-color: #ccc;
      margin-top: 16px;
      border-radius: 50%;
      top: 10%;
      left: 55%;
      width: 200px;
      height: 200px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: center;
      label {
        margin-top: 10px;
      }
      input {
        height: 35px;
        width: 100%;
      }
    }
    .buttons {
      width: 100%;
      display: flex;
      justify-content: center;

      .save-btn {
        width: 25%;
        margin: auto;
        margin-top: 20px;
        color: #fff;
        background-color: #66bb6a;
        border-radius: 50px;

        &:hover {
          background-color: #396e3c;
        }
      }
    }
  }
}
</style>
