import { NextResponse } from 'next/server';

export async function GET() {
  // Return configuration status (never expose actual API keys!)
  const config = {
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'Not set',
    emailServiceConfigured: !!process.env.RESEND_API_KEY || !!process.env.EMAIL_USER,
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  };

  return NextResponse.json(config);
}
