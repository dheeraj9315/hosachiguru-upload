import React ,{useState} from 'react'

const Postdata = (props) => {
    
    const[senddata,setSenddata]=useState({
         Name:"",
         PetName:"",
         Price:"",
         Status:""
    });

    const inputEvent=(e)=>{
        console.log(e.target.value)
        setSenddata({
            ...senddata,
            [e.target.name]:e.target.value,
        })
    }

    const onHandledata=async()=>{
    //     const regEx=/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    //     if(regEx.test(senddata.email)){
    //  setMessage("email is valid")
    //     }else if(!regEx.test(senddata.email) && senddata.email !== ""){
    //  setMessage("email not valid")
    //     }else{
    //         setMessage("")
        // }
             let{Name,PetName,Price,Status}=senddata
             if(Name && PetName && Price && Status){
              const res=   fetch("http://localhost:3300/user",{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                       Name:Name,
                       PetName:PetName,
                       Price:Price,
                       Status:Status
                    })
                })
                props.data();
                if(res){
                    setSenddata({
                     Name:"",
                     PetName:"",
                     Price:"",
                     Status:""
                 });
                 alert("Data successfull stored")
                }
             } else{
                 alert("plz fill data")
             }
          
    }

    

    return (
        <>
            <div className='container '>
            <h3 className='bg-danger text-white alert text-center'>POST PET DETAILS</h3>
                 <form>
                 <div>
                    <label className='mb-2'>Name :</label>
                    <input type="text" required size="10" maxLength="10" autoComplete='off' name="Name" onChange={inputEvent} placeholder='enter  name' className='form-control w-50' />
                </div>
                <div>
                    <label className='mb-2'> Pet Name :</label>
                    <input type="text" required size="10" maxLength="10" autoComplete='off' name="PetName" onChange={inputEvent} placeholder='enter pet name' className='form-control w-50' />
                </div>
      
                <div>
                    <label className='mb-2'>Price :</label>
                    <input type="number" required size="2" maxLength="2" autoComplete='off'  name='Price' onChange={inputEvent} placeholder='enter price' className='form-control w-50' />
                </div>
                <div>
                    <label className='mb-2'>Status :</label>
                    <input type=""  id="status" required size="20" maxLength="20" autoComplete='off'  name='Status' onChange={inputEvent} placeholder='enter status' className='form-control w-50' />
                    
                </div>
                <div>
                    <button type='submit' onClick={onHandledata} className='btn btn-primary mt-3 w-50'>SUBMIT</button>
                </div>
                 </form>
            </div>
        </>
    )
}

export default Postdata