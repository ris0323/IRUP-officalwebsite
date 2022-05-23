<template>
  <main>
    <LoadingComponent v-show="loading" />
    <div class="case">
      <div class="edit-icons d-flex flex-column" v-if="user">
        <span
          class="d-flex justify-content-center align-items-center edit-icon"
          data-bs-toggle="modal"
          data-bs-target="#EditCaseModal"
        >
          <i class="fas fa-pen-nib"></i>
        </span>

        <span
          class="d-flex justify-content-center align-items-center delete-icon"
          @click="deleteCase"
        >
          <i class="fas fa-trash"></i>
        </span>
      </div>

      <h1 class="title text-uppercase">
        {{ caseStudy.Title }}
      </h1>
      <h5>{{ caseStudy.Subtitle }}</h5>
      <h6 class="date">{{ caseStudy.TimeStamp }}</h6>
      <img :src="caseStudy.CoverPhotoURL" alt="" class="mb-4" />

      <div class="content ql-editor" v-html="caseStudy.Content"></div>
    </div>
    <div class="modal fade" tabindex="-1" id="EditCaseModal">
      <div
        class="
          modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl
        "
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Case Study</h5>
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
                    v-model="caseStudy.Title"
                  />
                  <label for="floatingInput">Case Title</label>
                </div>
                <!-- subtitle -->
                <div class="subtitle form-floating mx-3 mt-3">
                  <input
                    class="type-in-box form-control"
                    type="text"
                    placeholder="Subtitle"
                    v-model="caseStudy.Subtitle"
                  />
                  <label for="floatingInput subtitle">Subtitle</label>
                </div>
                <!-- <div class="caseTitle">
                    <label for="caseTitle">Case Title</label>
                    <br />
                    <input type="text" v-model="caseTitle" />
                    <br />
                    <label for="subtitle">Subtitle</label>
                    <br />
                    <input type="text" v-model="subtitle" />
                  </div> -->
                <div
                  class="caseCoverPhoto mx-3 mt-3 p-3 d-flex align-items-center"
                >
                  <label for="caseCoverPhoto" class="p-5 px-0"
                    ><span v-if="!caseStudy.CoverPhotoURL">
                      <i class="fa-solid fa-image"></i>Upload Case Cover Photo
                    </span>
                    <img
                      :src="caseStudy.CoverPhotoURL"
                      alt=""
                      v-if="caseStudy.CoverPhotoURL"
                    />
                    <input
                      type="file"
                      ref="caseCoverPhoto"
                      id="caseCoverPhoto"
                      @change="fileChange"
                      accept=".png, .jpg, ,.jpeg"
                    />
                  </label>

                  <br />

                  <br />
                </div>

                <div class="caseContent mx-3 mt-3">
                  <vue-editor
                    v-model="caseStudy.Content"
                    :editorOptions="editorSettings"
                    useCustomImageHandler
                    @image-added="imageHandler"
                  ></vue-editor>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" @click="updateCaseStudy">
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
  </main>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { VueEditor, Quill } from "vue3-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module--fix-imports-error";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import { db, storage } from "@/firebase/firebaseinit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDoc, doc, updateDoc,deleteDoc } from "firebase/firestore";
export default {
  created() {
    this.getCaseStudy();
  },
  components: { VueEditor },
  data() {
    return {
      caseStudy: null,
      loading: null,
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        },
      },
    };
  },
    computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    getCaseStudy() {
      const docRef = doc(db, "CaseStudies", String(this.$route.params.caseID));
      getDoc(docRef).then((doc) => {
        this.caseStudy = doc.data();
      });
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
    updateCaseStudy() {
      console.log(this.$route.params.caseID);
      this.loading = true;
      const docRef = doc(db, "CaseStudies", String(this.$route.params.caseID));
      updateDoc(docRef, {
        Title: this.caseStudy.Title,
        Subtitle: this.caseStudy.Subtitle,
        CoverPhotoURL: this.caseStudy.CoverPhotoURL,
        Content: this.caseStudy.Content,
      })
        .then(() => {
          console.log("update completed");
          this.loading = false;
          this.$router.go();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    deleteCase() {
      let text = `You are deleting this case  \n Are you sure you want to do this?`;
      if (confirm(text) == true) {
        const docRef = doc(
          db,
          "CaseStudies",
          String(this.$route.params.caseID)
        );

        deleteDoc(docRef)
          .then(() => {
            this.$router.push("/casestudies");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/vue3-editor.scss";

.case {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  .edit-icons {
    position: fixed;
    z-index: 2;
    right: 4vw;
    bottom: 4vh;
  }

  .edit-icon {
    height: 55px;
    width: 55px;
    color: #fff;
    background-color: #66bb6a;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0.2rem 0;
    cursor: pointer;

    &:hover {
      background-color: #396e3c;
      scale: 1.2;
      transition: 0.2s;
    }

    svg {
      height: 20px;
    }

    @media (max-width: 850px) {
      height: 40px;
      width: 40px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .delete-icon {
    height: 55px;
    width: 55px;
    color: #fff;
    background-color: #66bb6a;
    opacity: 0.9;
    border-radius: 50%;
    margin: 0.2rem 0;
    cursor: pointer;

    &:hover {
      background-color: #396e3c;
      scale: 1.2;
      transition: 0.2s;
    }

    svg {
      height: 25px;
    }

    @media (max-width: 850px) {
      height: 40px;
      width: 40px;

      svg {
        height: 20px;
        width: 20px;
      }
    }
  }

  .date {
    color: #999;
    margin-bottom: 1rem;
  }

  img {
    width: 40%;
  }

  .content {
    margin: 0 6rem;
    text-align: justify;

    h5 {
      margin: 5rem;
    }

    h6 {
      text-align: justify;
      margin-right: 3rem;
    }

    img {
      width: 70%;
      margin: 2rem 0 1rem 0;
    }
  }

  @media (max-width: 850px) {
    padding: 0 0 1vh 0;

    .content {
      display: block;

      h3 {
        margin-bottom: 1rem;
      }

      h6 {
        margin-right: 0;
        text-align: left;
      }

      li {
        text-align: left;
      }

      img {
        margin-top: 2rem;
        width: 60%;
      }
    }

    .edit-icon,
    .delete-icon {
      right: 1rem;
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