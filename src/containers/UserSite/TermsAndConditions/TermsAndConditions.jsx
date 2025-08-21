/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { Container, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import Collapse from '../../../shared/components/Collapse';
// import history from '../../../shared/utils/history';
import './terms.css'; // Or correct relative path to your stylesheet


class TermsAndConditions extends React.Component {
  componentWillMount() {
    console.log('start');
  }

  render() {
    return (
      <Container style={{ overflow: 'hidden', height: 'fit-content' }}>
        <CardBody>
          <h1 className="thankyou__header">TERMS AND CONDITIONS</h1>
          <p style={{ textAlign: 'right' }}>
          Last updated: [2023-10-23]
          </p>
          <Collapse className="with-shadow" title="1. Introduction" open="true" >
            <p>
              Welcome to <strong>RecyGlo Co. Ltd</strong> (“<strong>RecyGlo</strong>” or “<strong>we</strong>” or “<strong>us</strong>”). Founded in 2017, RecyGlo is committed to provide environmentally friendly recycling solutions to businesses and organizations. The ultimate mission of RecyGlo is to process waste materials in a safe, non-hazardous manner with an aim to keep the world environmentally clean. RecyGlo believes in promoting smart recycling habits in order to achieve long-lasting results. RecyGlo envisions to become a leading waste management solution platform in Southeast Asia that produces zero waste and zero carbon footprint.
              <br /><br />
              We thank you for choosing us for efficient waste management and recycling services.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="2. Service">
            <p>
              The services offered by RecyGlo include but are not limited to collection of waste from designated offices and recycling services ( “<strong>Services</strong>”). To avail Services, the prospective clients (“you”) are required to create an account with RecyGlo (“<strong>Account</strong>”).
              <br /><br />
              After creating an Account and subscribing to our Services, you will have access to our online portal. Among others, you will be allowed to access a schedule calendar, which will assist you to monitor the days when the collection of waste is scheduled by us. The analytical dashboard available on our online portal will display the categorization of the waste collected from you. Online training programs are also available on our portal to offer knowledge on technicalities of efficient waste management. You may also download a monthly/quarterly report which will provide a detailed report on collection and management of waste . These additional facilities provided by us forms part of Services.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="3. Terms of Service">
            <p>
              To avail our Services, you are required to accept the following terms and conditions (“<strong>Terms of Service</strong>”). These Terms of Service govern your access and use of our Services. The privacy policy followed by RecyGlo, which explains how we collect, safeguard and disclose information is detailed below and forms a part of the Terms of Service.
              <br /><br />
              Please read these Terms of Service carefully. By accepting our Services, you acknowledge that you have read, understood and accepted the Terms of Service and agree to be bound by them. This document is an electronic record and does not require and physical or digital signatures.
              <br /><br />
              ACCESSING OR OTHERWISE USING OUR SERVICES INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS STATED HEREIN, SO PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE PROCEEDING.
              <br /><br />
              If you do not agree with (or cannot comply with) the Terms of Service, you may not use the Service. In such an event, please let us know by emailing at <a href="mailto:contact@recyglo.com">contact@recyglo.com</a> so we can try to find an amicable solution.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="4. No Use by Minors">
            <p>
              The Services are intended only for access and use by individuals who are at least eighteen (18) years old. By accessing or using our Services, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into and abide by all of the terms and conditions stated herein.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="5. Accounts">
            <p>
              To avail Services, you will have to create an account with RecyGlo (“Account”). When you create an Account, you guarantee that the information provided is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of the Account and Services provided by RecyGlo.
              <br /><br />
              You will be responsible for maintaining the confidentiality of the Account including but not limited to the user name and password, restriction of access to your Account. You agree to accept responsibility for any and all activities or actions that occur under the Account and/or password. You are obligated to notify RecyGlo immediately upon becoming aware of any breach of security or unauthorized use of the Account.
              <br /><br />
              You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.
              <br /><br />
              We reserve the right to refuse to provide our  Services, terminate Account, or cancel orders placed using Services at our sole discretion.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="6. Subscriptions and Renewal of Services">
            <p>
              The Service will be billed on a subscription basis ("<strong>Subscription(s)</strong>") and may be monthly, quarterly, semi-annually or annually as opted by you. You may chose the appropriate option for availing our Services ("<strong>Billing Cycle</strong>"). The Billing Cycle will be set depending on the type of subscription plan selected by you when purchasing a Subscription.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="7. Payment">
            <p>
              A valid payment method is required to process the payment for the Subscription. You are required to  provide accurate and complete billing information that may include but not limited to full name, address, state, postal or zip code, and telephone number.
              <br /><br />
              To pay for a Subscription, you must follow the onscreen instructions after clicking ‘Checkout’ on our online platform. You will have to pay the charges for our Services by way of online payment method or recharge or top-up through a licensed third party payment service provider as made available on our online portal. You may need to provide your debit/credit card details to the third party payment service providers available on our online portal. Your unique password should not be shared with anyone and you agree to keep it secret at all times. You are solely responsible for keeping your password safe. You accept that all Subscriptions placed by you are your sole responsibility.
              <br /><br />
              With your consent, your credit / debit card / payment information may be stored with the third party payment service provider(s) for future Subscriptions. RecyGlo does not store your credit / debit card or payment information.
              <br /><br />
              You must ensure that you have sufficient funds on your credit or debit card to fulfil payment for a Subscription. All valid Credit / Debit card payments are processed using a Credit Card payment gateway or appropriate payment system infrastructure and the same will also be governed by the terms and conditions agreed to between the user and the respective issuing bank and payment instrument issuing company.
              <br /><br />
              RecyGlo reserves the right to offer any additional payment methods and/or remove existing payment methods at any time in its sole discretion. You will be notified for any change in payment methods.
              <br /><br />
              All fees and charges which you incur from using a Visa or Mastercard whether that's a debit card or a credit card are set by  card issuer.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="8. Fee Changes">
            <p>
              RecyGlo, in its sole discretion and at any time, may modify the Subscription fees for the Subscription. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.
              <br /><br />
              RecyGlo will provide you with a prior notice of one month before effecting any change in Subscription fees to give you an opportunity to terminate the Subscription before such change becomes effective.
              <br /><br />
              The continued use of our Services after Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="9. Renewal of Services">
            <p>
              Service provided by us are not auto-renewed. Therefore, at the end of each Billing Cycle, you will have to specifically renew your Subscription by following the instructions available on the online portal or by contacting <a href="mailto:contact@recyglo.com">contact@recyglo.com</a> or customer support team <a href="mailto:customerservice@recyglo.com">customerservice@recyglo.com</a>.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="10. Communications">
            <p>
              By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information that we may send from time to time. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at <a href="mailto:contact@recyglo.com">contact@recyglo.com</a>.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="11. Prohibited Uses">
            <p>
              You may use the Service only for lawful purposes and in accordance with this Terms of Service.
              <br />
              You agree not to use our Services for any purpose:
              <ol>
                <li>that violates any applicable national or international law or regulation;</li>
                <li>To impersonate another person when uploading personal details or at any other time;</li>
                <li>To harvest or otherwise collect information about others, including e-mail addresses, without their consent;</li>
                <li>To engage in any other conduct that restricts or inhibits any other person from using or enjoying the services provided by RecyGlo or which, in the sole discretion of RecyGlo, exposes RecyGlo or any of its clients, or any other parties to any liability or detriment of any type;</li>
                <li>To perform any activity which in any way constitutes cyber-bullying, as determined by RecyGlo in its sole discretion;</li>
                <li>To post content that is unlawful, obscene, defamatory, dangerous, life-threatening, harassing, abusive, slanderous, or hateful to any other person or entity as determined by RecyGlo in its sole discretion or pursuant to local community standards;</li>
                <li>To encourage other people to engage in any prohibited activities as described herein;</li>
                <li>To use our Services in any manner that could disable, overburden, damage, or impair the Services or interfere with any other party’s use of Services, including their ability to engage in real time activities through Services;</li>
                <li>To use any robot, spider, or other automatic device, process, or means to access the Services for any purpose, including monitoring or copying any of material on Service;</li>
                <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful to the online platform maintained by RecyGlo;</li>
                <li>To use any manual process to monitor or copy any of the material offered by RecyGlo as a part of the Services or for any other unauthorized purpose without our prior written consent;</li>
                <li>To use any device, software, or routine that interferes with the proper working of the online platform maintained by RecyGlo; or</li>
                <li>To post any content that infringes the intellectual property rights, privacy rights, publicity rights, trade secret rights, or any other rights of any party.</li>
              </ol>
              <br />
              The above is a non-exhaustive list of the types of conduct that are illegal or prohibited in relation to the Services. RecyGlo reserves the right to add or amend the above list of prohibited activities.
              <br />
              RecyGlo reserves the right but is not obligated to do any or all of the following:
              <br /><br />
              <ol>
                <li>To investigate an allegation that any of the above mentioned activities have been committed that does not conform to the Terms of Service and determine in its sole discretion the appropriate measures to be taken;</li>
                <li>To take appropriate legal action against anyone who, in RecyGlo’s sole discretion, engages in any of the prohibited activities;</li>
                <li>To remove or request the removal of the content which is abusive, illegal, or disruptive, or that otherwise fails to conform with the Terms of Service; and</li>
                <li>To suspend or terminate the Subscription upon any breach of these Terms of Service.</li>
              </ol>
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="12. Analytics">
            <p>
              We may use third-party service providers to monitor and analyze the use of  Services.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="13. Protection of Personal Data and Information">
            <p>
              All information including personal information collected by RecyGlo is solely used and retained by RecyGlo. Such information is not passed on to any third party service provider or any individual outside RecyGlo.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="14.  Intellectual Property">
            <p>
              Certain parts of the Service including but not limited to online trainings are and will remain the exclusive property of RecyGlo. The Services are protected by copyright, trademark, and other laws of Myanmar and foreign countries. Our trademarks shall not be used in connection with any product or service without the prior written consent of RecyGlo.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="15. Error Reporting and Feedback">
            <p>
              You may provide us either directly at toe@recyglo.com with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“<strong>Feedback</strong>”).
              <br /><br />
              You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in relation to the Feedback; (ii) RecyGlo may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) RecyGlo is not under any obligation of confidentiality with respect to the Feedback.
              <br /><br />
              You hereby agree to grant RecyGlo an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) the Feedback in any manner and for any purpose.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="16. Links to Other Websites">
            <p>
              The Services may contain links to third party web sites or services that are not owned or controlled by RecyGlo.
              <br /><br />
              RecyGlo has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. RecyGlo does not warrant the offerings of any of these entities/individuals or their websites.
              <br /><br />
              By accepting the Terms of Service, you acknowledge and agree that RecyGlo shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.
              <br /><br />
              RecyGlo strongly advises you to read the terms of service and privacy policies of any third party web sites or services that you may have access to.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="17. Indemnification">
            <p>
              You agree to indemnify, defend and hold RecyGlo and its affiliates, and their respective officers, directors, owners, employees, agents, information providers and licensors (collectively the "<strong>Indemnified Parties</strong>," or individually, “<strong>Indemnified Party</strong>”) harmless from and against any and all claims, liability, losses, actions, suits, costs and expenses (including attorneys’ fees) arising out of or incurred by any breach by you of this Terms and Conditions. RecyGlo reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with RecyGlo’s defense of such claim. RecyGlo and its affiliates have no duty to reimburse, defend, indemnify, or hold you harmless resulting from, relating to, or arising out of, this Terms and Conditions or to use our Services. We reserve its right to all forms of equitable and legal relief related to fraud or illegal activity connected to the use of our Services.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="18. Governing Law and Dispute Resolution">
            <p>
              The Terms of Service shall be governed and construed in accordance with the laws of the Republic of Union of Myanmar.
              <br /><br />
              Any and all claims, demands, causes of action, disputes, controversies and other matters in question arising out of or in relation to this Terms of Service, including any question regarding its breach, existence, effect, validity or termination (“<strong>Dispute</strong>”) shall be first settled by amicable negotiation and/or conciliation between you and RecyGlo (“<strong>Parties</strong>”).
              <br /><br />
              If such Dispute cannot be settled amicably through negotiation and/or conciliation within thirty (30) calendar days from the date on which such Dispute is notified by either party, it shall be referred to and finally resolved by an exclusive jurisdiction of competent court of Republic of Union of Myanmar.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="19. Changes to Service">
            <p>
              RecyGlo reserves the right to withdraw or amend Services, and any other services or materials provided via Services, in its sole discretion without prior notice to you.  RecyGlo will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period. From time to time, RecyGlo may restrict access to some parts of Service, or the entire Service to you.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="20. Amendments to Terms">
            <p>
              RecyGlo may amend the Terms of Service at any time by posting the amended terms on the official website. It will be your responsibility to review the Terms of Services periodically.
              <br /><br />
              By continuing to access or use the Service following the posting of revised Terms of Service, you accept and agree to be bound by the changes in the Terms of Service. As long as you comply with these Terms and Conditions, we grant you a personal, non-exclusive, non-transferable, limited privilege to use our Services. If you do not agree to the changes in the Terms of Service, you will no longer be authorized to use the Services.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="21. Waiver and Severability">
            <p>
              The Terms of Service constitute the entire agreement between the Parties in respect of the Service and supersede and replace any prior agreements that might have been executed between the Parties regarding the Service.
              <br /><br />
              No waiver by RecyGlo of any term or condition set forth in this Terms of Service shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure on the part of RecyGlo to assert a right or provision under the Terms of Service shall not constitute a waiver of such right or provision.
              <br /><br />
              If any provision of the Terms of Service is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Service will continue in full force and effect.
            </p>
          </Collapse>
          <Collapse className="with-shadow" title="22.  Intellectual Property">
            <p>
              By using the Service, you acknowledge that you have read these Terms of Service and agree to be bound by them.
            </p>
          </Collapse>
        </CardBody>
      </Container>
    );
  }
}
export default connect()(TermsAndConditions);
