import * as FileSystem from "expo-file-system/legacy";

export const DOWNLOAD_FOLDER =
    FileSystem.documentDirectory + "downloads/";

export const ensureDownloadFolder = async () => {
    // const folderInfo = await FileSystem.getInfoAsync(DOWNLOAD_FOLDER);

    // if (!folderInfo.exists) {
    //     await FileSystem.makeDirectoryAsync(DOWNLOAD_FOLDER, {
    //         intermediates: true,
    //     });
    // }
};


export const downloadAudio = async (
    documentId: string,
    audioUrl: string
) => {

    await ensureDownloadFolder();

    const localUri =
        DOWNLOAD_FOLDER + `${documentId}.mp3`;


    const download =
        FileSystem.createDownloadResumable(
            audioUrl,
            localUri
        );

    const result =
        await download.downloadAsync();


    return result?.uri;
};


export const isAudioDownloaded = async (
    documentId: string
) => {

    const localUri =
        DOWNLOAD_FOLDER + `${documentId}.mp3`;

    // const info =
    //     await FileSystem.getInfoAsync(localUri);

    // return info.exists;
};

export const deleteAudio = async (
    documentId: string
) => {

    const localUri =
        DOWNLOAD_FOLDER + `${documentId}.mp3`;

    // const info =
    //     await FileSystem.getInfoAsync(localUri);

    // if (info.exists) {
    //     await FileSystem.deleteAsync(localUri);
    // }

};