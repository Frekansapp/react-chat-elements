import React,{Component} from 'react';
import  './LinkMessage.css';
const classNames = require('classnames');
import axios from 'axios';
import Emoji from 'react-emoji-render';

class LinkMessage extends Component {
    constructor(props){
        super(props);
        this.state = {imgSrc:'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'};
        this.className =  this.className.bind(this);
        let that = this;
        axios.post('https://parse-1102.herokuapp.com/parse',{url:this.props.link})
            .then((res)=>{
                if(res.status ===200){
                    let dataArray = res.data;
                    let og = new Map();
                    dataArray.forEach((item)=>{
                        if(item.hasOwnProperty('property')){
                            og.set(item.property,item.content);
                        }
                    });
                    that.setState({
                        imgSrc:og.get('og:image'),
                        description:og.get('og:description')||og.get('og:title'),
                        url:og.get('og:url'),
                    });
                }
            });
    }
    className() {
        let className = classNames('rce-mbox-location', this.props.className);
        if (this.props.text) {
            className = classNames(className, 'rce-mbox-location-has-text');
        }
        return className;
    }
    parseMessage(){
        let arr = this.props.text.split(this.props.link);
        let result =[];
        for(let i =0;i<arr.length;i++){
            if(i<arr.length-1) {
                result.push(<Emoji key={i} text={arr[i]}/>);
                result.push(<a key={i+'C'} href={this.props.link} target={this.props.target}>{this.props.link}</a>);
            } else {
                result.push(<Emoji key={i} text={arr[i]}/>);
            }
        }
        return result;
    }
    render (){
        return (
            <div className='rce-container-lmsg'>
                {
                    this.props.text &&
                    <div className="rce-mbox-text rce-mbox-location-text">
                        {this.parseMessage()}
                    </div>
                }
                <a
                    onClick={this.props.onOpen}
                    target={this.props.target}
                    href={this.props.link}
                    className={this.className()}>
                    <img className='rce-mbox-location-img'
                         src={
                             this.state.imgSrc
                         }/>
                </a>
            </div>
        )
    }
}
LinkMessage.defaultProps = {
    //default Props here
    target:'_blank',
    link:'http://hirosume.ml',
    text:'http://hirosume.ml'
};

export  default LinkMessage;
