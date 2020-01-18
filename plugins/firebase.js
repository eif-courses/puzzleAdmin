import firebase from 'firebase'

let app = null
const firebaseConfig = {
  apiKey: 'AIzaSyBVn6ShGC1aShrEZHTOshguYHJsGZPoJrI',
  authDomain: 'getsomemoney-f79c8.firebaseapp.com',
  databaseURL: 'https://getsomemoney-f79c8.firebaseio.com',
  projectId: 'getsomemoney-f79c8',
  storageBucket: 'getsomemoney-f79c8.appspot.com',
  messagingSenderId: '490152773428',
  appId: '1:490152773428:web:f9db072998a4fd5c964761'
}
// Initialize Firebase

app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
