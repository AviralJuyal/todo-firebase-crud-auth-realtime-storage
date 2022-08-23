import { updateProfile } from 'firebase/auth';
import { uploadBytes , getStorage,ref, listAll, getDownloadURL } from 'firebase/storage';
import React ,{ useState} from 'react'
import { app } from '../firebase';
import LoadingSpin from './LoadingSpin';

const Profile = (props) => {
    const storage = getStorage(app);
    const dpPath = `dp-/${props.user.uid}`;
    const hiddenFileInput = React.useRef(null);

    const [dpUpload, setDpUpload] = useState('')
    const [loading, setloading] = useState(false)
    const [dpChange, setDpChange] = useState(true)
    // const[file , setFile] = useState('')

    

    const handleClick = event => {
        hiddenFileInput.current.click();
      };

      const handleChange = async(event) => {
        setloading(true);
        const fileUploaded = event.target.files[0];
        // props.handleFile(fileUploaded);
        // console.log()
        // setFile(fileUploaded);
        // const objectUrl = URL.createObjectURL(fileUploaded)
        // setDpUpload(objectUrl);
        // console.log(props.user)
        const imageRef= ref(storage, `dp-/${props.user.uid}`);
          await uploadBytes(imageRef, fileUploaded).then((snapshot) => {
                console.log('Uploaded on FireBase');
            });
            setDpChange(true);
            setloading(false);
        // handleUpload();
      };

    //   const handleUpload =async () =>{
    //     setloading(true);
    //     // console.log(img)
    //     // for(let i =0 ; i<img.length ; i++){
    //         console.log(props.userId) 
    //         console.log(file)
          
    //     // }
    //     setloading(false);
         
    // }

    // useEffect(() => {
    //     // setloading(true)
    //     console.log('hskjfh')
        const imageListRef = ref(storage , `dp-/`);
    //     listAll(imageListRef).then((response)=>
    //         // console.log(response)
    //         response.items.forEach(item=>{
    //             if(item.fullPath === dpPath){
    //                 console.log(dpPath)
    //                 getDownloadURL(item).then(url=>{
    //                     console.log('useeffect')
    //                     // console.log(url)
    //                     setDpUpload(url);
    //                     // setloading(false)
    //                     setDpUpload(false);
    //                 })

    //             }
    //         })
    //         )
      
    // }, [dpChange])

    const temp= ()=>{
        listAll(imageListRef).then(response=>
                //    console.log(response)
            response.items.forEach(item=>{
                // console.log(item)
                if(item.fullPath === dpPath){

                    getDownloadURL(item).then(url=>{
                        // console.log('useeffect')
                        // console.log(url)
                        setDpUpload(url);
                        updateProfile(props.user, {photoURL: url});
                        setDpChange(false);
                    })
                }
            })
            )
    }
    
   if(dpChange)
        temp();
        
  return (
    <>
    {loading ? (
        <div className="flex justify-center items-center h-screen">
    <LoadingSpin/>
  </div> 
  ):(

    
    <div>
    <img src={dpUpload} alt="dp" className='h-32 w-32 rounded-full' />
    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-3 mt-2" onClick={handleClick}>
    Update dp
    </button>
    <input
    type="file"
    ref={hiddenFileInput}
    onChange={handleChange}
    style={{display: 'none'}} />
    </div>
    
    )
        }

    </>
      
  )
}

export default Profile