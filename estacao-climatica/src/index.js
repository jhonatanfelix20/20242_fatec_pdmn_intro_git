import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

class App extends React.Component {
    
    state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemDeErro: null
    }

    constructor(props){
        super(props)
        //this.state = {
        //    latitude: null,
        //    longitude: null,
        //    estacao: null,
        //    data: null,
        //    icone: null,
        //    menssagemDeErro: null
       // }
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
        'Primavera': 'fa-seedling',
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
                        {
                            (!this.state.latitude && !this.state.mensagemDeErro) ?
                            <Loading 
                                mensagem= "Por favor, responda à solicitação de localização"/>
                            :
                            this.state.mensagemDeErro ?
                                <p className='border round p-2 fs-5 text-center'>
                                    É preciso dar permissão de acesso à localização.
                                </p>
                            :
                            <EstacaoClimatica 
                                icone={this.state.icone}
                                estacao={this.state.estacao}
                                latitude={this.state.latitude}
                                longitude={this.state.longitude}
                                data={this.state.data}
                                mensagemDeErro={this.state.mensagemDeErro}
                                obterLocalizacao={this.state.obterLocalizacao}
                            />
                        }
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