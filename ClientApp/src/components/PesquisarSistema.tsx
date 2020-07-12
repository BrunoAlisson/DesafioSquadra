import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class SistemaData {
    id: number = 0;
    descricao: string = "";
    sigla: string = "";
    email: string = "";
    url: string = "";
    status: string = "";
}

interface PesquisarSistemaDataState {
    descricao: string;
    sigla: string;
    email: string;
    sistemaLista: SistemaData[];
    pesquisa: boolean;
}

export class PesquisarSistema extends React.Component<RouteComponentProps<{}>, PesquisarSistemaDataState> {
    constructor() {
        super();
        this.state = { descricao: "", sigla: "", email: "", sistemaLista: [], pesquisa: false };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLimpar = this.handleLimpar.bind(this);
        this.handleAddSistema = this.handleAddSistema.bind(this);
        this.handleEditSistema = this.handleEditSistema.bind(this);
        this.handleDescricaoChange = this.handleDescricaoChange.bind(this);
        this.handleSiglaChange = this.handleSiglaChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }
    public render() {
        let searchFields = this.renderPesquisa(); 
        let searchResults = "";
        if (this.state.pesquisa) {
            searchResults = this.state.sistemaLista.length === 0
                ? <p><em>Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!</em></p>
                : this.renderSistemaTable(this.state.sistemaLista);
        }
        return <div>
            <h1>Pesquisar Sistema</h1>
            {searchFields}
            {searchResults}
        </div>;
    }

    private handleEditSistema(id: number) {
        alert('editar');
        //this.props.history.push("/sistema/edit/" + id);
    }

    private handleSearch() {
        fetch('api/Sistemas/pesquisar?descricao=' + this.state.descricao + '&sigla=' + this.state.sigla + '&email=' + this.state.email)
            .then(response => response.json() as Promise<SistemaData[]>)
            .then(data => {
                this.setState({ descricao: this.state.descricao, sigla: this.state.sigla, email: this.state.email, sistemaLista: data, pesquisa: true });
            });
        this.render();
    }

    private handleAddSistema(e) {
        e.preventDefault();
        this.props.history.push("/incluirsistema");
    }

    private handleDescricaoChange(e) {
        this.setState({ descricao: e.target.value });
    }

    private handleSiglaChange(e) {
        this.setState({ sigla: e.target.value });
    }

    private handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    private handleLimpar() {
        this.setState({ descricao: "", sigla: "", email: "", sistemaLista: [], pesquisa: false });
        //this.render();
    }

    private renderPesquisa() {
        return (
            <form id="searchFields" onSubmit={this.handleSearch}>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="descricao">Descrição</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="descricao" value={this.state.descricao} onChange={this.handleDescricaoChange} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="sigla">Sigla</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="sigla" defaultValue={this.state.sigla} onChange={this.handleSiglaChange} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="email">E-mail de atendimento do sistema</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.email} onChange={this.handleEmailChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <input type="button" className="btn btn-default" value="Pesquisar" onClick={this.handleSearch} />
                    <input type="button" className="btn btn-default" value="Limpar" onClick={this.handleLimpar} />
                    <input type="button" className="btn btn-default" value="Novo Sistema" onClick={this.handleAddSistema} />
                </div >
            </form>
        );
    }

    // Retorna uma tabela HTML para o método render().  
    private renderSistemaTable(sistemaLista: SistemaData[]) {
        if ((sistemaLista !== undefined) && (sistemaLista.length > 0)) {
            return (
                <table id="searchResults" className='table'>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Sigla</th>
                            <th>Email</th>
                            <th>URL</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sistemaLista.map(emp =>
                            <tr key={emp.id}>
                                <td>{emp.descricao}</td>
                                <td>{emp.sigla}</td>
                                <td>{emp.email}</td>
                                <td>{emp.url}</td>
                                <td>{emp.status}</td>
                                <td>
                                    <a className="action" onClick={(id) => this.handleEditSistema(emp.id)}>Editar</a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }
    }
}