"use client"
import { Button } from "@/components/ui/Button";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Navbar from "@/components/Navbar";

export default function LandingPage() {

	return (
		<div className="h-screen w-screen bg-[#f5f5f2] text-[#070a15] grid grid-flow-col grid-cols-2 place-items-end place-content-center pl-12 pr-16 pt-16">

			<Navbar toBeUsedAt="home" />

			<div className="w-full inline-block align-middle whitespace-nowrap relative text-left">
				<span id="user_page_head" className="text-7xl tracking-tighter font-black " >
					In one link
					<br />
					get anonymous,
				</span>
				<br />
				<Swiper id="user_page_head" className="overflow-y-hidden w-fit h-24 pt-4  text-left inline-block" modules={[Autoplay]} spaceBetween={100} slidesPerView={1}
					autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }} loop={true} direction="vertical">
					<SwiperSlide className="text-7xl text- leading-2" >text messages.</SwiperSlide>
					<SwiperSlide className="text-7xl text- leading-2" >voice messages.</SwiperSlide>
					<SwiperSlide className="text-7xl text- leading-2" >feedbacks.</SwiperSlide>
					<SwiperSlide className="text-7xl text- leading-2" >compliments.</SwiperSlide>
					<SwiperSlide className="text-7xl text- leading-2" >suggetions.</SwiperSlide>
				</Swiper>
				<div className="flex justify-start items-center gap-4 mt-8">
					<input className="h-14 w-1/2 rounded-md text-md pl-4 placeholder:text-stone-700
					font-semibold tracking-tight" type="text" placeholder="clickk.link/your_name" />
					<Button className="h-14 rounded-full text-lg px-10 bg-[#040915] text-white 
					tracking-tight font-semibold">Get your Clickk.link</Button>
				</div>
			</div>

			<section className="w-96 h-80 inline-block align-middle whitespace-nowrap relative text-left">
				<Swiper className="overflow-y-hidden w-full h-full pt-4  text-left inline-block" modules={[Autoplay]} spaceBetween={100} slidesPerView={1}
					autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }} loop={true} direction="vertical">
					<SwiperSlide className="bg-red-900 rounded-3xl h-44">
						
					</SwiperSlide>
					<SwiperSlide className="bg-amber-500 rounded-3xl">
						
					</SwiperSlide>
					<SwiperSlide className="bg-blue-700 rounded-3xl">
						
					</SwiperSlide>
					<SwiperSlide className="bg-fuchsia-500 rounded-3xl">

					</SwiperSlide>
				</Swiper>
			</section>

		</div>
	)
}