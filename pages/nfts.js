"use client"
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import React from 'react'

const nfts = () => {
  const a = uploadToIPFS();
  console.log(a);
  
  return (
    <div>nfts</div>
  )
}

export default nfts

