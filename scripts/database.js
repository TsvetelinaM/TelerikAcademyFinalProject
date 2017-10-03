import 'jquery';

const database = {
    // Adding users methods
    createUser: (email, password, newUser) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        this.userAuth = firebase.auth().currentUser;
                        this.userAuth.updateProfile({ displayName: newUser.username, photoURL: '' });
                        this.displayUser = {displayName: newUser.username, uid: this.userAuth.uid};
                        localStorage.setItem('displayUser', JSON.stringify({displayName: newUser.username, uid: user.uid, email: newUser.email}));
                        console.log(this.userAuth);
                        return this.createUserByGivenID(user.uid, newUser);
                    })
                    .catch((err) => {
                        toastr.error(err.message);
                    });
    },

    createUserByGivenID: (uid, user) => {
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
    addJSONToDB: (ref, arr) => {
        arr.forEach(element => {
            firebase.database().ref(ref).push(element);
        });
    },
    
    // Getting information about the lists
    getItems: (ref) => {
        return firebase.database().ref(ref).once('value');
    },
    getSingleList: (key) => {
        return firebase.database().ref('lists/' + localStorage.uid + '/' + key).once('value');
    },
    pushList: (list) => {
      return   firebase.database()
            .ref('lists/' + localStorage.uid)
            .push(list);

    },
    removeList: (listKey) => {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey)
            .remove();
    },
    // Getting information about items
    // getItem: function (listKey, itemKey) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .once('value');
    // },
    // pushItem: function (listKey, item) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items')
    //         .push(item);
    // },
    // removeItem: function (listKey, itemKey) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .remove();
    // },
    // updateItemCheckState: function (listKey, itemKey, state) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .once('value', function (item) {
    //             item.ref.update({
    //                 "_checked": state
    //             });
    //         });
    // },
    // removeDueDate: function (listKey, itemKey) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .once('value', function (item) {
    //             item.ref.update({
    //                 "_dueDate": ""
    //             });
    //         });
    // },
    // updateItem: function (listKey, itemKey, title, dueDate) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .once('value', function (item) {
    //             item.ref.update({
    //                 "_title": title,
    //                 "_dueDate": dueDate
    //             });
    //         });
    // },
    // updateProdItem: function (listKey, itemKey, title, quantity) {
    //     return firebase.database()
    //         .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
    //         .once('value', function (item) {
    //             item.ref.update({
    //                 "_title": title,
    //                 "_quantity": quantity
    //             });
    //         });
    // }
};

export default database;
