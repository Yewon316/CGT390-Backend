// `use Client`
// import {useState} from "react"

// export default function DeleteButton({id}){
//     const [isDeleting,setIsDeleting] = useState(false);
//     const [error,setError] = useState("");
//     const router = useRouter();
//     const handleClicked = async () => {
//         setIsDeleting(true);
//         try{
//             const response = await fetch(`/api/profiles/${id}`),{
//                 method:"DELETE"
//             })
//             if(!response.ok){
//                 const errorData = await response.json();
//             }
//         }
//     }

//     return(
//         <>
//         <button onClick={handleClicked} disabled={isDeleting}>Delete</button>
//         {error??<p>{error}</p>}
//         </>
//     )
// }