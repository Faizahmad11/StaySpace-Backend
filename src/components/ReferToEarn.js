import React, { useState, useEffect } from "react";

export default function ReferToEarn() {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // LocalStorage se user check karein
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserName(userData.name.split(" ")[0]);
      // Agar backend se referralCode nahi aa raha to ID use karein
      const code = userData.referralCode || userData._id || "friend";
      setReferralLink(`http://localhost:3000/signup?ref=${code}`);
    } else {
      setReferralLink("http://localhost:3000/signup?ref=stayspace");
    }
  }, []);

  // --- LOCALHOST FAIL-PROOF COPY LOGIC ---
  const handleCopy = () => {
    // Step 1: Create hidden textarea
    const textArea = document.createElement("textarea");
    textArea.value = referralLink;
    
    // Step 2: Ensure it's not visible but in the DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    // Step 3: Select and Copy
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    // Step 4: Cleanup
    document.body.removeChild(textArea);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join StaySpace',
        text: 'Book the best spaces with my link!',
        url: referralLink,
      }).catch(() => handleCopy());
    } else {
      // Localhost desktop par hamesha ye chalega
      handleCopy();
    }
  };

  return (
    <div className="refer-container">
      <div className="refer-card">
        <div className="spotlight"></div>
        
        <div className="refer-header text-center">
          <div className="icon-circle mb-3">
             <i className="fa-solid fa-gift"></i>
          </div>
          <h2 className="refer-title">Refer & <span>Earn</span></h2>
          <p className="refer-sub">
            Hey <strong>{userName}</strong>, share your link and earn <b>Rs 500</b> for every friend who joins!
          </p>
        </div>

        <div className={`refer-box ${copied ? "copied-glow" : ""}`}>
          <input 
            type="text" 
            className="refer-input" 
            value={referralLink} 
            readOnly 
          />
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? <i className="fa-solid fa-check text-success"></i> : <i className="fa-solid fa-copy"></i>}
          </button>
        </div>

        <button className="refer-main-btn" onClick={handleShare}>
          <i className="fa-solid fa-share-nodes mr-2"></i>
          {copied ? "Link Copied!" : "Share Referral Link"}
        </button>

        <div className="benefits mt-4">
          <div className="benefit-item text-center">
             <i className="fa-solid fa-link d-block"></i>
             <p>Invite</p>
          </div>
          <div className="benefit-item text-center border-left border-right">
             <i className="fa-solid fa-user-plus d-block"></i>
             <p>Register</p>
          </div>
          <div className="benefit-item text-center">
             <i className="fa-solid fa-wallet d-block"></i>
             <p>Earn</p>
          </div>
        </div>
      </div>
    </div>
  );
}