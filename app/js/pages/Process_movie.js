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
  Col

} from 'amazeui-react';
//import Player from '../components/player/Player'
import ReactPlayer from 'react-player'
import { withRouter,Link } from 'react-router'
import { myConfig } from '../components/config.js';
import {post} from '../components/Call'
const convertFileToString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
var Process_movie  =  withRouter(React.createClass( {
    getInitialState(){
        var movie_name = this.props.location.query.movie_name
        var source_url= 'https://streamable.com/'
        return {
                source_url:source_url,
                movie_name:movie_name,
                message:'',
                yasuo:10,
                url:source_url+movie_name
            }
  },
    query_new (){
    var form = new FormData()
    this.setState({message:'服务器正在处理...'})
    form.append('time',this.state.yasuo)
    form.append('name',this.state.name)
    post('url',form,(re)=>{
      this.setState({message:''})
      this.setState({url:re.url})
    })
  },
    render() {
        return (
            <Container>
                <br/>
                <Panel header={
                    <Grid>
                        <Col sm={4}>
                        {this.state.movie_name}
                        </Col>
                        <Col sm={4}>       
                        压缩到               
                        <input  value = {this.state.yasuo} onChange={e=>{this.setState({yasuo:e.target.value})}}size="3"/>
                        分钟
                        <button onClick={this.query_new}>确定</button>
                        </Col>     
                        <Col sm={2}>                                 
                        </Col>     
                        <Col sm={2}>                                 
                        {this.state.message}
                        </Col>     
                    </Grid>
                    }>
                    <ReactPlayer 
                    className='react-player'
                    width='100%'
                    height='100%'
                    controls={true}
                    url={this.state.url}
                    playing={false}
                    />
                    
                </Panel>
                
            </Container>
                    
        )
    }
})
)
export default Process_movie