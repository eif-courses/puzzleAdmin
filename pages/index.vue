<template>
  <div>
    <div v-if="authenticatedUser">
      <p>You are logged in as {{ authenticatedUser.email }}.</p>
      <p>Logout?</p>
      <button @click.prevent="logout">
        Logout
      </button>
      <button @click.prevent="writeToFirestore">
        SAVE TO FIRESTORE
      </button>
    </div>
    <div v-else>
      <input id="hasAccount" :value="false" v-model="needsAccount" type="radio">
      <label for="hasAccount">I have an account</label>
      <br>
      <input id="needsAcctouns" :value="true" v-model="needsAccount" type="radio">
      <label for="needsAcctouns">I need an account</label>
      <form @submit.prevent="loginOrRegister">
        <input v-model="email" type="email" placeholder="Your email address">
        <input v-model="registrationPassword" type="password" placeholder="Your password">
        <input
          v-if="needsAccount"
          v-model="registrationPassword"
          type="password"
          placeholder="Re-enter Password"
        >
        <button v-text="needsAccount ? 'Register' : 'Login'" />
      </form>
    </div>

    <div>
      <v-btn
        @click.native="selectFile"
        v-if="!uploadEnd && !uploading"
      >
        Upload a cover image
        <v-icon
          right
          aria-hidden="true"
        >
          add_a_photo
        </v-icon>
      </v-btn>
      <form ref="form">
        <input
          id="files"
          ref="uploadInput"
          :multiple="true"
          @change="detectFiles($event)"
          type="file"
          name="file"
          accept="image/*"
        >
      </form>
      <v-progress-circular
        v-if="uploading && !uploadEnd"
        :size="100"
        :width="15"
        :rotate="360"
        :value="progressUpload"
        color="primary"
      >
        {{ progressUpload }}%
      </v-progress-circular>

      <div v-if="uploadEnd">
        <v-btn
          @click="deleteImage()"
          class="ma-0"
          dark
          small
          color="error"
        >
          Delete
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
      ref: firebase.firestore().collection('levels'),
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      urlAddress: []
    }
  },
  firestore () {
    return {
      levels: firebase.collection('levels')
    }
  },
  watch: {
    uploadTask () {
      this.uploadTask.on('state_changed', (sp) => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
        })
      })
    }
  },
  asyncData () {
    const provincesArray = []
    const housesArray = []

    // await firebase.firestore()
    //   .collection('levels')
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       provincesArray.push(doc.data())
    //       console.log(doc.data())
    //     })
    //   })

    // await firebase.firestore()
    //   .collection('houses')
    //   .where('valid_until', '>', date)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       housesArray.push(doc.data())
    //     })
    //   })

    return {
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: '',
      needsAccount: false,
      provinces: provincesArray,
      houses: housesArray
    }
  },

  created () {
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  methods: {

    writeToFirestore () {
      const temp = []
      for (let i = 0; i < this.urlAddress.length; i++) {
        const starsRef = firebase.storage().ref().child('images/' + this.urlAddress[i])
        starsRef.getDownloadURL().then((url) => {
          temp.push(url)
          console.log(url)

          localStorage.setItem('temp', temp)

          return temp
          // Insert url into an <img> tag to "download"
        }).then((t) => {
          const retrievedObject = localStorage.getItem('temp')
          firebase.firestore().collection('levels').add({
            assets: ['' + retrievedObject[0], '' + t[1], '' + t[2], '' + t[3], '' + t[4]],
            category: 'Nature',
            id: 1,
            name: 'Gamta',
            question: 'Kodel ne?',
            timestamp: new Date()
          })
        })
      }
    },
    register () {
      // if (this.password === this.registrationPassword) {
      //   firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(this.email, this.password)
      // } else {
      //   // display error message
      // }
    },
    login () {
      firebase.auth().signInWithEmailAndPassword('eif@viko.lt', 'eif.viko.lt')
    },
    loginOrRegister () {
      if (this.needsAccount) {
        this.register()
      } else {
        this.login()
      }
    },
    logout () {
      firebase.auth().signOut()
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      const fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x])
        console.log(fileList[x].name)
        this.urlAddress.push(fileList[x].name)
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firebase.storage().ref('images/' + file.name).put(file)
    },
    deleteImage () {
      firebase.storage()
        .ref('images/' + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
      this.$refs.form.reset()
    }
  }
}
</script>
<style>
  .progress-bar {
    margin: 10px 0;
  }
  input[type="file"] {
    position: absolute;
    clip: rect(0,0,0,0);
  }
</style>
