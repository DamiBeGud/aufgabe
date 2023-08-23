import React, { useState, useEffect } from 'react'

function Page() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [response, setResponse] = useState('')
  const [getResponse, setGetResponse] = useState('')

  const handleDelete = async (itemId) => {
    try {
      // Send a DELETE request to the server to delete the item
      const response = await fetch(`http://localhost:3000/delete/${itemId}`, {
        method: 'DELETE'
      });

      // Remove the deleted item from the local state
      setGetResponse(prevGetResponses => prevGetResponses.filter(item => item._id !== itemId))
      const responseData = await response.json()
      setResponse(responseData)
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/post', {
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
    } catch (error) {
      console.error('Error sending POST request:', error)
    }
  }
function getItems(){
  fetch('http://localhost:3000/get')
  .then(response => response.json())
  .then(data => {
    setGetResponse(data.items)
    // console.log(data.items)
  })
  .catch(error => {
    console.error('Error sending GET request:', error)
  })

}
  useEffect(()=>{
    getItems()
  },[response])

  return (
    <div>
      <h1>Send POST Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input 1:
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Input 2:
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      <h1>Send GET Request</h1>
      {getResponse && (
        <tbody>
          {getResponse.map(item => (
            <tr key={item._id}>
              <td>{item.item1}</td>
              <td>{item.item2}</td>
              <td><button onClick={() => handleDelete(item._id)}>X</button></td>
              
            </tr>
          ))}
        </tbody>
      )}
    </div>
  )
}

export default Page;
