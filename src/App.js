import React, { useEffect, useState } from 'react';
import Postdata from './Component/Postdata';

const App = () => {

  const [alldata, setAlldata] = useState([])
  const [editUsers,setUsers]=useState({
    Name:"",
    PetName:"",
    Price:"",
    Status:""
  })
  const getAlldata = () => {
    fetch("http://localhost:3300/user").then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setAlldata(resp)
      })
    })
  }

  useEffect(() => {
    getAlldata()
  }, [])

  const deleteUser = (id) => {
    console.log(id);
    const deleteItem = alldata.filter((elem, ind) => {
      return elem.id !== id;
    })
    setAlldata(deleteItem);
  }

  const editUser=(id)=>{
     console.log(id)
     const editItem=alldata.find((elem,ind)=>{
        return id === elem.id
     })
     setUsers(editItem);
  }


  const inputEvent = (e) => {
    setUsers({
      ...editUsers,
      [e.target.name]:e.target.value,
    })
  }

  const onHandledata = async(id) => {

    let{Name,PetName,Price,Status}=editUsers;
    if(Name && PetName && Price && Status){
     const res= await fetch(`http://localhost:3300/user/${id}`,{
        method:"PUT",
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
     getAlldata();
     if(res){
   setUsers({
     Name:"",
     PetName:"",
     Price:"",
     Status:""
   })
   alert("Data successull Update")
     }
    }else{
      alert("plzz fill data")
    }
}






  return (
    <>
      {/* <div className='container-fluid'>
        <h2 className='
      </div> */}
      <div>
        <div className='row'>
          <div className='col-sm-6 col-md-6'>
            <div className='container mb-4'>
              <Postdata data={getAlldata} />
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
          <h3 className='bg-success text-white alert text-center'>UPDATE USERS</h3>
          <form>
        <div>
          <label className='mb-2'>Name :</label>
          <input type="name" required autoComplete='off' size="10" maxLength="10" value={editUsers.Name} name="Name" onChange={inputEvent} placeholder='enter name' className='form-control w-50' />
        </div>

        <div>
          <label className='mb-2'>PetName :</label>
          <input type="name" required autoComplete='off' size="10" maxLength="10" value={editUsers.PetName} name="PetName" onChange={inputEvent} placeholder='enter pet name' className='form-control w-50' />
        </div>
        <div>
          <label className='mb-2 mt -1'>Price :</label>
          <input type="number" required autoComplete='off' size="2" maxLength="2" name='Price' value={editUsers.Price} onChange={inputEvent} placeholder='enter price' className='form-control w-50' />
        </div>
        <div>
          <label className='mb-2'>Status :</label>
          <input type="text" required autoComplete='off' size="18" maxLength="18" name='email' value={editUsers.Status} onChange={inputEvent} placeholder='enter status' className='form-control w-50' />
        </div>
        <div>
          <button type='submit' onClick={()=>onHandledata(editUsers.id)} className='btn btn-warning mt-3 w-50'>UPDATE USER</button>
        </div>
       </form>
      </div>
          </div>
        </div>



      <div className='container'>
        <table className='table table-bordered'>
          <thead className='table-info'>
            <tr>
              <th>S.No</th>
              <th>Given Name</th>
              <th>PetName</th>
              <th>Price</th>
              <th>Status</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody className='bg-dark text-white'>
            {
              alldata.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.Name}</td>
                    <td>{item.PetName}</td>
                    <td>{item.Price}</td>
                    <td>{item.Status}</td>
                    <td><button className='btn btn-success' onClick={() => deleteUser(item.id)}>DELETE</button>
                    <button className='btn btn-danger' onClick={()=>editUser(item.id)}>EDIT</button></td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App;