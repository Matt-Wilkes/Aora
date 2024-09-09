import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';



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
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

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

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
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

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)

        return session
    } catch (error) {
        throw new Error(error);
        
    }
}



