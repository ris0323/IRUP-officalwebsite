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
              <h5 class="modal-title">Add New Publication</h5>
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
                  <!-- category-->
                  <div class="category form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Category"
                      v-model="category"
                    />
                    <label for="floatingInput">Category</label>
                  </div>
                  <!-- organization -->
                  <div class="organization form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Organization"
                      v-model="organization"
                    />
                    <label for="floatingInput subtitle">Organization</label>
                  </div>
                  <!-- year -->
                  <div class="year form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="Year"
                      v-model="year"
                    />
                    <label for="floatingInput year">Public Year</label>
                  </div>
                  <!-- description -->
                  <div class="description form-floating mx-3 mt-3">
                    <input
                      class="type-in-box form-control"
                      type="text"
                      placeholder="description"
                      v-model="description"
                    />
                    <label for="floatingInput year">Description</label>
                  </div>
                  <!-- file upload -->
                  <div
                    class="videoUpLoad mx-3 mt-3 p-3 d-flex align-items-center"
                  >
                    <label for="publicationFile" class="p-5 px-0"
                      ><span v-if="!fileURL">
                        <i class="fas fa-file-alt"></i>Upload File (PDF only)
                      </span>
                      <span v-if="fileURL">
                        <i class="fas fa-file-alt"></i>Change File (PDF only)
                      </span>
                      <input
                        type="file"
                        ref="publicationFile"
                        id="publicationFile"
                        @change="fileChange"
                        accept="application/pdf,application/vnd.ms-excel"
                      />
                    </label>
                  </div>
                  <!-- file preview -->
                  <div class="filePreview" v-if="fileURL">
                    <hr />
                    <iframe :src="fileURL" alt="" style="width: 100%"></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" @click="uploadFile">
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
          publication
        </h1>

        <!-- add content plus-icon-button -->
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
      <div class="row justify-content-center mt-5">
        <template v-for="publication in publications" :key="publication">
          <ListCard :publication="publication"
            ><hr
              :style="publication == publications[publications.length - 1] ? 'display: none ;' : ''"
          /></ListCard>
        </template>
      </div>
    </div>
  </main>
</template>
<script>
import ListCard from "@/components/ListCard.vue";
import { storage, db } from "@/firebase/firebaseinit";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default {
  setup() {},
  created() {
    this.getPublications();
  },
  components: {
    ListCard,
  },
    computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      loading: null,
      category: "",
      organization: "",
      year: "",
      description: "",
      fileName: "",
      fileURL: "",
      publications: [],
      infos: [
        { date: "2017" },
        { date: "2018" },
        { date: "2019" },
        { date: "2020" },
      ],
    };
  },
  methods: {
    async getPublications() {
      const fileArray = [];
      const dataBase = collection(db, "Publication");
      const q = query(dataBase, orderBy("Year", "desc"));
      const dbResult = await getDocs(q);
      dbResult.docs.forEach((doc) => {
        // console.log(doc.data());
        fileArray.push({ ...doc.data() });
        // console.log(videoArray)
      });
      this.publications = fileArray;
    },
    fileChange(event) {
      let file = event.target.files[0];
      let formData = new FormData();
      formData.append("pdf", file);
      this.fileName = file.name;
      this.fileURL = URL.createObjectURL(file);
    },
    async uploadFile() {
      if (this.year.length !== 4) {
        this.$snackbar.add({
          type: "error",
          text: "Please enter correct publish year.",
        });
        return;
      } else if (this.fileName == "" || this.fileURL == "") {
        this.$snackbar.add({
          type: "error",
          text: "Please upload a PDF file.",
        });
        return;
      } else {
        this.loading = true;
        const storageRef = ref(
          storage,
          `/PublicationFiles/${this.year}/${this.fileName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, this.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            this.$snackbar.add({
              type: "error",
              text: `${error.message}`,
            });
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const colRef = collection(db, "Publication");
            addDoc(colRef, {
              Category: this.category,
              Organization: this.organization,
              Year: this.year,
              Description: this.description,
              FileName: this.fileName,
              FileURL: downloadURL,
            })
              .then(() => {
                this.loading = false;
                document.getElementById("close-modal").click();
              })
              .catch((error) => {
                this.$snackbar.add({
                  type: "error",
                  text: `${error.message}`,
                });
              });
          }
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
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

      @media (max-width: 850px) {
        .add-btn {
          height: 40px;
          width: 40px;

          svg {
            width: 20px;
            height: 20px;
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
@media screen and (max-width: 1199px) {
  .container {
    max-width: 90%;
  }
}
@media screen and (max-width: 575px) {
  .container {
    max-width: 90%;
  }
}
.line {
  height: 1px;
  background-color: #000;
}
</style>