import {
  Building2,
  LinkedinIcon,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="mt-32 border-t">
      <div className="grid w-full grid-cols-2 gap-2 px-8 py-10 sm:px-8 lg:grid-cols-5 xl:px-52">
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <Building2 size={30} />
            <h1 className="text-lg font-bold">Address</h1>
            <p className="text-sm">
              201, C-102, Sona Trade Center, RDC, Raj Nagar, Ghaziabad, Uttar
              Pradesh (201013), India.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <Mail size={30} />
            <h1 className="text-lg font-bold">Email</h1>
            <p className="text-sm">For any enquiries</p>
            <Link href="mailto:sales@ksonarreserach.com" className="underline">
              sales@ksonarreserach.com
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <MessageSquare size={30} />
            <h1 className="text-lg font-bold">Live Chat</h1>
            <p className="text-sm">chat with our support team</p>
            <Link
              href="https://wa.me/919911931247"
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
            <p>+91 9911931247</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-44 flex-col gap-1">
            <LinkedinIcon size={30} />
            <Link
              href="https://www.linkedin.com/company/k-sonar-research/"
              target="_blank"
              className="underline"
            >
              <p>Connect with us on LinkedIn</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center border p-2">
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
      </div>
    </div>
  );
}
