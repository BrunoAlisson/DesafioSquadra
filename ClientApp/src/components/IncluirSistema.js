"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PesquisarSistema_1 = require("./PesquisarSistema");
var IncluirSistema = /** @class */ (function (_super) {
    __extends(IncluirSistema, _super);
    function IncluirSistema(props) {
        var _this = _super.call(this, props) || this;
        //atualiza o state do componente
        _this.state = { titulo: "", carregando: true, sistemaData: new PesquisarSistema_1.SistemaData };
        var id = _this.props.match.params["id"];
        if (id > 0) {
            fetch('api/Sistemas/Details/' + id)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ titulo: "Editar", carregando: false, sistemaData: data });
            });
        }
        else {
            _this.state = { titulo: "Criar", carregando: false, sistemaData: new PesquisarSistema_1.SistemaData };
        }
        // este binding é necessário para fazer o 'this' funcionar no callback  
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleVoltar = _this.handleVoltar.bind(_this);
        return _this;
    }
    IncluirSistema.prototype.render = function () {
        var conteudo = this.state.carregando
            ? React.createElement("p", null,
                React.createElement("em", null, "Carregando..."))
            : this.renderCreateForm();
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.titulo),
            React.createElement("h3", null, "Sistema"),
            React.createElement("hr", null),
            conteudo);
    };
    // trata o evento submit do formulario
    IncluirSistema.prototype.handleSave = function (e) {
        var _this = this;
        e.preventDefault();
        var data = new FormData(e.target);
        if (this.state.sistemaData.id) {
            fetch('api/sistemas/', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/pesquisarsistema");
            });
        }
        else {
            fetch('api/Sistemas/', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/pesquisarsistema");
            });
        }
    };
    // trata o evento do botão cancela
    IncluirSistema.prototype.handleVoltar = function (e) {
        e.preventDefault();
        this.props.history.push("/pesquisarsistema");
    };
    // Retorna o formulario HTMl para o método Render
    IncluirSistema.prototype.renderCreateForm = function () {
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: this.state.sistemaData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "descricao" }, "Descri\u00E7\u00E3o"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "descricao", defaultValue: this.state.sistemaData.descricao, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "sigla" }, "Sigla"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "sigla", defaultValue: this.state.sistemaData.sigla, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "email" }, "E-mail de atendimento do sistema"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "email", defaultValue: this.state.sistemaData.email, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "url" }, "URL"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "url", defaultValue: this.state.sistemaData.url, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Salvar"),
                React.createElement("button", { className: "btn", onClick: this.handleVoltar }, "Voltar"))));
    };
    return IncluirSistema;
}(React.Component));
exports.IncluirSistema = IncluirSistema;
//# sourceMappingURL=IncluirSistema.js.map