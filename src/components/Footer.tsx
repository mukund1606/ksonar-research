import { Linkedin, Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="mt-32 border-t">
      <div className="grid w-full grid-cols-2 gap-2 px-8 py-10 sm:px-8 lg:grid-cols-4 xl:px-52">
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <Linkedin size={30} />
            <h1 className="text-lg font-bold">LinkedIn</h1>
            <p className="text-sm">Connect with us at</p>
            <Link href="#" target="_blank" className="underline">
              <p>My Profile</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <Mail size={30} />
            <h1 className="text-lg font-bold">Email</h1>
            <p className="text-sm">For any enquiries</p>
            <Link href="mailto:mail@mail.com" className="underline">
              main@mail.com
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <MessageSquare size={30} />
            <h1 className="text-lg font-bold">Live Chat</h1>
            <p className="text-sm">chat with our support team</p>
            <Link
              href="https://wa.me/999999999999"
              target="_blank"
              className="underline"
            >
              <p>Start new chat</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <Phone size={30} />
            <h1 className="text-lg font-bold">Phone</h1>
            <p className="text-sm">Call us for any questions</p>
            <p>+99 9999999999</p>
          </div>
        </div>
      </div>
    </div>
  );
}
