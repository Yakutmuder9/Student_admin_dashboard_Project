import './inbox.css';
import { useState , useEffect, useRef} from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
// import firebase from 'firebase'
// import { db, auth } from '../../../Auth/firebase/firebase'

function Inbox() {
//   const [user] = useAuthState(auth)
  return (
    <div className='inbox'>
      {/* {user ? <Chat /> : <></>} */}
    </div>
  );
}
// function Chat() {
//   const scroll = useRef()
//   const [messages, setMessages] = useState([])
//   useEffect(() => {
//       db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
//           setMessages(snapshot.docs.map(doc => doc.data()))
//       })
//   }, [])

//   return (
//       <div>
//           <div className="msgs">
//             <h2 className='posii'>Ask Question..?</h2>
//               {messages.map(({ id, text, photoURL, uid }) => (
//                   <div>
//                       <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
//                           <img src={photoURL} alt="" />
//                           <p>{text}</p>
//                       </div>
                      
//                   </div>
//               ))}
//           </div>
//           <SendMessage scroll={scroll} />
//           <div ref={scroll}></div>
//       </div>
//   )
// }
// function SendMessage({ scroll }) {
//   const [msg, setMsg] = useState('')

//   async function sendMessage(e) {
//       e.preventDefault()
//       const { uid, photoURL } = auth.currentUser

//       await db.collection('messages').add({
//           text: msg,
//           photoURL,
//           uid,
//           createdAt: firebase.firestore.FieldValue.serverTimestamp()
//       })
//       setMsg('')
//       scroll.current.scrollIntoView({ behavior: 'smooth' })
//   }
//   return (
//       <div>
//           <form onSubmit={sendMessage}>
//               <div className="sendMsg">
//                   <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
//                   <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
//               </div>
//           </form>
//       </div>
//   )
// }

export default Inbox;
