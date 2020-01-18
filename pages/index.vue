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
      <div>
        <p>Upload an image to Firebase:</p>
        <input @change="previewImage1" type="file" accept="image/*">
      </div>
      <div>
        <p>
          Progress: {{ uploadValue1.toFixed()+"%" }}
          <progress id="progress" :value="uploadValue1" max="100" />
        </p>
      </div>
      <div v-if="imageData1!=null">
        <img :src="picture1" class="preview">
        <br>
        <button @click="onUpload1">
          Upload
        </button>
      </div>
      <div>
        <div>
          <p>Upload an image to Firebase:</p>
          <input @change="previewImage2" type="file" accept="image/*">
        </div>
        <div>
          <p>
            Progress: {{ uploadValue2.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue2" max="100" />
          </p>
        </div>
        <div v-if="imageData2!=null">
          <img :src="picture2" class="preview">
          <br>
          <button @click="onUpload2">
            Upload
          </button>
        </div>
      </div>

      <div>
        <div>
          <p>Upload an image to Firebase:</p>
          <input @change="previewImage3" type="file" accept="image/*">
        </div>
        <div>
          <p>
            Progress: {{ uploadValue3.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue3" max="100" />
          </p>
        </div>
        <div v-if="imageData3!=null">
          <img :src="picture3" class="preview">
          <br>
          <button @click="onUpload3">
            Upload
          </button>
        </div>
      </div>
      <div>
        <div>
          <p>Upload an image to Firebase:</p>
          <input @change="previewImage4" type="file" accept="image/*">
        </div>
        <div>
          <p>
            Progress: {{ uploadValue4.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue4" max="100" />
          </p>
        </div>
        <div v-if="imageData4!=null">
          <img :src="picture4" class="preview">
          <br>
          <button @click="onUpload4">
            Upload
          </button>
        </div>
      </div>
      <div>
        <div>
          <p>Upload an image to Firebase:</p>
          <input @change="previewImage5" type="file" accept="image/*">
        </div>
        <div>
          <p>
            Progress: {{ uploadValue5.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue5" max="100" />
          </p>
        </div>
        <div v-if="imageData5!=null">
          <img :src="picture5" class="preview">
          <br>
          <button @click="onUpload5">
            Upload
          </button>
        </div>
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
      imageData1: null,
      picture1: null,
      uploadValue1: 0,
      imageData2: null,
      picture2: null,
      uploadValue2: 0,
      imageData3: null,
      picture3: null,
      uploadValue3: 0,
      imageData4: null,
      picture4: null,
      uploadValue4: 0,
      imageData5: null,
      picture5: null,
      uploadValue5: 0
    }
  },
  firestore () {
    return {
      levels: firebase.collection('levels')
    }
  },

  asyncData () {
    return {
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: '',
      needsAccount: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => (this.authenticatedUser = user))
  },
  methods: {
    previewImage1 (event) {
      this.uploadValue1 = 0
      this.picture1 = null
      this.imageData1 = event.target.files[0]
    },
    previewImage2 (event) {
      this.uploadValue2 = 0
      this.picture2 = null
      this.imageData2 = event.target.files[0]
    },
    previewImage3 (event) {
      this.uploadValue3 = 0
      this.picture3 = null
      this.imageData3 = event.target.files[0]
    },
    previewImage4 (event) {
      this.uploadValue4 = 0
      this.picture4 = null
      this.imageData4 = event.target.files[0]
    },
    previewImage5 (event) {
      this.uploadValue5 = 0
      this.picture5 = null
      this.imageData5 = event.target.files[0]
    },
    onUpload1 () {
      this.picture1 = null
      const storageRef = firebase.storage().ref(`${this.imageData1.name}`).put(this.imageData1)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => { console.log(error.message) },
      () => {
        this.uploadValue1 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    },
    onUpload2 () {
      this.picture2 = null
      const storageRef = firebase.storage().ref(`${this.imageData2.name}`).put(this.imageData2)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => { console.log(error.message) },
      () => {
        this.uploadValue2 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    },
    onUpload3 () {
      this.picture3 = null
      const storageRef = firebase.storage().ref(`${this.imageData3.name}`).put(this.imageData3)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => { console.log(error.message) },
      () => {
        this.uploadValue3 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    },
    onUpload4 () {
      this.picture4 = null
      const storageRef = firebase.storage().ref(`${this.imageData4.name}`).put(this.imageData4)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue4 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => { console.log(error.message) },
      () => {
        this.uploadValue4 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    },
    onUpload5 () {
      this.picture5 = null
      const storageRef = firebase.storage().ref(`${this.imageData5.name}`).put(this.imageData5)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue5 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => { console.log(error.message) },
      () => {
        this.uploadValue5 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    },

    writeToFirestore () {
      firebase.firestore().collection('levels').add({
        assets: ['' + this.images[0], '' + this.images[1], '' + this.images[2], '' + this.images[3], '' + this.images[4]],
        category: 'Nature',
        id: 1,
        name: 'Gamta',
        question: 'Kodel ne?',
        timestamp: new Date()
      })
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

</style>
