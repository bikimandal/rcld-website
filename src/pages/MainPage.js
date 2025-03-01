import CoursesList from "@/components/CoursesList";
import Description from "@/components/Description";
import NavBar from "@/components/NavBar";
import GalleryShowMain from "@/components/GalleryShowMain";
import React from "react";
import Tape from "@/components/Tape";
import Leaftlet from "@/components/Leaftlet";
import Partners from "@/components/Partners";
import FindUs from "@/components/FindUs";
import Tape2 from "@/components/Tape2";
import PersonalisedCoursesList from "@/components/PersonalisedCoursesList";
import TapeStraight from "@/components/TapeStraight";
import Footer from "@/components/Footer";
import AdCarousel from "@/components/AdCarousel";

export default function mainpage() {
  return (
    <>
      <NavBar />
      <Partners />
      <Description />
      <AdCarousel />
      <Tape2 />
      <Leaftlet />
      <PersonalisedCoursesList />
      <TapeStraight />
      <CoursesList />
      <Tape />
      <GalleryShowMain />
      <FindUs />
      <Footer />
    </>
  );
}
