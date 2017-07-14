import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import {
   PlayButton,
   PauseButton,
   ProgressBar, 
   SoundOnButton,
   SoundOffButton,
} from 'react-player-controls'

import screenfull from 'screenfull'

import ReactPlayer from 'react-player'
import Duration from './Duration'

import {
  Panel,
  Grid,
  Col,
  Button,
  Input,

} from 'amazeui-react';

import {post} from '../Call'

export default class Player extends Component {
  state = {
    url: null,
    playing: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    yasuo:10,
    name:undefined,
    message:""
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  componentWillMount(){
    let {movie_name,source_url} = this.props
    if (movie_name!=undefined && source_url!=undefined){
      
        this.setState({url:source_url+movie_name})
        this.setState({name:movie_name})
    }else{
      alert('错误的参数,请返回重试')
    }
    
  }
  query_new = ()=>{
    var form = new FormData()
    this.setState({message:'处理中...'})
    form.append('time',this.state.yasuo)
    form.append('name',this.state.name)
    this.setState({url:'testurl'})
    this.setState({url:'https://streamable.com/moo'})
    post('url',form,(re)=>{
      this.setState({message:''})
      this.setState({url:re.url})
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  setPlaybackRate = e => {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    console.log(e)
    this.setState({ played: parseFloat(e) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  onConfigSubmit = () => {
    let config
    try {
      config = JSON.parse(this.configInput.value)
    } catch (error) {
      config = {}
      console.error('Error setting config:', error)
    }
    this.setState(config)
  }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  render () {
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state
    const SEPARATOR = ' · '
    var play_button = !this.state.playing?
    <PlayButton onClick={this.playPause} isEnabled={true}/>
    :
    <PauseButton onClick={this.playPause} isEnabled={true}/>
    var sound_button = this.state.volume==0?
    <SoundOffButton
      isEnabled={true}
      onClick={()=>{}}
    />:
    <SoundOnButton
      isEnabled={true}
      onClick={() => this.setState({volume:0})} 
    />
    return (
        <Panel header={this.props.movie_name+'---------'+this.state.message}>
          <ReactPlayer
              ref={player => { this.player = player }}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              soundcloudConfig={soundcloudConfig}
              vimeoConfig={vimeoConfig}
              youtubeConfig={youtubeConfig}
              fileConfig={fileConfig}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
              controls={true}
            />
            <ProgressBar
              totalTime={1}
              currentTime={played}
              isSeekable={true}
              onSeek={this.onSeekChange}
              onSeekStart={this.onSeekMouseDown}
              onSeekEnd={this.onSeekMouseUp}
            />
            <Grid>
              <Col sm={1}>
              {play_button}
              </Col>
              <Col sm={1}>
              {sound_button}
              </Col>
              <Col sm={3}>
              <ProgressBar
              totalTime={1}
              currentTime={volume}
              isSeekable={true}
              onSeek={e=>{this.setState({volume:e})}}
            />
              </Col>
              <Col sm={4}>
              <Input addonBefore="压缩到" addonAfter="分钟" value = {this.state.yasuo} onChange={e=>{this.setState({yasuo:e})}}/>
              </Col>
              <Col sm={1}>
              <Button
              onClick = {
                this.query_new
              }
              >确定</Button>
              </Col>
              <Col sm={1}>
              <Button
              onClick = {
                this.onClickFullscreen
              }
              >全屏</Button>
              </Col>
            </Grid>
        </Panel>
        
    )
  }
}
