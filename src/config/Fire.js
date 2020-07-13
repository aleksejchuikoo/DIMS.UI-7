import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAylMDCnyy_PXciLhGjZWAOv7nfQRHojaY',
  authDomain: 'dims-ui.firebaseapp.com',
  databaseURL: 'https://dims-ui.firebaseio.com',
  projectId: 'dims-ui',
  storageBucket: 'dims-ui.appspot.com',
  messagingSenderId: '223649312792',
  appId: '1:223649312792:web:b69247d72716e2d028936d',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
