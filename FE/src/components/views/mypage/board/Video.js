import React, { useState } from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { deleteFile } from '../../firebase/db';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:'10px',
    borderRadius: '20px',
    marginBottom: '20px',
    boxShadow: '0px 0px 5px gray',
    backgroundColor: '#EEEEEE',
  },
  video: {
    display: 'flex',
    borderRadius: '20px',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: '10px',
  },
  title: {
    fontWeight: '',

  },
  subtitle: {
  },
  icon : {
    marginTop: '3px',
  }
}))

function Video({data, propFunction, index}) {
  const [dialog, setDialog] = useState(false)
  const {vid, uid, title, likecnt, views, url, score, thumbnail} = data
  const userId = localStorage.getItem('userId')
  const deleteVideo = () => {
    try {
      deleteFile(vid)
      axios.post(`video/delete/${vid}`)
        .then(res => {
          console.log(vid)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }
  const onOpen = (event) => {
    setDialog(true)
  }
  const onClose = () => {
    setDialog(false)
    propFunction(index)
  }
  const onDelete = async() => {
    deleteVideo()
    setDialog(false)
  }
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <div className={classes.video} >
        <video 
          src={url} 
          controls
          style={{objectFit:'fill', width:'100%', textAlign:'center'}}/>
      </div>
      <div className={classes.title}>
        <h4>{title}</h4>
      </div>
      <div className={classes.subtitle}>
        {
          uid === userId ? 
          <DeleteIcon className={classes.icon} onClick={onOpen}/>
          : <></>
        }
      </div>
      <Dialog
        open={dialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"?????? ????????????????????????"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ????????? ????????? ?????????????????? '???', ?????????????????? '?????????'??? ???????????????
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>?????????</Button>
          <Button onClick={onDelete} autoFocus>
            ???
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Video;