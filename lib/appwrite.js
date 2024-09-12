import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';



export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.mattwilkes.aora',
    projectId: '66defdb60001169fc33b',
    databaseId: '66df0067000462563737',
    userCollectionId: '66df0090000ebb175871',
    videoCollectionId: '66df00ab003dbbf2344e',
    storageId: '66df022d00040801db80'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.


// https://appwrite.io/docs/references/cloud/client-web/account#createEmailSession
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const CreateUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    if(!newAccount) throw Error;
    console.log(`new account: ${newAccount}`)
    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    // createDocument is an appwrite method
    const newUser = await databases.createDocument(
        // get database id
        appwriteConfig.databaseId,
        // get user collection id
        appwriteConfig.userCollectionId,
        // appwrite method, creates unique id
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

}

export const signIn = async (email, password) => {
    try {
        // Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.
        const session = await account.createEmailPasswordSession(email, password)
        console.log(`session: ${session.$id}`)
        console.log(`session account: ${session}`)
    
        return session
    } catch (error) {
        throw new Error(error);
        
    }
}


export const getCurrentUser = async () => {
    try {
        // current logged in user
        const currentAccount = await account.get();
        console.log(`current account: ${currentAccount.$id}`) 
        //66e2e7ee001b61a8e460
        if (!currentAccount) throw new Error('No current account found');

        // get current user from db
        const currentUser = await databases.listDocuments(
            // which database?
            appwriteConfig.databaseId,
            // which collection?
            appwriteConfig.userCollectionId,
            // appwrite query object, accountId equals current user accountId
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser.documents || currentUser.documents.length === 0) throw new Error('No user documents found in the database');
        
        console.log(`current user: ${JSON.stringify(currentUser)}`)
        // we only need one user
        return currentUser.documents;

    } catch (error) {
        console.log(error)
    }
}

