'use client'
import React, { useEffect } from 'react'

const ZoomPage = () => {
  const payload = {
    meetingNumber: '72414453640',
    userName: 'John Doe',
    password:'T6mzg1',
    role: 1,
  }

  useEffect(() => {
    const initializeZoom = async () => {
      try {
        const ZoomEmbed = (await import('@zoomus/websdk/embedded')).default;
        const client = ZoomEmbed.createClient();
        const meetingSDKElement = document.getElementById('meetingSDKElement');
        // Add any additional logic for the client if needed
        if (!meetingSDKElement) {
          throw new Error('meetingSDKElement not found');
        }
        client.init({
          language: 'es-ES',
          zoomAppRoot: meetingSDKElement
        })

        const data = await fetch('/api/signature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const res = await data.json()

        client.join({
          meetingNumber: payload.meetingNumber,
          sdkKey: res.sdkKey,
          signature: res.signature,
          password: payload.password,
          userName: payload.userName,
          tk:''
        })
      } catch (error) {
        console.log('--Error inside useEffect--', error);
      }
    };

    initializeZoom();
  }, []);

  return (
    <div className='flex flex-row h-[80vh] w-[80vw] mt-[10%] ml-[10%] bg-white rounded-lg '>
      
      <div className='w-[25%] bg-red-400 ' id='meetingSDKElement'>meetingSDKElement</div>
      <div className='w-[75%] bg-yellow-200 '>Content</div>
    </div>
  );
};

export default ZoomPage;
