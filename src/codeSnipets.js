const get = ()=>{
 return   get = `
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

const post = `
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
`
const del = `
try {
      // Send a DELETE request to the server to delete the item
      const response = await fetch('https://zany-tan-colt-tam.cyclic.cloud/delete/$itemId}', {
        method: 'DELETE'
      })
      const responseData = await response.json()
      setResponse(responseData)
      setGetresponse('')
    } catch (error) {
      console.error('Error deleting item:', error);
    }

`
export default {get, post, del}
