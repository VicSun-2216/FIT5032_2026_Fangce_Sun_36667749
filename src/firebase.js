import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBhjGeaS_8TFzxTprIC_CLyx9gJPMB1odY',
  authDomain: 'fit5032-lab7-fangce.firebaseapp.com',
  projectId: 'fit5032-lab7-fangce',
  storageBucket: 'fit5032-lab7-fangce.firebasestorage.app',
  messagingSenderId: '96697504365',
  appId: '1:96697504365:web:9c772c668ea1761354a564'
}

// 初始化 Firebase 应用
const firebaseApp = initializeApp(firebaseConfig)

// 创建并导出 Authentication 实例
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)