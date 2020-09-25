// export const getUserInfo = (id) => {
//   return (dispatch) => {
//     dispatch(startLoadingUser());
//     dbh
//       .collection("users")
//       .doc(id)
//       .onSnapshot((documentSnapshot) => {
//         if (documentSnapshot.data().company !==undefined) {
//           dbh
//             .collection("Companies")
//             .doc(documentSnapshot.data().company)
//             .onSnapshot((companysnapshot) => {
//               dispatch(
//                 setUSerInfo({
//                   fullName: documentSnapshot.data().fullName,
//                   role: documentSnapshot.data().role,
//                   comapnyId: documentSnapshot.data().company,
//                   companyTitle: companysnapshot.data().title,
//                   avatar:
//                     documentSnapshot.data().avatar &&
//                     documentSnapshot.data().avatar != ""
//                       ? documentSnapshot.data().avatar
//                       : "https://firebasestorage.googleapis.com/v0/b/proadvice-6ac32.appspot.com/o/Users%2Fportrait.jpg?alt=media&token=090c17d4-b0d4-435d-84a7-6f5f1cb02329",
//                   companyAdress: companysnapshot.data().Adress,
//                   companyAvatar: companysnapshot.data().Image.src,
//                   description: documentSnapshot.data().description,
//                 })
//               );
//               dispatch(stopLoadingUser());
//             });
//         }
