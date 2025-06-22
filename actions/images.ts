"use server"
import { uploadBase64ToS3 } from "@/lib/s3";

export const handleUsersProfileImages = async (data: { image: string, name: string }) => {
    try {
        // Upload to S3 instead of local storage
        const s3Url = await uploadBase64ToS3(data.image, `${data.name}-profile.png`, 'users/profiles');
        console.log("Profile image uploaded to S3:", s3Url);
        return s3Url;
    } catch (error) {
        console.error("Error handling profile image upload:", error);
        return null;
    }
};