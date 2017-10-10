import 'jquery';
import toastr from 'toastr';

const database = {
    // Adding users methods
    createUser(email, password, newUser) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        let userAuth = firebase.auth().currentUser;
                        userAuth.updateProfile({ displayName: newUser.username, photoURL: '' });
                        console.log(userAuth);
                        localStorage.setItem('displayUser', JSON.stringify({displayName: newUser.username, uid: user.uid, email: newUser.email}));
                        console.log(localStorage.getItem('displayUser'));
                        return this.createUserByGivenID(user.uid, newUser);
                    })
                    .catch((err) => {
                        toastr.error(err.message);
                    });
    },

    createUserByGivenID (uid, user) {
        return firebase.database().ref('users/').child(uid).set(user);
    },

    pushData: (user) => {
        return firebase.database().ref('users').push(user);
    },
    signInUser: (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    getCurrentUser: () => {
        return firebase.auth().currentUser;
    },

    signOut: () => {
        return firebase.auth().signOut()
    },
    
    //Adding data to DB
    addJSONToDB(ref, arr) {
        arr.forEach(element => {
            firebase.database().ref(ref).push(element);
        });
    },
    
    // Getting information about the lists
    getItems(ref)  {
        return firebase.database().ref(ref).once('value');
    },

    pushItems(collection, item)  {
        return firebase.database().ref(collection).push(item);
    },
    
    pushItemByGivenElement(ref, element, item) {
        return firebase.database().ref(ref).child(element).set(item);
    },

};

export default database;
