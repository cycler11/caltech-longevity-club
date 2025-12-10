import { NextResponse } from 'next/server';

/**
 * Instagram API Route
 * 
 * To use real Instagram API:
 * 1. Create an Instagram App at https://developers.facebook.com/
 * 2. Get Access Token from Instagram Basic Display API
 * 3. Set INSTAGRAM_ACCESS_TOKEN in your .env.local
 * 4. Uncomment the code below and replace with your token
 * 
 * Example API call:
 * GET https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=YOUR_TOKEN
 */

export async function GET() {
  try {
    // TODO: Replace with actual Instagram API call
    // const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    // 
    // if (!accessToken) {
    //   return NextResponse.json(
    //     { error: 'Instagram access token not configured' },
    //     { status: 500 }
    //   );
    // 
    //   const response = await fetch(
    //     `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
    //   );
    // 
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch Instagram posts');
    //   }
    // 
    //   const data = await response.json();
    //   return NextResponse.json(data.data || []);
    // }

    // For now, return empty array - component will use mock data
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}

