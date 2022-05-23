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
              <h5 class="modal-title">Add News</h5>
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
                      v-model="newsInfo.title"
                    />
                    <label for="floatingInput">Title</label>
                  </div>
                  <div
                    class="videoUpLoad mx-3 mt-3 p-3 d-flex align-items-center"
                  >
                    <label for="caseCoverPhoto" class="p-5 px-0"
                      ><span v-if="!newsInfo.coverPhotoURL">
                        <i class="fa-solid fa-image"></i>Upload News Cover Photo
                      </span>
                      <img
                        :src="newsInfo.coverPhotoURL"
                        alt=""
                        v-if="newsInfo.coverPhotoURL"
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
                      v-model="newsInfo.content"
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
              <button type="button" class="btn" @click="uploadNews">
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
          news
        </h1>

        <!-- add content plus-icon-button -->
        <div class="plus-btn" :class="{ 'scrolled-plus-icon': scrollPlusIcon }" v-if="user">
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
        <template v-for="news in allNews" :key="news">
          <div class="card box-shadow" @click="redirectNewsContent(news.id)">
            <img
              :src="news.CoverPhotoURL"
              class="card-img-top"
              alt="align-items-auto"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{news.Title}}
              </h5>
              <h6 class="card-text">{{news.TimeStamp}}</h6>
            </div>
          </div>
        </template>
        <!-- <div class="card box-shadow">
          <router-link :to="{ name: 'news1' }">
            <img
              src="@/assets/news.png"
              class="card-img-top"
              alt="align-items-auto"
            />
            <div class="card-body">
              <h5 class="card-title">
                IPSI-7 Summary Report and Presentation Abstracts..
              </h5>
              <h6 class="card-text">Dec. 4, 2019</h6>
            </div>
          </router-link>
        </div>

        <div class="card box-shadow">
          <router-link :to="{ name: 'news2' }">
            <img
              src="@/assets/news.png"
              class="card-img-top"
              alt="align-items-auto"
            />
            <div class="card-body">
              <h5 class="card-title">29 May 2019: Seminar on..</h5>
              <h6 class="card-text">Dec. 4, 2019</h6>
            </div>
          </router-link>
        </div>

        <div class="card box-shadow">
          <router-link :to="{ name: 'news3' }">
            <img
              src="@/assets/news.png"
              class="card-img-top"
              alt="align-items-auto"
            />
            <div class="card-body">
              <h5 class="card-title">
                Gonglaoping Community, Fengyuan Dist., Taichung..
              </h5>
              <h6 class="card-text">Nov. 26, 2019</h6>
            </div>
          </router-link>
        </div> -->
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
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
export default {
  components: { VueEditor },
  created() {
    this.getAllNews();
  },
  data() {
    return {
      loading: null,
      allNews: [],
      newsInfo: {
        title: "",
        timeStamp: new Date(),
        content: "",
        coverPhotoName: "",
        coverPhotoURL: "",
      },
    };
  },
    computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getAllNews() {
      const newsArray = [];
      const dataBase = collection(db, "News");
      const dbResult = await getDocs(
        query(dataBase, orderBy("TimeStamp", "desc"))
      );
      dbResult.docs.forEach((doc) => {
        newsArray.push({ ...doc.data(), id: doc.id });
      });
      this.allNews = newsArray;
      console.log(this.allNews);
    },
    redirectNewsContent(id){
      this.$router.push(`/news/${id}`);
    },
    fileChange(event) {
      this.file = event.target.files[0];
      const fileName = this.file.name;
      console.log(fileName);
      this.newsInfo.coverPhotoName = fileName;
      this.newsInfo.coverPhotoURL = URL.createObjectURL(this.file);
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
    uploadNews() {
      if (this.newsInfo.title == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure title field has been filled!",
        });
        return;
      }  else if (this.newsInfo.coverPhotoURL == "" || !this.file) {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure cover photo has been updated!",
        });
        return;
      } else if (this.newsInfo.content == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please ensure new content field has been filled!",
        });
        return;
      } else {
        this.loading = true;
        var date = this.newsInfo.timeStamp;
        var dateString = date.toDateString();
        const storageRef = ref(
          storage,
          `/NewsPhotos/CoverPhoto/${this.newsInfo.coverPhotoName}`
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
            const colRef = collection(db, "News");
            await addDoc(colRef, {
              Title: this.newsInfo.title,
              CoverPhotoName: this.newsInfo.coverPhotoName,
              CoverPhotoURL: downloadURL,
              Content: this.newsInfo.content,
              TimeStamp: dateString,
            });
            this.loading = false;
            document.getElementById("close-modal").click();
            this.$router.go(0)
          }
        );
      }
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
    height: 350px;
    border-radius: 5px;
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

    .card-body {
      height: 150px;
    }

    h6 {
      margin-bottom: 1rem;
      position: absolute;
      bottom: 0;
    }
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
          color: #fff;
          background-color: #66bb6a;
          border-radius: 50%;

          svg {
            height: 20px;
            width: 20px;
          }
        }
      }
    }
  }

  // modal setting
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

  .videoUpLoad {
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
}
</style>