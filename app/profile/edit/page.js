import AddProfileForm from "@/components/AddProfileForm";
import {prismaClient} from `@prosma/client`
const prisma = new prismaClient()

export const runtimes = 'node.js'

export default function EditProfilePage(){
    const {id} = await.Params;
    const profiles = prisma.profiles
    return(
        <>
            <h1> Edit</h1>
            <AddProfileFrom initialData={initialData}/>
        </>
    )
}