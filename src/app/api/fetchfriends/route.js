import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const encodedString = await req.text();
    const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
    const { UserID } = JSON.parse(decodedString);
    let response;
    if(UserID==='9da586a5-06c8-4201-be29-c5aca6187523'){
        response = await query(
          "SELECT u.UserID, u.Username, u.Email FROM friends f JOIN msuser u ON ( (f.UserID1 = ? AND u.UserID = f.UserID2) OR (f.UserID2 = ? AND u.UserID = f.UserID1) )",[UserID, UserID]);
    }
    else{
        response = await query('SELECT UserID, Username, Email from msuser WHERE UserID="9da586a5-06c8-4201-be29-c5aca6187523"')
    }
    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (e) {
    console.error('SQL Error:', e);
    return NextResponse.json({
      success: false,
      message: e.message || 'Terjadi kesalahan server'
    }, { status: 500 });
  }
}
