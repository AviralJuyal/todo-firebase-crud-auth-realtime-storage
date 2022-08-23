import React from 'react'
import {  signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Developer = () => {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        signOut(auth)
        navigate('/')
      }
      
      // {
      //   "type": "service_account",
      //   "project_id": "fb-crud-2069a",
      //   "private_key_id": "5e48f9ced9505f51e014545011fb31d0732e5a44",
      //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRnl9fkWLS73F+\nTGCZ/ZWYwAOMFPm7zIZXt0IxBn4OIzjT/fCrQVdPQteJepx1gEHY8h7whESwUfKL\nEz1laIKycBagHUJ33s9N2nxzaqhIf51LoivczfJkBLrJy26kuKxPmMZrR6NZX84l\nkuP4a16r908CfmWw/O6YsFVQfzkUIFzl18nFukAZRU5Agu1FL7S063CytKTvBKhZ\n11fNOaOyzPL/mkwt2coOA7OP3UgSLRJSoM703FhD8NVM72/g9QXbNWQbL5/LvWnC\ngCnmB7N09VH5jQ7i9f7DxJfm5lNmiOhf3UkHqAxcjbjihWMUFJhrV9WpHyuScJNU\nOYPUBQgPAgMBAAECggEAVj7Ppd4HJ5ut+hWJv4IXDXCfZQDyWYMGmUuE1/AAaGe0\nh4CZh5TMTAfH78A7ZJr/PLgt467AJj2pSfCCF9m+wJUesgUn5nMNn04wWzp8f8vF\n16sjWeeAfgd2JPXnEa4L83n71YL1oh2pj0sXMgxXOPD5mKCRzZbbwoX2rDaUMQN6\n70U6cOsDuzjG6EydeJibKOeadI2vkHbZUpBnINlspgWlX6V9ncDE2xKYSmlleJeZ\nGEzrP0LJ3T2w7y+oNawCXC2XGsjFJhH1ZZqMjC4rgRfrTpjH/QKTF0CwEYroc6rd\nSEtf+9jjFULGIcYMo3OmpOalFkIleXEVOKQeb98cCQKBgQDy24KUcRRYrAp4qJtF\n9FtCKO8dznhU2BV/8BDnxBdo16w9OZo9d8/xvfwYQyf5iBKdBAXPLrqquK8+8J88\n8e59qUjavnE9DCq2nHL51EyzoBP5lFRwbuoja/t6AVgVeerU/oZd/kDMEe6qh0yw\nq2AY9B4PEwLGcPuqJY1JIeOSZwKBgQDc9mE2IHNe97pKIsSlklP3y2SxONqdNSeB\nrlaiiBw4Yh/Y2wkPW+6tTT0sQheaiewclkBknMVQj09Byh6eIuwU3rvL72XtJeq+\nDUcMG9NCaQUiPKcSKIHKNTwDsifQ+b/XajNdhbfw5ZVJrc2RXrgr0ZO2UIvinJB6\n07yBhVjkGQKBgFTbFCYv2K8e9c2xBAgOWHCmgt5ETVE/60s3o4CHyLIuYZVG8ji2\nC2dpPZNwq6AJxo8sX6dDqZ+LRlhUlR8jXXR02Ortjf2JqccCpT3byy0cKr6S8GoU\npyTXTxgTLiba4Y2onWRsOVHUljLpcYdtafduHK6hst+JjLWnx1UdTTnTAoGBAIlZ\n1b+xmEW2M+SVjCtntC5aDjNjpfEG85HW7x+FABXEWQuRzCXx/YFYe+ghBU8Y4N48\nP7bLBJQ5IQlCPJoMFzg54/62x2MMqMiOtFVAjqe/ZGON1ESjTVqGkNGzUrDCLpAX\nAermjhp+e7gbA6eTe2QxmGJB21J4BA91wr24SDMxAoGBALhhI+QlxDjImXMMpgr0\n231nZANYQC1tInDPQ12nz9F+IALuN0sT2M9B1RWbEl40Xq5pfsglW96rm9RHOPpT\nOqNVQ4RPV9dBzGfp8p7R26imrJB2hkT4DgBzNQz/LpQYPuSAgPV+c5dKaN/dttUv\nbKX3/r6vdE5bQ8FXLBBguRZ6\n-----END PRIVATE KEY-----\n",
      //   "client_email": "firebase-adminsdk-ex2b6@fb-crud-2069a.iam.gserviceaccount.com",
      //   "client_id": "105557045589250822468",
      //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      //   "token_uri": "https://oauth2.googleapis.com/token",
      //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      //   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ex2b6%40fb-crud-2069a.iam.gserviceaccount.com"
      // }
      

  return (
    <>
        <button onClick={handleLogout} className="bg-red-500 shadow-sm hover:bg-red-400 rounded-xl text-white px-8 py-1 mt-2 ml-2">Log Out</button> 
        <div>Developer</div>
    </>
  )
}

export default Developer;