import React, { useState, useEffect } from 'react'
import Header from './Header'
import { CopyBlock, dracula } from "react-code-blocks";


function Page() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [response, setResponse] = useState('')
  const [getResponse, setGetResponse] = useState('')
  const [getresponse, setGetresponse] = useState('')

  const handleDelete = async (itemId) => {
    try {
      // Send a DELETE request to the server to delete the item
      const response = await fetch(`https://zany-tan-colt-tam.cyclic.cloud/delete/${itemId}`, {
        method: 'DELETE'
      })
      const responseData = await response.json()
      setResponse(responseData)
      setGetresponse('')
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://zany-tan-colt-tam.cyclic.cloud/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input1: input1,
          input2: input2
        })
      });

      const responseData = await response.json()
      setResponse(responseData)
      setGetresponse('')
    } catch (error) {
      console.error('Error sending POST request:', error)
    }
  }
function getItems(){
  fetch('https://zany-tan-colt-tam.cyclic.cloud/get')
  .then(response => response.json())
  .then(data => {
    setGetResponse(data.items)
    if(response === ""){
      setGetresponse(data)
    }
  })
  .catch(error => {
    console.error('Error sending GET request:', error)
  })

}
  useEffect(()=>{
    getItems()
  },[response])

  return (
    <>
    <Header></Header>
    <div className='flex justify-between w-full'>
      <div className='p-6 m-6 w-1/2'>
        <div className='bg-slate-100 mb-6 p-6 rounded-lg'>
          <h1 className='pb-5 text-center'>POST Request</h1>
          <form onSubmit={handleSubmit} className='grid gap-3 justify-items-center w-full'>
            
             
              <input
                type="text"
                placeholder='Name....'
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className='p-1 w-4/6 justify-self-center'
              />
            
              <input
                type="text"
                placeholder='Description....'
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className='p-1 w-4/6 justify-self-center'
              />
            
            
            <button type="submit" className='mt-4 pr-6 pl-6 pb-1 pt-1 bg-blue-400 hover:bg-blue-500 rounded-lg text-white'>Submit</button>
          </form>
          </div>
          <div className='grid justify-items-center w-full bg-slate-100 mb-6 p-6 rounded-lg'>
            <h1>GET Request</h1>
            <br />
            <div>
            <table className='table-auto'>
            <thead>
              <tr className='p-1 my-1'>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            {getResponse && (
              <tbody>
                {getResponse.map(item => (
                  <tr 
                    key={item._id}
                    className='p-1 my-1'
                  >
                    <td className='py-1 px-3'>{item.item1}</td>
                    <td className='py-1 px-3'>{item.item2}</td>
                    <td className='py-1 px-3'>
                      <button 
                      onClick={() => handleDelete(item._id)}
                      className='pr-2 pl-2 pb-1 pt-1 bg-blue-400 hover:bg-blue-500 rounded-lg text-white'
                      >
                        X
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            )}
            </table>

            </div>
          </div>
      </div>
      <div className='m-12 p-12 rounded-lg  bg-slate-100 w-1/2'>
        <h2>Server response:</h2>
    {response && (
      <div>
        <p className='break-normal'>{JSON.stringify(response, null, 2)}</p>
      </div>
    )}
    {getresponse && (
      <div>
        <p className='break-normal'>{JSON.stringify(getresponse, null, 2)}</p>
      </div>
    )}
      <div>
        <h2>APIs</h2>
        <select>
          <option value="get">GET</option>
          <option value="vegetable">POST</option>
          <option value="meat">DELETE</option>
        </select>
      </div>
      <CopyBlock 
      language="javascript"
      text={
        `
        fetch('https://zany-tan-colt-tam.cyclic.cloud/get')
        .then(response => response.json())
        .then(data => {
          setGetResponse(data.items)
          if(response === ""){
            setGetresponse(data)
          }
        })
        .catch(error => {
          console.error('Error sending GET request:', error)
        })
 
 `
      }
      theme={dracula}
      
       ></CopyBlock>
      </div>
    </div>
    </>
  )
}

export default Page;
