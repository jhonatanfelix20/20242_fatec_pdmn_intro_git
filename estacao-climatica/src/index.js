import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null,
            menssagemDeErro: null
        }
        console.log('construtor')
    }

    componentDidMount(){
        console.log('componentDidMount')
        this.obterLocalizacao()
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    obterEstacao = (data, latitude) => {
        
        const anoAtual = data.getFullYear()
        //new Date(ano, mes, dia): mes de 0 a 11, dia de 1 a 31
        //21/06
        const d1 = new Date(anoAtual, 5, 21)
        //24/09
        const d2 = new Date(anoAtual, 8, 24)
        //22/12
        const d3 = new Date(anoAtual, 11, 22)
        //21/03
        const d4 = new Date(anoAtual, 2, 21)
        const estouNoSul = latitude < 0
        if(data >= d1 && data < d2)
            return estouNoSul ? 'Inverno' : 'Verão'
        if(data >= d2 && data < d3)
            return estouNoSul ? 'Primavera' : 'Outuno'
        if(data >= d3 || data < d4)
            return estouNoSul ? 'Verão' : 'Inverno'
        return estouNoSul ? 'Outono' : 'Primavera'
    }

    obterLocalizacao = () => {
        //1. obter a localização do usuario usando o método getCurrentPosition

        //2. Quando ela estiveer disponível:

            //2.1 obter a data atual do sistema

            //2.2 obter a estação climática do usuário usando a função obter estação

            //2.3 obter o nome do ícone usando o mapa de icones

            //2.4 atualizar o estado usando a função this.setState
        window.navigator.geolocation.getCurrentPosition((posicao) => {
                const dataAtual = new Date()
                const estacao = this.obterEstacao(dataAtual, posicao.coords.latitude);
                const icone = this.icones[estacao]
                this.setState(
                {
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                    estacao: estacao,
                    data: dataAtual.toLocaleTimeString(),
                    icone: icone
                })
            },
            (erro) => {
                this.setState({mensagemDeErro: 'Tente novamente mais tarde'})
            }

        )
    }
            

    icones = {
        'Primavera': 'fa-sedding',
        'Verão': 'fa-sun',
        'Outuno': 'fa-tree',
        'Inverno': 'fa-snowflake'
    }


    render(){
        console.log('render')
        return (
            <div className='container p-4 border mt-2'>
                <div className='row justify-content-center'>
                    <div className='col-sm-12 col-md-8'>
                        <div className='card'>
                            <div className='card-body'>
                                <div 
                                    style={{height: '6rem'}}
                                    className='d-flex align-items-center rounded md-2'>
                                        <i className={'fa-solid fa-5x ${this.state.icone}'}></i>
                                        <p className='w-75 ms-3 text-center fs -1'>{this.state.estacao}</p>
                                </div>
                                <p className='text-center'>
                                    {
                                        this.state.latitude ?
                                            'Coordenadas: ${this.state.latitude},${this.state.longitude}. Data: ${this.state.data}'
                                        :
                                            this.state.menssagemDeErro ?
                                                this.state.menssagemDeErro
                                            :
                                            'Clique no botão para saber a sua estação climática'
                                    }
                                </p>
                                <button
                                    onClick={this.obterLocalizacao}
                                    className='btn btn-outline-primary w-100 mt-2'>
                                    Qual a minha estação?
                                </button>
                                <button
                                    className="btn btn-outline-danger w-100 mt-2"
                                    onClick={() => {
                                        ReactDOM.unmountComponentAtNode(
                                            document.querySelector('#root')
                                        )
                                    }}>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
)