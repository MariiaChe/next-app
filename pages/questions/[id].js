import React, { PureComponent } from "react";
import Router from 'next/router';
import { connect } from "react-redux";
import  { setCount } from "../../redux/actions/counter";
import data from "../../data/quiz"
import Link from "next/link";
import PageHead from "../../components/Head";
import { withRouter } from 'next/router';
import "./styles.css";

class Question extends PureComponent {
    constructor() {
        super();
        
        this.state = {
            isOptionClicked: false,
            isCorrect:false,
            correctAnswer:null,
            descAnswer:null,
            humanReaction:null,
            clickedOption:null,
            isLast:false,
            count:0
        }
    } 
  
    componentDidMount(){
     const { counter } = this.props; 
        if(counter.count===null){
        Router.push({pathname:'/'})
        }
    }
    handleClick = (option, id) => {
        const { count } = this.state;
        const { dispatchSetCount } = this.props;
       
        this.setState({isOptionClicked:true});
        let correctAnswer = data.questions[id - 1].answer;
        let answerDesc = data.questions[id - 1].answ_desc;
        this.setState({clickedOption:option})
        this.setState({correctAnswer:correctAnswer})
        this.setState({descAnswer:answerDesc})
        if(id===11){
            this.setState({isLast:true})
        }
        if(option === correctAnswer){
            this.setState({count:count+1})
            dispatchSetCount(count+1)
            this.setState({isCorrect:true})
            if(id === 1){
                this.setState({humanReaction:"Sí!"})
            }else if(id === 2){
                this.setState({humanReaction:"Claro!"})
            }else if(id === 3){
                this.setState({humanReaction:"Correcto!"})
            }else if(id === 4){
                this.setState({humanReaction:"Muy bien."})
            }else if(id === 5){
                this.setState({humanReaction:"Exacto!"})
            }else if(id === 6 || id === 11){
                this.setState({humanReaction:"Sí."})
            }else if(id === 7 || id === 9){
                this.setState({humanReaction:null})
            }else if(id === 8){
                this.setState({humanReaction:"Yes!"})
            }else if(id === 10){
                this.setState({humanReaction:"Correcto."})
            }
        }else if(option !== correctAnswer){
            this.setState({isCorrect:false})
            if(id === 1 ||id===4||id===7||id===11){
                this.setState({humanReaction:"No:("})
            }else if(id===2 || id===8){
                this.setState({humanReaction:null})
            }else if(id===3 ||id===5 || id===9){
                this.setState({humanReaction:"Nop."})
            }else if(id===6 || id===10){
                this.setState({humanReaction:"No."})
            }
        }
    }
    renderWrongAnswer () {
        const { correctAnswer, descAnswer, humanReaction, clickedOption, isLast } = this.state 
        const { router } = this.props;
        const { id } = router.query;
        const question = data.questions[id - 1];
        return question.options.map((option, index)=>{
            let optionString = Object.values(option)[0];
            if(optionString === correctAnswer){
                
                return(
                    <div key={index} className="option true" id={optionString}>
                        <div className="wrap-img">
                          
                            <span>{optionString}</span>
                            <img src={"/true.png"} />
                        </div>
                    </div>
                  )
            }
             if(optionString === clickedOption){
                return(
                    
                        <div key={index} className="option false" id={optionString}>
                            {isLast?
                                <img src={"https://media.giphy.com/media/PWd9qvmfGafq8/giphy.gif"} />:
                                null
                            }
                            <div className="wrap-img">
                                
                                <span>{optionString}</span>
                                <img src={"/false.png"} />
                            </div>
                            <span className="answ-desc">{humanReaction}  {descAnswer}</span>
                        </div>
        
                )
            }
            if(optionString !== clickedOption && optionString !== correctAnswer){
                return(
                    <div key={index}  className="option" id={optionString}>
                        <span>{optionString}</span>
                    </div>
                )
            }
        })
    }
    renderCorrectAnswer () {
        const { correctAnswer, descAnswer, humanReaction, isLast } = this.state 
        const { router, counter } = this.props;
        const { id } = router.query;
        const question = data.questions[id - 1];
       
        return question.options.map((option, index) =>{
              let optionString = Object.values(option)[0];
              if(optionString === correctAnswer){
              return(
                <div key={index} className="option true" id={optionString}>
                    
                    <div className="wrap-img">
                        
                        <span>{optionString}</span>
                        <img src={"/true.png"} />
                    </div>
                    
                     <span className="answ-desc"> {humanReaction} {descAnswer}</span>
                     {isLast?
                        
                        <img src={"https://media.giphy.com/media/PWd9qvmfGafq8/giphy.gif"} />
                    :
                    null
                    }
                </div>
              )
            }else{
                return(
                    <div key={index}  className="option" id={optionString}>
                        <span>{optionString}</span>
                    </div>
                )
            }
                
        } )
       

    }

    handleNext = () =>{  
        this.setState({isOptionClicked:false})
        this.setState({isCorrect:false})
        this.setState({clickedOption:null})
        this.setState({humanReaction:null})
    }

    render() {

        const { isOptionClicked, isCorrect } = this.state;
        const { router, counter } = this.props;
        const { id } = router.query;
        const dataLength = data.questions.length;
        const question = data.questions[id - 1];
        let isDataLengthMoreThenQuestionId = true;

        if (question && question.id === dataLength) {
            isDataLengthMoreThenQuestionId = false;
        }
        return question ? (
            <div id="questions">
                <PageHead />
                <div className="container">
                    <div className="question">
                        <img src={"/sp.jpg"} />
                        <p className="question-desc" dangerouslySetInnerHTML={{ __html: question.question }} />
                        <p className="question-number">{question.id}/11</p>
                    </div>
                    { !isCorrect && !isOptionClicked ?
                     <div className="options" id={`options-`+question.id}>
                     <div className="option" id={question.options[0].a} onClick={() =>this.handleClick(question.options[0].a, question.id)}>
                         <span>{question.options[0].a}</span>
                     </div>
                     <div className="option" id={question.options[1].b} onClick={() => this.handleClick(question.options[1].b,question.id)}>
                         <span>{question.options[1].b}</span>
                     </div>
                     <div className="option" id={question.options[2].c} onClick={() => this.handleClick(question.options[2].c,question.id)}>
                         <span>{question.options[2].c}</span>
                     </div>
                     {question.options[3] ?
                         <div className="option" id={question.options[3].d} onClick={() => this.handleClick(question.options[3].d,question.id)}>
                             <span>{question.options[3].d}</span>
                         </div> :
                         null}
                 </div>:
                    isCorrect && isOptionClicked ?
                    <div className="options">{this.renderCorrectAnswer()}</div>
                    :
                    !isCorrect && isOptionClicked?
                    <div className="options">{this.renderWrongAnswer()}</div>:
                    null

                    }
                   
                    {isOptionClicked ? 
                        <div className="btn-submit">
                            {isDataLengthMoreThenQuestionId
                                ?
                                <Link href="/questions/[id]" as={`/questions/${question.id + 1}`}><button onClick={()=>this.handleNext()}>next</button></Link>
                                :
                                <Link href="/result"><button>ver resultado</button></Link>

                            }
                        </div> :
                        null
                    }
                </div>
            </div>
        ) : null
    };
}

const mapStateToProps = state => ({
    counter: state.counter
})
const mapDispatchToProps = dispatch =>({
    dispatchSetCount: count => dispatch(setCount(count))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));