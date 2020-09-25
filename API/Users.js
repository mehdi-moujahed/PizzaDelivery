import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const updateProfile = (userProfile) => {
  const user = auth().currentUser;
  return database()
    .ref(`/users/${user.uid}`)
    .update({
      photoURL: userProfile.photoURL,
      name: userProfile.username,
      address: userProfile.address,
    })
    .then(() => {
      console.log('Data updated.');
    });
};

export const fetchUser = () => {
  const currentUser = auth().currentUser;
  return database()
    .ref(`/users/${currentUser.uid}`)
    .once('value')
    .then((snapshot) => {
      return {email: currentUser.email, val: snapshot.val()};
      // User = {
      //   email: Currentuser.email,
      //   name: snapshot.val().name,
      //   address: snapshot.val().address,
      // };
      // console.log('User data: ', snapshot.val());
      // console.log(User);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signOut = () => {
  return auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
export const userLogin = (User) => {
  return auth()
    .signInWithEmailAndPassword(User.email, User.password)
    .then(() => {
      console.log('Login with success ! :D', auth().currentUser);
      return true;
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        alert('email address is invalid !');
      }
      if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters');
      }
      if (error.code === 'auth/wrong-password') {
        alert('Please verify your password');
      }
      if (error.code === 'auth/user-not-found') {
        alert('There is no user record corresponding to this email !');
      }
      if (error.code === 'auth/network-request-failed') {
        alert('Verify your internet connection !');
      }

      return false;
    });
};
export const addUser = (newUser) => {
  auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((response) => {
      database()
        .ref('users/' + response.user.uid)
        .set({
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pizzadelivery-6d924.appspot.com/o/avatar.png?alt=media&token=26f72933-9955-4cf0-b0e0-52131ee993ce',
          name: newUser.name,
          address: newUser.address,
        });

      console.log(response);

      response.user
        .sendEmailVerification()
        .then((response) => {
          console.log('Email verification is sent', response);
          ToastAndroid.show(
            'Email verification is sent to your Email box',
            ToastAndroid.LONG,
          );
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        alert('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        alert('email address is invalid!');
      }
      if (error.code === 'auth/weak-password') {
        console.log('Password should be at least 6 characters');
        alert('Password should be at least 6 characters');
      }

      console.error(error);
    });
};
