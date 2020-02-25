import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Router from 'next/router';
import ResultTemplate from './resultTemplate';
import "./result.css";

class Result extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            img:'',
            title:'',
            desc:''

        }
        this.onReload = this.onReload.bind(this);
        this.renderResult = this.renderResult.bind(this)
    }
    componentDidMount(){
        const { counter } = this.props;
        if(counter.count===null){
            Router.push({pathname:'/'})
        }else{
            this.renderResult(counter.count)
        }
       
    }
    onReload(e){
        e.preventDefault();
        Router.push({pathname:'/'})
    }
    renderResult(count){
        if(count < 4 ){
            this.setState({img: '/lazarus-musical.jpg' })
            this.setState({title:'LAZARUS!'})
            this.setState({desc:'Quizás te gusten las canciones más nuevas de Bowie?'})
            
        }else if(count >3 && count<6 ){
            this.setState({img:"/elton-john.jpg"})
            this.setState({title:'Rocketman!'})
            this.setState({desc:'Can you hear me, Major Tom?'})
        }else if(count>5 && count < 10){
            this.setState({img:"/bowie4.jpg"})
            this.setState({title:'Major Tom!'})
            this.setState({desc:'Cantaste "Space Oddity" muy bien'})
        }else if(count>9){
            this.setState({img:"/bowie2.jpeg"})
            this.setState({title:'David Bowie!'})
            this.setState({desc:'Cantaste "Space Oddity" mejor que todos!'})
        }
       
    }
    render(){
        const { img, title, desc} = this.state;
        const { counter } = this.props;
    
        return(
            <div id="result">
                <div className="container">
                    <ResultTemplate img = {img}
                                    title={title}
                                    desc={desc}
                                    count={counter.count}
                     />
                    <button onClick={this.onReload} >Jugar de nuevo?</button>
                </div> 
            </div>
        )

    }
}
const mapStateToProps = state => ({
    counter: state.counter
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Result)