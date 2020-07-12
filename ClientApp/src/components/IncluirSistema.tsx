import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { SistemaData } from './PesquisarSistema';

interface IncluirSistemaDataState {
    titulo: string;
    carregando: boolean;
    sistemaData: SistemaData;
}

export class IncluirSistema extends React.Component<RouteComponentProps<{}>, IncluirSistemaDataState>
{
    constructor(props) {
        super(props);
        //atualiza o state do componente
        this.state = { titulo: "", carregando: true, sistemaData: new SistemaData };
        var id = this.props.match.params["id"];
        if (id > 0) {
            fetch('api/Sistemas/Details/' + id)
                .then(response => response.json() as Promise<SistemaData>)
                .then(data => {
                    this.setState({ titulo: "Editar", carregando: false, sistemaData: data });
                });
        }
        else 
        {
            this.state = { titulo: "Criar", carregando: false, sistemaData: new SistemaData };
        }
        // este binding é necessário para fazer o 'this' funcionar no callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }
    public render() {
        let conteudo = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.titulo}</h1>
            <h3>Sistema</h3>
            <hr />
            {conteudo}
        </div>;
    }
    // trata o evento submit do formulario
    private handleSave(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        if (this.state.sistemaData.id) {
            fetch('api/sistemas/', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/pesquisarsistema");
                })
        }
        else 
        {
            fetch('api/Sistemas/', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/pesquisarsistema");
                })
        }
    }
    // trata o evento do botão cancela
    private handleVoltar(e) {
        e.preventDefault();
        this.props.history.push("/pesquisarsistema");
    }
    // Retorna o formulario HTMl para o método Render
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="id" value={this.state.sistemaData.id} />
                </div>
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="descricao">Descrição</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="descricao" defaultValue={this.state.sistemaData.descricao} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="sigla">Sigla</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="sigla" defaultValue={this.state.sistemaData.sigla} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="email">E-mail de atendimento do sistema</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.sistemaData.email} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className=" control-label col-md-12" htmlFor="url">URL</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="url" defaultValue={this.state.sistemaData.url} required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleVoltar}>Voltar</button>
                </div>
            </form>
        );
    }
}  