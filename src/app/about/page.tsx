import Footer from "@/components/Footer";

export default async function AboutPage() {
  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12">
        <h1
          className="text-2xl font-bold font-underline text-primary"
        >
          About K.Sonar Research
        </h1>
        <p className="text-lg text-justify">
          K.Sonar Research is a dynamic market research company dedicated to providing unparalleled insights to businesses worldwide. We have rapidly grown into a trusted partner for organizations seeking in-depth market intelligence. We offer a wide range of syndicated and customized research solutions, encompassing quantitative and qualitative research across various industries to address unique data requirements.
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12">
        <h1 className="text-2xl font-bold text-primary">
          Our Team
        </h1>
        <p className="text-lg text-justify">
          Our team comprises 130+ domain experts specializing in diverse industries, ensuring comprehensive coverage of niche markets. We take pride in delivering over a million data points, bolstering your decision-making process with robust and reliable information.
        </p>
      </div>
      <div className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12">
        <h1 className="text-2xl font-bold text-primary">
          Client-Centric Approach
        </h1>
        <p className="text-lg text-justify">
          At K.Sonar Research, we comprehend the challenges businesses encounter while navigating the intricacies of the market. This is why our mission is to provide insights that genuinely impact the bottom line. We are committed to assisting you in gaining a deeper understanding of your target markets and making informed decisions with confidence.        </p>
      </div>

      <div className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12">
        <h1 className="text-2xl font-bold text-primary">
          Specialized Services
        </h1>
        <p className="text-lg text-justify">
          Our expertise spans market Research and Consulting, positioning us as your go-to partner for competition tracking, historical trend analysis with ripple effect assessments, segmentation, and strategy analysis.
        </p>     </div>
      <div className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12">
        <h1 className="text-2xl font-bold text-primary">
          Industry Partnerships
        </h1>
        <p className="text-lg text-justify">
          Since our inception, we have collaboratively engaged with numerous enterprises across diverse industries, delivering precise data and actionable insights through over 180+ projects. Our domain-specific teams of research experts continually monitor markets, ensuring our clients gain a competitive edge through high-quality market intelligence.
        </p>     </div>
      <div>
        <p className="mt-4 flex flex-col items-center gap-6 px-4 md:px-8 xl:px-12 text-lg text-justify">
          K.Sonar Research is dedicated to equipping you with the knowledge and expertise required to excel in today’s dynamic business landscape. Partner with us to unlock a world of opportunities and make confident, data-driven decisions that drive your success.
        </p>
      </div>
      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
        <h1  className="text-2xl font-bold text-primary text-center">Category/Industry</h1>
<h5 className="text-xl ">Industrial and Manufacturing</h5>
        <ul className="list-disc pl-4"> 
          <li>Automation & Process Control</li>
          <li>Machinery and Equipment</li>
          <li>Industrial Goods</li>
        </ul>
      </div>

      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
<h5 className="text-xl ">Materials and Chemicals</h5>
        <ul className="list-disc pl-4"> 
          <li>Advanced Materials</li>
          <li>Chemical & Materials</li>
          <li>Minerals & Metals</li>
          <li>Mining</li>
        </ul>
      </div>

      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
<h5 className="text-xl ">Technology and Electronics</h5>
        <ul className="list-disc pl-4"> 
          <li>Information & Communications Technology</li>
          <li>Semiconductor & Electronics</li>
          <li>Analytical And Scientific Instrumentation</li>
        </ul>
      </div>

      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
<h5 className="text-xl ">Healthcare and Life Sciences	</h5>
        <ul className="list-disc pl-4"> 
          <li>Biotechnology</li>
          <li>Healthcare</li>
          <li>Healthcare IT</li>
          <li>Medical Devices</li>
          <li>Pharmaceuticals</li>
        </ul>
      </div>

      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
<h5 className="text-xl ">Consumer and Goods Services</h5>
        <ul className="list-disc pl-4"> 
          <li>Consumer Goods</li>
          <li>Food & Beverages</li>
          <li>Packaging</li>
        </ul>
      </div>

      <div className="mt-4 px-4 md:px-8 xl:px-12 ">
      <h5 className="text-xl ">Energy and Utilities</h5>
      <h5 className="text-xl ">Infrastructure and Construction</h5>
      <h5 className="text-xl ">Automotive & Transportation	</h5>
      <h5 className="text-xl ">Agriculture and Food Industry</h5>
      <h5 className="text-xl ">Aerospace & Defense	</h5>        
      </div>
   
      <Footer />
    </>
  );
}
