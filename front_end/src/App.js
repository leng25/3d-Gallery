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

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

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
      const memeHash = await myContract.methods.getpicture(0).call()
      console.log(memeHash)
      this.setState({memeHash})
    }
    else{
      window.alert("smart contract not deploy")
    }
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    } 
    
    if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
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
      memeHash: "QmWp9s7onE9wJPFBng6swV5n65GHNKeoePsgWKLUikPHaQ"
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
      this.state.contract.methods.addPicture(response.path).send({ from: this.state.account}).then((respond) =>{
        this.setState({memeHash: response.path})
      })
    })

  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>{this.state.account}</h1>
        </div>
        <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="logo" />
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