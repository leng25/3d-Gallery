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


function FriendsList() {
    const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol:"https"
      })

      const [Contract, setContract] = useState();
      const [account, setAccount] = useState('');


      const [hash,setHash] = useState("QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ") /* Hash for the first picture */
      const [buffer, setBuffer] = useState(null) /* Hook for the Buffer */
     
      const [FpicTest,setFPicTest] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [FpicTestTwo,setFPicTestTwo] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [FpicTestThree,setFPicTestThree] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [FpicTestFour,setFPicTestFour] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
      const [FpicTestFive,setFPicTestFive] = useState('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')

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

      
      /*TEST*/
        const [testName, setTestName] = useLocalStorageState('name','Not Selected')
        const [changename, setchangename] = useState('')
        const [Friends , setFriends] = useState(['0x9b11Db65b886AcA1F715BB8b038B91e4c8e07767','0x7f144155F6c82EbC45Bef040Ba073Aa1252f9377'])
        const [FriendsName, setFriendsName] = useLocalStorageState('FriendOne',Friends[0])
        const [FriendsNameTwo, setFriendsNameTwo] = useLocalStorageState('FriendTwo',Friends[1])



      
      const setName = (event) =>{
            Contract.methods.setname(changename).send({from: Friends})
    }
      const getName = (event) =>{
          Contract.methods.getname().call({from:Friends[0]}).then((response)=>{
              console.log(response)
              setFriendsName(response)
          })
          Contract.methods.getname().call({from:Friends[1]}).then((response)=>{
            console.log(response)
            setFriendsNameTwo(response)
            closeModal()
        })
      }



    const [follow, setFollow] = useState('Follow');

    let removepic = (pics) =>{
        pics('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
    }

     
    useEffect(() => {
        async function loadpic(){
            if (FpicTest == undefined){
                return 
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
        if (FpicTestFive == ""){
            setFPicTest('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setFPicTestTwo('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setFPicTestThree('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setFPicTestFour('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
            setFPicTestFive('QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ')
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

    const [FriendPage, setFriendPage] = useState({
        name:'TEST',
        num:''
    })
    const [Showpage, setShowPage] = useState(false)

    const Friendpage = (Friend,Loc) =>{
        let friendaccount = testFri[FriendPage.num]
        let friendname = FriendPage.name

        //console.log(FriendPage.name + FriendPage.num + testFri[FriendPage.num])
        
        const testgetpic = () =>{
            const count = testFri.length
            //console.log("TEST")
            //console.log('THE ACCOUNT: '+ testFri)        
    
            
    
             
                    Contract.methods.getpicture(0).call({from:friendaccount}).then((response) =>{
                        //console.log(response)
                        setFPicTest(response)
                        return
                        
                    })
                
          
               
                  Contract.methods.getpicture(1).call({from:friendaccount}).then((response) =>{
                      //console.log(response)
                      setFPicTestTwo(response)
                      return
                      
                  })
              
          
                  Contract.methods.getpicture(2).call({from:friendaccount}).then((response) =>{
                      //console.log(response)
                      setFPicTestThree(response)
                      return
                      
                  })
              
          
                  Contract.methods.getpicture(3).call({from:friendaccount}).then((response) =>{
                      //console.log(response)
                      setFPicTestFour(response)
                      return
                      
                  })
              
          
                  Contract.methods.getpicture(4).call({from:friendaccount}).then((response) =>{
                      //console.log(response)
                      setFPicTestFive(response)
                      return
                      
                  })
              
    
                  
           return 
        }
            
            testgetpic()
        
        return(
            <section>
                
                <section id="MainTitle">
                    <article id="Navigation"> </article>
                </section>
                <section id="About">
                    <h3>About</h3>

                    <p id="ProfilePic"><img src={DefaultPic} /></p>
                    <h4>{friendname}</h4>

                       
                    <button type="button" id="FollowButton" onClick={() => setFollow('Following')}>{follow}</button>

                </section>

                <section id="UserPics">
                    <p id="P1">
                        <img src={`https://ipfs.infura.io/ipfs/${FpicTest}`}/>
                    </p>


                    <p id="P2">
                        <img src={`https://ipfs.infura.io/ipfs/${FpicTestTwo}`}/>
                    </p>
    

                    <p id="P3">
                         <img src={`https://ipfs.infura.io/ipfs/${FpicTestThree}`}/>
                    </p>

                    <p id="P4">
                         <img src={`https://ipfs.infura.io/ipfs/${FpicTestFour}`}/>
                    </p>

                    <p id="P5">
                          <img src={`https://ipfs.infura.io/ipfs/${FpicTestFive}`}/>
                     </p>
                

                </section>

        </section>
        )
    }

    const [addfriends , setaddFriends] = useState('')
    const [testFri, settestFri] = useState([])
    const addFrind = (event) =>{
        Contract.methods.addFrind(addfriends).send({from: account})
    }

    const getfriend = (event) =>{
        Contract.methods.getFriendsAddress().call({from:account}).then((response)=>{
            //console.log(response)
            let removedup = [...new Set(response)]
            settestFri(removedup)
            //console.log(testFri)
        })
    }

   
    /*useEffect(() => {
        const count = testFri.length

        for (let n=0; n < count.length; n++){
            Contract.methods.getname().call({from:Friends[n]}).then((response)=>{
                console.log(response)
                setFriendsName(response)
            })

        }
    })*/

    const [friendsnames, setFriendsnames] = useState([])
    const [testFname, settestFname] = useState([])


    const testgetname = () =>{
        const count = testFri.length
        //console.log("TEST")
        

        for (let n=0; n < count; n++){
            Contract.methods.getname().call({from:testFri[n]}).then((response)=>{
                //console.log(response)
                //setFriendsnames(response)
                setFriendsnames(friendsnames => [...friendsnames,response]);
                
            })

            
               

        }
        let testing = [...new Set(friendsnames)]
        settestFname(testing)
        //console.log('TESTFNAME: ' + testFname)
        //console.log('ACCOUNT NAME: ' + testFname)

    }
    

    

    useEffect(() => {
        async function loadnames(){
            //console.log(testFname.length)
            return getfriend()
            
            
        }
        loadnames();
        
      } )

      useEffect(() => {
        async function loadnamestest(){
            if(testFname.length !== testFri.length){
             return testgetname()
            }

            else{
                return
            }
            
            
        }
        loadnamestest();
      } )

      /*useEffect(() => {
        async function loadnamestest(){
            if(testFname.length !== testFri.length){
             return testgetpic()
            }

            else{
                return
            }
            
            
        }
        loadnamestest();
      },[] )*/



    const DFrinendpage = () =>{
        return(
            <section id="HomeContainer">
            <meta name='viewport' content="width=device-width, initial-scale=1.0" />
            <section id="MainTitle">
                <article id="Navigation"> </article>
            </section>
            
            <section id="FriendsList">
                <h3>Add Friend</h3> <input placeholder="Enter Username" type='text' onChange={(e) => {setaddFriends(e.target.value)}}></input><br />
                <button type="submit" onClick={() => addFrind()}>Add Friend</button><br />
                {/*<button type="submit" onClick={() => getfriend()}>Get Friend</button>*/} {/*Get Friends through effect not through button*/}
                <h3>Friends List</h3>
                
                {/*<h4 onClick={() => navigate('/FriendsPage')}>{FriendsName}</h4>*/}
                {/*<button type="button" onClick={()=>{testgetname()}} >TESTGETNAME</button>
                /*<button type="button" onClick={()=>{getfriend()}} >GETFRIENDS</button>*/}

                
                {testFname.map((names,index) =>{
                    return(
                    <ul>
                    <li onClick={() => {setFriendPage({name: names, num: index})}}>{names}<br /><button onClick={() => {setShowPage(true)}}>SHOW</button></li>
                    </ul>
                    )
                })}
                {/*testFri.map((name)=>{
                    return (<p>{name}</p>)
                })*/}{/*
                    <li onClick={() => {setFriendPage(FriendsName)}}>{FriendsName}<br /><button onClick={() => {setShowPage(true)}}>SHOW</button></li>
                    <li onClick={() => {setFriendPage(FriendsNameTwo)}}>{FriendsNameTwo}<br /><button onClick={() => {setShowPage(true)}}>SHOW</button></li>
            */}
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
      
            
   

    return(
        <section id="HomeContainer">
           <Header />
                    
                    {Showpage ? Friendpage(FriendPage,FriendPage.index) : DFrinendpage()}
                

        </section>
    )

}

export default FriendsList;