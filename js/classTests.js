//  ***************************************************************************
//  ***************************************************************************
//  User TESTS ****************************************************************
//  ***************************************************************************
//  ***************************************************************************

// user.userSignUp('pepito@gmail.com', 'Pepito', '1232131', '1232131')
//     .then(() => {
//         console.log(
//             '\n',
//             user.userId + '\n',
//             user.userName + '\n',
//             user.email + '\n',
//             user.locations + '\n',
//             user.sizes + '\n',
//             user.movings + '\n',
//             user.userError ? user.userError : ' '
//         );
//         // console.log('Success ' + res);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

// user.userLogout().then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n'
//         // user.userError ? user.userError : ''
//     );
// });

// user.userLogin('pepito@gmail.com', '1232131').then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n',
//         user.locations + '\n',
//         user.sizes + '\n',
//         user.userError ? user.userError : ' '
//     );
//     console.log(user.movings);
//     // user.updateUserDb('pepito updated2').then(() => {
//     //     console.log(
//     //         '\n',
//     //         user.userId + '\n',
//     //         user.userName + '\n',
//     //         user.email + '\n',
//     //         user.locations + '\n',
//     //         user.sizes + '\n',
//     //         user.movings + '\n',
//     //         user.userError ? user.userError : ' '
//     //     );
//     // });
// });

// user.userLogout();
// user.addLocation({ id: 11, location: 'living room' });

// user.addLocation({ id: 15, location: 'Dinning room' });

// console.log(user.locations);

// user.deleteLocation(15);

// console.log(user.locations);

// user.editLocation(11, { id: 11, location: 'Kitchen' });

// console.log(user.locations);

//  ***************************************************************************
//  ***************************************************************************
//  Moving TESTS **************************************************************
//  ***************************************************************************
//  ***************************************************************************

// user.userLogin('pepito@gmail.com', '1232131').then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n',
//         user.locations + '\n',
//         user.sizes + '\n',
//         user.movings[0]?.movingTitle + '\n',
//         user.userError ? user.userError : ' '
//     );

//     const moving = new Moving(user.userId);
//     // moving.getMovingById('GqYTzfGv2MzOcKZwhesI').then(() => {
//     //     // moving.addCollaborator('collab@collab.com').then(() => {
//     //     // });
//     //     console.log(moving);
//     // });
//     // const movingDelete = new Moving(user.userId);

//     // movingDelete.getMovingById('2jioD6vSzyYMfVTc8Ksy').then((movingDelete) => {
//     //     movingDelete.updateMoving(
//     //         user,
//     //         'newTitle test',
//     //         'description update',
//     //         'colombia',
//     //         'canada',
//     //         '03-05-2021'
//     //     );
//     //     console.log(movingDelete);
//     // });
//     // console.log(movingDelete);
//     // return movingDelete;
//     // user.isLoggedIn().then(() => {
//     // const moving = new Moving(
//     //     user.userId,
//     //     'twone moving',
//     //     'Third moving description',
//     //     'Mexico',
//     //     'Toronto',
//     //     '03-04-2021'
//     // );
//     // moving.addMovingToDb(user);
//     // console.log(user);
//     // console.log(moving);
//     // console.log(movingDelete);
// });

// (async function promises() {
//     console.log(user.userId.length === 0);
//     if (user.userId.length === 0) {
//         await user.isLoggedIn();
//     }
// })();

// user.isLoggedIn(async () => {
//     // const moving = new Moving(user.userId);
//     // moving.getMovingsList();
//     // const moving = new Moving(
//         //     user.userId,
//         //     'the second moving moving',
//         //     'Third moving description',
//         //     'Mexico',
//         //     'Toronto',
//         //     '03-04-2021'
//         // );
//         // moving.addMovingToDb(user);
//         // const list = await moving.getMovings();
//         // console.log(list);
//         return moving;
//     });

// let movingArr = [];
const user = new User();
user.isLoggedIn(async () => {
    const moving = new Moving(user.userId);
    // await moving.getMovingById('GqYTzfGv2MzOcKZwhesI');
    // console.log(moving.movingId);

    moving.getMovingsList((snapshot) => {
        movingsArr.length = 0;
        snapshot.forEach((doc) => {
            movingsArr.push(doc);
        });
        console.log(movingsArr);
        renderMovings();
    });
});

// window.addEventListener('DOMContentLoaded', () => {
//     // console.log('1');
// });
// window.addEventListener('load', () => {
//     console.log(user);
// });

// console.log(user);
//     console.log(user.movings);
// });
