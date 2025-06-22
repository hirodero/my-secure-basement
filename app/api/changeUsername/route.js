import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const encodedString = await req.text();
    const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
    const { UserID, newUsername } = JSON.parse(decodedString);
    const response = await query(
    'UPDATE msuser SET Username = ? WHERE UserID = ?',
    [newUsername, UserID]
    );
    console.log('Query response:', response);
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