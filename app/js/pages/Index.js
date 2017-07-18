import React from 'react';
import {
  Container,
  Input,
  ButtonToolbar,
  Tabs,
  DateTimeInput,
  Button,
  ModalTrigger,
  Article,
  Panel,
  Image,
  Group,
  Slider,
} from 'amazeui-react';

import {Editor, EditorState} from 'draft-js';

import { withRouter ,Link} from 'react-router'
import { myConfig } from '../components/config.js';
import {post} from '../components/Call'
import View from '../components/View'




const onAction = function(index, direction) {
  console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
};


const data2 = [
  {
    to:"/",
    img: 'i/jianjie.jpg',
    
  },
  {
      to:"text",
    img: 'i/text.jpg',
  
  },
  {
      to:"movie",
    img: 'i/movie.jpg',
   
  },
];

const sliderCaption = (
  <Slider>
    {data2.map(function(item, i) {
      return (
        <Slider.Item
          key={i}
        >
            <Link to={item.to}>
          <img src={item.img} />
          </Link>
       
        </Slider.Item>
      );

    })}
  </Slider>

);






 var Index  =  withRouter(React.createClass( {
    getInitialState(){
        return {
                
            }
  },

  



    render() {
        
        return (
            <Container >
                
                
                
                {sliderCaption}
                
            </Container>
 
        )
    }
})
)



// var Index  =  withRouter(React.createClass( {
//     getInitialState(){
//         return {
                
//             }
//   },

  



//     render() {
        
//         return (
            
            
//                 <Container>
//                 <br/>
//                 <Panel>
//                         <Image
//                             src='../../i/jianjie.jpg'
//                                 responsive />

                    
//                 <Article title="">
                
                
//                 {/* <blockquote><p>本系统实现两个基本功能：快闪阅读和快闪视频。</p></blockquote> */}

                

//                 <h2>快闪阅读</h2>

//                 <p>快闪阅读，顾名思义，可以让读者从大量的文本中快速得到重要信息，节约读者的宝贵时间。
//                 </p>
//                 <p>只需要在快闪阅读模块，选择一个txt格式的文本上传，并输入预期的阅读时间。</p>
//                 <p>
//                     点击提交就会自动生成一篇和提交文本内容相关的摘要，并以pdf形式展现出来。
//                 </p>
            
//                 <Article.Child role="divider" />

//                 <h2>快闪视频</h2>

//                 <p>还在嫌视频时间太长？还在嫌剧情拖沓抓不到主旨？觉得浪费时间还不舍得弃剧？</p>
//                 <p>快闪视频来释放你的天性，只需三步。</p>
//                 <p>上传想快速预览的视频，点击提交，快闪视频呈现出来之后，可以直接预览。</p>
//                 <hr className="am-article-divider"/>
                
//                 </Article>
//             </Panel>
//                 </Container>
//         )
//     }
// })
// )
export default Index