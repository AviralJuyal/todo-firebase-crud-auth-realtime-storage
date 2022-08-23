import { getDownloadURL, getStorage, listAll, ref , deleteObject } from 'firebase/storage';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';


const ViewImg = (props) => {
    const storage = getStorage(app);
    const [imageList, setImageList] = useState([])
    const [dis, setdis] = useState(true)
    // const navigate = useNavigate();
    const imageListRef = ref(storage , `image-${props.userId}/`);
    // const [items , setItems] = useState([])
    // const [a , seta] = useState([])

    // useEffect(() => {
    //   listAll(imageListRef).then(response=>
    //     // console.log(response)
    //     response.items.forEach(item=>{
    //         // console.log(item)
    //         getDownloadURL(item).then(url=>{
    //             // console.log(url)
    //             setImageList(resp =>[...resp , url])
    //             console.log(imageList)
    //         })
    //     })
    //     )
    //     console.log('hi')
    // }, [])
    // const delRef = ref(storage , `image-${props.userId}/`)
    const handleDelete = (url)=>{
        // console.log(i)
        const delRef = ref(storage , url) 
        console.log(delRef)
        deleteObject(delRef).then(()=>{
            setImageList(imageList.filter((image) => image !== url))
            console.log('deleted')
        }).catch(err=>{
            console.log(err)
        })


    }
    
const temp = ()=>{
    listAll(imageListRef).then(response=>
        // console.log(response)
        response.items.forEach(item=>{
            // console.log(item)
            // setItems(r =>[...r,item])
            getDownloadURL(item).then(url=>{
                // console.log(url)
                setImageList(resp =>[...resp , url])
            })
        })
        )
        setdis(false)
    }
    // console.log(imageList)
    // console.log(items)
if(dis)
    temp()


    const handleBack= ()=>{
        props.setUploaded(false)
    }
    
  return (
  <>
  <button onClick={handleBack} className='border-2 border-black text-white bg-black px-2 rounded-xl mt-10 ml-2'  >back</button>
    <div>ViewImg</div>
    <div className='flex  flex-wrap'>
    {imageList.map((i,index)=>(
        <div key={index} className='flex flex-col'>
            <button onClick={()=>handleDelete(i)}>X</button>
            <img  src={i} alt="img" className='h-40 w-40 my-4 mx-2 border-2 border-black'/>
         </div>
        ))}
    </div>
  </>
  )
}

export default ViewImg