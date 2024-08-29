"use server"
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';

export const handleUsersProfileImages = async (data: { image: string, name: string }) => {

   
    try {
        const buffer = Buffer.from( data.image , 'base64');
        const uniqueName = `${uuidv4()}-${data.name}`;
        const path = join('public/private/users', uniqueName + '.png');
        await writeFile(path, buffer);
        console.log(path)
        return `/private/users/${uniqueName}.png`;
    } catch (error) {
        console.error("Error handling image upload:", error);
        return null;
    }

}