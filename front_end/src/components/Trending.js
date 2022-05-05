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


function Trending() {
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

      
      
      /*TEST*/
        const [testName, setTestName] = useLocalStorageState('name','Not Selected')
        const [changename, setchangename] = useState('')
        const [Friends , setFriends] = useState(['0x9b11Db65b886AcA1F715BB8b038B91e4c8e07767','0x7f144155F6c82EbC45Bef040Ba073Aa1252f9377'])
        const [FriendsName, setFriendsName] = useLocalStorageState('FriendOne',Friends[0])
        const [FriendsNameTwo, setFriendsNameTwo] = useLocalStorageState('FriendTwo',Friends[1])



      
     

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

    
       const [trendingimg, setTrendingImg] = useState(['QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ']);    
       ; 
       

    return(
        <section id="HomeContainer">
           <Header />
                    
           <meta name='viewport' content="width=device-width, initial-scale=1.0" />
            <section id="MainTitle">
                <article id="Navigation"> </article>
            </section>
            
            <section id="TrendingList">
                <h3>Trending</h3> <br />
                <o1>
                    <li><h2>1. @testing</h2><img id='P1'src={`https://ipfs.infura.io/ipfs/${trendingimg}`} /></li>
                    <li><h2>2. @testing</h2><img id='P1'src={`https://ipfs.infura.io/ipfs/${trendingimg}`} /></li>
                    <li><h2>3. @testing</h2><img id='P1'src={`https://ipfs.infura.io/ipfs/${trendingimg}`} /></li>

                </o1>
                {/*<button type="submit" onClick={() => getfriend()}>Get Friend</button>*/} {/*Get Friends through effect not through button*/}
                
                
                {/*<h4 onClick={() => navigate('/FriendsPage')}>{FriendsName}</h4>*/}
                {/*<button type="button" onClick={()=>{testgetname()}} >TESTGETNAME</button>
                /*<button type="button" onClick={()=>{getfriend()}} >GETFRIENDS</button>*/}

                
                
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

export default Trending