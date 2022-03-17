import React, {useRef} from 'react'

export default function Register(props) {
  const account = useRef();
  const password = useRef();


  function formSubmit(e) {
    e.preventDefault()
    const name = account.current.value
    const pass = password.current.value

    var shippingLabel = new Headers();
    shippingLabel.append("Content-Type", "application/json");
  
    var payload = JSON.stringify({
      "name": name,
      "password": pass
    })
  
    var requestPackage = {
      method: 'POST',
      headers: shippingLabel,
      body: payload,
      redirect: 'follow'
    };
    
    // props.setRegisterStatus(true)
    fetch("http://localhost:3001/register", requestPackage)
    .then(res => {
      console.log(res.status)
      if (res.status == 200) {
        alert("Registered!")
        props.setRegisterStatus(true)
        console.log(res)
      }
      // else if(res.status == 401){
      //   alert("Username existed!")
      // }
    })
    .catch(except => {
      //alert("Register Failed")
      console.log(except)
    })

    
  }

  return (
    < div >
      <h1>Register</h1>
      <form className="register-page">
        <div>
          <label >Name</label>
          <input ref={account} type="text" required />
        </div>
        <div>
          <label>Password</label>
          <input ref={password} required />
        </div>
        <button onClick={formSubmit}>Register</button>
      </form>
    </div >
  )
}
