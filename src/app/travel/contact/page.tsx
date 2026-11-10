import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Collaborate | Ashraf Siddiqui Travel',
  description: 'Get in touch with Ashraf Siddiqui for travel collaborations, brand partnerships, group trip bookings and more.',
};

export default function ContactPage() {
  return <ContactClient />;
}
