import SectionTitle from "@/components/Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const TermsAndConditionsPage = () => {
  const List = ({ text, description }) => (
    <div className="mb-5">
      <p className="flex items-center text-lg font-medium text-body-color">
        <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {checkIcon}
        </span>
        {text}
      </p>
      <p className="ml-[46px] text-base text-body-color">{description}</p>
    </div>
  );

  return (
    <>
      <section className="pt-[150px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  Terms and Conditions
                </h2>
                
                <div className="mb-10">
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    This document outlines the terms and conditions governing the use of ADT Shipping Limited's services and website. By accessing our services or website, you agree to comply with the terms outlined herein. These terms are subject to modification, and continued use of our services constitutes acceptance of any changes.
                  </p>

                  <div className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
                    <div className="mx-[-12px] flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                        <List 
                          text="Acceptance of Terms" 
                          description="By using ADT Shipping Limited's services or website, you agree to these terms. If you do not accept these terms, do not use our website or services." 
                        />
                        <List 
                          text="Intellectual Property" 
                          description={
                            <>
                              <strong>Ownership:</strong> All content, trademarks, and intellectual property on the website belong to ADT Shipping Limited or its licensors.<br />
                              <strong>Authorized Use:</strong> You may use content for personal, non-commercial purposes. Reproduction, distribution, or alteration of content requires prior written consent.
                            </>
                          } 
                        />
                        <List 
                          text="Use of Services" 
                          description={
                            <>
                              <strong>Registration:</strong> Customers must register with accurate information. Accounts with incorrect details may be suspended or terminated.<br />
                              <strong>Permissible Use:</strong> Services are for legal shipping and customs clearance. Prohibited items, including hazardous materials, are not allowed.<br />
                              <strong>Delivery Notifications:</strong> Notifications will be sent when packages arrive at our warehouse and when they are ready for delivery.
                            </>
                          } 
                        />
                        <List 
                          text="Rates and Payments" 
                          description={
                            <>
                              <strong>Rates:</strong> Service rates are based on weight, dimensions, and additional services. Rates are subject to change with prior notice.<br />
                              <strong>Insurance:</strong> Packages are insured for a minimum of $1 or 1% of declared value, whichever is greater. Higher value packages may require additional insurance.<br />
                              <strong>Payment:</strong> Payment is due upon invoicing, with a 14-day grace period. Unpaid packages after 30 days will be deemed forfeited and disposed of at the company's discretion.
                            </>
                          } 
                        />
                      </div>
                      <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                        <List 
                          text="Website Use" 
                          description={
                            <>
                              <strong>Cookies:</strong> By using the website, you agree to the use of cookies for functionality and analytics.<br />
                              <strong>Hyperlinking:</strong> Approved organizations may link to the website. Unauthorized use of ADT Shipping Limited's logo or branding is prohibited.<br />
                              <strong>Content Liability:</strong> ADT Shipping Limited is not liable for third-party content linked from the website.
                            </>
                          } 
                        />
                        <List 
                          text="Customer Obligations" 
                          description={
                            <>
                              <strong>Compliance:</strong> Customers must adhere to all applicable laws and regulations regarding imports and customs.<br />
                              <strong>Cooperation:</strong> Customers are required to cooperate with ADT Shipping Limited for inspections, customs declarations, and resolving any issues related to their shipments.
                            </>
                          } 
                        />
                        <List 
                          text="Customs and Regulations" 
                          description={
                            <>
                              <strong>Inspection Authority:</strong> Customs and regulatory bodies have the right to inspect shipments. ADT Shipping Limited is not liable for actions taken by customs authorities, including detainment or confiscation.<br />
                              <strong>Compliance Responsibility:</strong> Customers are responsible for ensuring their packages comply with import/export laws and securing any necessary permits.
                            </>
                          } 
                        />
                        <List 
                          text="Liability and Claims" 
                          description={
                            <>
                              <strong>Package Claims:</strong> Claims for lost or damaged packages must be filed within 30 days of delivery. Reimbursement will be based on declared value, capped at $100 for undeclared packages.<br />
                              <strong>Limitations:</strong> ADT Shipping Limited is not liable for losses caused by prohibited goods, customer errors, or third-party handling.
                            </>
                          } 
                        />
                        <List 
                          text="Privacy" 
                          description="ADT Shipping Limited values your privacy. Please review our Privacy Policy for details on how we collect, store, and use your information." 
                        />
                        <List 
                          text="Modifications and Termination" 
                          description="ADT Shipping Limited reserves the right to modify these terms and conditions at any time. Updates will be posted on the website. Accounts may be terminated at the company's discretion for violations of terms or inappropriate use of services." 
                        />
                        <List 
                          text="Dispute Resolution" 
                          description="All disputes will be resolved through arbitration in Kingston, Jamaica, under Jamaican law." 
                        />
                        <List 
                          text="Contact Information" 
                          description={
                            <>
                              <strong>Email:</strong> contact@adtshipping.com<br />
                              <strong>Phone:</strong> (876) XXX-XXXX<br />
                              <strong>Website:</strong> <a href="https://www.adtshipping.com" className="text-primary">www.adtshipping.com</a>
                            </>
                          } 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditionsPage;