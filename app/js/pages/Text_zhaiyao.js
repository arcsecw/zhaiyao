import React from 'react';
import {
  Container,
  Input,
  FormGroup,
  ButtonToolbar,
  Tabs,
  Item,
  ModalTrigger,
  AvgGrid,
  Form,
  Article,
  Panel,
  Grid,
  Col,
  Image
} from 'amazeui-react';
import {Editor, EditorState} from 'draft-js';
import { withRouter } from 'react-router'
import { myConfig } from '../components/config.js';
import {post} from '../components/Call'
import View from '../components/View'
import ReactPDF from 'react-pdf'


const convertFileToString = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
var Text_zhaiyao  =  withRouter(React.createClass( {
    getInitialState(){
        return {
                is_file:true,
                c_1:"关键词",
                c_2:"关键短语",
                c_3:"快闪结果",
                num_1:2,
                num_2:2,
                num_3:5,
                pdf_url:undefined,
            }
  },
    // update_all(){
    //     /*var f1 = new FormData()
    //     f1.append('text',this.state.content)
    //     f1.append('num',this.state.num_1)
    //     post('KeyWordServlet',f1,(re)=>{
    //         this.setState({c_1:re.res})
    //     })
    //     var f2 = new FormData()
    //     f2.append('text',this.state.content)
    //     f2.append('num',this.state.num_2)
    //     post('KeyPhraseServlet',f2,(re)=>{
    //         this.setState({c_2:re.res})
    //     })*/
    //     var f3 = new FormData()
    //     f3.append('text',this.state.content)
    //     f3.append('num',this.state.num_3)
    //     post('SummaryServlet',f3,(re)=>{
    //         this.setState({c_3:re.res})
    //     })
    // },
    //     update_all(){
    //     /*var f1 = new FormData()
    //     f1.append('text',this.state.content)
    //     f1.append('num',this.state.num_1)
    //     post('KeyWordServlet',f1,(re)=>{
    //         this.setState({c_1:re.res})
    //     })
    //     var f2 = new FormData()
    //     f2.append('text',this.state.content)
    //     f2.append('num',this.state.num_2)
    //     post('KeyPhraseServlet',f2,(re)=>{
    //         this.setState({c_2:re.res})
    //     })*/
    //     var f3 = new FormData()
    //     f3.append('text',this.state.file)
    //     f3.append('num',this.state.num_3)
    //     post('SummaryServlet',f3,(re)=>{
        

    //     })
    // },
   
    handle_file_change(e){
        var f = document.getElementById('file').files[0]
        var f3 = new FormData()
        f3.append('text',f)
        f3.append('num',this.state.num_3)
        post('SummaryServlet',f3,(re)=>{
        //post 成功返回结果执行的代码
            this.setState({pdf_url:re.res})
        })

    },
   
   handle_num_3(e){
        this.setState({num_3:e.target.value},()=>{
            this.update_all()
        })

   },
    render() {
        var parms = this.state.parms
        var iconUser = <span className="am-icon-user"></span>;
        var input = <Input type="file"id = 'file' />
        var pdf = this.state.pdf_url==undefined ?<Image src='../../i/tip.jpg'responsive />:<embed src = {this.state.pdf_url} width="935" height="1000"/> 
        return (
                <Container>
                    {/* <br/>
                    {<ButtonToolbar>
                        <Input  type = "submit" value="切换输入形式" standalone onClick={()=>{this.setState({is_file:!this.state.is_file})}} />
                    </ButtonToolbar> } */}
                    <Panel>
                    <Grid >
                         <Col sm={4}>{input}</Col>
                    </Grid>
                    <Grid>
                         <Col sm={3 }>
                         <Input   addonBefore="预计阅读时间" addonAfter="分钟"  type="text" name="num_3" amSize="sm"value = {this.state.num_3} onChange={this.handle_num_3}/>                  
                        </Col>
                    


                    </Grid>
                    <Grid>
                         <Col sm={4 }>
                        <Input  type = "submit" value="提交" standalone onClick={this.handle_file_change} />
                        </Col>
                        
                    </Grid>
                    <Col sm={4 }>
                                        
                        </Col>


                     
                          
                   
                   
                    <br/>
                    {pdf}
                    
                    </Panel>
                </Container>

            

        )
    }
})
)
export default Text_zhaiyao