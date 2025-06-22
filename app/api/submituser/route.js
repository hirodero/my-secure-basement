import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const userId = uuidv4();
    const encodedString = await req.text();
    const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
    const { Username, Email, Password } = JSON.parse(decodedString);
    const response = await query(
      'INSERT INTO msuser (UserId, Username, Email, Password) VALUES (?, ?, ?, ?)',
      [userId, Username, Email, Password]
    );

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (e) {
    console.error('SQL Error:', e);

    if (e.errno === 1062) {
      return NextResponse.json({
        success: false,
        message: 'Email sudah terdaftar',
        code: 409
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      message: e.message || 'Terjadi kesalahan server'
    }, { status: 500 });
  }
}
