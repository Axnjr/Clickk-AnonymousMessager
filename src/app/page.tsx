"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import HomeNavbar from "@/components/HomeNavBar";
import ImagePersona from "@/components/ImagePersona";
import { useEffect } from 'react';
import JoinForm from '@/components/JoinForm';

function isElementInViewport(el: any) {
	var rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
	);
}

export default function LandingPage() {

	return (
		<>
			<div id='root1' className="h-[125vh] md:h-screen w-screen bg-[#e7f701] text-[#000000] flex flex-col md:flex-row ">
				<HomeNavbar />
				<div className="w-fit inline-block align-middle whitespace-nowrap sm:px-8 px-4 text-left mt-44 m-auto">
					<span id="user_page_head" className="tracking-tighter font-black text-center text-white text-5xl sm:text-6xl md:text-7xl ">
						In one link
						<br />
						get anonymous,
					</span>
					<br />
					<Swiper id="user_page_head" className="overflow-y-hidden w-fit h-24 pt-4 text-left inline-block" modules={[Autoplay]} spaceBetween={100} slidesPerView={1}
						autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }} loop={true} direction="vertical">
						<SwiperSlide id='user_page_head' className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-2" >text messages.</SwiperSlide>
						<SwiperSlide id='user_page_head' className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-2" >voice messages.</SwiperSlide>
						<SwiperSlide id='user_page_head' className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-2" >feedbacks.</SwiperSlide>
						<SwiperSlide id='user_page_head' className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-2" >compliments.</SwiperSlide>
						<SwiperSlide id='user_page_head' className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-2" >suggetions.</SwiperSlide>
					</Swiper>
					<JoinForm where='top' />
				</div>
				<ImagePersona />
			</div>

			{/* <div className=' top-full w-full h-fit bg-[#9501f7]'> */}

				<div id='whats_clickk' className="h-screen w-screen text-[#ffffff] bg-[#000000] text-center flex flex-col justify-center items-center rounded-b-[5rem]">
					<h1 id="user_page_head" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter">What's Clickk ?</h1>
					<p className=" w-2/3 mt-16 text-lg md:text-2xl md:text-left">
						rounded-t-[3rem] md:rounded-t-[5rem] Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe repudiandae, dignissimos ab optio enim officiis ullam quos amet fugiat doloribus nulla, cupiditate unde cum quis nisi sequi, impedit labore.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aut laudantium, alias adipisci earum explicabo magni dolorum animi repellat dignissimos commodi quasi totam.
					</p>
				</div>

				<div id='security' className="h-screen w-screen bg-[#ffffff] text-[#000000]  text-center flex flex-col justify-center items-center rounded-b-[4rem] md:rounded-[8rem] mt-12" >
					<h1 id="user_page_head" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter">We assure 100% security</h1>
					<p className=" w-2/3 mt-16 text-lg md:text-2xl md:text-left">
						absolute top-[200%]
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod saepe repudiandae, dignissimos ab optio enim officiis ullam quos amet fugiat doloribus nulla, cupiditate unde cum quis nisi sequi, impedit labore.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aut laudantium, alias adipisci earum explicabo magni dolorum animi repellat dignissimos commodi quasi totam.
					</p>
				</div>

				<div className='mt-12 h-fit pt-32 pb-4 w-screen bg-[#e7f701] text-[#000000] flex flex-col justify-center items-center gap-10 rounded-t-[5rem] '>
					<h1 id="user_page_head" className="text-5xl sm:text-6xl md:text-7xl md:w-2/3 text-center font-extrabold tracking-tighter">Start connecting with people who like you</h1>
					<JoinForm where='end' />
					<div className='md:h-32 w-11/12 mt-6 md:text-black md:bg-white rounded-3xl flex justify-center items-center gap-6 md:gap-14'>
						<img className='w-32 ' src='https://assets.website-files.com/62a6e19b906fa55f541799d7/62a6e36e6a31c835ec16d16b_Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917%201.png' alt='Dowload from App store' />
						<h1 className="font-black text-4xl tracking-tighter hidden md:flex items-center">
							Clickk
							<svg className="w-8 h-8 mx-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
							</svg>
						</h1>
						<img className='w-32 ' src='https://assets.website-files.com/62a6e19b906fa55f541799d7/62a6e3de10ae34ace77a2fdb_en_badge_web_generic%201.png' alt='Get it on Google play store' />
					</div>
					<p className='text-base tracking-tight'>All Rights Reserved. Copyright © 2023.</p>
				</div>

			{/* </div> */}

		</>
	)
}