import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'product-hunt',
    title: 'Produtos',
    subtitle: 'Cadastrar Produtos'
}

const baseUrl = 'http://localhost:3002/products'
const data = new Date()
const dataFormatted = data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + data.getDate() + 
    " " + data.getHours() + " : " + data.getMinutes() + " : " + data.getSeconds()

const initialState = {
    product: { name: '', price: null, registered: dataFormatted, amount: ''},
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list:resp.data })
        })
    }

    clear() {
        this.setState({ products: initialState.product })
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ product: initialState.product, list })
            })
    }

    getUpdateList(product, add = true) {
        const list = this.state.list.filter(p => p.id !== product.id)
        if(add)list.unshift(product)
        return list
    }

    renderForm() {
        return (
            <div className='form'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Nome</label>
                            <input type="text" className='form-control'
                                name='name'
                                value={this.state.product.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Cadastrar produto"/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Preço</label>
                            <input  type="text" className='form-control'
                                name='price'
                                value={this.state.product.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Inserir preço"/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Quantidade</label>
                            <input type="text" className='form-control'
                                name='amount'
                                value={this.state.product.amount}
                                onChange={e => this.updateField(e)}
                                placeholder="Inserir quantidade"/>
                        </div>
                    </div>
                </div>

                <hr />
                <div className='row'>
                    <div className='col-12 d-flex justify-content-start'>
                        <button className='btn btn-primary'
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className='btn btn-secondary ms-2'
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>  
                </div>
            </div>
        )
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdateList(product, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Data Registro</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>{product.registered}</td>
                    <td>
                        <button className='btn btn-warning'
                            onClick={() => this.load(product)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className='btn btn-danger ms-2'
                            onClick={() => this.remove(product)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}