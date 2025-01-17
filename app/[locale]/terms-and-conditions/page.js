import { useTranslations } from "next-intl";
import React from "react";

const page = () => {
  const tTermsAndConditins = useTranslations("termsAndConditions");

  return (
    <div className="mx-auto mt-6 flex h-full w-full items-center justify-center">
      {/* Title */}

      <div className="mx-10 flex w-full flex-col items-center justify-center gap-10 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl">
            {tTermsAndConditins("title")}
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
        </div>
        <div className="flex w-full max-w-[1300px] flex-col justify-center gap-6 font-lato text-neutral-600">
          <span className="text-center">
            <span className="text-lg font-semibold">
              Please read the terms carefully before using the store or any of
              its services.
            </span>{" "}
            This agreement defines legally binding terms and conditions
          </span>
          <span>
            Golden Brand for Stainless Steel Equipment is an officially
            registered store in Qatar with Commercial Registration No.:
            (XXXXXXXX) The store sells local manufacturing products and products
            imported from different countries. Its address is: Doha, Qatar.
          </span>
          <span>
            It is registered with the General Authority of Tax with a tax
            identification number: XXXXXXXXXXXXXXX
          </span>
          <ul className="list-inside list-decimal marker:text-lg">
            <li className="text-lg font-semibold" id="privacy">
              Our Contract:
            </li>
            <div className="mt-5">
              <span>
                These terms and conditions (Store Terms) apply to your uses of
                the domain{" "}
                <span className="font-semibold text-[var(--theme)]">
                  www.goldenbrandqa.com
                </span>{" "}
                on the Internet (the “Store”) and this term must include all the
                contents in the Store, and you must read these terms carefully,
                and we recommend that you keep a copy for future reference, Your
                entry, browsing, use or registration in the store confirms that
                you have read, understood and agreed to the entire terms of the
                store, and if you do not agree to the terms of this store in
                their entirety, you must not use the store. We are committed to
                providing very accurate prices on our store, however, errors can
                occur that may lead to an incorrect price for a product. In such
                cases, we reserve the right to refuse or cancel any order.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Privacy and Cookie Policy
            </li>
            <ul className="mt-5 list-disc">
              <li className="ml-10">
                These terms attached to the store (which are in addition to) the
                terms of the privacy policy and cookie policy, as our privacy
                policy explains what personal information we collect about you
                when using the store and our cookie policy deals with the use of
                cookies on the store, which is as follows:
              </li>
            </ul>
            <div className="mt-5 text-lg font-semibold">
              <span>Cookies:</span>
            </div>
            <div className="mt-5">
              <span>
                “Cookies” are pieces of information that the online store
                transfers to the hard drive for the purpose of keeping records.
                In addition, cookies allow the online store to remember
                important information that To make your use of the site more
                convenient, and here, Golden Brand Store, like most stores, uses
                “cookies” for a variety of purposes in order to improve your
                online experience. For example, we track the total number of
                visitors to our online store on the basis of the total number of
                an unspecified number, We also use cookies so that we can
                remember you when you return to the store again, by keeping
                track of the items in your shopping cart if you purchase goods
                on the Internet, and we also use cookies to remember you when
                administering some contests and sweepstakes that our company
                conducts, moreover our use of cookies helps you personalize your
                experience on the online store, and in those cases we associate
                personal information with a “cookie”. Use the options in your
                web browser if you do not wish to receive cookies or if you wish
                to set your browser to notify you when you receive a cookie.
                Click on the “Help” section of your browser to learn how to
                change your cookie preferences. If all cookies are disabled, you
                may not be able to take advantage of all the features on this
                store.
              </span>
            </div>
            <div className="mt-10">
              <span className="text-lg font-semibold">
                Links to Other Sites:
              </span>
            </div>
            <div className="mt-5">
              <span>
                We may provide links to the store that are not managed and
                operated by us, and if you visit one of the links to this store
                you should review their privacy and other policies, we are not
                responsible for the policies and practices of companies
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                Changes to Our Privacy Policy :
              </span>
            </div>
            <div className="mt-5">
              <span>
                From time to time it may be necessary for Golden Brand to resort
                to changing its privacy policy, and if we by changing our
                policy, we will publish the revised version to our customers,
                and therefore we suggest that our customers periodically check
                the store to ensure that there are updated versions of our
                privacy policy. Here, we call on our customers to be reassured,
                in the event of any changes, they will not be applied
                retroactively, and the way to deal with previously collected
                information will not be changed.
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">Cookies Necessary:</span>
            </div>
            <div className="mt-5">
              <span>
                These cookies are used to support your experience. On the store,
                these include user-selected options, help you navigate the
                store, etc.. No personally identifiable data is collected with
                these types of cookies.
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                Operation and performance cookies:
              </span>
            </div>
            <div className="mt-5">
              <span>
                These cookies are used to run the store and include customer
                surveys, visitor numbers, and the recording and analysis of
                other internet data.
              </span>
            </div>
            <div className="mt-5">
              <span>
                These cookies are used to track visitors to our store, and may
                be used to build personal information from the search or
                browsing history of each visitor, and may collect data
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">
                Marketing cookies and targeted advertising:
              </span>
            </div>
            <div className="mt-5">
              <span>
                These are used Files to track browsing habits and activity in
                the store, and we use this information to enable us to market
                appropriate content, and by using these types of cookies we
                collect personal information and use this option to display
                targeted ads or share this data with a third party for the same
                purpose.
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold">Functional Cookie:</span>
            </div>
            <div className="mt-5">
              <span>
                store data to allow download functionality, no personal
                information is collected from This is “cookies”
              </span>
            </div>
            <div className="mt-5">
              <span className="text-lg font-semibold text-neutral-700">
                When you agree to the terms of the store, you will also be
                deemed to have read, understood and agreed to our terms of
                privacy and cookies in their entirety.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Your use of this store:
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">
                You must use this store for lawful purposes only and must not
                use it in a way that infringes the rights of anyone else or
                restricts or prevents anyone from enjoying the services of the
                store.
              </li>
              <li className="ml-10 mt-5">
                You may use, download and display the contents of this store on
                a computer screen and print One copy of the Content, for your
                own personal or internal commercial use only, other than for
                your own personal or internal commercial use.
              </li>
              <li className="ml-5 mt-5 text-lg font-semibold">
                You may not do the following without our prior written consent:
              </li>
              <ul>
                <li className="ml-10 mt-4">
                  – Copy, reproduce, use or otherwise interact with any content
                  on the store.
                </li>
                <li className="ml-10 mt-4">
                  – Modify, distribute, or republish any content on the Store
                  for any purpose.
                </li>
                <li className="ml-10 mt-4">
                  – Reproduce this Store or its frames, and connect or condense
                  on this Store from any other online store, application, or
                  other Internet-connected device.
                </li>
                <li className="ml-10 mt-4">
                  – Use the store content for any other commercial activity
                  whatsoever.
                </li>
              </ul>
              <li className="ml-5 mt-5 text-lg font-semibold">
                You may not use the store for any purpose For the following
                purposes:
              </li>
              <ul>
                <li className="ml-10 mt-4">
                  – Posting any illegal, defamatory, threatening, abusive,
                  obscene, or otherwise objectionable material.
                </li>
                <li className="ml-10 mt-4">
                  – Transmitting or transmitting material that encourages
                  conduct that would constitute a criminal offense, give rise to
                  civil liability or violate any laws, regulations or codes of
                  practice.
                </li>
                <li className="ml-10 mt-4">
                  – Unauthorized access to our computer systems or the computer
                  systems of others.
                </li>
                <li className="ml-10 mt-4">
                  – Interference with using or interfering with any other
                  person’s enjoyment of the online store or the Internet.
                </li>
                <li className="ml-10 mt-4">
                  – Interfering with or disrupting networks or online stores
                  connected to the store.
                </li>
                <li className="ml-10 mt-4">
                  – Manufacture, transmit, or store electronic copies of
                  copyrighted material.
                </li>
              </ul>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              Using the online store from outside of Qatar:
            </li>
            <div className="mt-5">
              <span>
                Except as otherwise provided in this store, the materials on
                this store are displayed solely for the purposes of promoting
                Golden Brand Company products available in Qatar, for those who
                choose to enter To this store from stores outside Qatar will be
                responsible for compliance with local laws to the extent local
                laws are applicable and applicable.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">Ownership Rights:</li>
            <ul className="list-disc">
              <li className="ml-10 mt-5">
                Store content is protected by copyrights, trademarks, database
                and other intellectual property rights in this store owned or
                licensed to Golden Brand Company for Stainless Steel Equipment.
              </li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              Security, password and account:
            </li>
            <div className="mt-5">
              <span>
                You are responsible for maintaining the privacy of your password
                and for the security of your account and for any activities that
                occur under your account. We are not responsible for any losses
                or damages that may occur as a result of any failure by you to
                protect your password and the security of your account.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Online store availability:
            </li>
            <div className="mt-5">
              <span>
                We cannot promise that the services on the store will be free of
                errors permanently, and in the event of an error occurring in
                the service, please inform us of it at{" "}
                <span className="font-semibold text-[var(--theme)]">
                  sales@goldenbrandqa.com{" "}
                </span>
                and we will try to correct the error as soon as possible.
              </span>
            </div>
            <div className="mt-5">
              <span>
                Access to the store may sometimes be restricted or limited to
                enable repairs, development or general maintenance. We will
                endeavor to restore access as quickly as possible.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">Our responsibility:</li>
            <div className="mt-5">
              <span>
                We disclaim all warranties, representations, terms and
                conditions (whether express or implied, by statute, common law
                or otherwise) to the fullest extent permitted by law. arising
                from or in connection with this store or your use of the Site.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">Global Agreement:</li>
            <div className="mt-5" id="delivery">
              <span>
                The terms of this store (including our privacy policies, cookies
                policy and terms and conditions of sale) indicate and clarify
                the comprehensive and complete agreement between you and between
                us and supersedes any and all prior terms, conditions,
                warranties and/or representations to the fullest extent
                permitted by law.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Changes to the Terms And the provisions of this Store:
            </li>
            <div className="mt-5" id="payment">
              <span>
                We reserve the right to change and update the terms and
                conditions This store from time to time. We recommend that you
                visit this page regularly to be aware of the latest developments
                in the Terms and Conditions. Your continued access, browsing and
                use of this store means your acceptance of any changes or
                updates to the terms and conditions of our store.
              </span>
            </div>
            <li className="mt-5 text-lg font-semibold">Delivery:</li>
            <div className="mt-5">
              <span>Coming Soon...</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Payment and Security Policy:
            </li>
            <ul className="list-disc">
              <li className="ml-10 mt-4">
                By bank transfer (you will be notified of the details of
                completing the process).
              </li>
              <li className="ml-10 mt-4">
                We assure you, our valued customers, that all your bank account
                details are not stored, sold, shared, or leased to any other
                parties.
              </li>
              <li className="ml-10 mt-4">
                At Golden Brand Store, we guarantee a safe shopping experience
                on our website.
              </li>
            </ul>
            <li className="mt-5 text-lg font-semibold">
              Designing Custom Products:
            </li>
            <div className="mt-5" id="refund">
              <span>Coming Soon...</span>
            </div>
            <li className="mt-5 text-lg font-semibold">
              Refund & Return Policy:
            </li>
            <div className="mt-5">
              <span>Coming Soon...</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
