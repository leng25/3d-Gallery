/* Component for the Home Page */
/* Notes: .send the transaction when they save the hash*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {useState} from 'react'
import Popup from 'reactjs-popup';
import {create} from 'ipfs-http-client'
import useLocalStorageState from 'use-local-storage-state'
import { CONTACT_ABI, CONTACT_ADDRESS} from './config.js'
import Web3 from "web3";
import Modal from "react-modal";
import { keepTheme } from '../theme';
import EditNameLogo from './EditName.ico'
import DefaultPic from './Nav_Icons/DefaultPic.jpg'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'20em',
    },
  };


function Home() {
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol:"https"
      })

      const [Contract, setContract] = useState();
      const [account, setAccount] = useState('');


      const [hash,setHash] = useState("QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ") /* Hash for the first picture */
      const [buffer, setBuffer] = useState(null) /* Hook for the Buffer */
     
      const [picTest,setPicTest] = useLocalStorageState('picture_one','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [picTestTwo,setPicTestTwo] = useLocalStorageState('picture_two','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [picTestThree,setPicTestThree] = useLocalStorageState('picture_three','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [picTestFour,setPicTestFour] = useLocalStorageState('picture_four','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [picTestFive,setPicTestFive] = useLocalStorageState('picture_five','QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')

      let navigate = useNavigate()


      useEffect(() => { // Once the page is loaded, useEffect checks to see if the local storage is undefined. If so, it inputs the default hash into the local storage.
        
            async function load() {
                const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            
            const {ethereum} = window
            const accounts = await ethereum.request({method: 'eth_accounts'});

            
                if (accounts && accounts.length > 0) {
                    //console.log("user is connected");
                } else {
                    localStorage.clear()
                    return navigate('/Login')
                }

                if (accounts.length !==0) {
                    setAccount(accounts[0]);
                    console.log(account)
                    console.log(accounts)
                }

    
            const newcontract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

           
            setContract(newcontract);
    
            }
    
            load();
               
      }, []);//Empty array means it only checks once

      const captureFile = (event) =>{ /* function to take a selected file and turn it into a integer array, then it is set as the buffer */
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          var arrayBuffer = reader.result
          var bytes = new Uint8Array(arrayBuffer);
          console.log(bytes)
          setBuffer(bytes)
        }
      }

    
      const onSubmit = (event) =>{ /* On submit it adds the buffer and sets the response as the Hash and stores the Hash into the local Storage */
        event.preventDefault()
        /*console.log('I got here 1')*/
        const resoult =  ipfs.add(buffer)
        /*console.log(`This is the Hash: ${hash}`)*/
        /*console.log("This Is the buffer" + buffer)*/
        resoult.then((response)=> {
            Contract.methods.addPicture(response.path).send({from: account})
          setHash(response.path)
        })
      }

      const getPicturesOne = (event) =>{
          Contract.methods.getpicture(0).call({from:account}).then((response) =>{
              //console.log(response)
              setPicTest(response)
              
          })
      }

      const getPicturesTwo = (event) =>{
        Contract.methods.getpicture(1).call({from:account}).then((response) =>{
            //console.log(response)
            setPicTestTwo(response)
            
        })
    }

    const getPicturesThree = (event) =>{
        Contract.methods.getpicture(2).call({from:account}).then((response) =>{
            //console.log(response)
            setPicTestThree(response)
            
        })
    }

    const getPicturesFour = (event) =>{
        Contract.methods.getpicture(3).call({from:account}).then((response) =>{
            //console.log(response)
            setPicTestFour(response)
            
        })
    }

    const getPicturesFive = (event) =>{
        Contract.methods.getpicture(4).call({from:account}).then((response) =>{
            //console.log(response)
            setPicTestFive(response)
            
        })
    }
      /*TEST*/
        const [testName, setTestName] = useLocalStorageState('name','Not Selected')
        const [changename, setchangename] = useState('')

      
      const setName = (event) =>{
            Contract.methods.setname(changename).send({from: account})
    }
      const getName = (event) =>{
          Contract.methods.getname().call({from:account}).then((response)=>{
              //console.log(response)
              setTestName(response)
              closeModal()
          })
      }


    const [follow, setFollow] = useState('Follow');

    let removepic = (pics) =>{
        pics('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
    }

     
    useEffect(() => {
        async function loadpic(){
            if (picTest == undefined){
                return getPicturesOne(),getPicturesTwo(),getPicturesThree(),getPicturesFour(),getPicturesFive(),getName()
            }
            
        }
        loadpic();
      } )

      useEffect(() => {
          if (testName == undefined ){
              navigate('/CreateAccount')
          }
      },[])

      useEffect(() => {
        if (picTestFive == ""){
            setPicTest('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicTestTwo('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicTestThree('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicTestFour('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setPicTestFive('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
        }
    })

    let subtitle;

    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      useEffect(() => {
        keepTheme();
    })
      
            
   

    return(
        <section id="HomeContainer">
            <meta name='viewport' content="width=device-width, initial-scale=1.0" />
            <section id="MainTitle">
                <article id="Navigation"> </article>
            </section>
            <Header />
            <section id="About">
                <h3>About</h3>
                <p id="ProfilePic"><img src={DefaultPic} /></p><br/>
                <img onClick={openModal} src={EditNameLogo} />
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    shouldCloseOnOverlayClick={false}
                >
                    <input placeholder={testName}style={{width:'20em',textAlign:'center',borderRadius:'5em'}} onChange={(e) => setchangename(e.target.value)}></input>
                    <button type="button" style={{width:'10em',textAlign:'center',borderRadius:'5em' , border:'none',color:'white',background:'green'}} onClick={() => setName()}>Set Name</button>
                    <button type="button" style={{width:'10em',textAlign:'center',borderRadius:'5em', border:'none',color:'white',background:'green'}} onClick={() => getName()}>Confirm</button>



                </Modal>
                <h4>{testName}</h4>
                <button type="button" id="FollowButton" onClick={() => setFollow('Following')}>{follow}</button>
            </section>

            <section id="UserPics">
                <p id="P1">
                    <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${picTest}`}/>}>
                        <form id="#PicForm" onSubmit={onSubmit}>
                            <input type ='file' onChange={captureFile} />
                            <input type='submit' />
                        </form>
    
                        <input type='submit' value='Refresh' onClick={() => getPicturesOne()} />
                        
                        <form>
                            <input type="submit" value='Delete' />
                        </form>   
                    </Popup>
                </p>


                        <p id="P2">
                            <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${picTestTwo}`}/>}>
                                <form id="#PicForm" onSubmit={onSubmit}>
                                    <input type ='file' onChange={captureFile} />
                                    <input type='submit' />
                                </form>

                                <input type='submit' value='Refresh' onClick={() => getPicturesTwo()} />

                                <form>
                                    <input type="submit" value='Delete' />
                                </form>   
                            </Popup>
                        </p>
  

                        <p id="P3">
                            <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${picTestThree}`}/>}>
                                <form id="#PicForm" onSubmit={onSubmit}>
                                    <input type ='file' onChange={captureFile} />
                                    <input type='submit' />
                                </form>

                                <input type='submit' value='Refresh' onClick={() => getPicturesThree()} />

                                <form>
                                    <input type="submit" value='Delete' />
                                </form>   
                            </Popup>
                        </p>

                        <p id="P4">
                            <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${picTestFour}`}/>}>
                                <form id="#PicForm" onSubmit={onSubmit}>
                                    <input type ='file' onChange={captureFile} />
                                    <input type='submit' />
                                </form>

                                <input type='submit' value='Refresh' onClick={() => getPicturesFour()} />

                                <form>
                                    <input type="submit" value='Delete' />
                                </form>   
                            </Popup>
                        </p>

                        <p id="P5">
                            <Popup position='center center' trigger ={<img src={`https://ipfs.infura.io/ipfs/${picTestFive}`}/>}>
                                <form id="#PicForm" onSubmit={onSubmit}>
                                    <input type ='file' onChange={captureFile} />
                                    <input type='submit' />
                                </form>

                                <input type='submit' value='Refresh' onClick={() => getPicturesFive()} />

                                <form>
                                    <input type="submit" value='Delete' />
                                </form>   
                            </Popup>
                        </p>
               

            </section>

            {/*<section id="Trending">
                <p>#Trend1</p>
                <p>#Trend2</p>
                <p>#Trend3</p>
                <p>#Trend4</p>
                <p>#Trend5</p>
            </section>*/}


        </section>
    )

}

export default Home;