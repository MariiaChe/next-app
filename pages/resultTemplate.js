import React, {PureComponent} from 'react';

class ResultTemplate extends PureComponent{


    render(){
        const {
            img,
            title,
            desc,
            count
        } = this.props
        return(
            <div className="container-result">
                <img src={img} />
                <div className="result-desc-container">
                    <h5>{count}/11</h5>
                    <h4 className="title-result">{title}</h4>
                    <p className="desc-result">{desc}</p>   
                </div>
            </div>
        )
    }

}

export default ResultTemplate