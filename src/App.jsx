import "./App.css"
import React,{useState,useRef} from "react"
import { Link } from "react-router-dom"
import background from "./assets/background.png"
import whatsapp from "./assets/whatsapp.png";
import mail from "./assets/mail.png";
function App() {
  const [formFields, setFields] = useState({})
  const element = useRef(null)
  const ul = useRef(null)


  const onChangeHandler=(event)=>{
    // setFields(...formFields +event.target.name,event.target.value)
    const product = {
      ...formFields,
      [event.target.name]:event.target.value
    }
    setFields({...product })
    
    console.log(formFields);
  }

  const hideSeek=(event)=>{
    element.current.classList.remove("sm:hidden")
    element.current.childNodes[0].classList.remove("flex")
    element.current.childNodes[0].classList.add("sm:bg-[#e5e7eb]","sm:text-black")
    element.current.childNodes[0].classList.add("bg-[#2D3748]","absolute","top-0.5","right-0.5","h-5/6","w-1/3","sm:m-0")
    element.current.childNodes[0].childNodes[0].classList.add("sm:my-2")
    element.current.childNodes[0].childNodes[1].classList.add("sm:my-2")
    element.current.childNodes[0].childNodes[2].classList.add("sm:my-2")

    console.log(element);

  }

  const submitHandler = async(event) => {
    event.preventDefault();
    let email = event.target[0].value
    let phone = event.target[1].value
    let password = event.target[2].value
    console.log(email,phone,password);

    const info = await fetch("http://localhost:5500/sendmail",{
      method:"POST",
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify(formFields),

    })

    const data = await info.json();
    if(data.sent)
    {
      console.log("mail has been sent to boss.");
    }
    else{
      console.log("server side error");
    }

  }
  return (

    <>
      <div className="bg-[#F7FAFC] h-screen"  >

      {/* navigaiton part  */}
        <div className="h-16 sm:block w-full text-white  bg-[#2D3748]  lg:flex lg:justify-between lg:items-center">
          <div className="logo">
            <h1 className=" sm:text-6xl sm:mx-auto   sm:text-center sm:w-1/2 hover:text-gray-600 shadow lg:text-4xl  tracking-widest font-bold lg:ml-5">MS</h1>
            {/* <ul   onClick={hideSeek} className="absolute top-0.5 right-0.5 mr-6 mt-5 md:hidden">
              <li className="h-1 w-12 bg-[#f5f3ff] my-1  "></li>
              <li className="h-1 w-12 bg-[#f5f3ff] my-1  "></li>
              <li className="h-1 w-12 bg-[#f5f3ff] my-1  "></li>
            </ul> */}

          </div>
          <div  ref={element} className=" links sm:hidden  ">
            <ul  ref={ul}  className="flex mr-12   ">
              {/* <li className=" hover:shadow hover:text-gray-500   mx-3 font-sans leading-normal text-2xl"> <Link to="/home">home</Link></li>
              <li className=" hover:shadow hover:text-gray-500   mx-3 font-sans leading-normal text-2xl"> <Link to="/about">About me</Link></li>
              <li className=" hover:shadow hover:text-gray-500   mx-3 font-sans leading-normal text-2xl"> <Link to="/hire">Hire me</Link></li>
              
              <li onClick={ ()=>{ element.current.classList.add("md:hidden")}} className=" shadow hover:text-gray-500   mx-12  mt-72 font-sans leading-normal text-2xl">&#10006; </li> */}
            </ul>
          </div>
        </div>



        <div className=" lg:flex lg:justify-between   w-full lg:items-center h-auto  mt-12 sm:block  ">


          <div>
            <img  src={background} alt="mail send picture" className=" sm:h-48 md:h-1/2 lg:w-96 mb-6 ml-16 sm:w-11/12  " />
          </div>

          <form onSubmit={(e) => { submitHandler(e) }} className="sm:w-11/12 sm:mx-auto lg:mx-0 lg:mr-24 shadow-md bg-[#f5f3ff] flex flex-col border-2 border-transparent rounded      lg:h-96 lg:w-80  ">
            <h1 className="mx-auto mt-3 gray  text-lg">Enter Details to Signup</h1>
            <input type="email" value={formFields.email} onChange={onChangeHandler} className="input text-lg shadow my-2 mx-1  outline-none   mt-8  h-10  border-8 border-inherit focus:h-11 " placeholder="Enter Email" name="email" id="password" />
            <input type="number"  value={formFields.phone} onChange={onChangeHandler} className="input text-lg shadow my-2 mx-1  outline-none     h-10  border-8 border-inherit focus:h-11 " placeholder="Enter Phone Number" name="phone" id="password" />
            <input type="password" value={formFields.password} onChange={onChangeHandler} className="input text-lg shadow my-2 mx-1  outline-none  h-10  border-8 border-inherit focus:h-11  transiton-all  " placeholder="Enter Password" name="password" id="password" />
            <input type="submit" className="bg-blue-500 mx-1 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-2" value="Sign-Up" />


          </form>
        </div>


        <div className="h-10  mt-24">
        <div className="flex justify-start">
          <img  id="img1" className="h-10 text relative  leading-normal  ml-12 mr-3 hover:h-11 " src={mail} alt="mail logo"  />
          <img className="h-10 text relative leading-normal hover:h-11" src={whatsapp} alt="mail logo"  />
        </div>
        </div>

      </div>

    </>
  );
}

export default App