import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Left Column: Illustration */}
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
           <Image
  src="/images/aboutImg.png"
  alt="About ADT"
  width={900}
  height={800}
  className="mx-auto rounded-lg shadow-lg"
/>
            </div>
          </div>

          {/* Right Column: Steps */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              {/* Step 1 */}
              <div className="mb-9">
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  1 – Sign Up
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color dark:text-white/80">
                  Get started with ADT today and enjoy your free personalized US shipping address along with a unique mailbox number tailored just for you!
                </p>
              </div>

              {/* Step 2 */}
              <div className="mb-9">
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  2 – Shop
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color dark:text-white/80">
                  Shop from stores anywhere in the world and have your purchases delivered to your personal ADT address — or let your friends and family send packages straight to your secure ADT mailbox.
                </p>
              </div>

              {/* Step 3 */}
              <div className="mb-9">
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  3 – Processed
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color dark:text-white/80">
                  ADT receives your packages at our US warehouse and promptly notifies you, allowing you to upload your invoice with ease.
                </p>
              </div>

              {/* Step 4 */}
              <div className="mb-1">
                <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  4 – Delivery
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color dark:text-white/80">
                  You will be notified once your package is ready. Then, click the link provided to schedule your delivery at your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
