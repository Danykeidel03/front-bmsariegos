import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderBirthday.css';
import birthDayServices from '../../services/apiBirthday';

const SliderBirthday = () => {
    const [birthDaysList, setBirthDaysList] = useState([]);

    const birthDays = async () => {
        try {
            const response = await birthDayServices.getBirthday();
            const dataDays = response.data.data;
            setBirthDaysList(dataDays)
        } catch (e) {
            console.log(e);
        }
    }

    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; // aún no ha cumplido años este año
        }

        return age;
    };

    useEffect(() => {
        birthDays();
    }, []);

    return (
        <div className='slideBirthday'>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 500000 }}
                loop={true}
            >
                {birthDaysList.map((day, index) => (
                    <SwiperSlide key={index}>
                        <div className='cardBirthday'>
                            <div className='birthInfo'>
                                <div className='name'>{day.name}</div>
                                <div className='date'>
                                    {day.daysUntil ? `Quedan ${day.daysUntil} días para tu cumpleaños` : `Felices ${calculateAge(day.birthDay)} años!!`}
                                </div>
                            </div>
                            <div className='imgBirth'></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderBirthday;
