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
  Panel
} from 'amazeui-react';
import {Editor, EditorState} from 'draft-js';
import { withRouter } from 'react-router'
import { myConfig } from '../components/config.js';
import {post} from '../components/Call'
import View from '../components/View'
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
            }
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
        var parms = this.state.parms
        var iconUser = <span className="am-icon-user"></span>;
        var input = !this.state.is_file?<Input  type="textarea" label="正文内容" value = {this.state.content} onChange={this.handle_content_change} />
        :<Input type="file" label="请选择txt格式的文本文件" id = 'file' onChange={this.handle_file_change}/>
        return (
                <Container>
                    <br/>
                    <ButtonToolbar>
                        <Input  type = "submit" value="切换输入形式" standalone onClick={()=>{this.setState({is_file:!this.state.is_file})}} />
                    </ButtonToolbar>
                    <br/>   
                        {input}
                    <br/>   
                    <Form inline>
                    <Input  label="预计阅读时间" type="text" name="num_3" value = {this.state.num_3} onChange={this.handle_num_3} />分钟                    
                    </Form>
                    <br/>
                
                    <Panel>
                    <Article
                    title = "快闪阅读"
                    >
    
    {this.state.c_3}
                    </Article>
                    </Panel>
                </Container>
        )
    }
})
)
export default Text_zhaiyao