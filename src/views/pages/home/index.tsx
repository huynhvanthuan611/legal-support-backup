import React from "react";
import BannerSection from "views/components/UI/Home/BannerSection";
import Feedback from "views/components/UI/Home/Feedback";
import { feedbackMock, productMock } from "./constants/mockdata";
import ProductSection from "views/components/UI/Home/ProductSection";
import ContactSection from "views/components/UI/Home/ContactSection";
import LawFirmSlider from "views/containers/LawFirmSlider";
import ChatButton from "views/components/Commons/ChatButton";
import BlogSlider from "views/containers/BlogSlider";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <div>
        <h3 className="px-[50px] text-[#17191f] text-3xl font-bold leading-[10.6px] py-2 text-left">
          Văn phòng luật uy tín
        </h3>
        <LawFirmSlider />
      </div>
      <div>
        <h3 className="px-[50px] text-[#17191f] text-3xl font-bold leading-[39.6px] py-4 text-left">
          Blog mới mỗi ngày
        </h3>
        <BlogSlider />
      </div>

      {productMock &&
        productMock.map((product, index) => (
          <ProductSection key={`product__${index}`} {...product} />
        ))}
      <Feedback feedbacks={feedbackMock} />
      <ContactSection />
      <ChatButton />
    </div>
  );
};

export default Home;
