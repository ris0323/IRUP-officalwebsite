<template>
  <main>
    <LoadingComponent v-show="loading" />
    <div class="container">
      <div class="modal fade" tabindex="-1" id="NewCaseModal">
        <div
          class="
            modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl
          "
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Case Study</h5>
              <button
                type="button"
                class="btn-close"
                id="close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="inputs">
                  <!-- case title -->
                  <div class="caseTitle form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Case Title"
                      v-model="caseTitle"
                    />
                    <label for="floatingInput">Case Title</label>
                  </div>
                  <!-- subtitle -->
                  <div class="subtitle form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Subtitle"
                      v-model="subtitle"
                    />
                    <label for="floatingInput subtitle">Subtitle</label>
                  </div>
                  <div
                    class="
                      caseCoverPhoto
                      mx-3
                      mt-3
                      p-3
                      d-flex
                      align-items-center
                    "
                  >
                    <label for="caseCoverPhoto" class="p-5 px-0"
                      ><span v-if="!coverPhotoURL">
                        <i class="fa-solid fa-image"></i>Upload Cover Photo
                        (PNG, JPG)
                      </span>
                      <img :src="coverPhotoURL" alt="" v-if="coverPhotoURL" />
                      <input
                        type="file"
                        ref="caseCoverPhoto"
                        id="caseCoverPhoto"
                        @change="fileChange"
                        accept=".png, .jpg, ,.jpeg"
                      />
                    </label>

                    <!-- <button
                      v-if="coverPhotoURL"
                      data-bs-toggle="modal"
                      data-bs-target="#photoPreview"
                    >
                      Preview
                    </button> -->
                  </div>

                  <div class="caseContent mx-3 mt-3">
                    <vue-editor
                      v-model="caseContent"
                      :editorOptions="editorSettings"
                      useCustomImageHandler
                      @image-added="imageHandler"
                    ></vue-editor>
                  </div>
                </div>
                <!-- <div
                  class="errorMsg d-flex justify-content-center mt-3 mx-3"
                  v-if="error"
                >
                  {{ errMsg }}
                </div> -->
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" @click="uploadCaseStudy">
                SAVE
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="loading"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="title position-relative">
        <h1 class="uppercase text-center d-flex justify-content-center">
          case studies
        </h1>

        <!-- add content button -->
        <div class="plus-btn" v-if="user">
          <span
            class="d-flex justify-content-center add-btn align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#NewCaseModal"
          >
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>
      </div>

      <div class="content">
        <template v-for="caseStudy in caseStudies" :key="caseStudy">
          <div
            class="card h-100 box-shadow"
            @click="redirectCase(caseStudy.id)"
          >
            <div class="img">
              <img
                :src="caseStudy.CoverPhotoURL"
                class="card-img-top"
                alt="align-items-auto"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">
                {{ caseStudy.Title }}
              </h5>
              <!-- <h6 class="card-text">Farmers of Liyu community..</h6> -->
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import { VueEditor, Quill } from "vue3-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module--fix-imports-error";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import { db, storage } from "../firebase/firebaseinit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export default {
  components: {
    VueEditor,
  },
  created() {
    this.getAllCases();
  },
  data() {
    return {
      caseStudies: [],
      caseTitle: "",
      subtitle: "",
      caseContent: "",
      coverPhotoURL: "",
      coverPhotoName: "",
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        },
      },
      loading: null,
      // error: null,
      // errMsg: "",
    };
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    async getAllCases() {
      const caseArray = [];
      const dataBase = collection(db, "CaseStudies");
      const dbResult = await getDocs(
        query(dataBase, orderBy("TimeStamp", "desc"))
      );
      dbResult.docs.forEach((doc) => {
        caseArray.push({ ...doc.data(), id: doc.id });
      });
      this.caseStudies = caseArray;
      // console.log(this.caseStudies);
    },
    fileChange(event) {
      this.file = event.target.files[0];
      const fileName = this.file.name;
      console.log(fileName);
      this.coverPhotoName = fileName;
      this.coverPhotoURL = URL.createObjectURL(this.file);
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = ref(storage, `CaseStudiesPhotos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot),
          (err) => {
            console.log(err);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          };
      });
    },
    uploadCaseStudy() {
      var date = new Date();
      var dateresult = date.toDateString();
      if (this.caseTitle.length !== 0 && this.caseContent.length !== 0) {
        if (this.file) {
          // console.log(this.caseContent, dateresult);
          this.loading = true;
          const storageRef = ref(
            storage,
            `/CaseStudiesPhotos/${this.coverPhotoName}`
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
              const colRef = collection(db, "CaseStudies");
              await addDoc(colRef, {
                Title: this.caseTitle,
                Subtitle: this.subtitle,
                CoverPhotoName: this.coverPhotoName,
                CoverPhotoURL: downloadURL,
                Content: this.caseContent,
                TimeStamp: dateresult,
              });
              this.loading = false;
              document.getElementById("close-modal").click();
            }
          );
        } else {
          this.$snackbar.add({
            type: "error",
            text: "Please upload a cover photo for this case!",
          });
          return;
          // this.error = true;
          // this.errMsg = "Please upload a cover photo for this case!";
          // setTimeout(() => {
          //   this.error = false;
          // }, 3000);
        }
      } else {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure Title & Content has been filled!",
        });
        return;
        // this.error = true;
        // this.errMsg = "Please ensure Title & Content has been filled!";
        // setTimeout(() => {
        //   this.error = false;
        // }, 3000);
      }
    },
    redirectCase(id) {
      this.$router.push(`/casestudies/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  @media (min-width: 1000px) and (max-width: 1400px) {
    .card:last-child:nth-child(2n-1) {
      margin-right: calc(320px + 4.5rem) !important;
    }
  }

  h1 {
    text-align: center;
  }

  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;
    position: relative;
    z-index: 1;
  }

  .card {
    width: 350px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background-color: white;
    border: 0px solid #fff;
    transition: 0.3s ease-in-out;
    text-decoration: none;
    color: #333;
    cursor: pointer;

    &:hover {
      color: #66bb6a;
    }

    .img {
      height: 200px;
      overflow: hidden;
    }

    .card-body {
      height: 150px;
    }
  }
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

.caseCoverPhoto {
  border: 1px solid rgb(195, 202, 210);
  border-radius: 3px;
  overflow: hidden;

  svg {
    width: 20px;
    margin-right: 1rem;
    color: #66bb6a;
  }

  label {
    width: 100%;
    height: 100%;
    color: #333;
    cursor: pointer;

    input {
      display: none;
    }
  }
}

.errorMsg {
  color: red;
}

// plus icon
.title {
  .plus-btn {
    position: absolute;
    bottom: -5px;
    right: 5rem;
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

  @media (max-width: 850px) {
    .plus-btn {
      bottom: 0;
      right: 0;

      .add-btn {
        height: 40px;
        width: 40px;

        svg {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
}
</style>