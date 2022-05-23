<template>
  <main>
    <LoadingComponent v-show="loading" />
    <div class="container">
      <div class="modal fade" tabindex="-1" id="NewVideoModal">
        <div
          class="
            modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl
          "
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Video</h5>
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
                  <!-- video title -->
                  <div class="videoTitle form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Video Title"
                      v-model="videoTitle"
                    />
                    <label for="floatingInput">Title</label>
                  </div>
                  <!-- about video -->
                  <div class="about form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="About"
                      v-model="about"
                    />
                    <label for="floatingInput subtitle">About</label>
                  </div>
                  <!-- video URL -->
                  <div class="videoURL form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Subtitle"
                      v-model="videoURL"
                    />
                    <label for="floatingInput subtitle">Youtube URL</label>
                  </div>
                  <!-- <div
                    class="
                      videoUpLoad
                      mx-3
                      mt-3
                      p-3
                      d-flex
                      align-items-center
                    "
                  >
                    <label for="caseCoverPhoto" class="p-5 px-0"
                      ><span v-if="!coverPhotoURL">
                        <i class="fa-solid fa-video"></i>Upload Video
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
                  </div> -->

                  <!-- <div class="caseContent mx-3 mt-3">
                    <vue-editor
                      v-model="caseContent"
                      :editorOptions="editorSettings"
                      useCustomImageHandler
                      @image-added="imageHandler"
                    ></vue-editor>
                  </div> -->
                </div>
                <!-- <div
                  class="errorMsg d-flex justify-content-center mt-3 mx-3"
                  v-if="error"
                >
                  {{ errMsg }}
                </div> -->
                <YouTube
                  :src="videoURL"
                  width="100%"
                  height="260px"
                  @ready="onReady"
                  ref="youtube"
                  class="youtube"
                  v-if="videoURL"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" @click="submitVideo">
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
          videos
        </h1>

        <!-- add content plus-icon-button -->
        <div class="plus-btn" v-if="user">
          <span
            class="d-flex justify-content-center add-btn align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#NewVideoModal"
          >
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>
      </div>
      <!-- <h1 class="title uppercase">videos</h1> -->

      <div class="content">
        <template v-for="video in videos" :key="video">
          <div class="card box-shadow" v-bind="video">
            <YouTube
              :src="video.VideoURL"
              width="100%"
              height="260px"
              @ready="onReady"
              ref="youtube"
              class="youtube"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{video.VideoTitle}}
              </h5>
              <h6 class="card-text">
                About: {{video.About}}
              </h6>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import YouTube from "vue3-youtube";
import { db } from "@/firebase/firebaseinit";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

export default {
  components: {
    YouTube,
  },
  created() {
    this.getVideos();
  },
  data() {
    return {
      videoTitle: "",
      about: "",
      videoURL: "",
      loading: null,
      videos: [],
    };
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    async getVideos() {
      const videoArray = [];
      const dataBase = collection(db, "Videos");
      const q = query(dataBase, orderBy("TimeStamp", "desc"));
      const dbResult = await getDocs(q);
      dbResult.docs.forEach((doc) => {
        // console.log(doc.data());
        videoArray.push({ ...doc.data() });
        // console.log(videoArray)
      });
      this.videos = videoArray;
    },
    submitVideo() {
      if (this.videoTitle == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please enter Video Title.",
        });
        return;
      }
      // else if (this.videoTitle.length > 30) {
      //   this.$snackbar.add({
      //     type: "error",
      //     text: "The number of characters for Video Title is limited to 30.",
      //   });
      //   return;
      // }
      else if (this.about == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please enter About for this video",
        });
        return;
      }
      // else if (this.about.length > 30) {
      //   this.$snackbar.add({
      //     type: "error",
      //     text: "The number of characters for About is limited to 30.",
      //   });
      //   return;
      // }
      else if (this.videoURL == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please enter Youtube link to your video",
        });
        return;
      } else {
        this.loading = true;
        const TimeStamp = new Date();
        const colRef = collection(db, "Videos");
        addDoc(colRef, {
          VideoTitle: this.videoTitle,
          About: this.about,
          VideoURL: this.videoURL,
          TimeStamp: TimeStamp,
        })
          .then(() => {
            this.loading = false;
            document.getElementById("close-modal").click();
            this.$router.go();
          })
          .catch((err) => {
            this.$snackbar.add({
              type: "error",
              text: `${err.message}`,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
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
    cursor: pointer;
    width: 450px;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background-color: white;
    border: 0px solid #fff;
    transition: 0.3s ease-in-out;
    text-decoration: none;
    color: #333;

    &:hover {
      color: #66bb6a;
    }

    .card-body {
      height: 150px;
    }
  }

  // plus icon
  .title {
    .plus-btn {
      position: fixed;
      right: 4vw;
      bottom: 4vh;
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

    @media (max-width: 850px) {
      .plus-btn {
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