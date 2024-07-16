import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import Swipe1 from "@/assets/images/Banner_Finpro1.png";
import Swipe2 from "@/assets/images/Banner_Finpro2.png";
import Swipe3 from "@/assets/images/Banner_Finpro3.png";
import Swipe4 from "@/assets/images/Banner_Finpro4.png";
import Image from "next/image";

export default function Hero () {
    return (
        <div>
            <div className="container w-full mx-auto md:h-80 h-60 relative">
                <Swiper
                    spaceBetween={30}
                    speed={3000}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    fadeEffect={{ crossFade: true }}
                    navigation={true}
                    modules={[Navigation, Autoplay, EffectFade]}
                    className="mySwiper rounded-lg"
                >
                    <SwiperSlide>
                        <div className="w-full">
                            <Image
                                src={Swipe1}
                                alt="Slide 1"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full">
                            <Image
                                src={Swipe2}
                                alt="Slide 2"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full">
                            <Image
                                src={Swipe3}
                                alt="Slide 3"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full">
                            <Image
                                src={Swipe4}
                                alt="Slide 4"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};