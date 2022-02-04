import React, { useState, useEffect } from 'react';
import CarouselSlide from '../CarouselSlide';
import { SLIDE_INFO } from './constants';
import { FaAndroid, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slide from '@material-ui/core/Slide';
import img1 from './img/1.png'
import img2 from './img/2.png'
import img3 from './img/3.png'
import profile_src from './img/profile.png'
import axios from 'axios';


function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />;

    return <div onClick={clickFunction}>{icon}</div>;
}

function DanddaContent() {
    // axios로 댄서 이미지, 섬네일, 정보 받아오기
    const [dancerthumbnail, setDancerthumbnail] = useState("")
    const [profile, setProfile] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [vid, setVid] = useState("")

    const SLIDE_INFO = [
        { backgroundImage: dancerthumbnail, title: 'Slide 1', profile_name: 'seoyoung', profile_src: profile, id:9 },
        { backgroundImage: `url(${img2})`, title: 'Slide 2', profile_name: 'seoyoung', profile_src: profile_src, id:3 },
        { backgroundImage: `url(${img3})`, title: 'Slide 3', profile_name: 'seoyoung', profile_src: profile_src, id:4 },
        // { backgroundImage: '#ffe084', title: 'Slide 4' },
        // { backgroundImage: '#d9d9d9', title: 'Slide 5' },
    ];  

    const [index, setIndex] = useState(0);
    const content = SLIDE_INFO[index];
    const numSlides = SLIDE_INFO.length; 

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };
    const movecamera = (e) => {
        // window.Android.moveCamera();
        window.Android.showToast('카메라 실행');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        }
    
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[]);

    useEffect(() => {
        axios.get(`/video/find/${SLIDE_INFO[0].id}`)
        .then(res => {
          console.log(res.data) 
          setDancerthumbnail(res.data.thumbnail)
          setProfile(res.data.profile)
          setVideoUrl(res.data.url)
          setVid(res.data.vid)
          console.log(res.data.thumbnail)
        })
        .catch(err => {
          console.log('댄서 정보 받아오기 실패')
        });
    }, [vid])


    return (
        <div className='DanddaMain'>
            <div className='Carousel' onClick={movecamera}>
                <Arrow
                    direction='left'
                    clickFunction={() => onArrowClick('left')}
                />
                <Slide in={slideIn} direction={slideDirection}>
                    <div>
                        <CarouselSlide content={content} />
                    </div>
                </Slide>
                <Arrow
                    direction='right'
                    clickFunction={() => onArrowClick('right')}
                />
            </div>
        </div>
    );
}

export default DanddaContent;