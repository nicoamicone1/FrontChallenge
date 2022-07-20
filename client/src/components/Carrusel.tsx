import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, CardMedia } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Pagination } from 'swiper';

const images=['https://grimoldimediamanager.grimoldi.com/MediaFiles/Grimoldi/2022/3/22/7338245.jpg','https://grimoldimediamanager.grimoldi.com/MediaFiles/Grimoldi/2022/7/15/7562527.jpg']

const Carousel= () => {
  return (
    <Box sx={{mt:{xs:7,sm:9}}}>
    <Swiper
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{ clickable: true }}
    >
      {images.map(e=>(
        <SwiperSlide>
            <img src={e} width='100%' height='20%'/>
        </SwiperSlide>
      ))}
    </Swiper>
    </Box>
  );
};

export default Carousel