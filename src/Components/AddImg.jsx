import React,{useState} from 'react'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {app} from '../firebase'
import { uid } from 'uid';
import LoadingSpin from './LoadingSpin';
// import { useNavigate } from 'react-router-dom';
import ViewImg from './ViewImg';


const AddImg = (props) => {
    const [img, setImg] = useState([] );
    const [loading, setloading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [imgPreview , setImgPreview] = useState([])
    // const [preview, setPreview] = useState()

    const storage = getStorage(app);

    // const storageRef = ref(storage, 'i');
    // const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (!img[0]) {
    //         setPreview(undefined)
    //         return
    //     }

    //     const objectUrl = URL.createObjectURL(img[0])
    //     setPreview(objectUrl)
    //     console.log(objectUrl)
    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [img])

    // const metadata = {
    //     customMetadata: {
    //         'location': 'Yosemite, CA, USA',
    //         'activity': 'Hiking'
    //       }
    //   };

    const handleUpload =async () =>{
        setloading(true);
        // console.log(img)
        for(let i =0 ; i<img.length ; i++){
            const imageRef= ref(storage, `image-${props.userId}/${img[i].name + uid()}`);
          await uploadBytes(imageRef, img[i]).then((snapshot) => {
            // console.log(snapshot)
                console.log('Uploaded a blob or file!');
            });
            console.log('done');
        }
        setloading(false);
        // navigate('/view') 
        setUploaded(true)

        document.getElementById('btnUpload').style.display = 'block';
        
    }

    const showUpload = ()=>{
      setImg([])
      setImgPreview([])
        document.getElementById('imgUpload').style.display = 'block';
        document.getElementById('btnUpload').style.display = 'none';
    }

    const onImageChange = (e ,i) => {
      const file = e.target.files;
      setImg (file);
      setImgPreview([])
      for(let i=0;i<file.length;i++){ 
        const urlImgPrev = URL.createObjectURL(file[i]);
        console.log(urlImgPrev)
        setImgPreview(r =>[...r , urlImgPrev])
      }
      


      
    }

  //  console.log(imgPreview)
  return (
    <>
    {loading &&
    <div className="flex justify-center items-center h-screen">
    <LoadingSpin/>
  </div>}
  {uploaded?<ViewImg userId={props.userId} setUploaded={setUploaded}/> :
    <div>
      <h1>Upload your images</h1>
      <div className='hidden' id='imgUpload'>
      <input  type="file" onChange={e => onImageChange(e)} multiple />
      <div className='flex mt-4'>

      {imgPreview.map((image , index)=>(<>
        {/* <button>X</button> */}
        <img key={index} src={image} className=' h-32 w-32 mx-2 border-2 border-black ' alt="" />
      </>
        ))}

      </div>
      <button onClick={handleUpload} className='border-2 border-black text-white bg-black px-2 rounded-xl mt-10 ml-2'  >Upload</button>
      </div>
      <button id='btnUpload' onClick={showUpload} className='border-2 border-black text-white bg-black px-2 rounded-xl mt-10 ml-2'>Upload Here</button>
      
    </div>
  
  }
    </>
  )
}

export default AddImg