/**
 * 점수 확인 페이지
 * 
 * @author 명성
 * @version 1.0.0
 * 작성일 : 2022-02-02
 * 
 **/


import React from 'react';
import './DanddaResult.css';
import Avatar from '@material-ui/core/Avatar';
import { Route, Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Progressbar from './ProgressBar'
import kakao from './images/kakao.jpg' 
import insta from './images/instagram.jpg'
import face from './images/facebook.png'
import Button from '@material-ui/core/Button';
import { getFile, deleteFile } from '../../firebase/db'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function DanddaResult(props) {
  // const { alt, src } = props.location.state
  // console.log(alt)
  // console.log(src)
  const classes = useStyles();

  return (
    <div style={{
      display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' 
      , width: '100%', height: '88vh'
    }}>
      <Avatar/>
      <Progressbar bgcolor="#ff00ff" progress='85'  height={30} />
      <h2>총 n개 동작</h2>
      <h2>맞춘 동작: m개 동작</h2>
      <br/>
      <p>결과를 공유하기</p>
      <div style={{ display:'flex', flexDirection:'row' }}>
        <div className='circle'>
         <img src={kakao} />
        </div>
        <div className='circle'>
         <img src= {insta} />
        </div>
        <div className='circle'>
         <img src={face}/>
        </div>
      </div>
      <br/>
      <div className={classes.root} style={{ textAlign:'center' }}>
        <p>이 영상을 내 채널에 업로드 하시겠습니까?</p>
        <Link to='./upload'>
          <Button color="primary" variant="contained">네</Button>
        </Link>
        <Button color="secondary" variant="contained" onClick={deleteFile(0)}>아니오</Button>
      </div>
    </div>
  );
}

export default DanddaResult;