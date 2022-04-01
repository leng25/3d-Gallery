import React, {Component} from 'react'
import {create} from 'ipfs-http-client'
import Web3 from 'web3'
import './App.css';
import first_contract from './abi/first_contract.json'

// const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545")

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol:"https"
})


class App extends Component {

  /*

  function to retrive pictures from contract

  const memeHash = await myContract.methods.getpicture(0).call()
  this.setState({memeHash})
  
  */
  async loadBlockChainData(){
    const web3 = window.web3;
    const accounts= await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = first_contract.networks[networkId]
    if(networkData){
      const abi = first_contract.abi 
      const address = networkData.address
      const myContract = new web3.eth.Contract(abi, address);
      this.setState({contract: myContract})

    }
    else{
      window.alert("smart contract not deploy")
    }
  }

  loadWeb3 =(event) =>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
    } 
    
    if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
      this.loadBlockChainData()
    }

    else{
      window.alert('please use metamastk')
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: '',
      contract: null,
      buffer: null,
      picture1: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ",
      picture2: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ",
      picture3: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ",
      picture4: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ",
      picture5: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ"
    };
  }

  captureFile = (event) =>{
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      var arrayBuffer = reader.result
      var bytes = new Uint8Array(arrayBuffer);
      console.log(bytes)
      this.setState({ buffer: bytes})
    }
  }

  onSubmit = (event) =>{
    event.preventDefault()
    const resoult =  ipfs.add(this.state.buffer)
    resoult.then((response)=> {
      
      this.state.contract.methods.addPicture(response.path).send({ from: this.state.account}).then((respond1) =>{
        this.state.contract.methods.getcounter().send({ from: this.state.account}).then((respond2) =>{  
            if(respond2 === 0){
              this.setState({picture1: response.path})
            }
            else if(respond2 === 1){
              this.setState({picture2: response.path})
            }
            else if(respond2 === 2){
              this.setState({picture3: response.path})
            }
            else if(respond2 === 3){
              this.setState({picture4: response.path})
            }
            else if(respond2 === 4){
              this.setState({picture5: response.path})
            }
        })
    
      })

    })

  }

  getPictures = (event) =>{
    event.preventDefault()
    this.contract.methods.getpicture(0).call().then((response)=>{
      this.setState({picture1: response})
    });
    this.contract.methods.getpicture(1).call().then((response)=>{
      this.setState({picture2: response})
    });
    this.contract.methods.getpicture(2).call().then((response)=>{
      this.setState({picture3: response})
    });
    this.contract.methods.getpicture(3).call().then((response)=>{
      this.setState({picture4: response})
    });
    this.contract.methods.getpicture(4).call().then((response)=>{
      this.setState({picture5: response})
    });

  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>{this.state.account}</h1>
        </div>
        
        
      <div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.picture1}`} className="App-logo" alt="logo" />
      </div>
      <div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.picture2}`} className="App-logo" alt="logo" />
      </div>
      <div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.picture3}`} className="App-logo" alt="logo" />
      </div>
      <div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.picture4}`} className="App-logo" alt="logo" />
      </div>
      <div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.picture5}`} className="App-logo" alt="logo" />
      </div>
  
        <div>
          <button onClick={this.loadWeb3}>
          Activate metamastk
          </button>
        </div>

        <div>
          <button onClick={this.getPictures}>
          get Pictures
          </button>
        </div>


        <form onSubmit={this.onSubmit}>
          <input type ='file' onChange={this.captureFile} />
          <input type='submit' />
        </form>
      </header>
    </div>
  );
  }
}


export default App;