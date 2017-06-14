import {createElement, Component} from 'react';

export class image extends Component {
    constructor(props) {
        super(props);
        this.value = props.value.toDataURL();
        this.smallValue = props.value.scale({height: 50}).toDataURL();
        this.state = {
            hovering: false
        };
    }

    render() {
        return (
            <div
                onMouseEnter={() => this.setState({hovering: true})}
                onMouseLeave={() => this.setState({hovering: false})}
            >
                {
                    this.state.hovering ?
                        <img src={this.value} /> :
                        <div style={{
                            backgroundImage: `url(${this.smallValue})`,
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: 50
                        }} />
                }
            </div>
        );
    }
}
