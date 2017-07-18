import React from 'react';
import {
  Container,
  Input,
  FormGroup,
  ButtonToolbar,
  Tabs,
  Button,
  Item,
  ModalTrigger,
  AvgGrid,
  Grid,
  Form,
  Article,
  Panel,
  Thumbnails,
  Thumbnail,
  Col,
  Badge

} from 'amazeui-react';
//import Player from '../components/player/Player'
import ReactPlayer from 'react-player'
import { withRouter,Link } from 'react-router'
import { myConfig } from '../components/config.js';
import {get} from '../components/Call'
const convertFileToString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
var base_url  = "http://253.3004.arcsec.top:8080/"

var api_url  = "http://253.3004.arcsec.top:8080/movies/"
var source_url= 'http://253.3004.arcsec.top:8080/source/'
var result_url= 'http://253.3004.arcsec.top:8080/result/'
var Process_movie  =  withRouter(React.createClass( {
    getInitialState(){
        var movie_name = this.props.location.query.movie_name
        return {
                movie_name:movie_name,
                source_name:movie_name,
                file_list:[
                ],
                playing:source_url+movie_name,
                play:true,
                message:'',
                yasuo:10,
                url:source_url+movie_name
            }
  },
    componentDidMount(){
        this.update()
    },
    update(){
        var  query_url = base_url+'re/'+this.state.movie_name
        get(query_url,{},(re)=>{
            for (let i = 0 ;i < re.length;i++){
                re[i] = result_url+re[i]
            }
            this.setState({file_list:re})
        })
    },
    query_new (){
    this.setState({message:'服务器正在处理...'})
    get(api_url+this.state.source_name.split('.')[0]+'.avi',{"time":this.state.yasuo},(re)=>{
        this.setState({message:''})
        this.update()
        alert('服务器处理完成')
    })
  },
    render() {
        var play_list = (this.state.file_list.map(file=>{
            return <Button onClick = {(e)=>{this.setState({playing:file})}}>{file.split('/')[5]}分钟</Button>
        }))
        return (
            <Container>
                <br/>
                <Panel header={
                    <Grid>
                        <Col sm={4}>
                        {this.state.source_name}
                        </Col>
                        <Col sm={4}>       
                        压缩到               
                        <input  value = {this.state.yasuo} onChange={e=>{this.setState({yasuo:e.target.value})}}size="3"/>
                        分钟
                        <button onClick={this.query_new}>确定</button>
                        </Col>     
                        <Col sm={1}>                                 
                        </Col>     
                        <Col sm={3} >                                 
                        <span style = {{"color":"red"}}> {this.state.message}</span>
                        </Col>     
                    </Grid>
                    }>
                    <Grid>
                        <Col>
                            <Button onClick = {(e)=>{this.setState({playing:this.state.url})}}>原视频</Button>
                            &nbsp;
                            {play_list}
                        </Col>
                    </Grid>
                    <ReactPlayer 
                    className='react-player'
                    width='100%'
                    height='100%'
                    controls={true}
                    url={this.state.playing}
                    playing={this.state.play}
                    />
                   
                </Panel>
                
            </Container>
                    
        )
    }
})
)
export default Process_movie