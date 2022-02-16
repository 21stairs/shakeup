import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },

  },
}));


function Board1({id}) {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [bestVid, setBestVid] = useState("")
  const uid = id

  // 최고 승률을 가져오기

  const getVideos = () => {
    // category, uid로 video 정보 가져오기
    // uid는 링크의 params 값을 main에서 props로 가져와야함.
    
    const credentials = {
      category : 0,
      uid : uid
    }
    axios.post(`/video/read/mycategory`, credentials)
    .then(res => {
      console.log(res.data)
      setVideos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })    
  }  

  const getBestVid = () => {
    axios.get(`/video/${uid}`)
    .then(res => {
      setBestVid(res.data)
    })
    .catch(err =>{
      console.log(err)
    }) 
  }



  useEffect(() => {
    getVideos();
    getBestVid();
  }, []);


  const classes = useStyles();

  return (
    <div>
    <h1>최고점 획득 댄따</h1>
    <div className="flex-1" 
        style={{ flexDirection:'column'}}
        >
          <br/>
          <video style={{width:'100vw', height:'30vh'}} src={bestVid.url}/>
          <h3 className="name"
          style={{textAlign:'center'}}
          >{bestVid.title}</h3>
         <br/> 
        <h2 style={{textAlign:'center'}}>댄따 총 참여 회수</h2>
        <h3 style={{textAlign:'center'}}>{videos.length}회</h3>
        <hr/>
        <br/>
      </div>
    <h1>최근 참여 댄따</h1>
    <br/>
    {videos.map((video) => {
      return (
      <div style={{
          width:'30vw', 
          display: 'flex',
          flexDirection:'column',
        }}>
        {/* img는 썸네일이 이렇게 뜬다 보여주기용 */}

          <video src={video.copy.url} style={{objectFit:'fill', width:'150px', height:'100px'}}/>
          <div>
          <Avatar key={video.copyid} src={video.origin_profile}/>
            <p>{video.origin_name}님의</p>
            <p>{video.original.title} </p>
            <p>{video.copy.score}점</p> 
          </div>
        <br/>
      </div>
      )
    })}
  </div>
  );
}

export default Board1;