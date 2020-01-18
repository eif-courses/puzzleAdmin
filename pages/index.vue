<template>
  <div>
    <div v-if="authenticatedUser">
      <p>You are logged in as {{ authenticatedUser.email }}.</p>
      <v-btn @click.prevent="logout">
        Logout
      </v-btn>
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

    <v-container class="grey lighten-5">
      <v-text-field v-model="category" label="Category" />
      <v-text-field v-model="question" label="Question" />
      <v-text-field v-model="levelname" label="Level name" />
      <v-text-field v-model="categorylt" label="Nurodykite kategoriją" />
      <v-text-field v-model="questionlt" label="Pateikite klausimą arba teiginį" />
      <v-text-field v-model="levelnamelt" label="Pateikite pavadinimą" />
      <v-row no-gutters>
        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
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
              <v-btn @click="onUpload1" class="ma-2" tile color="indigo" dark>
                Upload
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col order="12">
          <v-card
            class="pa-2"
            outlined
            tile
          >
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
                <v-btn @click="onUpload2" class="ma-2" tile color="indigo" dark>
                  Upload
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col order="1">
          <v-card
            class="pa-2"
            outlined
            tile
          >
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
                <v-btn @click="onUpload3" class="ma-2" tile color="indigo" dark>
                  Upload
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col order="1">
          <v-card
            class="pa-2"
            outlined
            tile
          >
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
                <v-btn @click="onUpload4" class="ma-2" tile color="indigo" dark>
                  Upload
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col order="1">
          <v-card
            class="pa-2"
            outlined
            tile
          >
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
                <v-btn @click="onUpload5" class="ma-2" tile color="indigo" dark>
                  Upload
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col order="6">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div>
              <div>
                <p><strong>Kategorijos antraštinis paveikslėlis:</strong></p>
                <input @change="previewImage6" type="file" accept="image/*">
              </div>
              <div>
                <p>
                  Progress: {{ uploadValue6.toFixed()+"%" }}
                  <progress id="progress" :value="uploadValue6" max="100" />
                </p>
              </div>
              <div v-if="imageData6!=null">
                <img :src="picture6" class="preview">
                <br>
                <v-btn @click="onUpload6" class="ma-2" tile color="indigo" dark>
                  Upload
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      @click.prevent="writeToFirestore"
      v-if="!alert"
      @click="alert = true"
      class="ma-2"
      tile
      color="green"
      dark
    >
      SAVE TO FIRESTORE
    </v-btn>

    <v-alert
      v-model="alert"
      dismissible
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      <strong>{{ this.success }}</strong>
    </v-alert>
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
      uploadValue5: 0,
      imageData6: null,
      picture6: null,
      uploadValue6: 0,
      category: '',
      question: '',
      levelname: '',
      categorylt: '',
      questionlt: '',
      levelnamelt: '',
      success: 'Lygis sėkmingai įkeltas į duombazę!',
      alert: false
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
    previewImage6 (event) {
      this.uploadValue6 = 0
      this.picture6 = null
      this.imageData6 = event.target.files[0]
    },
    onUpload1 () {
      this.picture1 = null
      const storageRef = firebase.storage().ref(`${this.imageData1.name}`).put(this.imageData1)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue1 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture1 = url
        })
      }
      )
    },
    onUpload2 () {
      this.picture2 = null
      const storageRef = firebase.storage().ref(`${this.imageData2.name}`).put(this.imageData2)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue2 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture2 = url
        })
      }
      )
    },
    onUpload3 () {
      this.picture3 = null
      const storageRef = firebase.storage().ref(`${this.imageData3.name}`).put(this.imageData3)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue3 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue3 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture3 = url
        })
      }
      )
    },
    onUpload4 () {
      this.picture4 = null
      const storageRef = firebase.storage().ref(`${this.imageData4.name}`).put(this.imageData4)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue4 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue4 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture4 = url
        })
      }
      )
    },
    onUpload5 () {
      this.picture5 = null
      const storageRef = firebase.storage().ref(`${this.imageData5.name}`).put(this.imageData5)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue5 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue5 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture5 = url
        })
      }
      )
    },
    onUpload6 () {
      this.picture6 = null
      const storageRef = firebase.storage().ref(`${this.imageData6.name}`).put(this.imageData6)
      storageRef.on(`state_changed`, (snapshot) => {
        this.uploadValue6 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error.message)
      },
      () => {
        this.uploadValue6 = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture6 = url
        })
      }
      )
    },

    writeToFirestore () {
      firebase.firestore().collection('levels').add({
        assets: ['' + this.picture1, '' + this.picture2, '' + this.picture3, '' + this.picture4, '' + this.picture5],
        category: this.category,
        categorylt: this.categorylt,
        header: this.picture6,
        id: Date.now(),
        name: this.levelname,
        namelt: this.levelnamelt,
        question: this.question,
        questionlt: this.questionlt,
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
    }
  }
}
</script>
<style>

</style>
