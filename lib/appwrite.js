import { Account, Avatars, Client, Databases, ID, Query ,Storage} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.MediaUploader',
    projectId: '665866e6001875624a43',
    databaseId: '6658684d0035b9ee2c5e',
    userCollectionId: '6658686f000fc9c8df68',
    videoCollectionId: '665868950019b689e793',
    storageId: '665869d9001835c09541'
}

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
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
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
    console.log(error);
    }
  }


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]

    } catch (error) {
        throw new Error(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt")]
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
    }
}

// Get latest created video posts
export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function searchPosts(query) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.search("title", query)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  export async function getUserPosts(userId) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.equal("creator", userId)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }

  export const signOut =async() =>{
try {
  const session = await account.deleteSession('current')
  return session
} catch (error) {
  console.log(error)
}
  }

export const getFilePreview =async(fileId,type) =>{

  let fileUrl;
  try {

    if(type ==='video'){

      fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        fileId
      )
    } else if(type ==='image'){
      fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId,2000,2000,'top',100)
    }else{
      throw new Error('Invalid file tyoe');
    }

    if(!fileUrl) throw Error;

    return fileUrl;
    
  } catch (error) {
    console.log(error)
  }

}

 export const uploadFile =async(file,type) =>{
if(!file) return;


const asset = {
  name:file.fileName,
  type:file.mimeType,
  size:file.fileSize,
  uri:file.uri

}



try {

  const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    asset
  );
 

  const fileUrl = await getFilePreview(uploadedFile.$id,type);
  return fileUrl
  
} catch (error) {
  console.log(error)
}
 }

  export const createVideo =async(form) =>{
try {

  const [thumbnailUrl,videoUrl] = await Promise.all([
    uploadFile(form.thumbnail,'image'),
    uploadFile(form.video,'video'),
  ])

  const newPost = await databases.createDocument(appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    ID.unique(),
    {
      title:form.title,
      thumbnail:thumbnailUrl,
      video:videoUrl,
      prompt:form.prompt,
      creator:form.userId
    }

  )

  return newPost;
  
} catch (error) {
  console.log(error)
}
  }