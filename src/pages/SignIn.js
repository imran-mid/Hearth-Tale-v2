// import { Button, Typography } from '@material-ui/core'
// import React from 'react'
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// export default function SignIn() {
//     const signInWithGoogle = () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         auth.signInWithPopUp(provider);
//     }
//     return (
//         <div>
//             <Button
//                 id="btn-sign-in"
//                 variant="outlined"
//                 size="large"
//                 className="sign-in"
//                 color="secondary"
//                 onClick={signInWithGoogle}
//             >
//                 Get Started...
//             </Button>
//             <Typography variant="h6" color="secondary" style={{ paddingTop: "10" }}>
//                 Hi! Welcome to Hearth Tale. Click the above button to get started
//             </Typography>
//         </div>
//     )
// }