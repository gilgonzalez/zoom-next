import { KJUR} from 'jsrsasign';
import { NextResponse } from 'next/server';

const ZOOM = {
  SDK: {
    KEY:'56PhWIVER3Oy52qsABFMTQ',
    SECRET:'rzY4L3OKf4O22CELZbnhJlKZTMukBIJG',
  }
}

export async function POST(req: Request) { 
  try {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const Header = {
      alg: 'HS256',
      typ: 'JWT',
    };
  
    const data = await req.json();
    console.log({ data });

    const Payload = {
      sdkKey: ZOOM.SDK.KEY,
      meetingNumber: data.meetingNumber,
      role: data.role,
      iat: iat,
      exp: exp,
    };
    console.log({ Payload });

    const sHeader = JSON.stringify(Header);
    const sPayload = JSON.stringify(Payload);
    console.log({ sHeader, sPayload });

    const meetingSignature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, ZOOM.SDK.SECRET);
    console.log({ meetingSignature });

    return NextResponse.json({
      signature: meetingSignature,
      sdkKey: ZOOM.SDK.KEY,
      method: req.method,
    });
    
  } catch (error) {
    console.error('Error in POST /api/zoom:', error);
    return NextResponse.error();
  }
}