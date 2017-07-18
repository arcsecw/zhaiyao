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
  Form,
  Article,
  Panel,
  Thumbnails,
  Thumbnail

} from 'amazeui-react';
import ReactPlayer from 'react-player'
import { withRouter,Link } from 'react-router'
import { myConfig } from '../components/config.js';
import {post,get} from '../components/Call'
const url = 'http://253.3004.arcsec.top:8080/'
const convertFileToString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
var Movie_zhaiyao  =  withRouter(React.createClass( {
    getInitialState(){
        return {
                url:'',
                filelist:[
                ],

            }
  },
    componentWillMount(){
        get(url+'movies',{},(re)=>{
            this.setState({filelist:re})
        })
    },
    update_all(){
        /*var f1 = new FormData()
        f1.append('text',this.state.content)
        f1.append('num',this.state.num_1)
        post('KeyWordServlet',f1,(re)=>{
            this.setState({c_1:re.res})
        })
        var f2 = new FormData()
        f2.append('text',this.state.content)
        f2.append('num',this.state.num_2)
        post('KeyPhraseServlet',f2,(re)=>{
            this.setState({c_2:re.res})
        })*/
        var f3 = new FormData()
        f3.append('text',this.state.content)
        f3.append('num',this.state.num_3)
        post('SummaryServlet',f3,(re)=>{
            this.setState({c_3:re.res})
        })
    },
    
    handle_file_change(e){
        var f = document.getElementById('file').files[0]
        convertFileToString(f).then(re=>{
            this.setState({content:re},()=>{
                this.update_all()
            })
        })

    },
   handle_content_change(e){
        this.setState({content:e.target.value},()=>{
            this.update_all()
        })
   },
   handle_num_3(e){
        this.setState({num_3:e.target.value},()=>{
            this.update_all()
        })
   },
    render() {
        //var a = <ReactPlayer url={this.state.url+re} width="220" height="110" />
        var movie_list = (this.state.filelist.map((re)=>{
            return (
                <Link to='p_movie' query ={{movie_name:re}}>
                <Thumbnail
                caption={<div>
                        <h3>{re}</h3>
                        <p>
                            此处应有一小段视频简介
                        </p>
                    </div>}
                src="http://s.amazeui.org/media/i/demos/bing-1.jpg"/>
            </Link>
        )
        }))
        return (
                <Container>
                    <br/>
                    <Panel>
                        <Thumbnails sm={4}>
                            {movie_list}
                        </Thumbnails>
                    </Panel>
                </Container>
        )
    }
})
)
export default Movie_zhaiyao