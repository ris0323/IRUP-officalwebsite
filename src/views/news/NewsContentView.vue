<template>
  <main>
    <LoadingComponent v-show="loading" />

    <div class="summary">
      <div class="modal fade" tabindex="-1" id="EditCaseModal">
        <div
          class="
            modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl
          "
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit News</h5>
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
                      v-model="currentNews.Title"
                    />
                    <label for="floatingInput">Title</label>
                  </div>
                  <div
                    class="videoUpLoad mx-3 mt-3 p-3 d-flex align-items-center"
                  >
                    <label for="caseCoverPhoto" class="p-5 px-0"
                      ><span v-if="!currentNews.CoverPhotoURL">
                        <i class="fa-solid fa-image"></i>Upload News Cover Photo
                      </span>
                      <img
                        :src="currentNews.CoverPhotoURL"
                        alt=""
                        v-if="currentNews.CoverPhotoURL"
                      />
                      <input
                        type="file"
                        ref="caseCoverPhoto"
                        id="caseCoverPhoto"
                        @change="fileChange"
                        accept=".png, .jpg, ,.jpeg"
                      />
                    </label>
                  </div>

                  <div class="caseContent mx-3 mt-3">
                    <vue-editor
                      v-model="currentNews.Content"
                      :editorOptions="editorSettings"
                      useCustomImageHandler
                      @image-added="imageHandler"
                    ></vue-editor>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" @click="updateNews">
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
      <h1 class="title text-uppercase">
        {{ currentNews.Title }}
      </h1>
      <h6 class="comment">{{ currentNews.TimeStamp }}</h6>

      <div class="content ql-editor" v-html="currentNews.Content"></div>
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
            @click="deleteNews"
          >
            <i class="fas fa-trash"></i>
          </span>
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
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default {
  created() {
    this.getCurrentNews();
  },
  components: { VueEditor },
  data() {
    return {
      loading: null,
      currentNews: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    getCurrentNews() {
      const docRef = doc(db, "News", this.$route.params.newsId);
      getDoc(docRef).then((doc) => {
        this.currentNews = doc.data();
      });
    },
    fileChange(event) {
      this.file = event.target.files[0];
      const fileName = this.file.name;
      console.log(fileName);
      this.currentNews.CoverPhotoName = fileName;
      this.currentNews.CoverPhotoURL = URL.createObjectURL(this.file);
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = ref(storage, `NewsPhotos/Photos/${file.name}`);
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
    updateNews() {
      this.loading = true;

      const storageRef = ref(
        storage,
        `/NewsPhotos/CoverPhoto/${this.currentNews.CoverPhotoName}`
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
          const docRef = doc(db, "News", this.$route.params.newsId);
          await updateDoc(docRef, {
            Title: this.currentNews.Title,
            CoverPhotoName: this.currentNews.CoverPhotoName,
            CoverPhotoURL: downloadURL,
            Content: this.currentNews.Content,
          });
          this.loading = false;
          document.getElementById("close-modal").click();
          this.$router.go(0);
        }
      );
    },
    deleteNews() {
      let text = `You are deleting this news post \n Are you sure you want to do this?`;
      if (confirm(text) == true) {
        const docRef = doc(db, "News", this.$route.params.newsId);
        deleteDoc(docRef)
          .then(() => {
            this.$router.push("/news");
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

.summary {
  padding: 0 10vw 5vh 10vw;
  text-align: center;

  .comment {
    color: #999;
    margin-bottom: 1rem;
  }

  .content {
    margin: 5rem 6rem;

    h6 {
      text-align: justify;
      margin-right: 3rem;
    }

    img {
      width: 130%;
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

        li {
          text-align: left;
        }
      }

      img {
        margin-top: 2rem;
        width: 60%;
      }
    }
  }
}

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
</style>