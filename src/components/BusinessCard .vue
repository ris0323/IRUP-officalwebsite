<template>
  <div class="cards p-4 m-4">
    <div class="d-flex flex-column justify-content-end edit-icons" v-if="user">
      <div
        v-if="loading"
        class="d-flex justify-content-center spinner-grow"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <span
        class="d-flex justify-content-center align-items-center edit-icon"
        v-if="!edit"
        @click="toggleEdit"
      >
        <i class="fas fa-pen-nib"></i>
      </span>
      <span
        class="d-flex justify-content-center align-items-center save-icon"
        v-if="edit && !loading"
        @click="updateMember"
      >
        <i class="fa-solid fa-floppy-disk"></i>
      </span>
      <span
        class="d-flex justify-content-center align-items-center delete-icon"
        @click="deleteMember(member.id)"
        ><i class="fas fa-trash"></i>
      </span>
    </div>
    <div class="d-flex">
      <img :src="member.profilePhoto" />
      <div class="d-flex flex-column justify-content-center m-4">
        <div class="mb-3">
          <h5 v-if="!edit">{{ member.profileName }}</h5>
          <input v-if="edit" type="text" v-model="localProfile.name" />
        </div>
        <div class="contact">
          <p>
            <span class="icon"><i class="fa-solid fa-phone fa-lg"></i></span>
            <span v-if="!edit">
              {{ member.contactPhone }}
            </span>
            <input v-if="edit" type="text" v-model="localProfile.phone" />
          </p>
          <p>
            <span class="icon"><i class="fa-solid fa-envelope fa-lg"></i></span
            ><span v-if="!edit">
              {{ member.contactEmail }}
            </span>
            <input v-if="edit" type="text" v-model="localProfile.email" />
          </p>
        </div>
      </div>
    </div>
    <div class="">
      <h6
        class="text-break my-3"
        v-html="member.profileContent"
        v-if="!edit"
      ></h6>
      <VueEditor
        v-if="edit"
        class="ql-editor"
        v-model="localProfile.content"
        placeholder="Description"
      />
    </div>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseinit";
import { deleteDoc, doc } from "firebase/firestore";
import { VueEditor } from "vue3-editor";
import { updateDoc } from "@firebase/firestore";
export default {
  name: "BusinessCard",
  props: ["member"],
  components: {
    VueEditor,
  },
  data() {
    return {
      loading: null,
      edit: null,
      localProfile: {
        name: this.member.profileName,
        phone: this.member.contactPhone,
        email: this.member.contactEmail,
        content: this.member.profileContent,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    updateMember() {
      this.loading = true;
      console.log(this.member.profileName);
      const docRef = doc(db, "executiveBoard", this.member.id);
      updateDoc(docRef, {
        profileName: this.localProfile.name,
        contactEmail: this.localProfile.email,
        contactPhone: this.localProfile.phone,
        profileContent: this.localProfile.content,
      })
        .then(() => {
          console.log("update completed");
          this.loading = false;
          this.edit = false;
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMember(id) {
      console.log(id);
      let text = `You are deleting ${this.member.profileName} from Executive Board... \n Are you sure you want to do this?`;
      if (confirm(text) == true) {
        const docRef = doc(db, "executiveBoard", id);
        deleteDoc(docRef)
          .then(() => {
            this.$router.go();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (min-width:1072px){
  .cards:last-child:nth-child(2n-1){
  margin-right: calc(500px + 4.5rem) !important;
}
}
.cards {
  width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

// .cards:last-child:nth-last-child(2n-1){
//   margin-right: calc(37% + 8% / 3) !important;
// }

.contact p {
  margin-bottom: 1rem;
  white-space: nowrap;
}

.icon {
  color: #66bb6a;
  margin: 0 1rem 0 0;
}
img {
  width: 30%;
  height: 30%;
  border-radius: 50%;
}
.edit-icons {
  position: absolute;
  right: 3%;
  top: 3%;
}

.spinner-grow {
  height: 35px;
  width: 35px;
  color: #fff;
  background-color: #66bb6a;
  border-radius: 50%;
  cursor: pointer;
  margin: 0.2rem 0;

  &:hover {
    background-color: #396e3c;
  }

  svg {
    height: 1rem;
    margin: 8px;
  }
}

.edit-icon {
  height: 35px;
  width: 35px;
  color: #fff;
  background-color: #66bb6a;
  border-radius: 50%;
  margin: 0.2rem 0;
  cursor: pointer;

  &:hover {
    background-color: #396e3c;
  }

  svg {
    height: 1rem;
  }
}

.save-icon {
  height: 35px;
  width: 35px;
  color: #fff;
  background-color: #66bb6a;
  border-radius: 50%;
  margin: 0.2rem 0;
  cursor: pointer;

  &:hover {
    background-color: #396e3c;
  }

  svg {
    height: 1rem;
  }
}

.delete-icon {
  height: 35px;
  width: 35px;
  color: #fff;
  background-color: #66bb6a;
  border-radius: 50%;
  cursor: pointer;
  margin: 0.2rem 0;

  &:hover {
    background-color: #396e3c;
  }

  svg {
    height: 1rem;
    margin: 8px;
  }
}

p {
  margin-bottom: 0 !important;
}
</style>